import { Component, OnInit } from '@angular/core';
import {Jogador} from "../../jogador";
import {Pedidoligacao} from "../../pedidoligacao";
import {JogadorService} from "../../jogador.service";
import {PedidoIntroducaoService} from "../../pedidoIntroducaoService";

declare function pararGrafo():any;

@Component({
  selector: 'app-jogadores-intermedios',
  templateUrl: './jogadores-intermedios.component.html',
  styleUrls: ['./jogadores-intermedios.component.css']
})
export class JogadoresIntermediosComponent implements OnInit {
  jogadores:Jogador[];
  pedidos: Pedidoligacao[];

  constructor(public jogadorservice:JogadorService, public pedidoIntroducaoService: PedidoIntroducaoService) {
    this.jogadores=[];
    this.pedidos=[];
  }

  ngOnInit(): void {
    pararGrafo();
    this.getJogadoresIntermedio();
  }

  getJogadoresIntermedio(){
    this.jogadores=[];
    this.jogadorservice.getJogadoresIntermedio(this.pedidoIntroducaoService.jogadorObjetivoId).subscribe((jogadores2 :Jogador[])=> this.loop(jogadores2));
  }



  loop(jogadoresIntermedio : Jogador[]){
    for (var val of jogadoresIntermedio) {
      this.jogadores.push(val);
    }
  }


  guardarJogadorIntermedio(s: string) {
    this.pedidoIntroducaoService.jogadorIntermedioId=s;
  }
}
