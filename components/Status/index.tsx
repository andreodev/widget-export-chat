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
import type { Protocol } from "@/types/ProtocolDTO";



interface Props {
  protocols: Protocol[];
  onDownload: (protocolId: string) => void;
}

export default function Protocols({ protocols, onDownload }: Props) {
  return (
    <Card className="text-[11px]">
      <CardHeader>
        <CardTitle
          className="flex items-center gap-1 text-sm"
          style={{ color: "#192D3E" }}
        >
          <ClipboardList className="w-4 h-4" style={{ color: "#192D3E" }} />
          Protocolos de Atendimento
        </CardTitle>
        <CardDescription className="text-[10px]">
          Visualize e baixe os atendimentos separados por protocolo.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-3 gap-1 mb-4">
          <div className="text-center p-1 bg-blue-50 rounded">
            <div className="text-blue-600">
              {protocols.filter((p) => p.status === "em_andamento").length}
            </div>
            <div className="text-[10px]" style={{ color: "#192D3E" }}>
              Aberto
            </div>
          </div>
          <div className="text-center p-1 bg-green-50 rounded">
            <div className="text-green-600">
              {protocols.filter((p) => p.status === "finalizado").length}
            </div>
            <div className="text-[10px]" style={{ color: "#192D3E" }}>
              Finalizados
            </div>
          </div>
          <div className="text-center p-1 bg-gray-50 rounded">
            <div className="text-gray-600">{protocols.length}</div>
            <div className="text-[10px]" style={{ color: "#192D3E" }}>
              Total
            </div>
          </div>
        </div>

        <div className="rounded-md border ">
          <div className="w-full overflow-auto">
            <Table className="min-w-700px] ">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[10px]">Protocolo</TableHead>
                  <TableHead className="text-[10px]">Status</TableHead>
                  <TableHead className="text-right text-[10px]">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {protocols.map((protocol) => (
                  <TableRow key={protocol.id}>
                    <TableCell className="text-[10px]">{protocol.id}</TableCell>
                    <TableCell className="text-[10px]">
                      <Badge
                        variant="secondary"
                        className={`} text-[10px] px-1 py-0`}
                      >
                        {protocol.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onDownload(protocol.id)}
                        disabled={protocol.status === "em_andamento"}
                        className="p-1 h-6 w-6 cursor-pointer"
                        style={{
                          borderColor:
                            protocol.status === "em_andamento"
                              ? "#ccc"
                              : "#192D3E",
                          color:
                            protocol.status === "em_andamento"
                              ? "#ccc"
                              : "#192D3E",
                        }}
                      >
                        <Download className="w-3 h-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
