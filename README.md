# Horsearcher AI

A mobile-first horse training and progression platform built with React Native, Expo, NestJS, TypeScript, and PostgreSQL.

## Overview

Horsearcher AI helps users manage horse training programs, track progression, monitor performance history, and visualize growth through a gamified XP and leveling system.

## Features

### Authentication
- JWT-based authentication
- Secure login flow
- Protected routes and API access

### Dashboard
- User progress overview
- XP and Level tracking
- Training statistics
- Recent activity summary

### Training Plans
- Structured training management
- Progress tracking
- Training completion workflow

### History Tracking
- Historical training records
- Activity timeline
- Progress monitoring

### Profile Management
- User profile page
- Progress overview
- Account information

## Tech Stack

### Frontend
- React Native
- Expo
- Expo Router
- TypeScript

### Backend
- NestJS
- TypeScript
- REST API

### Database
- PostgreSQL

### Monorepo
- PNPM Workspace

## Project Structure

```text
horsearcher-ai/
├── apps/
│   ├── mobile/
│   └── backend/
├── docs/
├── package.json
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

## Architecture

```text
┌─────────────────┐
│  Mobile Client  │
│  React Native   │
│     Expo        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   NestJS API    │
│ Authentication  │
│ Business Logic  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   PostgreSQL    │
│    Database     │
└─────────────────┘
```

## Getting Started

### Install dependencies

```bash
pnpm install
```

### Run backend

```bash
pnpm dev
```

### Run mobile application

```bash
pnpm start
```

### Environment Variables

Create a `.env` file based on `.env.example`.

```env
DATABASE_URL=postgresql://username:password@localhost:5432/horsearcher
JWT_SECRET=your-secret-key
```

## Screenshots

### Dashboard
![Dashboard](docs/dashboard.jpeg)

### Training Plans
![Training Plans](docs/training-plans.jpeg)

### Profile
![Profile](docs/profile.jpeg)

## Key Highlights

- End-to-end mobile application development
- RESTful API architecture
- JWT Authentication
- Reusable component architecture
- Gamified XP and Level progression system
- PNPM monorepo architecture
- Mobile-first user experience

## Future Improvements

- AI-powered training recommendations
- Push notifications
- Analytics dashboard
- Performance prediction features
- Advanced reporting

## Author

**Fadhel Widya Rakhman**

GitHub: https://github.com/fadhelwr

## License

This project is licensed under the MIT License.