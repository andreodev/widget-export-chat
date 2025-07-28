export type PayloadDTO =  {
    atendimentoId: string;
    canalId: string;
    sistemaId: string;
    contatoId: string | null;
    allchats: boolean;
    protocolo?: string
}