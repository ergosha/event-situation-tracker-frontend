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

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case "HIGH":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "OPEN":
        return "text-red-600 dark:text-red-400 font-semibold";
      case "ACKNOWLEDGED":
        return "text-yellow-600 dark:text-yellow-400 font-semibold";
      default:
        return "text-green-600 dark:text-green-400 font-semibold";
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-2">
            📊 Event Tracker
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Monitor and manage situational events
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Create Event Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-6 mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                <span className="text-2xl mr-2">➕</span>
                Create Event
              </h2>

              {error && (
                <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-red-700 dark:text-red-200">
                  {error}
                </div>
              )}

              <form onSubmit={createEvent} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Event Type
                    </label>
                    <select
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    >
                      <option value="ALERT">ALERT</option>
                      <option value="UPDATE">UPDATE</option>
                      <option value="RESOLVE">RESOLVE</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Severity
                    </label>
                    <select
                      value={form.severity}
                      onChange={(e) => setForm({ ...form, severity: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    >
                      <option value="LOW">LOW</option>
                      <option value="MEDIUM">MEDIUM</option>
                      <option value="HIGH">HIGH</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="Enter location"
                    required
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Enter event description"
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105"
                >
                  Create Event
                </button>
              </form>
            </div>

            {/* Events List */}
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                <span className="text-2xl mr-2">📝</span>
                Recent Events
              </h2>

              {events.length === 0 ? (
                <p className="text-slate-500 dark:text-slate-400 text-center py-8">
                  No events yet. Create one to get started!
                </p>
              ) : (
                <div className="space-y-3">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:shadow-md transition bg-slate-50 dark:bg-slate-800"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-blue-600 dark:text-blue-400">
                            {event.type}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getSeverityColor(
                              event.severity
                            )}`}
                          >
                            {event.severity}
                          </span>
                        </div>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {new Date(event.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-slate-700 dark:text-slate-300 mb-1">
                        <span className="font-semibold">Location:</span> {event.location}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {event.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Situation State Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                <span className="text-2xl mr-2">🏁</span>
                Status
              </h2>

              {!situation ? (
                <div className="text-center py-8">
                  <div className="animate-spin inline-block w-8 h-8 border-4 border-slate-300 border-t-blue-600 rounded-full"></div>
                  <p className="mt-2 text-slate-500 dark:text-slate-400">Loading...</p>
                </div>
              ) : Object.entries(situation.statusByLocation).length === 0 ? (
                <p className="text-slate-500 dark:text-slate-400 text-center py-4">
                  No locations yet
                </p>
              ) : (
                <div className="space-y-3">
                  {Object.entries(situation.statusByLocation).map(([location, status]) => (
                    <div
                      key={location}
                      className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                    >
                      <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                        {location}
                      </p>
                      <p className={`text-sm ${getStatusColor(status)}`}>
                        {status}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;



