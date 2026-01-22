"use client";

import { useState } from "react";
import { CreateCrisisFormData } from "@/types/forms";
import { API_BASE_URL } from "@/config/api";
import {
  CRISIS_TYPES,
  CRISIS_PRIORITIES,
} from "@/constants/crisis";

interface CreateCrisisFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  onError: (message: string) => void;
}

export default function CreateCrisisForm({
  onSuccess,
  onCancel,
  onError,
}: CreateCrisisFormProps) {
  const [formData, setFormData] = useState<CreateCrisisFormData>({
    type: "MEDICAL",
    priority: "URGENT",
    title: "",
    location: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onError("");

    try {
      const res = await fetch(`${API_BASE_URL}/crises`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error(`Create failed: ${res.status}`);

      setFormData({
        type: "MEDICAL",
        priority: "URGENT",
        title: "",
        location: "",
        description: "",
      });
      onSuccess();
    } catch (err: any) {
      onError(err?.message ?? "Failed to create crisis");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h2 className="text-xl font-bold mb-4">Create New Crisis</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            {CRISIS_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Priority</label>
          <select
            value={formData.priority}
            onChange={(e) =>
              setFormData({ ...formData, priority: e.target.value })
            }
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            {CRISIS_PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full border border-gray-300 rounded px-3 py-2 h-20"
            required
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded hover:from-blue-700 hover:to-blue-800 transition-all"
          >
            Create Crisis
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
