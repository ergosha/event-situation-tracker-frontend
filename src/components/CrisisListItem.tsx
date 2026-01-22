import { Crisis } from "@/types/crisis";
import { getPriorityColor, getStatusColor } from "@/utils/styleHelpers";

interface CrisisListItemProps {
  crisis: Crisis;
  isSelected: boolean;
  onClick: () => void;
}

export default function CrisisListItem({
  crisis,
  isSelected,
  onClick,
}: CrisisListItemProps) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-4 rounded-lg mb-2 border transition-all ${
        isSelected
          ? "border-blue-500 bg-blue-50 shadow-md"
          : "border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300"
      } ${getPriorityColor(crisis.priority)}`}
    >
      <h3 className="font-semibold text-base mb-1">{crisis.title}</h3>
      <p className="text-sm text-gray-600">{crisis.location}</p>
      <span
        className={`inline-block mt-2 px-2 py-1 text-xs rounded ${getStatusColor(
          crisis.status
        )}`}
      >
        {crisis.status}
      </span>
    </div>
  );
}
