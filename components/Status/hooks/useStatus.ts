import api from "@/service/api";
import type { PayloadDTO } from "@/types/payloadDTO";
import { AxiosError } from "axios";

export function UseFetchStatus() {
  const fetchDataStatus = async (payload: PayloadDTO) => {
    try {
      const response = await api.post(
        "https://dev.gruponfa.com/webhook/extension/chats_export/protocol",
        payload,
        { responseType: "text" } 
      );

      const parsedData = JSON.parse(response.data);
      return parsedData;
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
  return { fetchDataStatus };
}
