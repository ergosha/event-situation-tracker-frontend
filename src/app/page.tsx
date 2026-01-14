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

type CreateEventRequest = {
  type: string;
  severity: string;
  location: string;
  description: string;
};

type SituationState = {
  statusByLocation: {
    [location: string]: string;
  };
};


function App() {
  const [events, setEvents] = useState<Event[]>([]);

  const [error, setError] = useState<string | null>(null);

  const [situation, setSituation] = useState<SituationState | null>(null);

  const [form, setForm] = useState<CreateEventRequest>({
    type: "ALERT",
    severity: "LOW",
    location: "",
    description: "",
  });

  const fetchSituation = () => {
  fetch("http://localhost:8080/api/events/situation")
    .then((res) => res.json())
    .then((data) => setSituation(data))
    .catch((err) => console.error(err));
};

  const fetchEvents = () => {
    fetch("http://localhost:8080/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchEvents();
    fetchSituation();
  }, []);

  
/*  useEffect(() => {
    fetch("http://localhost:8080/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error(err));
  }, []); */
  
  const createEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const response = await fetch("http://localhost:8080/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      setError("Failed to create event");
      return;
    }

  setForm({
      type: "ALERT",
      severity: "LOW",
      location: "",
      description: "",
    });

    fetchEvents();
    fetchSituation();
  };
  
  return (
    <div style={{ padding: "2rem", maxWidth: "600px" }}>
      <h1>Event Situation Tracker</h1>

      <h2>Create Event</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={createEvent} style={{ marginBottom: "2rem" }}>
        <div>
          <label>Type:</label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="ALERT">ALERT</option>
            <option value="UPDATE">UPDATE</option>
            <option value="RESOLVE">RESOLVE</option>
          </select>
        </div>

        <div>
          <label>Severity:</label>
          <select
            value={form.severity}
            onChange={(e) => setForm({ ...form, severity: e.target.value })}
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>

        <div>
          <label>Location:</label>
          <input
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <input
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            required
          />
        </div>

        <button type="submit">Create</button>
      </form>

      <h2>Events</h2>

      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.type}</strong> – {event.location} (
            {event.severity}): {event.description}, {new Date(event.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>

      <h2>Situation State</h2>

      {!situation && <p>Loading situation...</p>}

      {situation && (
        <ul>
          {Object.entries(situation.statusByLocation).map(
            ([location, status]) => (
              <li key={location}>
                <strong>{location}</strong>:{" "}
                <span
                  style={{
                    color:
                      status === "OPEN"
                        ? "red"
                        : status === "ACKNOWLEDGED"
                          ? "orange"
                          : "green",
                  }}
                >
                  {status}
                </span>
              </li>
            )
          )}
        </ul>
      )}

    </div>
  );
}

export default App;



