import { useEffect, useState } from "react";
import type { AttendanceDTO } from "@/types/attendanceDTO";

export function useCurrentAttendance() {
  const [currentAttendance, setCurrentAttendance] = useState<AttendanceDTO | null>(null);

  useEffect(() => {
    function handleAttendanceChanged(event: CustomEvent) {
      setCurrentAttendance(event.detail);
    }

    window.addEventListener("attendanceChanged", handleAttendanceChanged as EventListener);

    // Inicializa com o valor atual global (se houver)
    if (window.currentAttendance) {
      setCurrentAttendance(window.currentAttendance);
    }

    return () => {
      window.removeEventListener("attendanceChanged", handleAttendanceChanged as EventListener);
    };
  }, []);

  return [currentAttendance, setCurrentAttendance] as const;
}
