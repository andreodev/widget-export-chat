import type { AttendanceDTO } from "@/types/attendanceDTO";

export interface IWlPropsDTO {
  onOpenAttendance?: (attendance: AttendanceDTO | null) => void;
}