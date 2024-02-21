import { Component, OnInit } from '@angular/core';
import {JogadorService} from "../../jogador.service";
import {Jogador} from "../../jogador";
import {Pedidoligacao} from "../../pedidoligacao"; JogadorService;

declare function pararGrafo():any;

@Component({
  selector: 'app-get-jogadores',
  templateUrl: './get-jogadores.component.html',
  styleUrls: ['./get-jogadores.component.css']
})
export class GetJogadoresComponent implements OnInit {

  jogadores:Jogador[];

  constructor(public jogadorservice:JogadorService) {
    this.jogadores=[];
  }

  ngOnInit(): void {
    pararGrafo();
    this.getAllJogadores();
  }

  getAllJogadores(){
    this.jogadores=[];
    this.jogadorservice.getAllJogadores().subscribe((jogadores2 :Jogador[])=> this.loop(jogadores2));
  }

  loop(pedidosArray : Jogador[]){
    for (var val of pedidosArray) {
      this.jogadores.push(val);
    }
  }

  pedirLigacao(jogador:Jogador){
    this.jogadorservice.enviarPedido(jogador.id as string).subscribe(pedido=>console.log(pedido.id));
    alert("Pedido de ligacao efetuado")
  }

  guardarInfo(jogadorAmigoId: String) {
    this.jogadorservice.grafoComum=1;
    this.jogadorservice.amigoGrafoComum=jogadorAmigoId+"";
  }

}
