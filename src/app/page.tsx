"use client";

import { useState } from "react";
import { Crisis } from "@/types/crisis";
import { API_BASE_URL } from "@/config/api";
import ErrorDisplay from "@/components/ErrorDisplay";
import CrisisListPanel from "@/components/CrisisListPanel";
import CreateCrisisForm from "@/components/CreateCrisisForm";
import CrisisDetailView from "@/components/CrisisDetailView";

export default function Page() {
  const [selectedCrisis, setSelectedCrisis] = useState<Crisis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCrisisSelect = async (crisisId: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/crises/${crisisId}`);
      if (!res.ok) throw new Error("Failed to fetch crisis");
      const crisis = await res.json();
      setSelectedCrisis(crisis);
    } catch (err) {
      console.error("handleCrisisSelect:", err);
      setError("Failed to load crisis details");
    }
  };

  const handleUpdateStatus = async (crisisId: string, newStatus: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/crises/${crisisId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();
      setSelectedCrisis(updated);
      setRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      console.error("Update status:", err);
      setError("Failed to update status");
    }
  };

  const handleUpdatePriority = async (
    crisisId: string,
    newPriority: string
  ) => {
    try {
      const res = await fetch(`${API_BASE_URL}/crises/${crisisId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priority: newPriority }),
      });

      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();
      setSelectedCrisis(updated);
      setRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      console.error("Update priority:", err);
      setError("Failed to update priority");
    }
  };

  const handleCreateSuccess = () => {
    setShowCreateForm(false);
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Crisis Tracker</h1>
            <p className="text-gray-600 text-sm mt-1">
              Manage crises and events in real-time
            </p>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded hover:from-blue-700 hover:to-blue-800 transition-all"
          >
            {showCreateForm ? "Cancel" : "➕ New Crisis"}
          </button>
        </header>

        <ErrorDisplay error={error} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Crisis List */}
          <div className="lg:col-span-1">
            <CrisisListPanel
              selectedCrisisId={selectedCrisis?.id ?? null}
              onCrisisSelect={handleCrisisSelect}
              onError={setError}
              refreshTrigger={refreshTrigger}
            />
          </div>

          {/* Right: Create Form or Crisis Detail */}
          <div className="lg:col-span-2">
            {showCreateForm ? (
              <CreateCrisisForm
                onSuccess={handleCreateSuccess}
                onCancel={() => setShowCreateForm(false)}
                onError={setError}
              />
            ) : selectedCrisis ? (
              <CrisisDetailView
                crisis={selectedCrisis}
                onUpdate={() => setRefreshTrigger((prev) => prev + 1)}
                onError={setError}
                onStatusChange={handleUpdateStatus}
                onPriorityChange={handleUpdatePriority}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 flex items-center justify-center h-96">
                <p className="text-gray-500">Select a crisis from the list</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}