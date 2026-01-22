export const CRISIS_TYPES = [
  "FIRE",
  "MEDICAL",
  "TRAFFIC",
  "HAZMAT",
  "NATURAL_DISASTER",
  "SECURITY",
  "OTHER",
] as const;

export const CRISIS_PRIORITIES = [
  "ROUTINE",
  "URGENT",
  "EMERGENCY",
  "CRITICAL",
] as const;

export const CRISIS_STATUSES = [
  "OPEN",
  "ONGOING",
  "RESOLVED",
  "CLOSED",
  "ARCHIVED",
] as const;

export const EVENT_TYPES = [
  "DISPATCH",
  "ARRIVED",
  "TREATING",
  "PATIENT_TRANSPORTED",
  "DELIVERED",
  "INCIDENT_CLOSED",
  "RESOURCE_REQUEST",
  "STATUS_UPDATE",
  "ESCALATION",
  "DEESCALATION",
] as const;

export const EVENT_SEVERITIES = ["LOW", "MEDIUM", "HIGH", "CRITICAL"] as const;

export const FILTER_STATUSES = ["ONGOING", "OPEN", "RESOLVED", "ALL"] as const;

export type CrisisType = (typeof CRISIS_TYPES)[number];
export type CrisisPriority = (typeof CRISIS_PRIORITIES)[number];
export type CrisisStatus = (typeof CRISIS_STATUSES)[number];
export type EventType = (typeof EVENT_TYPES)[number];
export type EventSeverity = (typeof EVENT_SEVERITIES)[number];
export type FilterStatus = (typeof FILTER_STATUSES)[number];
