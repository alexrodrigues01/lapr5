import { Component, OnInit } from '@angular/core';
import {Relacao} from "../../relacao";
import {Jogador} from "../../jogador";
import {JogadorService} from "../../jogador.service";
import {RelacaoService} from "../../relacao.service";

declare function pararGrafo():any;

@Component({
  selector: 'app-relacoes',
  templateUrl: './relacoes.component.html',
  styleUrls: ['./relacoes.component.css']
})
export class RelacoesComponent implements OnInit {

  public relacoes: Relacao []= [];
  public jogadores: Jogador [] = [];


  constructor(public jogadorService: JogadorService,public relacaoService: RelacaoService) { }

  ngOnInit(): void {
    pararGrafo();
    this.getRelacoes()
  }
  getRelacoes(){
    this.relacaoService.getRelacoes(this.jogadorService.userValue.id).subscribe((relacoes2:Relacao[])=>this.loop(relacoes2));

  }
  loop(relacoesArray:Relacao[]){
    for(var val of relacoesArray){
      this.relacoes.push(val);
      console.log(val.jogadorB)
      if(val.jogadorB===this.jogadorService.userValue.id){
        this.jogadorService.getJogadorById(val.jogadorA).subscribe((jogador:Jogador)=>(this.jogadores.push(jogador)));
      }else{
        this.jogadorService.getJogadorById(val.jogadorB).subscribe((jogador:Jogador)=>(this.jogadores.push(jogador)));
      }

    }
  }
  guardarRelacao(relacao:Relacao){
    this.relacaoService.relacaoSelecionada=relacao;
  }

  guardarInfo(jogadorAmigoId: String) {
    this.jogadorService.grafoComum=1;
    this.jogadorService.amigoGrafoComum=jogadorAmigoId+"";
  }

}
