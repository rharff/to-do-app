# Backend API Specification for Kanban App

## Quick Start

The frontend is **ready for API integration**. You just need to:

1. Install axios on frontend (run: `npm install axios`)
2. Build the backend API matching the specifications below
3. Set `USE_API = true` in `frontend/src/context/KanbanContext.tsx`

## Base URL

```
Development: http://localhost:3000/api
```

## Data Models

### Board
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "color": "string",
  "lastUpdated": "number (timestamp)",
  "isStarred": "boolean (optional)",
  "lastViewed": "number (timestamp, optional)"
}
```

### Column
```json
{
  "id": "string",
  "boardId": "string",
  "title": "string",
  "order": "number"
}
```

### Task
```json
{
  "id": "string",
  "columnId": "string",
  "title": "string",
  "description": "string (optional)",
  "priority": "low | medium | high",
  "dueDate": "string (ISO date, optional)"
}
```

## API Endpoints

### Boards

#### Get All Boards
```
GET /api/boards
Response: Board[]
```

#### Get Single Board
```
GET /api/boards/:id
Response: Board
```

#### Create Board
```
POST /api/boards
Body: {
  "title": "string",
  "description": "string",
  "color": "string"
}
Response: Board

Note: When a board is created, also create 3 default columns:
- "To Do" (order: 0)
- "In Progress" (order: 1)
- "Done" (order: 2)
```

#### Update Board
```
PATCH /api/boards/:id
Body: Partial<Board>
Response: Board
```

#### Delete Board
```
DELETE /api/boards/:id
Response: 204 No Content

Note: Should cascade delete all columns and tasks
```

#### Toggle Star
```
PATCH /api/boards/:id/star
Response: Board (with isStarred toggled)
```

#### Mark as Viewed
```
PATCH /api/boards/:id/view
Response: Board (with lastViewed updated to current timestamp)
```

### Columns

#### Get Columns for Board
```
GET /api/boards/:boardId/columns
Response: Column[] (sorted by order)
```

#### Get Single Column
```
GET /api/columns/:id
Response: Column
```

#### Create Column
```
POST /api/columns
Body: {
  "boardId": "string",
  "title": "string",
  "order": "number"
}
Response: Column
```

#### Update Column
```
PATCH /api/columns/:id
Body: Partial<Column>
Response: Column
```

#### Delete Column
```
DELETE /api/columns/:id
Response: 204 No Content

Note: Should cascade delete all tasks in the column
```

#### Reorder Columns
```
PATCH /api/boards/:boardId/columns/reorder
Body: {
  "columnOrders": [
    { "id": "string", "order": "number" },
    { "id": "string", "order": "number" }
  ]
}
Response: Column[]
```

### Tasks

#### Get All Tasks
```
GET /api/tasks
Response: Task[]
```

#### Get Tasks for Board
```
GET /api/boards/:boardId/tasks
Response: Task[]
```

#### Get Tasks for Column
```
GET /api/columns/:columnId/tasks
Response: Task[]
```

#### Get Single Task
```
GET /api/tasks/:id
Response: Task
```

#### Create Task
```
POST /api/tasks
Body: {
  "columnId": "string",
  "title": "string",
  "description": "string (optional)",
  "priority": "low | medium | high",
  "dueDate": "string (optional)"
}
Response: Task
```

#### Update Task
```
PATCH /api/tasks/:id
Body: Partial<Task>
Response: Task
```

#### Move Task
```
PATCH /api/tasks/:id/move
Body: {
  "columnId": "string"
}
Response: Task
```

#### Delete Task
```
DELETE /api/tasks/:id
Response: 204 No Content
```

## Database Schema (PostgreSQL)

### boards table
```sql
CREATE TABLE boards (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  color VARCHAR(50) NOT NULL,
  last_updated BIGINT NOT NULL,
  is_starred BOOLEAN DEFAULT false,
  last_viewed BIGINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### columns table
```sql
CREATE TABLE columns (
  id VARCHAR(255) PRIMARY KEY,
  board_id VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  "order" INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE CASCADE
);
```

### tasks table
```sql
CREATE TABLE tasks (
  id VARCHAR(255) PRIMARY KEY,
  column_id VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority VARCHAR(10) NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
  due_date VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (column_id) REFERENCES columns(id) ON DELETE CASCADE
);
```

## Express.js Implementation Example

### Setup
```javascript
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/boards', boardsRouter);
app.use('/api/columns', columnsRouter);
app.use('/api/tasks', tasksRouter);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

### CORS Configuration
```javascript
app.use(cors({
  origin: 'http://localhost:5173', // Vite dev server
  credentials: true
}));
```

## Error Handling

Return appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `204` - No Content (for deletes)
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

Error response format:
```json
{
  "error": "Error message here"
}
```

## Testing Checklist

- [ ] All endpoints return correct status codes
- [ ] Response data matches TypeScript interfaces
- [ ] CORS is properly configured
- [ ] Cascade deletes work (board → columns → tasks)
- [ ] Default columns are created with new boards
- [ ] Column reordering updates all affected columns
- [ ] Task moving updates columnId correctly
- [ ] Timestamps are handled correctly

## Frontend Integration Steps

1. **Install axios** (if not already done):
   ```bash
   cd frontend
   npm install axios
   ```

2. **Enable API mode**:
   ```typescript
   // frontend/src/context/KanbanContext.tsx
   const USE_API = true;
   ```

3. **Start backend**:
   ```bash
   cd backend
   npm start
   ```

4. **Start frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

## Notes

- The frontend uses optimistic updates in local mode
- When API mode is enabled, all operations are async
- The frontend expects JSON responses
- ID generation can be done backend-side (UUID recommended)
- Timestamps should be Unix timestamps (milliseconds)
