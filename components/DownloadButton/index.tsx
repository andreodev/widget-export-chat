"use client";

import { FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";

interface DownloadPdfButtonProps {
  pdfBlob: Blob;
  nomeArquivo: string;
}

export function DownloadPdfButton({
  pdfBlob,
  nomeArquivo,
}: DownloadPdfButtonProps) {
  const handleDownload = () => {
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = nomeArquivo;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.button
      onClick={handleDownload}
      whileTap={{ scale: 0.97 }}
      className="w-full cursor-pointer bg-[#192D3E]  text-white font-medium py-2 px-4 rounded-sm hover:bg-[#192d3e94] text-base flex items-center justify-center gap-2  transition"
    >
      <FaDownload />
      Baixar PDF
    </motion.button>
  );
}
