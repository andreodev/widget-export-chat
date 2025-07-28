export type Protocol = {
  id: string;
  startDate: string;
  endDate: string | null;
  status: "finalizado" | "em_andamento" | string;
};