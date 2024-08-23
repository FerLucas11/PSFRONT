import { ItensPedido } from "./itensPedido";

export interface Pedido {
    id: number;
    nomeCliente: string;
    emailCliente: string;
    pago: boolean;
    valorTotal: number;
    quantidade: number;
    itensPedido: ItensPedido[];
  }