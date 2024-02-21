import { Component, OnInit } from '@angular/core';
import {Jogador} from "../../jogador";
import {Tamanho} from "../../tamanho";
import {JogadorService} from "../../jogador.service";
import {AlgoritmosService} from "../../algoritmosService";
import {RelacaoService} from "../../relacao.service";

@Component({
  selector: 'app-calculos',
  templateUrl: './calculos.component.html',
  styleUrls: ['./calculos.component.css']
})


export class CalculosComponent implements OnInit {

  public emailForcaLigacao: string="";

  data=new Date();
  public jogadorDestinoForcaLig: Jogador= new Jogador("","","","","","","","",new Date().toDateString(),"","","","",this.data.getDay()+"/"+this.data.getMonth()+"/"+this.data.getFullYear());

  public resultadoForcaLigacao: Tamanho = new Tamanho("");

  public resultadoForcaLigacaoString: string="";

  public jogadores : Jogador[];

  public forcaLigacao: string="";

  public ligacoesSegundoN: string="";

  public forcaLigacaoPrimeiroN: string="";

  constructor(public jogadorService:JogadorService,public algoritmosService: AlgoritmosService,public relacoesService: RelacaoService) {
    this.jogadores=[];
  }

  ngOnInit(): void {
  }


  async getForcaLigacao() : Promise<void> {
    this.jogadorService.getJogadorByEmail(this.emailForcaLigacao).subscribe((valor:Jogador)=>{this.jogadorDestinoForcaLig=valor})
    await new Promise(f => setTimeout(f, 1000));
    console.log(this.jogadorDestinoForcaLig.id)
    this.algoritmosService.obterCaminhoCurto(this.jogadorService.userValue.id.toString(),this.jogadorDestinoForcaLig.id.toString()).subscribe((valor:Tamanho)=>{this.resultadoForcaLigacao=valor})
    await new Promise(f => setTimeout(f, 1000));
    console.log(this.resultadoForcaLigacao.t)
    var splitted = (this.resultadoForcaLigacao.t+"").split(",");
    var string="";
    this.jogadores= [];
    for (var val of splitted) {
      await this.jogadorService.getJogadorById(val).subscribe((jog:Jogador)=>{ this.jogadores.push(jog) });
    }
    await new Promise(f => setTimeout(f, 1000));
    for(var jogador of this.jogadores){
      string=string+ "," +jogador.email;
    }
    this.resultadoForcaLigacaoString=string;
    await new Promise(f => setTimeout(f, 100));
    this.jogadorService.getForcaLigacao(this.resultadoForcaLigacaoString).subscribe((forcaLigacao: string)=>{this.forcaLigacao=forcaLigacao});
  }

  async getLigacoesSegundoN(): Promise<void> {
    this.jogadorService.getLigacoesSegundoN(this.jogadorService.userValue.id.toString()).subscribe((ligacoesSegundoN: string)=>{this.ligacoesSegundoN=ligacoesSegundoN});
  }

  async getForcaPrimeiroN(): Promise<void>{
    this.relacoesService.getForcaPrimeiroN(this.jogadorService.userValue.id.toString()).subscribe((forcaLigcao: string)=>{this.forcaLigacaoPrimeiroN=forcaLigcao});
  }

}
