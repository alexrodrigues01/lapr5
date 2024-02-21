import { Component, OnInit } from '@angular/core';
import {Pedidoligacao} from "../../pedidoligacao";
import {Jogador} from "../../jogador";
import {JogadorService} from "../../jogador.service";
import {PedidoligacaoService} from "../../pedidoligacao.service";
import {Pedidointroducao} from "../../pedidointroducao";
import {PedidoIntroducaoService} from "../../pedidoIntroducaoService";

declare function pararGrafo():any;

@Component({
  selector: 'app-introducao',
  templateUrl: './introducao.component.html',
  styleUrls: ['./introducao.component.css']
})
export class IntroducaoComponent implements OnInit {

  public introducoes: Pedidointroducao []= [];
  public jogadores:Jogador[]=[];

  constructor(public jogadorservice:JogadorService,public pedidoIntroducaoService:PedidoIntroducaoService) {
  }

  ngOnInit(): void {
    pararGrafo();
    this.getPedidosIntroducao()
  }

  getPedidosIntroducao(){
    this.pedidoIntroducaoService.getPedidosIntroducao(this.jogadorservice.userValue.id).subscribe((pedidos2 :Pedidointroducao[])=> this.loop(pedidos2));

  }

  loop(introducoes : Pedidointroducao[]){
    for (var val of introducoes) {
      this.introducoes.push(val);
      this.jogadorservice.getJogadorById(val.jogadorObjetivo).subscribe((jogador:Jogador)=>(this.jogadores.push(jogador)));
    }
  }

  aceitar(id:string){
    this.pedidoIntroducaoService.aceitar(id);
    alert("Pedido de Introdução aceite")
  }
  rejeitar(id:string){
    this.pedidoIntroducaoService.rejeitar(id);
    alert("Pedido de Introdução rejeitado")
  }

}
