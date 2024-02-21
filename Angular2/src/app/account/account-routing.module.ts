import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccountComponent} from "./account.component";
import {TopComponent} from "./top/top.component";
import {ProfileComponent} from"./profile/profile.component"
import {PedidosComponent} from "./pedidos/pedidos.component";
import { RelacoesComponent } from './relacoes/relacoes.component';
import {EditRelacaoComponent} from "./relacoes/edit-relacao/edit-relacao.component";
import {IntroducaoComponent} from "./introducao/introducao.component";
import {JogoComponent} from "./jogo/jogo.component";
import {JogadoresobjetivoComponent} from "./jogadoresobjetivo/jogadoresobjetivo.component";
import {GetJogadoresComponent} from "./get-jogadores/get-jogadores.component";
import { JogadoresIntermediosComponent } from './jogadores-intermedios/jogadores-intermedios.component';
import { IntroduzirDadosIntroducaoComponent } from './introduzir-dados-introducao/introduzir-dados-introducao.component';
import { AlgoritmosComponent } from './algoritmos/algoritmos.component';
import { NivelGrafoComponent } from './nivel-grafo/nivel-grafo.component';
import {TagsComponent} from "./tags/tags.component";
import {LeaderboardComponent} from "./leaderboard/leaderboard.component";
import {CalculosComponent} from "./calculos/calculos.component";
import {PostsComponent} from "./posts/posts.component";
import{CommentComponent} from "./posts/comment/comment.component";
import {GrafoComponent} from "./grafo/grafo.component";

const routes: Routes = [
  {
    path: '', component:AccountComponent,
    children: [
      {
        path: '', component: GetJogadoresComponent
      },{path: 'top', component: TopComponent},
      {path:'profile',component:ProfileComponent},
      {path:'pedidos',component:PedidosComponent},
      {path:'relacoes',component:RelacoesComponent},
      {path:'editRelacao',component:EditRelacaoComponent},
      {path: 'introducoes',component:IntroducaoComponent},
      {path: 'jogo', component:JogoComponent},
      {path: 'jogadoresObjetivo',component:JogadoresobjetivoComponent},
      {path:'getJogadores',component:GetJogadoresComponent},
      {path:'intermedios',component:JogadoresIntermediosComponent},
      {path: 'dadosIntroducao',component:IntroduzirDadosIntroducaoComponent},
      {path: 'algoritmos',component:AlgoritmosComponent},
      {path:'nivelgrafo',component:NivelGrafoComponent},
      {path:'tags',component:TagsComponent},
      {path:'leaderboard',component:LeaderboardComponent},
      {path:'calculos',component:CalculosComponent},
      {path:'posts',component:PostsComponent},
      {path:'comment',component:CommentComponent},
      {path:'grafo',component:GrafoComponent}]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
