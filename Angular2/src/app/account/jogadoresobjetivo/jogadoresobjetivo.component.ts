import { Component, OnInit } from '@angular/core';
import {Jogador} from "../../jogador";
import {JogadorService} from "../../jogador.service";
import {Pedidoligacao} from "../../pedidoligacao";
import {PedidoIntroducaoService} from "../../pedidoIntroducaoService";

declare function pararGrafo():any;

@Component({
  selector: 'app-jogadoresobjetivo',
  templateUrl: './jogadoresobjetivo.component.html',
  styleUrls: ['./jogadoresobjetivo.component.css']
})
export class JogadoresobjetivoComponent implements OnInit {
  jogadores:Jogador[];
  pedidos: Pedidoligacao[];


  constructor(public jogadorservice:JogadorService, public pedidoIntroducaoService: PedidoIntroducaoService) {
    this.jogadores=[];
    this.pedidos=[];

  }

  ngOnInit(): void {
    pararGrafo();
    this.getJogadoresObjetivo();
  }

  getJogadoresObjetivo(){
    this.jogadores=[];
    this.jogadorservice.getJogadoresObjetivo().subscribe((jogadores2 :Jogador[])=> this.loop(jogadores2));
  }

  enviarPedido(id:string){
    this.jogadorservice.enviarPedido(id).subscribe(pedido=>this.pedidos.push(pedido));
    alert("Pedido enviado")
  }

  loop(jogadoresObjetivo : Jogador[]){
    for (var val of jogadoresObjetivo) {
      this.jogadores.push(val);
    }
  }

  guardarJogadorObjetivo(jogadorid: string) {
    this.pedidoIntroducaoService.jogadorObjetivoId=jogadorid;
  }
}
