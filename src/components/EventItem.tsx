import { CrisisEvent } from "@/types/crisis";
import { getSeverityColor } from "@/utils/styleHelpers";

interface EventItemProps {
  event: CrisisEvent;
}

export default function EventItem({ event }: EventItemProps) {
  return (
    <div className="border border-gray-200 p-3 rounded mb-2 bg-white">
      <div className="flex items-center gap-2 mb-1">
        <span className="font-semibold text-sm">{event.type}</span>
        {event.severity && (
          <span
            className={`px-2 py-0.5 text-xs rounded ${getSeverityColor(
              event.severity
            )}`}
          >
            {event.severity}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-700 mb-1">{event.description}</p>
      <p className="text-xs text-gray-500">
        {new Date(event.timestamp).toLocaleString()}
      </p>
    </div>
  );
}
