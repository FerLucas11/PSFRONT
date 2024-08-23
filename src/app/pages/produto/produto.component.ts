import { Component, OnInit } from '@angular/core';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto.service';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatCardModule, RouterLink, MatIconModule,MatButtonModule],
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.css'
})
export class ProdutoComponent implements OnInit{
  produto: Produto[] = [];

  constructor(private produtoService: ProdutoService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.loadProduto();
  }

  loadProduto(): void {
    this.produtoService.getProdutos().subscribe(produto => {
      this.produto = produto;
    });
  }

  editar(e: any){
    if(e.status == 2)
    {
      this._snackBar.open(`Essa produto já foi concluída e não pode ser alterada!`, 'Fechar', {
        duration: 3000,
      });
    }
    else{
      this.router.navigate(['/editar-produto', e.id]);
    }
  }

  concluir(e: any){
    if(e.status == 2)
    {
      this._snackBar.open(`produto já foi concluída!`, 'Fechar', {
        duration: 3000,
      });
    }
    else{
      /*this.produtoService.c(e).subscribe(produto => {
        this.loadTasks();
      });*/
    }
  }

  excluir(e: any){
    this.produtoService.deleteProduto(e.id).subscribe(produto => {
      this.loadProduto();
    });
  }

}
