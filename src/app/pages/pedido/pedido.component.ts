import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../models/pedido';
import { PedidoService } from '../../services/pedido.service';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatCardModule, RouterLink, MatIconModule,MatButtonModule],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css'
})
export class PedidoComponent implements OnInit{
  pedido: Pedido[] = [];

  constructor(private pedidoService: PedidoService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.carregarPedidos();
  }

  
  carregarPedidos(): void {
    this.pedidoService.getPedidos().subscribe(pedido => {
      this.pedido = pedido;
    });
  }


  editar(e: any){

  }

  concluir(e: any){

  }

  excluir(e: any){

  }


}
