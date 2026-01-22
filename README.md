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
    page.tsx          # Main page - orchestration logic only
  components/         # Reusable React components
    AddEventForm.tsx
    CreateCrisisForm.tsx
    CrisisDetailView.tsx
    CrisisDetailsCard.tsx
    CrisisListItem.tsx
    CrisisListPanel.tsx
    CrisisUpdateControls.tsx
    ErrorDisplay.tsx
    EventItem.tsx
    EventsList.tsx
    StatusFilter.tsx
  config/
    api.ts            # API base URL configuration
  constants/
    crisis.ts         # Crisis types, statuses, priorities, event types
  types/
    crisis.ts         # Crisis and CrisisEvent type definitions
    forms.ts          # Form data interfaces
  utils/
    styleHelpers.ts   # Reusable styling functions
  styles/             # Additional style modules
public/               # Static assets
```

### Architecture
The application follows a modular component architecture:
- **12 focused components** with single responsibilities
- **Centralized types** for type safety across the app
- **Utility functions** for reusable logic (styling, API config)
- **Separation of concerns** - UI components, business logic, and types are isolated

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

## Component Overview
------------------

### Layout Components
- **CrisisListPanel**: Left sidebar with status filtering and crisis list
- **CrisisDetailView**: Right panel orchestrating crisis details and events
- **ErrorDisplay**: Global error message banner

### Crisis Components
- **CrisisListItem**: Individual crisis card with priority-based styling
- **CrisisDetailsCard**: Full crisis information display
- **CrisisUpdateControls**: Status and priority update selectors
- **CreateCrisisForm**: Form for creating new crisis entries

### Event Components
- **AddEventForm**: Form for adding events to a crisis
- **EventsList**: Container for event timeline
- **EventItem**: Individual event card with severity badges

### UI Components
- **StatusFilter**: Filter buttons for crisis status
