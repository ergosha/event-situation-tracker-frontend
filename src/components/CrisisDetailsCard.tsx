import { Crisis } from "@/types/crisis";
import { getStatusColor } from "@/utils/styleHelpers";
import CrisisUpdateControls from "./CrisisUpdateControls";

interface CrisisDetailsCardProps {
  crisis: Crisis;
  onStatusChange: (crisisId: string, status: string) => void;
  onPriorityChange: (crisisId: string, priority: string) => void;
}

export default function CrisisDetailsCard({
  crisis,
  onStatusChange,
  onPriorityChange,
}: CrisisDetailsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-bold">{crisis.title}</h2>
        <span
          className={`px-3 py-1 text-sm rounded ${getStatusColor(
            crisis.status
          )}`}
        >
          {crisis.status}
        </span>
      </div>

      <p className="text-gray-700 mb-4">{crisis.description}</p>

      <div className="grid grid-cols-2 gap-4 text-sm border-t border-gray-200 pt-4">
        <div>
          <span className="font-semibold text-gray-600">Type:</span>{" "}
          {crisis.type}
        </div>
        <div>
          <span className="font-semibold text-gray-600">Priority:</span>{" "}
          {crisis.priority}
        </div>
        <div>
          <span className="font-semibold text-gray-600">Location:</span>{" "}
          {crisis.location}
        </div>
        <div>
          <span className="font-semibold text-gray-600">Created:</span>{" "}
          {new Date(crisis.createdAt).toLocaleString()}
        </div>
      </div>

      <CrisisUpdateControls
        crisis={crisis}
        onStatusUpdate={onStatusChange}
        onPriorityUpdate={onPriorityChange}
      />
    </div>
  );
}
