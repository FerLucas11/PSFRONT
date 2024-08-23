import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PedidoService } from '../../services/pedido.service';
import { ProdutoService } from '../../services/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../../models/produto';
import { Pedido } from '../../models/pedido';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core'; 
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adicionar-pedido',
  standalone: true,
  imports: [MatNativeDateModule  ,MatToolbarModule, ReactiveFormsModule, MatOptionModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSelectModule, RouterLink, CommonModule],
  templateUrl: './adicionar-pedido.component.html',
  styleUrl: './adicionar-pedido.component.css'
})
export class AdicionarPedidoComponent {
  pedidoForm: FormGroup;
  isEditMode = false;
  pedidoId: number | null = null;
  produtos: Produto[] = [];
  produtoValor: number | undefined;

  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private router: Router,
    private route: ActivatedRoute,
    private produtoService: ProdutoService
  ) {
    this.pedidoForm = this.fb.group({
      nomeCliente: ['', Validators.required],
      emailCliente: ['', Validators.required],
      quantidade:[''],
      produtoId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.pedidoId = this.route.snapshot.params['id'];
    this.produtoService.getProdutos().subscribe((data: Produto[]) => {
      this.produtos = data;
    });
    
    if (this.pedidoId) {
      this.isEditMode = true;
      this.pedidoService.getPedido(this.pedidoId).subscribe(pedido => {
        this.pedidoForm.patchValue(pedido);
      });
    }
  }
  
  onSubmit(): void {
    if (this.pedidoForm.valid) {
      if (this.isEditMode) {
        const payload: Pedido = {
          nomeCliente: this.pedidoForm.value.nomeCliente,
          emailCliente: this.pedidoForm.value.emailCliente,
          valorTotal: this.pedidoForm.value.valorTotal,
          pago: true,
          itensPedido: [{
            quantidade: this.pedidoForm.value.quantidade,
            id: 0,
            idProduto: 0,
            nomeProduto: '',
            valorUnitario: 0
          }],
          id: this.pedidoId!,
          quantidade: this.pedidoForm.value.quantidade,
        };
        this.pedidoService.updatePedido(payload).subscribe(() => {
          this.router.navigate(['/pedido']);
        });
      } 
      else {

        const payload: any ={
          emailCliente: this.pedidoForm.value.emailCliente,
          nomeCliente: this.pedidoForm.value.nomeCliente,
          dataCriacao: Date.now(),
          pago: false,
          itensPedido: [{
            quantidade: this.pedidoForm.value.quantidade,
            valorUnitario: this.pedidoForm.value.quantidade,
            valor: 10
          }],

        }

        console.log(payload);

        this.pedidoService.createPedido(payload).subscribe(() => {
          this.router.navigate(['/pedido']);
        });
      }
    }
  }
}
