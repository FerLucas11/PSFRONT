import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from '../../services/produto.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatOptionModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core'; // Adicionar essa importação
import { Produto } from '../../models/produto';

@Component({
  selector: 'app-adicionar-produto',
  standalone: true,
  imports: [MatNativeDateModule  ,MatToolbarModule, ReactiveFormsModule, MatOptionModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSelectModule, RouterLink],
  templateUrl: './adicionar-produto.component.html',
  styleUrl: './adicionar-produto.component.css'
})
export class AdicionarProdutoComponent implements OnInit {

  produtoForm: FormGroup;
  isEditMode = false;
  produtoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.produtoForm = this.fb.group({
      nomeProduto: ['', Validators.required],
      valor: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.produtoId = this.route.snapshot.params['id'];

    if (this.produtoId) {
      this.isEditMode = true;
      this.produtoService.getProduto(this.produtoId).subscribe(produto => {
        this.produtoForm.patchValue(produto);
      });
    }
  }
  
  onSubmit(): void {
    console.log("fora");
    if (this.produtoForm.valid) {
      console.log("entrei");
      if (this.isEditMode) {
        const payload: Produto = {
          nomeProduto: this.produtoForm.value.nomeProduto,
          valor: this.produtoForm.value.valor,
          id: this.produtoId!
        };
        this.produtoService.updateProduto(payload).subscribe(() => {
          this.router.navigate(['/produto']);
        });
      } 
      else {
        this.produtoService.createProduto(this.produtoForm.value).subscribe(() => {
          this.router.navigate(['/produto']);
        });
      }
    }
  }
}
