# METEOROS IoT — Device Management (RBAC)

A device management dashboard for IoT infrastructure, with two roles: Admins can add/edit/delete devices, Operators can only view them. Access control is enforced on both the frontend and the backend, so it's not something you can bypass by editing the client.

Built with React + Vite on the frontend, Express on the backend, and json-server as a lightweight mock database for devices.

## Scope note

The original task brief specified local, in-browser device data with no backend or external API. Per an updated project scope from the project lead, this was changed: authentication and device data are both handled through a backend rather than local state or localStorage. Auth runs through the Express server (`server/`), and device records are served via json-server (`server/mock-api/`) instead of being stored client-side. RBAC enforcement itself follows the original brief closely — it's implemented on both the frontend (UI permissions) and the backend (API-level authorization), which is stricter than the original brief required.

## Stack

- **Frontend:** React 19, Vite, React Router, Tailwind CSS, Axios, Recharts
- **Auth server:** Express, JWT, bcrypt, express-rate-limit
- **Device API:** json-server (mock REST API backed by a JSON file)

## Project structure

RBAC/
├── client/                  # React app
│   └── src/
│       ├── components/      # Shared UI (forms, tables, modals, toasts...)
│       ├── context/         # AuthContext, ToastContext
│       ├── hooks/           # useDevices
│       ├── pages/           # Dashboard, Devices, DeviceDetail, Alerts, Login, 403
│       └── utils/           # api client, permissions, token helpers
└── server/
    ├── routes/auth.js       # Login endpoint
    ├── middleware/auth.js   # JWT verification
    ├── data/users.js        # Demo user accounts (bcrypt-hashed passwords)
    └── mock-api/            # json-server instance for /devices, with role-based write protection

## Running it locally

From the repo root:

npm install
npm install --prefix client
npm install --prefix server
npm run dev

That last command starts all three pieces together (auth server on :5000, mock device API on :3001, Vite dev server on :5173) via concurrently. Open http://localhost:5173.


## Demo logins

| Role     | Username             | Password      |
|----------|-----------------------|---------------|
| Admin    | admin@gmail.com       | admin123      |
| Operator | operator@gmail.com    | operator123   |

## Roles

**Admin** — view, add, edit, delete devices.
**Operator** — view only. Write attempts are blocked at the API level (403), not just hidden in the UI.


## Known limitations

- No refresh-token flow — JWTs expire after 1 hour and require a full re-login. The interceptor in utils/api.js catches the next failed request and redirects to login; there's no background timer that logs the user out at the exact expiry moment.
