import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'http://localhost:5134/api/pedidos';

  constructor(private http: HttpClient) { }

  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }

  getPedido(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createPedido(pedido: any): Observable<any> {
    return this.http.post(this.apiUrl, pedido);
  }

  updatePedido(pedido: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${pedido.id}`, pedido);
  }

  deletePedido(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
