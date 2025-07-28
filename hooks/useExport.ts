import api from "@/service/api";
import type { PayloadDTO } from "@/types/payloadDTO";
import { AxiosError } from "axios";

export function useExportAll() {
  const fetchData = async (payload: PayloadDTO): Promise<string> => {
    try {
      let type = "";
      if (payload.allchats === true) {
        type = "all";
      } else if (payload.allchats === false) {
        type = "current";
      }

      console.log(payload)

      const response = await api.post(
        `https://dev.gruponfa.com/webhook/extension/chats_export/export?type=${type}`,
        payload,
        { responseType: "text" }
      );

      return response.data;
    } catch (error: unknown) {
      console.error("Erro na chamada fetchData em useExportAll:", error);

      if (error instanceof AxiosError) {
        // AxiosError tem resposta do servidor
        if (error.response) {
          const status = error.response.status;
          const data = error.response.data;

          let serverMessage = "";

          if (data && typeof data === "object" && "message" in data) {
            serverMessage = (data as any).message;
          } else if (typeof data === "string") {
            serverMessage = data;
          }

          throw new Error(
            `Erro ${status} da API: ${serverMessage || "Resposta inesperada do servidor."}`
          );
        }
        // Erro que ocorreu na requisição (sem resposta do servidor)
        else if (error.request) {
          throw new Error(
            "Servidor não respondeu. Verifique a conexão e a disponibilidade da API."
          );
        }
      }

      // Erro não esperado
      if (error instanceof Error) {
        throw new Error(`Erro inesperado: ${error.message}`);
      } else {
        throw new Error("Erro inesperado, tente novamente mais tarde.");
      }
    }
  };

  return { fetchData };
}

export function useExportProtocol() {
  const exportProtocol = async (payload: PayloadDTO) => {
    try {
      const response = await api.post(
        "https://dev.gruponfa.com/webhook/extension/chats_export/export?type=protocol",
        payload,
        { responseType: "text" }
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.data?.message) {
          throw new Error(error.response.data.message);
        } else if (error.request) {
          throw new Error("Servidor não respondeu, verifique a api!");
        }
      }
      throw new Error("Erro inesperado tente novamente mais tarde.");
    }
  };
  return { exportProtocol };
}
