import type { AttendanceDTO } from "./attendanceDTO";

 declare global {
  interface Window {
    WlExtension?: {
      initialize: (options: unknown) => void;
      alert?: (args: { message: string; variant: 'success' | 'error' | 'warning' }) => void;
    }
    currentAttendance?: AttendanceDTO;
  }
}