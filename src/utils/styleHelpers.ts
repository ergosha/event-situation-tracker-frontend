export function getPriorityColor(priority: string): string {
  switch (priority) {
    case "CRITICAL":
      return "bg-red-100 border-red-300 text-red-900";
    case "EMERGENCY":
      return "bg-orange-100 border-orange-300 text-orange-900";
    case "URGENT":
      return "bg-yellow-100 border-yellow-300 text-yellow-900";
    default:
      return "bg-blue-100 border-blue-300 text-blue-900";
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "OPEN":
      return "bg-red-100 text-red-800";
    case "ONGOING":
      return "bg-yellow-100 text-yellow-800";
    case "RESOLVED":
      return "bg-green-100 text-green-800";
    case "CLOSED":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-50 text-gray-800";
  }
}

export function getSeverityColor(severity: string | null): string {
  if (!severity) return "bg-gray-100 text-gray-700";
  switch (severity) {
    case "CRITICAL":
      return "bg-red-100 text-red-700";
    case "HIGH":
      return "bg-orange-100 text-orange-700";
    case "MEDIUM":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-blue-100 text-blue-700";
  }
}
