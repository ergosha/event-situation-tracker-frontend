"use client";

import { useEffect, useState } from "react";

type Event = {
  id: string;
  type: string;
  severity: string;
  location: string;
  description: string;
  timestamp: string;
};

function App() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Event Situation Tracker</h1>

      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.type}</strong> – {event.location} ({event.severity})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;



