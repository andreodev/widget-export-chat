import { MessageSquareOff } from "lucide-react";

export function EmptyState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center max-w-md space-y-4">
        <div className="flex justify-center">
          <MessageSquareOff className="h-16 w-16 text-gray-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-700">
          Nenhum atendimento aberto
        </h2>
        <p className="text-gray-500 text-sm">
          Por favor, selecione ou abra um atendimento para visualizar os detalhes e exportar o histórico.
        </p>
      </div>
    </div>
  );
}
