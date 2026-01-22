import { Crisis } from "@/types/crisis";
import { CRISIS_STATUSES, CRISIS_PRIORITIES } from "@/constants/crisis";

interface CrisisUpdateControlsProps {
  crisis: Crisis;
  onStatusUpdate: (crisisId: string, status: string) => void;
  onPriorityUpdate: (crisisId: string, priority: string) => void;
}

export default function CrisisUpdateControls({
  crisis,
  onStatusUpdate,
  onPriorityUpdate,
}: CrisisUpdateControlsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 mt-4">
      <div>
        <label className="block text-xs font-semibold mb-1 text-gray-600">
          Update Status
        </label>
        <select
          value={crisis.status}
          onChange={(e) => onStatusUpdate(crisis.id, e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
        >
          {CRISIS_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold mb-1 text-gray-600">
          Update Priority
        </label>
        <select
          value={crisis.priority}
          onChange={(e) => onPriorityUpdate(crisis.id, e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
        >
          {CRISIS_PRIORITIES.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
