"use client";

import { useState, useEffect, useRef } from "react";
import { useFetchText } from "./hooks/useFetch";
import WlExtensionLoader from "@/components/WlExtensionLoader";
import { motion } from "framer-motion";
import type { PayloadDTO } from "@/types/payloadDTO";
import { Header } from "@/components/Header";
import { ExportSection } from "@/components/ExportSection";
import { useCurrentAttendance } from "./hooks/useSyncFromWindow";
import { base64ToBlob } from "@/util/base64ToBlob";

export default function ExportarPage() {
  const [allChats] = useState(false);
  const [currentAttendance, setCurrentAttendance] = useCurrentAttendance();
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [nomeArquivo, setNomeArquivo] = useState("exportacao.pdf");
  const [loading, setLoading] = useState(false);
  const { fetchData } = useFetchText();
  const previousAttendanceIdRef = useRef<string | null>(null);

  useEffect(() => {
    const prevId = previousAttendanceIdRef.current;
    const currentId = currentAttendance?.atendimentoId || null;

    if (prevId !== currentId) {
      setPdfBlob(null);
      setNomeArquivo("exportacao.pdf");
      setLoading(false);
    }

    previousAttendanceIdRef.current = currentId;
  }, [currentAttendance]);

  const exportar = async () => {
    if (!currentAttendance) {
      window.WlExtension?.alert?.({
        message: "Abra um atendimento para exportar.",
        variant: "warning",
      });
      return;
    }

    setLoading(true);
    const isExportAll = allChats === true;

    if (isExportAll && !currentAttendance.contato?.id) {
      window.WlExtension?.alert?.({
        message:
          "Não foi possível identificar o contato para exportar todos os atendimentos.",
        variant: "warning",
      });
      setLoading(false);
      return;
    }

    try {
      const payload: PayloadDTO = {
        atendimentoId: currentAttendance.atendimentoId,
        canalId: currentAttendance.canalId,
        sistemaId: currentAttendance.sistemaId,
        contatoId: currentAttendance.contato?.id || null,
        allchats: allChats,
      };

      const text = await fetchData(payload);
      const data = text ? JSON.parse(text) : {};

      let base64pdf: string | null = null;

      if (Array.isArray(data) && data[0]?.response?.body?.base64) {
        base64pdf = data[0].response.body.base64;
        setNomeArquivo(data[0].response.body.nomeArquivo || "exportacao.pdf");
      } else if (Array.isArray(data) && data[0]?.data) {
        base64pdf = data[0].data;
        setNomeArquivo(data[0].nomeArquivo || "exportacao.pdf");
      } else if (data?.pdfBase64) {
        base64pdf = data.pdfBase64;
        setNomeArquivo(data.nomeArquivo || "exportacao.pdf");
      } else if (data?.base64) {
        base64pdf = data.base64;
        setNomeArquivo(data.nomeArquivo || "exportacao.pdf");
      }

      if (base64pdf) {
        const blob = base64ToBlob(base64pdf);
        setPdfBlob(blob);

        window.WlExtension?.alert?.({
          message: "Exportação realizada",
          variant: "success",
        });
      }
    } catch (err) {
      console.error("Erro na exportação:", err);
      window.WlExtension?.alert?.({
        message: "Erro na exportação",
        variant: "error",
      });
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-xl mx-auto p-6 font-sans space-y-6"
    >
      <WlExtensionLoader
        onOpenAttendance={(attendance) => {
          window.currentAttendance = attendance;
          setCurrentAttendance(attendance);
        }}
      />

      <Header />

      <ExportSection
        onExport={exportar}
        loading={loading}
        pdfBlob={pdfBlob}
        nomeArquivo={nomeArquivo}
      />
    </motion.div>
  );
}
