# Event Situation Tracker – Frontend

Modern, responsive frontend application for managing and tracking crisis events in real-time.

## Tech Stack
----------
- Next.js (App Router)
- React
- TypeScript
- Fetch API

## Features
--------
- **Crisis Management**: Create, view, update, and manage crisis situations
- **Event Tracking**: Add and monitor events associated with each crisis
- **Real-time Filtering**: Filter crises by status (ONGOING, OPEN, RESOLVED, etc.)
- **Priority System**: Visual priority indicators (CRITICAL, EMERGENCY, URGENT, ROUTINE)
- **Status Updates**: Update crisis status and priority in real-time
- **Responsive Design**: Modern UI with card-based layout and gradient buttons
- **Type-safe API**: Full TypeScript integration for safe API consumption

## Running Locally
---------------
Prerequisites:
- Node.js 18+
- Backend server running on port 8080

Step 1: Install dependencies
```bash
npm install
```

Step 2: Configure environment (optional)
```bash
# Create .env.local file to customize API URL
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Step 3: Start development server
```bash
npm run dev
```

Frontend will be available at:
http://localhost:3000

## Backend Dependency
------------------
This frontend expects the backend to be running at:
http://localhost:8080

The backend provides REST API endpoints for:
- Crisis management (GET, POST, PUT)
- Event tracking
- Status filtering

Make sure the backend is started before opening the frontend.

## Project Structure
-----------------
```
src/
  app/
    globals.css       # Global styles and Tailwind utilities
    layout.tsx        # Root layout with font configuration
    page.tsx          # Main crisis tracker page
  styles/             # Additional style modules
public/               # Static assets
```

## API Integration
---------------
The application integrates with the following backend endpoints:

- `GET /api/crises` - Fetch all crises
- `GET /api/crises/status/{status}` - Filter crises by status
- `GET /api/crises/{id}` - Get crisis details
- `POST /api/crises` - Create new crisis
- `PUT /api/crises/{id}` - Update crisis status/priority
- `GET /api/crises/{id}/events` - Get events for a crisis
- `POST /api/crises/{id}/events` - Add event to crisis

## UI Components
-------------
- **Crisis List**: Sidebar with filterable crisis cards
- **Crisis Form**: Modal form for creating new crises
- **Crisis Details**: Detailed view with status and priority controls
- **Event Form**: Add new events to selected crisis
- **Event Timeline**: Chronological list of crisis events

## Styling
-------
Custom utility classes and design tokens:
- `.container` - Centered responsive container
- `.card` - Elevated card with border and shadow
- `.btn` - Button base styles
- `.btn-primary` - Primary action button with gradient
- `.btn-success` - Success action button
- `.text-muted` - Muted text color

## Notes
-----

- The backend repository is separate and must be run independently

