const users = [
  {
    id: 1,
    username: 'admin@gmail.com',
    // bcrypt hash of 'admin123'
    password: '$2b$10$4tRKfvPSdnOLEYU8H4PqleSPX9B.CasuBC3IA.DoJHKCJzBZ9X3/K',
    role: 'Admin',
  },
  {
    id: 2,
    username: 'operator@gmail.com',
    // bcrypt hash of 'operator123'
    password: '$2b$10$.kQCRzsua2TJ/4Ts/7htu.wbXjwrFW.TKRC0lPG7G.8Vo3DeIus.O',
    role: 'Operator',
  },
];

module.exports = users;