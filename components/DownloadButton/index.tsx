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
      className="w-full cursor-pointer bg-green-600 text-white font-medium py-2 px-4 rounded-lg text-base flex items-center justify-center gap-2 hover:bg-green-700 transition"
       style={{ backgroundColor: '#192D3E', color: 'white', borderColor: '#192D3E' }}
    >
      <FaDownload />
      Baixar PDF
    </motion.button>
  );
}
