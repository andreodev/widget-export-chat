import { useEffect, useState } from "react";
import type { AttendanceDTO } from "@/types/attendanceDTO";

export function useCurrentAttendance() {
  const [currentAttendance, setCurrentAttendance] =
    useState<AttendanceDTO | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        window.currentAttendance &&
        JSON.stringify(window.currentAttendance) !==
          JSON.stringify(currentAttendance)
      ) {
        setCurrentAttendance(window.currentAttendance);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentAttendance]);

  useEffect(() => {
    if (window.currentAttendance && !currentAttendance) {
      setCurrentAttendance(window.currentAttendance);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [currentAttendance, setCurrentAttendance] as const;
}
