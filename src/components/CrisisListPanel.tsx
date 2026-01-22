"use client";

import { useState, useEffect } from "react";
import { Crisis } from "@/types/crisis";
import { API_BASE_URL } from "@/config/api";
import StatusFilter from "./StatusFilter";
import CrisisListItem from "./CrisisListItem";

interface CrisisListPanelProps {
  selectedCrisisId: string | null;
  onCrisisSelect: (crisisId: string) => void;
  onError: (message: string) => void;
  refreshTrigger?: number;
}

export default function CrisisListPanel({
  selectedCrisisId,
  onCrisisSelect,
  onError,
  refreshTrigger,
}: CrisisListPanelProps) {
  const [crises, setCrises] = useState<Crisis[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("ONGOING");

  const fetchCrises = async (status?: string) => {
    try {
      setLoading(true);
      let url = `${API_BASE_URL}/crises`;
      if (status && status !== "ALL") {
        url = `${API_BASE_URL}/crises/status/${status}`;
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      setCrises(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("fetchCrises:", err);
      onError("Failed to load crises");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrises(filterStatus);
  }, [filterStatus, refreshTrigger]);

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 shadow-md overflow-y-auto max-h-screen">
      <h2 className="text-xl font-bold mb-4">Crisis List</h2>

      <StatusFilter
        currentStatus={filterStatus}
        onStatusChange={setFilterStatus}
      />

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : crises.length === 0 ? (
        <p className="text-gray-500">No crises found.</p>
      ) : (
        crises.map((crisis) => (
          <CrisisListItem
            key={crisis.id}
            crisis={crisis}
            isSelected={selectedCrisisId === crisis.id}
            onClick={() => onCrisisSelect(crisis.id)}
          />
        ))
      )}
    </div>
  );
}
