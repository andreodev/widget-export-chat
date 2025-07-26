import type { AttendanceDTO } from "@/types/attendanceDTO";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

interface DebugAttendanceProps {
  currentAttendance: AttendanceDTO | null;
}
export default function DebugAttendance({
  currentAttendance,
}: DebugAttendanceProps) {
  if (!currentAttendance) return null;
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-100 border border-gray-200 rounded-xl p-3 overflow-auto text-sm text-gray-700 max-h-52"
    >
      <div className="flex items-center gap-2 mb-2 text-blue-700 font-semibold">
        <FaCheckCircle />
        Dados do Atendimento (DEBUG)
      </div>
      <pre className="whitespace-pre-wrap text-xs text-gray-600">
        {JSON.stringify(currentAttendance, null, 2)}
      </pre>
    </motion.div>
  );
}
