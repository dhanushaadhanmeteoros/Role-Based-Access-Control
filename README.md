# IoT Device Management with JWT Authentication & Role-Based Access Control (RBAC)

A full-stack web application for managing IoT devices with secure authentication and role-based authorization.

This project is being developed as part of a React and Node.js learning assignment focused on implementing JWT authentication, protected routes, and role-based access control (RBAC).

> **Project Status:** Under Development

---

## Overview

The goal of this project is to build a secure IoT Device Management application where users can log in using JWT authentication and access features based on their assigned role.

The frontend is built with React and Tailwind CSS, while the backend uses Express.js to provide authentication services.

---

## Tech Stack

### Frontend

- React (Vite)
- Tailwind CSS
- React Router
- Axios

### Backend

- Node.js
- Express.js
- JSON Web Token (JWT)
- CORS
- Dotenv

---

## Project Structure

```text
RBAC/
├── client/        # React frontend
└── server/        # Express authentication server
```

---

## Planned Features

### Authentication

- JWT-based Login
- Protected Routes
- User Logout
- Token Verification
- Role-based Authentication

### Role-Based Access Control

#### Admin

- View Devices
- Add Devices
- Edit Devices
- Delete Devices

#### Operator

- View Devices Only

---

## Device Management

Each device will include:

- Device ID
- Device Name
- Device Type
- Status (Online / Offline)
- Location
- Created Timestamp
- Updated Timestamp

---

## Additional Features

- Search Devices
- Filter by Status
- Filter by Device Type
- Sorting
- Dashboard Statistics
- Form Validation
- Duplicate Device ID Prevention
- Local Storage Persistence
- Responsive UI

---

## Development Progress

### Completed

- Project planning
- Initial project structure
- Frontend and backend setup

### Currently Working On

- JWT Authentication
- Login API
- Protected Routes

### Upcoming

- Role-Based Access Control
- Device Management
- Dashboard
- Search & Filtering
- Local Storage Integration

---

## Learning Objectives

This project focuses on understanding:

- React Component Architecture
- JWT Authentication
- Protected Routes
- Role-Based Access Control
- State Management
- REST API Communication
- Clean Project Structure

---

## Notes

This repository is actively being developed. Features and documentation will continue to evolve as development progresses.