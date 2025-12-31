# Kanban To-Do Application

A modern, feature-rich Kanban board application with a React frontend ready for backend API integration.

## 🎯 Project Status

### ✅ Frontend - READY FOR API INTEGRATION

The frontend is **fully prepared** to connect with a backend API. All necessary infrastructure is in place:

- ✅ API service layer with all CRUD operations
- ✅ Axios HTTP client configured
- ✅ Loading and error state management
- ✅ Dual-mode architecture (local state + API mode)
- ✅ TypeScript types for all data models
- ✅ Vite proxy for development
- ✅ Environment configuration

### ⏳ Backend - NEEDS IMPLEMENTATION

The backend needs to be built according to the API specification.

## 🚀 Quick Start

### Option 1: Run Frontend Only (Local State Mode)

```bash
cd frontend
npm install
npm run dev
```

The app will run with local state - no backend needed!

### Option 2: Full Stack (When Backend is Ready)

1. **Install axios** (one-time setup):
   ```bash
   ./setup-api.sh
   ```
   Or manually:
   ```bash
   cd frontend
   npm install axios
   ```

2. **Enable API mode**:
   ```typescript
   // frontend/src/context/KanbanContext.tsx
   const USE_API = true;  // Change from false to true
   ```

3. **Start backend**:
   ```bash
   cd backend
   npm install
   npm start  # Should run on http://localhost:3000
   ```

4. **Start frontend**:
   ```bash
   cd frontend
   npm run dev  # Runs on http://localhost:5173
   ```

## 📚 Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Visual architecture diagram and data flow
- **[BACKEND_API_SPEC.md](./BACKEND_API_SPEC.md)** - Complete API specification for backend developers
- **[frontend/API_INTEGRATION.md](./frontend/API_INTEGRATION.md)** - Detailed frontend integration guide

## 🏗️ Project Structure

```
kanban-app/
├── frontend/                    # React + TypeScript + Vite
│   ├── src/
│   │   ├── config/
│   │   │   └── api.ts          # Axios configuration
│   │   ├── services/
│   │   │   └── api.ts          # API service layer
│   │   ├── hooks/
│   │   │   └── useApi.ts       # Custom API hooks
│   │   ├── context/
│   │   │   └── KanbanContext.tsx  # State management
│   │   ├── pages/              # Page components
│   │   ├── components/         # Reusable components
│   │   └── types/              # TypeScript types
│   ├── .env                    # Environment variables
│   └── vite.config.ts          # Vite + proxy config
│
└── backend/                     # Express + PostgreSQL (to be implemented)
    ├── routes/                 # API routes
    ├── controllers/            # Business logic
    ├── models/                 # Database models
    └── config/                 # Configuration
```

## 🔧 Technology Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS 4** - Styling
- **Axios** - HTTP client
- **React Router** - Navigation
- **@dnd-kit** - Drag and drop
- **Radix UI** - Accessible components

### Backend (Planned)
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables

## 📋 Features

### Implemented (Frontend)
- ✅ Multiple boards with color coding
- ✅ Drag-and-drop tasks between columns
- ✅ Task priorities (low, medium, high)
- ✅ Due dates with calendar picker
- ✅ Board starring and filtering
- ✅ Dashboard with task overview
- ✅ Calendar view of all tasks
- ✅ Responsive design
- ✅ Dark mode support
- ✅ API integration ready

### To Implement (Backend)
- ⏳ REST API endpoints
- ⏳ PostgreSQL database
- ⏳ Data persistence
- ⏳ Authentication (optional)
- ⏳ Real-time updates (optional)

## 🔌 API Integration

### Current Mode: Local State
```typescript
const USE_API = false;  // In KanbanContext.tsx
```

All data is stored in memory. Perfect for development and testing.

### Switching to API Mode
```typescript
const USE_API = true;  // In KanbanContext.tsx
```

All operations will use the backend API. Requires backend to be running.

## 🎨 Design Features

- Modern, premium UI design
- Smooth animations and transitions
- Glassmorphism effects
- Vibrant color palette
- Responsive layout
- Accessible components

## 📝 API Endpoints (Backend Specification)

### Boards
- `GET /api/boards` - Get all boards
- `POST /api/boards` - Create board
- `PATCH /api/boards/:id` - Update board
- `DELETE /api/boards/:id` - Delete board
- `PATCH /api/boards/:id/star` - Toggle star
- `PATCH /api/boards/:id/view` - Mark as viewed

### Columns
- `GET /api/boards/:boardId/columns` - Get columns
- `POST /api/columns` - Create column
- `PATCH /api/columns/:id` - Update column
- `DELETE /api/columns/:id` - Delete column
- `PATCH /api/boards/:boardId/columns/reorder` - Reorder

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/boards/:boardId/tasks` - Get board tasks
- `POST /api/tasks` - Create task
- `PATCH /api/tasks/:id` - Update task
- `PATCH /api/tasks/:id/move` - Move task
- `DELETE /api/tasks/:id` - Delete task

See [BACKEND_API_SPEC.md](./BACKEND_API_SPEC.md) for complete details.

## 🛠️ Development

### Frontend Development
```bash
cd frontend
npm install
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Environment Variables
```bash
# frontend/.env
VITE_API_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000
```

## 🧪 Testing the Integration

1. Build the backend following `BACKEND_API_SPEC.md`
2. Start the backend server
3. Enable API mode in frontend
4. Test all CRUD operations:
   - Create/update/delete boards
   - Create/update/delete columns
   - Create/update/delete tasks
   - Drag and drop tasks
   - Star boards
   - Filter by date

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL (for backend)

### Setup
```bash
# Clone repository
git clone <repository-url>
cd kanban-app

# Install frontend dependencies
cd frontend
npm install

# Install axios for API integration
npm install axios

# Start frontend
npm run dev
```

## 🤝 For Backend Developers

Everything you need to build the backend is documented in:

1. **[BACKEND_API_SPEC.md](./BACKEND_API_SPEC.md)** - Complete API specification
   - All endpoints with request/response formats
   - Database schema
   - Express.js setup example
   - Testing checklist

2. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture
   - Visual diagrams
   - Data flow
   - Integration points

The frontend is **ready to connect** - just build the API to match the spec!

## 📄 License

MIT

## 👥 Contributing

Contributions are welcome! Please read the documentation before submitting PRs.

---

**Note**: The frontend is fully functional in local state mode. Backend integration is optional but recommended for production use.
