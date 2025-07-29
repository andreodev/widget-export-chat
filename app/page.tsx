"use client";

import { useState, useEffect, useRef } from "react";
import { useExportAll, useExportProtocol } from "../hooks/useExport";
import WlExtensionLoader from "@/components/WlExtensionLoader";
import { motion } from "framer-motion";
import type { PayloadDTO } from "@/types/payloadDTO";
import { ExportSection } from "@/components/ExportSection";
import { useCurrentAttendance } from "./hooks/useSyncFromWindow";
import { base64ToBlob } from "@/util/base64ToBlob";
import Protocols from "@/components/Status";
import { UseFetchStatus } from "@/components/Status/hooks/useStatus";
import type { Protocol } from "@/types/ProtocolDTO";
import { EmptyState } from "@/components/EmptyState";

export default function ExportarPage() {
  const [allChats, setAllChats] = useState(false);
  const [currentAttendance, setCurrentAttendance] = useCurrentAttendance();
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [nomeArquivo, setNomeArquivo] = useState("exportacao.pdf");
  const [loading, setLoading] = useState(false);
  const previousAttendanceIdRef = useRef<string | null>(null);
  const [status, setStatus] = useState<Protocol[]>([]);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);

  const { fetchData } = useExportAll();
  const { fetchDataStatus } = UseFetchStatus();
  const { exportProtocol } = useExportProtocol();

  // ✅ Reage a mudanças externas no atendimento
  useEffect(() => {
    const handleAttendanceChange = (e: CustomEvent) => {
      const atendimento = e.detail || null;
      setCurrentAttendance(atendimento);
      setLoading(false);
      if (!atendimento) {
        setStatus([]);
        setPdfBlob(null);
        setNomeArquivo("exportacao.pdf");
      }
    };

    window.addEventListener(
      "attendanceChanged",
      handleAttendanceChange as EventListener
    );

    return () => {
      window.removeEventListener(
        "attendanceChanged",
        handleAttendanceChange as EventListener
      );
    };
  }, [setCurrentAttendance]);

  useEffect(() => {
    const prevId = previousAttendanceIdRef.current;
    const currentId = currentAttendance?.atendimentoId || null;

    if (prevId !== currentId && currentId) {
      setLoading(true); // <- Loading inicia aqui
      setPdfBlob(null);
      setNomeArquivo("exportacao.pdf");
      setStatus([]);
      setPdfDownloaded(false);
    }

    previousAttendanceIdRef.current = currentId;
  }, [currentAttendance]);

  useEffect(() => {
    const getStatus = async () => {
      if (!currentAttendance) return;

      const payload: PayloadDTO = {
        atendimentoId: currentAttendance.atendimentoId,
        canalId: currentAttendance.canalId,
        sistemaId: currentAttendance.sistemaId,
        contatoId: currentAttendance.contato?.id || null,
        allchats: allChats,
      };

      try {
        const result = await fetchDataStatus(payload);
        const mappedProtocols = Array.isArray(result)
          ? result.map((item) => ({
              id: item.protocol || item.id,
              startDate: item.startDate || new Date().toISOString(),
              endDate: item.endDate || null,
              status: item.status || "desconhecido",
              attendanceId: item.attendanceId,
            }))
          : [];
        setStatus(mappedProtocols);
      } catch (error) {
        console.error("Erro ao buscar status:", error);
      } finally {
        setLoading(false); // <- loading termina aqui
      }
    };

    getStatus();
  }, [currentAttendance, allChats]);

  const exportar = async () => {
    if (!currentAttendance) {
      window.WlExtension?.alert?.({
        message: "Abra um atendimento para exportar.",
        variant: "warning",
      });
      return;
    }

    setLoading(true);
    setPdfDownloaded(false);

    const isExportAll = allChats;

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

  const exportarProtocolo = async (protocolId: string) => {
    if (!currentAttendance) {
      window.WlExtension?.alert?.({
        message: "Abra um atendimento para exportar.",
        variant: "warning",
      });
      return;
    }

    setLoading(true);

    try {
      const item = status.find((p) => p.id === protocolId);

       if (!item) {
      alert("ID de atendimento não encontrado para este protocolo.");
      setLoading(false);
      return;
    }
    
      const payload: PayloadDTO = {
        atendimentoId: item.attendanceId,
        canalId: currentAttendance.canalId,
        sistemaId: currentAttendance.sistemaId,
        contatoId: currentAttendance.contato?.id || null,
        protocolo: protocolId,
        allchats: false,
      };

      const text = await exportProtocol(payload);
      const data = text ? JSON.parse(text) : {};
      let base64pdf: string | null = null;

      if (data?.base64) {
        base64pdf = data.base64;
        setNomeArquivo(data.nomeArquivo || `protocolo-${protocolId}.pdf`);
      }

      if (base64pdf) {
        const blob = base64ToBlob(base64pdf);
        setPdfBlob(blob);

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = data.nomeArquivo || `protocolo-${protocolId}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        window.WlExtension?.alert?.({
          message: "Protocolo exportado com sucesso",
          variant: "success",
        });
      } else {
        window.WlExtension?.alert?.({
          message: "PDF não disponível para este protocolo",
          variant: "warning",
        });
      }
    } catch (error) {
      console.error("Erro ao exportar protocolo:", error);
      window.WlExtension?.alert?.({
        message: "Erro ao exportar protocolo",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!currentAttendance) {
    return <EmptyState />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen bg-gray-50 p-4"
    >
      <div className="max-w-md mx-auto space-y-4">
        <WlExtensionLoader
          onOpenAttendance={(attendance) => {
            window.currentAttendance = attendance;
            window.dispatchEvent(
              new CustomEvent("attendanceChanged", { detail: attendance })
            );
          }}
        />

        <ExportSection
          onExport={exportar}
          loading={loading}
          pdfBlob={pdfBlob}
          nomeArquivo={nomeArquivo}
          allchat={allChats}
          setAllChats={setAllChats}
          pdfDownloaded={pdfDownloaded}
          setPdfDownloaded={setPdfDownloaded}
        />
        <Protocols
          protocols={status}
          onDownload={(protocolId: string) => exportarProtocolo(protocolId)}
        />
      </div>
    </motion.div>
  );
}
