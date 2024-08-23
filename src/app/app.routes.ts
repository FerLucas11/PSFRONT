import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PedidoComponent } from './pages/pedido/pedido.component';
import { ProdutoComponent } from './pages/produto/produto.component';
import { AdicionarPedidoComponent } from './pages/adicionar-pedido/adicionar-pedido.component';
import { AdicionarProdutoComponent } from './pages/adicionar-produto/adicionar-produto.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'pedido', component: PedidoComponent},
    { path: 'produto', component: ProdutoComponent },
    { path: 'adicionar-pedido', component: AdicionarPedidoComponent },
    { path: 'adicionar-produto', component: AdicionarProdutoComponent },
];
