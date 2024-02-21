import { Component, OnInit } from '@angular/core';
import {JogadorService} from "../../jogador.service";
import {PedidoligacaoService} from "../../pedidoligacao.service";
import {Jogador} from "../../jogador";
import {Pedidoligacao} from "../../pedidoligacao";

declare function pararGrafo():any;

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  public pedidos: Pedidoligacao []=[];
  public jogadores:Jogador[]=[];

  constructor(public jogadorservice:JogadorService,public pedidoligacaoservice:PedidoligacaoService) {
  }

  ngOnInit(): void {
    pararGrafo();
    this.getPedidosLigacao()
  }

  getPedidosLigacao(){
  this.pedidoligacaoservice.getPedidosLigacaoPendentes(this.jogadorservice.userValue.id).subscribe((pedidos2 :Pedidoligacao[])=> this.loop(pedidos2));

  }

  loop(pedidosArray : Pedidoligacao[]){
    for (var val of pedidosArray) {
    this.pedidos.push(val);
    this.jogadorservice.getJogadorById(val.jogadorObjetivo).subscribe((jogador:Jogador)=>(this.jogadores.push(jogador)));
    }
  }

  aceitar(id:string){
    this.pedidoligacaoservice.aceitar(id);
    alert("Pedido Aceite")
  }
  rejeitar(id:string){
    this.pedidoligacaoservice.rejeitar(id);
    alert("Pedido Rejeitado")
  }

}
