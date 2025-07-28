import { FaFilePdf } from "react-icons/fa";
import { motion } from "framer-motion";

interface ExportButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function ExportButton({
  onClick,
  disabled,
  loading,
}: ExportButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.97 }}
      className="w-full bg-white cursor-pointer text-[#192D3E] border-[#192D3E] border py-2 px-4 rounded-sm hover:bg-[#192d3e94] text-base font-medium flex items-center justify-center gap-2  transition disabled:opacity-50"
    >
      <FaFilePdf />
      {loading ? "Exportando..." : "Exportar PDF"}
    </motion.button>
  );
}
