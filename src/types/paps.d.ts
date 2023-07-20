export type Pap = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  papId: string;
  description: string | null;
  pap: string;
  trainingId: string | null;
};

export type PapsT = {
  pap: string;
  description?: string;
};
