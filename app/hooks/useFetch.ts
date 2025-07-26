import api from "@/service/api";
import type { PayloadDTO } from "@/types/payloadDTO";
import { AxiosError } from "axios";

export function useFetchText() {
  const fetchData = async (payload: PayloadDTO) => {
    try {
      const response = await api.post(
        "https://dev.gruponfa.com/webhook/extension/chats_export/export",
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
  return { fetchData };
}
