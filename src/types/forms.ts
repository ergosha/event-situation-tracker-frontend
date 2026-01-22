export type CreateCrisisFormData = {
  type: string;
  priority: string;
  title: string;
  location: string;
  description: string;
};

export type AddEventFormData = {
  type: string;
  severity: string;
  description: string;
};
