export type Office = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  officeId: string;
  description: string | null;
  office: string;
  trainingId: string | null;
};

export type OfficesT = {
  office: string;
  description?: string;
};
