import { CrisisEvent } from "@/types/crisis";
import EventItem from "./EventItem";

interface EventsListProps {
  events: CrisisEvent[];
}

export default function EventsList({ events }: EventsListProps) {
  if (events.length === 0) {
    return (
      <p className="text-gray-500 text-center py-4">No events recorded yet.</p>
    );
  }

  return (
    <div>
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </div>
  );
}
