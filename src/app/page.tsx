"use client";

import { useEffect, useState } from "react";

const API = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080") + "/api";

type Crisis = {
  id: string;
  type: string;
  status: string;
  priority: string;
  title: string;
  description: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt: string | null;
  closedAt: string | null;
  latitude: number | null;
  longitude: number | null;
  eventCount: number;
};

type CrisisEvent = {
  id: string;
  type: string;
  severity: string | null;
  timestamp: string;
  description: string;
};

export default function Page() {
  const [crises, setCrises] = useState<Crisis[]>([]);
  const [selectedCrisis, setSelectedCrisis] = useState<Crisis | null>(null);
  const [events, setEvents] = useState<CrisisEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Filter & Form states
  const [filterStatus, setFilterStatus] = useState("ONGOING");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createForm, setCreateForm] = useState({
    type: "MEDICAL",
    priority: "URGENT",
    title: "",
    location: "",
    description: "",
  });

  const [eventForm, setEventForm] = useState({
    type: "DISPATCH",
    severity: "HIGH",
    description: "",
  });

  // Load crises
  const fetchCrises = async (status?: string) => {
    try {
      setLoading(true);
      let url = `${API}/crises`;
      if (status && status !== "ALL") {
        url = `${API}/crises/status/${status}`;
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      setCrises(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("fetchCrises:", err);
      setError("Failed to load crises");
    } finally {
      setLoading(false);
    }
  };

  // Load crisis details & events
  const fetchCrisisDetail = async (crisisId: string) => {
    try {
      const [crisisRes, eventsRes] = await Promise.all([
        fetch(`${API}/crises/${crisisId}`),
        fetch(`${API}/crises/${crisisId}/events`),
      ]);

      if (!crisisRes.ok || !eventsRes.ok) throw new Error("Failed to fetch");

      const crisis = await crisisRes.json();
      const eventsResponse = await eventsRes.json();

      setSelectedCrisis(crisis);
      
      // API returns array of events directly
      if (Array.isArray(eventsResponse)) {
        setEvents(eventsResponse);
      } else {
        setEvents([]);
      }
    } catch (err) {
      console.error("fetchCrisisDetail:", err);
      setError("Failed to load crisis details");
    }
  };

  // Create crisis
  const handleCreateCrisis = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`${API}/crises`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createForm),
      });

      if (!res.ok) throw new Error(`Create failed: ${res.status}`);

      setCreateForm({
        type: "MEDICAL",
        priority: "URGENT",
        title: "",
        location: "",
        description: "",
      });
      setShowCreateForm(false);
      await fetchCrises(filterStatus);
    } catch (err: any) {
      setError(err?.message ?? "Failed to create crisis");
    }
  };

  // Update crisis status
  const handleUpdateStatus = async (crisisId: string, newStatus: string) => {
    try {
      const res = await fetch(`${API}/crises/${crisisId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();
      setSelectedCrisis(updated);
      await fetchCrises(filterStatus);
    } catch (err) {
      console.error("Update status:", err);
      setError("Failed to update status");
    }
  };

  // Update crisis priority
  const handleUpdatePriority = async (crisisId: string, newPriority: string) => {
    try {
      const res = await fetch(`${API}/crises/${crisisId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priority: newPriority }),
      });

      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();
      setSelectedCrisis(updated);
      await fetchCrises(filterStatus);
    } catch (err) {
      console.error("Update priority:", err);
      setError("Failed to update priority");
    }
  };

  // Add event to crisis
  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCrisis) return;
    setError(null);

    try {
      const res = await fetch(`${API}/crises/${selectedCrisis.id}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventForm),
      });

      if (!res.ok) throw new Error("Add event failed");

      setEventForm({ type: "DISPATCH", severity: "HIGH", description: "" });
      await fetchCrisisDetail(selectedCrisis.id);
    } catch (err: any) {
      setError(err?.message ?? "Failed to add event");
    }
  };

  // Initial load
  useEffect(() => {
    fetchCrises(filterStatus);
  }, [filterStatus]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "CRITICAL":
        return "bg-red-100 border-red-300 text-red-900";
      case "EMERGENCY":
        return "bg-orange-100 border-orange-300 text-orange-900";
      case "URGENT":
        return "bg-yellow-100 border-yellow-300 text-yellow-900";
      default:
        return "bg-blue-100 border-blue-300 text-blue-900";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPEN":
        return "bg-red-100 text-red-800";
      case "ONGOING":
        return "bg-yellow-100 text-yellow-800";
      case "RESOLVED":
        return "bg-green-100 text-green-800";
      case "CLOSED":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-50 text-gray-800";
    }
  };

  const getSeverityColor = (severity: string | null) => {
    if (!severity) return "bg-gray-100 text-gray-700";
    switch (severity) {
      case "CRITICAL":
        return "bg-red-100 text-red-700";
      case "HIGH":
        return "bg-orange-100 text-orange-700";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-green-100 text-green-700";
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container">
        {/* Header */}
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">🚨 Crisis Tracker</h1>
            <p className="text-muted text-sm mt-1">Manage crises and events in real-time</p>
          </div>
          <button onClick={() => setShowCreateForm(!showCreateForm)} className="btn btn-primary">
            {showCreateForm ? "Cancel" : "➕ New Crisis"}
          </button>
        </header>

        {/* Error message */}
        {error && <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">{error}</div>}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Crisis List */}
          <div className="lg:col-span-1">
            <div className="card card-sm">
              <h2 className="font-semibold mb-3">Crises</h2>

              {/* Filter buttons */}
              <div className="flex gap-2 mb-4 flex-wrap">
                {["ONGOING", "OPEN", "RESOLVED", "ALL"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-3 py-1 text-xs rounded ${
                      filterStatus === status
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              {/* Crisis list */}
              {loading ? (
                <p className="text-sm text-gray-500">Loading...</p>
              ) : crises.length === 0 ? (
                <p className="text-sm text-gray-500">No crises</p>
              ) : (
                <ul className="space-y-2">
                  {crises.map((crisis) => (
                    <li
                      key={crisis.id}
                      onClick={() => fetchCrisisDetail(crisis.id)}
                      className={`p-3 rounded cursor-pointer text-sm border-l-4 ${getPriorityColor(
                        crisis.priority
                      )} ${
                        selectedCrisis?.id === crisis.id ? "ring-2 ring-blue-500" : ""
                      }`}
                    >
                      <div className="font-semibold truncate">{crisis.title}</div>
                      <div className="text-xs opacity-75">{crisis.location}</div>
                      <div className="text-xs mt-1">
                        <span className={`px-2 py-0.5 rounded inline-block ${getStatusColor(crisis.status)}`}>
                          {crisis.status}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Middle/Right: Create Form or Crisis Detail */}
          {showCreateForm ? (
            <div className="lg:col-span-2">
              <div className="card p-6">
                <h2 className="text-2xl font-bold mb-4">Create Crisis</h2>
                <form onSubmit={handleCreateCrisis} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium">Type</label>
                      <select
                        value={createForm.type}
                        onChange={(e) => setCreateForm({ ...createForm, type: e.target.value })}
                        className="mt-1 block w-full p-2 border rounded"
                      >
                        {["FIRE", "MEDICAL", "TRAFFIC", "HAZMAT", "NATURAL_DISASTER", "SECURITY", "OTHER"].map(
                          (t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium">Priority</label>
                      <select
                        value={createForm.priority}
                        onChange={(e) => setCreateForm({ ...createForm, priority: e.target.value })}
                        className="mt-1 block w-full p-2 border rounded"
                      >
                        {["ROUTINE", "URGENT", "EMERGENCY", "CRITICAL"].map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                      value={createForm.title}
                      onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })}
                      required
                      className="mt-1 block w-full p-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Location</label>
                    <input
                      value={createForm.location}
                      onChange={(e) => setCreateForm({ ...createForm, location: e.target.value })}
                      required
                      className="mt-1 block w-full p-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                      value={createForm.description}
                      onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                      rows={3}
                      className="mt-1 block w-full p-2 border rounded"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-full">
                    Create Crisis
                  </button>
                </form>
              </div>
            </div>
          ) : selectedCrisis ? (
            <div className="lg:col-span-2 space-y-6">
              {/* Crisis Details */}
              <div className="card p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedCrisis.title}</h2>
                    <p className="text-gray-600 text-sm">📍 {selectedCrisis.location}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded font-medium ${getStatusColor(selectedCrisis.status)}`}>
                      {selectedCrisis.status}
                    </span>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{selectedCrisis.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div>
                    <p className="text-gray-600">Type</p>
                    <p className="font-semibold">{selectedCrisis.type}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Priority</p>
                    <p className="font-semibold">{selectedCrisis.priority}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Created</p>
                    <p className="text-xs">{new Date(selectedCrisis.createdAt).toLocaleString()}</p>
                  </div>
                  {selectedCrisis.resolvedAt && (
                    <div>
                      <p className="text-gray-600">Resolved</p>
                      <p className="text-xs">{new Date(selectedCrisis.resolvedAt).toLocaleString()}</p>
                    </div>
                  )}
                </div>

                {/* Update Controls */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Update Status</label>
                    <select
                      value={selectedCrisis.status}
                      onChange={(e) => handleUpdateStatus(selectedCrisis.id, e.target.value)}
                      className="w-full p-2 border rounded text-sm"
                    >
                      {["OPEN", "ONGOING", "RESOLVED", "CLOSED", "ARCHIVED"].map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Update Priority</label>
                    <select
                      value={selectedCrisis.priority}
                      onChange={(e) => handleUpdatePriority(selectedCrisis.id, e.target.value)}
                      className="w-full p-2 border rounded text-sm"
                    >
                      {["ROUTINE", "URGENT", "EMERGENCY", "CRITICAL"].map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Add Event Form */}
              <div className="card p-6">
                <h3 className="font-semibold mb-4">Add Event</h3>
                <form onSubmit={handleAddEvent} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium">Event Type</label>
                      <select
                        value={eventForm.type}
                        onChange={(e) => setEventForm({ ...eventForm, type: e.target.value })}
                        className="mt-1 block w-full p-2 border rounded text-sm"
                      >
                        {[
                          "DISPATCH",
                          "ARRIVED",
                          "TREATING",
                          "PATIENT_TRANSPORTED",
                          "DELIVERED",
                          "INCIDENT_CLOSED",
                          "RESOURCE_REQUEST",
                          "STATUS_UPDATE",
                          "ESCALATION",
                          "DEESCALATION",
                        ].map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium">Severity</label>
                      <select
                        value={eventForm.severity}
                        onChange={(e) => setEventForm({ ...eventForm, severity: e.target.value })}
                        className="mt-1 block w-full p-2 border rounded text-sm"
                      >
                        {["LOW", "MEDIUM", "HIGH", "CRITICAL"].map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <input
                      value={eventForm.description}
                      onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                      required
                      className="mt-1 block w-full p-2 border rounded text-sm"
                    />
                  </div>

                  <button type="submit" className="btn btn-success w-full">
                    Add Event
                  </button>
                </form>
              </div>

              {/* Events List */}
              <div className="card p-6">
                <h3 className="font-semibold mb-4">Events ({events.length})</h3>
                {events.length === 0 ? (
                  <p className="text-sm text-gray-500">No events yet</p>
                ) : (
                  <ul className="space-y-2">
                    {events.map((ev) => (
                      <li key={ev.id} className="p-3 border rounded text-sm">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-semibold">{ev.type}</span>
                          {ev.severity && <span className={`px-2 py-0.5 rounded text-xs ${getSeverityColor(ev.severity)}`}>{ev.severity}</span>}
                        </div>
                        <p className="text-gray-700">{ev.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{new Date(ev.timestamp).toLocaleString()}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ) : (
            <div className="lg:col-span-2 bg-white rounded shadow p-6 flex items-center justify-center h-96">
              <p className="text-gray-500">Valitse kriisi listasta</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}