"use client";
import { ExportButton } from "../ExportButton";
import { DownloadPdfButton } from "../DownloadButton";
import ExportAllCheckbox from "../ExportAllCheckBox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "@radix-ui/react-separator";
import { FileText } from "lucide-react";
import { LoadingOverlay } from "../LoadingOverlay";

interface ExportSectionProps {
  onExport: () => Promise<void>;
  loading: boolean;
  pdfBlob: Blob | null;
  nomeArquivo: string;
  allchat: boolean;
  setAllChats: React.Dispatch<React.SetStateAction<boolean>>;
  pdfDownloaded: boolean;
  setPdfDownloaded: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ExportSection({
  onExport,
  loading,
  pdfBlob,
  nomeArquivo,
  allchat,
  setAllChats,
  pdfDownloaded,
}: ExportSectionProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle
            className="flex items-center gap-2"
            style={{ color: "#192D3E" }}
          >
            <FileText className="w-5 h-5" style={{ color: "#192D3E" }} />
            Exportação de Atendimento
          </CardTitle>
          <CardDescription>
            Exporte o atendimento atual em formato PDF
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="text-xs text-muted-foreground ml-6">
              Inclui todas as interações, registros e anotações do contato
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-3">
            <ExportButton onClick={onExport} />
            <ExportAllCheckbox setAllChats={setAllChats} allChats={allchat} />
            {loading && <LoadingOverlay />}
            {pdfBlob && !pdfDownloaded && (
              <DownloadPdfButton pdfBlob={pdfBlob} nomeArquivo={nomeArquivo} />
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
