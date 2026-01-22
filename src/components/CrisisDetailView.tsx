"use client";

import { useState, useEffect } from "react";
import { Crisis, CrisisEvent } from "@/types/crisis";
import { API_BASE_URL } from "@/config/api";
import CrisisDetailsCard from "./CrisisDetailsCard";
import AddEventForm from "./AddEventForm";
import EventsList from "./EventsList";

interface CrisisDetailViewProps {
  crisis: Crisis;
  onUpdate: () => void;
  onError: (message: string) => void;
  onStatusChange: (crisisId: string, status: string) => void;
  onPriorityChange: (crisisId: string, priority: string) => void;
}

export default function CrisisDetailView({
  crisis,
  onUpdate,
  onError,
  onStatusChange,
  onPriorityChange,
}: CrisisDetailViewProps) {
  const [events, setEvents] = useState<CrisisEvent[]>([]);

  const fetchCrisisDetail = async (crisisId: string) => {
    try {
      const eventsRes = await fetch(`${API_BASE_URL}/crises/${crisisId}/events`);

      if (!eventsRes.ok) throw new Error("Failed to fetch events");

      const eventsResponse = await eventsRes.json();

      if (Array.isArray(eventsResponse)) {
        setEvents(eventsResponse);
      } else {
        setEvents([]);
      }
    } catch (err) {
      console.error("fetchCrisisDetail:", err);
      onError("Failed to load crisis details");
    }
  };

  useEffect(() => {
    fetchCrisisDetail(crisis.id);
  }, [crisis.id]);

  const handleEventSuccess = () => {
    fetchCrisisDetail(crisis.id);
  };

  return (
    <>
      <CrisisDetailsCard
        crisis={crisis}
        onStatusChange={onStatusChange}
        onPriorityChange={onPriorityChange}
      />

      <AddEventForm
        crisisId={crisis.id}
        onSuccess={handleEventSuccess}
        onError={onError}
      />

      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-bold mb-4">Events Timeline</h3>
        <EventsList events={events} />
      </div>
    </>
  );
}
