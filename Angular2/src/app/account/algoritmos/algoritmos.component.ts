import { Component, OnInit } from '@angular/core';
import {JogadorService} from "../../jogador.service";
import {AlgoritmosService} from "../../algoritmosService";
import {Jogador} from "../../jogador";
import {Tamanho} from "../../tamanho";
import {Conexoes} from "../../Conexoes";
import {catchError} from "rxjs/operators";
import {dfsDto} from "../../dfsDto";

declare function pararGrafo():any;

@Component({
  selector: 'app-algoritmos',
  templateUrl: './algoritmos.component.html',
  styleUrls: ['./algoritmos.component.css']
})
export class AlgoritmosComponent implements OnInit {

  public nivelTamanhoRede: string="";

  public resultadoTamanho: Tamanho=new Tamanho("");

  public tagsComum: string= "";

  public numeroTags: string= "";

  public resultadoComum: String= new String("");

  public resultadoConexoesString: String= "";

  public resultadoCaminhoForteString: String="";

  public resultadoCaminhoCurtoString: String="";

  public nivelConexoes: string= "";

  public resultadoConexoes: Tamanho= new Tamanho("");

  public emailForte : string="";

  public n:string="";

  public emailDFS:string="";

  data=new Date();

  public jogadorDestinoForte : Jogador= new Jogador("","","","","","","","",new Date().toDateString(),"","","","",this.data.getDay()+"/"+this.data.getMonth()+"/"+this.data.getFullYear());

  public resultadoCaminhoForte: Tamanho = new Tamanho("");


  public emailCurto: string="";

  public jogadorDestinoCurto : Jogador= new Jogador("","","","","","","","",new Date().toDateString(),"","","","",this.data.getDay()+"/"+this.data.getMonth()+"/"+this.data.getFullYear());

  public resultadoCaminhoCurto: Tamanho = new Tamanho("");

  public emailSeguro: string="";

  public auxiliarConexoes: Conexoes= new Conexoes("");


  public limite : string="";

  public jogadores : Jogador[];


  constructor(public jogadorService: JogadorService, public algoritmosService: AlgoritmosService) {
    this.jogadores=[];
  }

  ngOnInit(): void {
    pararGrafo();
  }


  obterTamanhoRede(){
    this.algoritmosService.obterTamanhoRede(this.jogadorService.userValue.id.toString(),this.nivelTamanhoRede).subscribe((valor : Tamanho) =>{this.resultadoTamanho=valor});
  }

  public jogador:Jogador=new Jogador("","","","","","","","","","","","","","");
  resultadoDFSString: string="";
  resultadoDFS:dfsDto=new dfsDto("",[]);
  custo: string="";
  n2: string="";
  resultadoDFSString2: string="";
  custo2: string="";
  emailDFS2: string="";
  emailDFS3: string="";
  n3: string="";
  estados: string="";
  limiteForca: string="";
  resultadoEmocoes: string="";
  custoEmocoes: string="";
  resultadoGrupo: string="";
  tags: string="";
  n4: string="";
  obrigatorias: string="";

   async obterComum() : Promise<void> {
     await this.algoritmosService.obterComum(this.numeroTags,this.tagsComum).subscribe((valor:Conexoes)=>{this.auxiliarConexoes=valor});
     await new Promise(f => setTimeout(f, 1000));
     console.log(this.auxiliarConexoes.l)
     var splitted = (this.auxiliarConexoes.l+"").split(",");
     var string="";
     for (var val of splitted) {
       await this.jogadorService.getJogadorById(val).subscribe((jog:Jogador)=>{ this.jogadores.push(jog) });
     }
    await new Promise(f => setTimeout(f, 1000));
     for(var jogador of this.jogadores){
       string=string+ "," +jogador.email;
     }
     this.resultadoComum=string;

  }

  async obterConexoes(): Promise<void> {
    this.algoritmosService.obterConexoes(this.jogadorService.userValue.id.toString(),this.nivelConexoes).subscribe((valor:Tamanho)=>{this.resultadoConexoes=valor})
    await new Promise(f => setTimeout(f, 1000));
    console.log(this.resultadoConexoes.t)
    var splitted = (this.resultadoConexoes.t+"").split(",");
    var string="";
    this.jogadores= [];
    for (var val of splitted) {
      await this.jogadorService.getJogadorById(val).subscribe((jog:Jogador)=>{ this.jogadores.push(jog) });
    }
    await new Promise(f => setTimeout(f, 1000));
    for(var jogador of this.jogadores){
      string=string+ "," +jogador.email;
    }
    this.resultadoConexoesString=string;

  }

  public async obterCaminhoForte() : Promise<void> {
    this.jogadorService.getJogadorByEmail(this.emailForte).subscribe((valor:Jogador)=>{this.jogadorDestinoForte=valor})
    await new Promise(f => setTimeout(f, 1000));
    console.log(this.jogadorDestinoForte.id)
    this.algoritmosService.obterCaminhoForte(this.jogadorService.userValue.id.toString(),this.jogadorDestinoForte.id.toString()).subscribe(async (valor:Tamanho)=>{this.resultadoCaminhoForte=valor})
    await new Promise(f => setTimeout(f, 1000));
    console.log(this.resultadoCaminhoForte.t)
    var splitted = (this.resultadoCaminhoForte.t+"").split(",");
    var string="";
    this.jogadores= [];
    for (var val of splitted) {
      await this.jogadorService.getJogadorById(val).subscribe((jog:Jogador)=>{ this.jogadores.push(jog) });
      await new Promise(f => setTimeout(f, 100));
    }
    for(var jogador of this.jogadores){
      string=string+ "," +jogador.email;
    }
    this.resultadoCaminhoForteString=string;

  }

   async obterCaminhoCurto() : Promise<void> {
    this.jogadorService.getJogadorByEmail(this.emailCurto).subscribe((valor:Jogador)=>{this.jogadorDestinoCurto=valor})
    await new Promise(f => setTimeout(f, 1000));
    console.log(this.jogadorDestinoCurto.id)
    this.algoritmosService.obterCaminhoCurto(this.jogadorService.userValue.id.toString(),this.jogadorDestinoCurto.id.toString()).subscribe((valor:Tamanho)=>{this.resultadoCaminhoCurto=valor
    var string="";
    for(var jogador of this.resultadoDFS.c){
      string=string+ "," +jogador;
    }
    this.resultadoDFSString=string;
    });
  }





  async obterDFSMaxN(): Promise<void>  {

     this.resultadoDFSString="";
    this.jogadorService.getJogadorByEmail(this.emailDFS).subscribe((valor:Jogador)=>{this.jogadorDestinoCurto=valor})
    await new Promise(f => setTimeout(f, 1000));
    this.algoritmosService.dfsMaxN(this.jogadorService.userValue.id,this.jogadorDestinoCurto.id,this.n).subscribe( async d=>{

    this.jogadores= [];
    for (var val of d.c) {
      console.log(val)
      // this.resultadoDFSString+=","+this.jogadorService.getJogadorById2(val).email;
       this.jogadorService.getJogadorById(val).subscribe((jog:Jogador)=>{ this.resultadoDFSString= this.resultadoDFSString+ "," +jog.email;console.log(jog.email)});
      await new Promise(f => setTimeout(f, 100));
    }
    this.custo=d.t;
  });
  }

  async dfsMaxN_multicriterio_R(): Promise<void>  {
    this.resultadoDFSString2="";
    this.jogadorService.getJogadorByEmail(this.emailDFS2).subscribe((valor:Jogador)=>{this.jogadorDestinoCurto=valor})
    await new Promise(f => setTimeout(f, 1000));
    this.algoritmosService.dfsMaxN_multicriterio_R(this.jogadorService.userValue.id,this.jogadorDestinoCurto.id,this.n2).subscribe(async d=>{

    console.log(d)
      this.jogadores= [];
      for (var val of d.c) {
          await this.jogadorService.getJogadorById(val).subscribe((jog:Jogador)=>{ this.resultadoDFSString2= this.resultadoDFSString2+ "," +jog.email;console.log(jog.email) ;});
        await new Promise(f => setTimeout(f, 100));
      }
      this.custo2=d.t;
    });
  }

  plan_dfs_multi_emoR() {
    this.resultadoEmocoes="";
    this.jogadorService.getJogadorByEmail(this.emailDFS3).subscribe( async (valor:Jogador)=>{this.jogadorDestinoCurto=valor
    this.algoritmosService.plan_dfs_multi_emoR(this.jogadorService.userValue.id,this.jogadorDestinoCurto.id,this.n3,this.estados,this.limiteForca).subscribe(d=>{
      this.jogadores= [];
       Promise.all(d.c.map(async (file) => {
        const contents =  this.jogadorService.getJogadorById(file).subscribe((jog:Jogador)=>{ this.resultadoEmocoes= this.resultadoEmocoes+ "," +jog.email;console.log(jog.email)});
         await new Promise(f => setTimeout(f, 100));
        console.log(contents)
      }));
    });});
  }

  plan_grupoR() {
    this.resultadoGrupo="";
      this.algoritmosService.plan_grupoR(this.jogadorService.userValue.id,this.n4,this.tags,this.obrigatorias).subscribe( async d=>{
        this.jogadores= [];
        var jogadores2=[""];
        for (var val of d.t) {
          if(!jogadores2.includes(val)){
             this.jogadorService.getJogadorById(val+"").subscribe((jog:Jogador)=>{ this.resultadoGrupo= this.resultadoGrupo+ "," +jog.email;console.log(jog.email)});
            jogadores2.push(val);
            await new Promise(f => setTimeout(f, 100));
          }
        }
      });
  }
}
