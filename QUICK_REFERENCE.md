# 🚀 Quick Reference - Frontend API Integration

## ⚡ One-Time Setup

```bash
# Install axios
cd frontend
npm install axios
```

## 🔄 Switch to API Mode

**File**: `frontend/src/context/KanbanContext.tsx`

```typescript
// Line 7: Change this flag
const USE_API = true;  // Was: false
```

## 🎯 What's Ready

✅ **API Service Layer** - `frontend/src/services/api.ts`
- All CRUD operations for boards, columns, tasks
- Type-safe API calls
- Clean, organized code

✅ **Axios Client** - `frontend/src/config/api.ts`
- Configured with base URL
- Request/response interceptors
- Auth token support

✅ **State Management** - `frontend/src/context/KanbanContext.tsx`
- Dual-mode support (local + API)
- Loading & error states
- Async operations

✅ **Development Proxy** - `frontend/vite.config.ts`
- `/api` → `http://localhost:3000`
- No CORS issues

✅ **Environment Config** - `frontend/.env`
```env
VITE_API_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000
```

## 📡 Backend Requirements

The backend must implement these endpoints:

### Boards
```
GET    /api/boards
GET    /api/boards/:id
POST   /api/boards
PATCH  /api/boards/:id
DELETE /api/boards/:id
PATCH  /api/boards/:id/star
PATCH  /api/boards/:id/view
```

### Columns
```
GET    /api/boards/:boardId/columns
GET    /api/columns/:id
POST   /api/columns
PATCH  /api/columns/:id
DELETE /api/columns/:id
PATCH  /api/boards/:boardId/columns/reorder
```

### Tasks
```
GET    /api/tasks
GET    /api/boards/:boardId/tasks
GET    /api/columns/:columnId/tasks
GET    /api/tasks/:id
POST   /api/tasks
PATCH  /api/tasks/:id
PATCH  /api/tasks/:id/move
DELETE /api/tasks/:id
```

## 🗄️ Database Schema

```sql
-- boards
id, title, description, color, last_updated, is_starred, last_viewed

-- columns
id, board_id, title, order

-- tasks
id, column_id, title, description, priority, due_date
```

## 🧪 Testing

1. Start backend: `cd backend && npm start`
2. Start frontend: `cd frontend && npm run dev`
3. Test operations in the UI

## 📚 Full Documentation

- **ARCHITECTURE.md** - System design & diagrams
- **BACKEND_API_SPEC.md** - Complete API specification
- **frontend/API_INTEGRATION.md** - Integration guide

## 🆘 Troubleshooting

**Axios not found?**
```bash
cd frontend && npm install axios
```

**CORS errors?**
- Check backend CORS config
- Verify Vite proxy in `vite.config.ts`

**API not responding?**
- Ensure backend is running on port 3000
- Check `VITE_API_URL` in `.env`

## 💡 Pro Tips

1. **Test in local mode first** - Set `USE_API = false`
2. **Use Postman** - Test backend endpoints before frontend
3. **Check browser console** - See API errors and requests
4. **Monitor network tab** - Verify request/response data
5. **Read the logs** - Backend errors logged to console

---

**Ready to connect!** 🎉
