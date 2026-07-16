const path = require('path');
const fs = require('fs');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const server = jsonServer.create();
const dbPath = path.resolve(__dirname, 'db.json');
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();

const PORT = 3001;

server.use(middlewares);
server.use(jsonServer.bodyParser);

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token is missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = decoded;
    next();
  });
}

function requireAdminForWrites(req, res, next) {
  const isWrite = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method);
  if (isWrite && req.user.role !== 'Admin') {
    return res.status(403).json({ message: 'You do not have permission to perform this action' });
  }
  next();
}

function readDb() {
  return JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
}

function writeDb(db) {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  router.db.setState(db);
}

// Generates a real DEV-XXXX id + timestamps for new devices.
// Because deleteDeviceAndRenumber() keeps ids contiguous, the next id is
// always simply the current count + 1001 — no gaps to fill.

function prepareNewDevice(req, res, next) {
  if (req.method === 'POST' && req.path === '/devices') {
    const db = readDb();
    const nextNumber = db.devices.length + 1001;

    const now = new Date().toISOString();
    req.body.id = `DEV-${nextNumber}`;
    req.body.createdAt = now;
    req.body.updatedAt = now;
  }

  if (['PUT', 'PATCH'].includes(req.method) && req.path.startsWith('/devices/')) {
    const idMatch = req.path.match(/^\/devices\/(.+)$/);
    if (idMatch) {
      const db = readDb();
      const existing = db.devices.find((d) => d.id === idMatch[1]);
      req.body.createdAt = existing?.createdAt || existing?.updatedAt || new Date().toISOString();
    }

    req.body.updatedAt = new Date().toISOString();
  }

  next();
}

// Handles DELETE /devices/:id ourselves (instead of letting json-server's
// router handle it) so we can renumber every remaining device to close the
// gap, keeping ids contiguous: DEV-1001, DEV-1002, DEV-1003... forever.

function deleteDeviceAndRenumber(req, res, next) {
  const match = req.path.match(/^\/devices\/(.+)$/);
  if (req.method === 'DELETE' && match) {
    const targetId = match[1];
    const db = readDb();

    const exists = db.devices.some((d) => d.id === targetId);
    if (!exists) {
      return res.status(404).json({ message: 'Device not found' });
    }

    // Remove the deleted device, keep the rest sorted by their current
    // numeric id so the renumbering is predictable (oldest ids keep their
    // relative order).
    const remaining = db.devices
      .filter((d) => d.id !== targetId)
      .sort((a, b) => {
        const numA = parseInt(String(a.id).replace('DEV-', ''), 10);
        const numB = parseInt(String(b.id).replace('DEV-', ''), 10);
        return numA - numB;
      });

    const renumbered = remaining.map((device, index) => ({
      ...device,
      id: `DEV-${1001 + index}`,
    }));

    db.devices = renumbered;
    writeDb(db);

    return res.status(200).json({ message: 'Device deleted and remaining devices renumbered' });
  }

  next();
}

server.use(authenticateToken);
server.use(requireAdminForWrites);
server.use(deleteDeviceAndRenumber);
server.use(prepareNewDevice);
server.use(router);

server.listen(PORT, () => {
  console.log(`Mock API (json-server) running on http://localhost:${PORT}`);
});