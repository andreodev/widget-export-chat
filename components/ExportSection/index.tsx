"use client";
import { ExportButton } from "../ExportButton";
import { LoadingOverlay } from "../LoadingOverlay";
import { DownloadPdfButton } from "../DownloadButton";
import ExportAllCheckbox from "../ExportAllCheckBox";

interface ExportSectionProps {
  onExport: () => Promise<void>;
  loading: boolean;
  pdfBlob: Blob | null;
  nomeArquivo: string;
  allchat: boolean
  setAllChats: null
}

export function ExportSection({
  onExport,
  loading,
  pdfBlob,
  nomeArquivo,
  allchat,
  setAllChats
}: ExportSectionProps) {
  return (
    <div className="space-y-4">
      <ExportButton onClick={onExport} disabled={loading} />
      <ExportAllCheckbox  setAllChats={setAllChats} allChats={allchat}/> 
      {/*future feature*/}
      {loading && <LoadingOverlay />}
      {pdfBlob && (
        <DownloadPdfButton pdfBlob={pdfBlob} nomeArquivo={nomeArquivo} />
      )}
    </div>
  );
}
