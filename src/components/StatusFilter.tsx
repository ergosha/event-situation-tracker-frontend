import { FILTER_STATUSES } from "@/constants/crisis";

interface StatusFilterProps {
  currentStatus: string;
  onStatusChange: (status: string) => void;
}

export default function StatusFilter({
  currentStatus,
  onStatusChange,
}: StatusFilterProps) {
  return (
    <div className="flex gap-2 mb-4">
      {FILTER_STATUSES.map((status) => (
        <button
          key={status}
          onClick={() => onStatusChange(status)}
          className={`px-3 py-1.5 text-sm rounded transition-colors ${
            currentStatus === status
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  );
}
