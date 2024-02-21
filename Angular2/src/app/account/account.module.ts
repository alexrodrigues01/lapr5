import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { AccountRoutingModule } from './account-routing.module';
import { TopComponent } from './top/top.component';
import {AccountComponent} from "./account.component";
import { ProfileComponent } from './profile/profile.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { GetEstadoHumorComponent } from './profile/get-estado-humor/get-estado-humor.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile/edit-profile.component';
import { RelacoesComponent } from './relacoes/relacoes.component';
import { EditRelacaoComponent } from './relacoes/edit-relacao/edit-relacao.component';
import { IntroducaoComponent } from './introducao/introducao.component';
import {JogoComponent} from "./jogo/jogo.component";
import { JogadoresobjetivoComponent } from './jogadoresobjetivo/jogadoresobjetivo.component';
import {GetJogadoresComponent} from "./get-jogadores/get-jogadores.component";
import { JogadoresIntermediosComponent } from './jogadores-intermedios/jogadores-intermedios.component';
import { IntroduzirDadosIntroducaoComponent } from './introduzir-dados-introducao/introduzir-dados-introducao.component';
import { AlgoritmosComponent } from './algoritmos/algoritmos.component';
import { NivelGrafoComponent } from './nivel-grafo/nivel-grafo.component';
import { TagsComponent } from './tags/tags.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { CalculosComponent } from './calculos/calculos.component';
import { PostsComponent } from './posts/posts.component';
import { CommentComponent } from './posts/comment/comment.component';
import {GrafoComponent} from "./grafo/grafo.component";


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule
  ],
  declarations: [
    GetJogadoresComponent,
    AccountComponent,
    TopComponent,
    ProfileComponent,
    PedidosComponent,
    GetEstadoHumorComponent,
    EditProfileComponent,
    RelacoesComponent,
    EditRelacaoComponent,
    IntroducaoComponent,
    JogoComponent,
    JogadoresobjetivoComponent,
    JogadoresIntermediosComponent,
    IntroduzirDadosIntroducaoComponent,
    AlgoritmosComponent,
    NivelGrafoComponent,
    TagsComponent,
    LeaderboardComponent,
    CalculosComponent,
    PostsComponent,
    CommentComponent,
    GrafoComponent
  ],
  bootstrap: [ AccountComponent ]
})
export class AccountModule { }
