export type Crisis = {
  id: string;
  type: string;
  status: string;
  priority: string;
  title: string;
  description: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt: string | null;
  closedAt: string | null;
  latitude: number | null;
  longitude: number | null;
  eventCount: number;
};

export type CrisisEvent = {
  id: string;
  type: string;
  severity: string | null;
  timestamp: string;
  description: string;
};
