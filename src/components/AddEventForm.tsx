"use client";

import { useState } from "react";
import { AddEventFormData } from "@/types/forms";
import { API_BASE_URL } from "@/config/api";
import { EVENT_TYPES, EVENT_SEVERITIES } from "@/constants/crisis";

interface AddEventFormProps {
  crisisId: string;
  onSuccess: () => void;
  onError: (message: string) => void;
}

export default function AddEventForm({
  crisisId,
  onSuccess,
  onError,
}: AddEventFormProps) {
  const [formData, setFormData] = useState<AddEventFormData>({
    type: "DISPATCH",
    severity: "HIGH",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onError("");

    try {
      const res = await fetch(`${API_BASE_URL}/crises/${crisisId}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Add event failed");

      setFormData({ type: "DISPATCH", severity: "HIGH", description: "" });
      onSuccess();
    } catch (err: any) {
      onError(err?.message ?? "Failed to add event");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
      <h3 className="text-lg font-bold mb-4">Add Event</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block text-sm font-semibold mb-1">Event Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          >
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="block text-sm font-semibold mb-1">Severity</label>
          <select
            value={formData.severity}
            onChange={(e) =>
              setFormData({ ...formData, severity: e.target.value })
            }
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          >
            {EVENT_SEVERITIES.map((severity) => (
              <option key={severity} value={severity}>
                {severity}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="block text-sm font-semibold mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full border border-gray-300 rounded px-3 py-2 h-16 text-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded hover:from-green-700 hover:to-green-800 transition-all text-sm"
        >
          Add Event
        </button>
      </form>
    </div>
  );
}
