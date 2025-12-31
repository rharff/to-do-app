# Frontend Architecture for API Integration

## Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND (React)                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              React Components                        │   │
│  │  (BoardPage, DashboardPage, TaskCard, etc.)         │   │
│  └───────────────────┬─────────────────────────────────┘   │
│                      │                                       │
│                      │ useKanban()                          │
│                      ▼                                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           KanbanContext (State Manager)             │   │
│  │                                                       │   │
│  │  ┌──────────────┐         ┌──────────────┐         │   │
│  │  │ Local State  │◄────────┤  USE_API     │         │   │
│  │  │    Mode      │         │   Toggle     │         │   │
│  │  └──────────────┘         └──────┬───────┘         │   │
│  │                                   │                  │   │
│  │                                   ▼                  │   │
│  │                          ┌──────────────┐           │   │
│  │                          │   API Mode   │           │   │
│  │                          └──────┬───────┘           │   │
│  └─────────────────────────────────┼───────────────────┘   │
│                                     │                       │
│                                     ▼                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              API Service Layer                       │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐          │   │
│  │  │ Boards   │  │ Columns  │  │  Tasks   │          │   │
│  │  │   API    │  │   API    │  │   API    │          │   │
│  │  └────┬─────┘  └────┬─────┘  └────┬─────┘          │   │
│  └───────┼─────────────┼─────────────┼────────────────┘   │
│          │             │             │                     │
│          └─────────────┼─────────────┘                     │
│                        │                                   │
│                        ▼                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           Axios HTTP Client                          │   │
│  │  • Request Interceptors (Auth)                       │   │
│  │  • Response Interceptors (Error Handling)            │   │
│  │  • Base URL Configuration                            │   │
│  └───────────────────┬─────────────────────────────────┘   │
│                      │                                     │
└──────────────────────┼─────────────────────────────────────┘
                       │
                       │ HTTP Requests
                       │
┌──────────────────────▼─────────────────────────────────────┐
│                  Vite Dev Proxy                             │
│              /api → http://localhost:3000                   │
└──────────────────────┬─────────────────────────────────────┘
                       │
                       │
┌──────────────────────▼─────────────────────────────────────┐
│                   BACKEND (Express)                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                 API Routes                           │   │
│  │  • /api/boards                                       │   │
│  │  • /api/columns                                      │   │
│  │  • /api/tasks                                        │   │
│  └───────────────────┬─────────────────────────────────┘   │
│                      │                                       │
│                      ▼                                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Controllers                             │   │
│  │  (Business Logic)                                    │   │
│  └───────────────────┬─────────────────────────────────┘   │
│                      │                                       │
│                      ▼                                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │               Database Layer                         │   │
│  │  (PostgreSQL Queries)                                │   │
│  └───────────────────┬─────────────────────────────────┘   │
│                      │                                       │
└──────────────────────┼─────────────────────────────────────┘
                       │
                       ▼
              ┌────────────────┐
              │   PostgreSQL   │
              │    Database    │
              └────────────────┘
```

## Data Flow

### 1. Local State Mode (USE_API = false)
```
Component → useKanban() → KanbanContext → Local State → Component
```

### 2. API Mode (USE_API = true)
```
Component → useKanban() → KanbanContext → API Service → Axios → Backend → Database
                                                                      ↓
Component ← useKanban() ← KanbanContext ← API Service ← Axios ← Backend ← Database
```

## File Structure

```
frontend/
├── src/
│   ├── config/
│   │   └── api.ts                 # Axios configuration
│   ├── services/
│   │   └── api.ts                 # API service layer
│   ├── hooks/
│   │   └── useApi.ts              # Custom API hooks
│   ├── context/
│   │   └── KanbanContext.tsx      # State management
│   ├── pages/
│   │   ├── board/
│   │   ├── dashboard/
│   │   └── all-tasks/
│   └── components/
├── .env                           # Environment variables
├── .env.example                   # Environment template
└── vite.config.ts                 # Vite + Proxy config

backend/
├── routes/
│   ├── boards.js
│   ├── columns.js
│   └── tasks.js
├── controllers/
│   ├── boardsController.js
│   ├── columnsController.js
│   └── tasksController.js
├── models/
│   ├── Board.js
│   ├── Column.js
│   └── Task.js
├── config/
│   └── database.js
└── index.js                       # Express server
```

## Key Features

### ✅ Dual-Mode Architecture
- **Development**: Use local state without backend
- **Production**: Connect to real API
- **Toggle**: Single flag to switch modes

### ✅ Type Safety
- TypeScript interfaces for all data models
- Type-safe API calls
- Compile-time error checking

### ✅ Error Handling
- Global error state
- Request/response interceptors
- User-friendly error messages

### ✅ Loading States
- Global loading indicator
- Per-operation loading states
- Optimistic updates support

### ✅ Authentication Ready
- JWT token support
- Automatic token injection
- Token storage in localStorage

### ✅ Development Tools
- Vite proxy for CORS-free development
- Environment variable configuration
- Hot module replacement

## Integration Checklist

### Frontend Setup
- [x] Install axios
- [x] Configure axios client
- [x] Create API service layer
- [x] Update KanbanContext
- [x] Add loading/error states
- [x] Configure Vite proxy
- [x] Add environment variables
- [x] Create documentation

### Backend Setup (To Do)
- [ ] Create Express server
- [ ] Set up PostgreSQL database
- [ ] Create database schema
- [ ] Implement API routes
- [ ] Add CORS middleware
- [ ] Add error handling
- [ ] Test all endpoints
- [ ] Deploy backend

### Testing
- [ ] Test local state mode
- [ ] Test API mode
- [ ] Test error scenarios
- [ ] Test loading states
- [ ] Test CRUD operations
- [ ] Test cascade deletes
- [ ] Test column reordering
- [ ] Test task moving

## Environment Configuration

### Development
```env
VITE_API_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000
```

### Production
```env
VITE_API_URL=https://api.yourdomain.com/api
VITE_API_TIMEOUT=10000
```

## Next Steps

1. **Install axios**: Run `npm install axios` in frontend
2. **Build backend**: Follow `BACKEND_API_SPEC.md`
3. **Enable API mode**: Set `USE_API = true`
4. **Test integration**: Verify all operations work
5. **Deploy**: Deploy both frontend and backend
