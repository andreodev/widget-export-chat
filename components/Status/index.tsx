"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClipboardList, Download } from "lucide-react";
import { useState } from "react";
import type { Protocol } from "@/types/ProtocolDTO";
import { LoadingOverlay } from "../LoadingOverlay";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  protocols: Protocol[];
  onDownload: (protocolId: string) => void;
}

export default function Protocols({ protocols, onDownload }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(0); // 1 para next, -1 para prev
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(protocols.length / itemsPerPage);

  const paginatedProtocols = protocols.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDownload = async (id: string) => {
    setLoadingId(id);
    await onDownload(id);
    setLoadingId(null);
  };

  // Variants para animação condicional com base na direção
  const variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 100 : -100,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir < 0 ? 100 : -100,
    }),
  };

  return (
    <Card className="text-[11px] relative">
      {loadingId && <LoadingOverlay />}
      {/* seu CardHeader e CardContent aqui */}

      <CardContent>
        {/* indicadores, tabela, etc... */}

        <div className="rounded-md border">
          <div className="w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[10px]">Protocolo</TableHead>
                  <TableHead className="text-[10px]">Status</TableHead>
                  <TableHead className="text-right text-[10px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence custom={direction} mode="popLayout">
                  {paginatedProtocols.map((protocol) => (
                    <motion.tr
                      key={protocol.id}
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                    >
                      <TableCell className="text-[10px]">{protocol.id}</TableCell>
                      <TableCell className="text-[10px]">
                        <Badge variant="secondary" className="text-[10px] px-1 py-0">
                          {protocol.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDownload(protocol.id)}
                          disabled={protocol.status === "em_andamento"}
                          className="p-1 h-6 w-6 cursor-pointer"
                          style={{
                            borderColor:
                              protocol.status === "em_andamento" ? "#ccc" : "#192D3E",
                            color: protocol.status === "em_andamento" ? "#ccc" : "#192D3E",
                          }}
                        >
                          <Download className="w-3 h-3" />
                        </Button>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end items-center gap-2 p-2 text-[10px]">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => {
                if (currentPage > 1) {
                  setDirection(-1);
                  setCurrentPage((p) => p - 1);
                }
              }}
            >
              Anterior
            </Button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => {
                if (currentPage < totalPages) {
                  setDirection(1);
                  setCurrentPage((p) => p + 1);
                }
              }}
            >
              Próxima
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}