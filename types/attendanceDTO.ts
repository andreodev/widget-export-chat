import type { ContatoDTO } from "./contatoDTO"

export type AttendanceDTO = {
  atendimentoId: string
  canalId: string
  sistemaId: string
  contato?: ContatoDTO
  [key: string]: unknown
}