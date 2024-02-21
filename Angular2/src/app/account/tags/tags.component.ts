import { Component, OnInit } from '@angular/core';
import {TagService} from "../../tagService";
import {Tag} from "../../tag";
import {Jogador} from "../../jogador";
import {JogadorService} from "../../jogador.service";

declare function pararGrafo():any;

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tagsUtilizadores: Tag[];
  tagsUsersString:string="";

  tagsRelacoes: Tag[];
  tagsRelacoesString:string="";

  tagsUtilizador: Tag[];
  tagsUtilizadorString:string="";

  tagsRelacoesJog: Tag[];
  tagsRelacoesJogString:string="";


  constructor(public tagsService: TagService, public jogadorService: JogadorService) {
    this.tagsUtilizadores=[];
    this.tagsRelacoes=[];
    this.tagsUtilizador=[];
    this.tagsRelacoesJog=[];
  }

  ngOnInit(): void {
    pararGrafo();
  }

  async obterTagsUtilizadores(): Promise<void>{
    this.tagsService.getTagsUtilizadores().subscribe((tags:Tag[])=>this.loop(tags));
    await new Promise(f => setTimeout(f, 100));
    var string= "";
    var num= 0;
    for(var val of this.tagsUtilizadores){
      if(num===0) {
        string = val.descricao;
        num++;
      }else{
        string=string+" , " + val.descricao;
      }

    }
    this.tagsUsersString=string;
  }

  loop(tagsUtilizador : Tag[]){
    for (var val of tagsUtilizador) {
      this.tagsUtilizadores.push(val);
    }
  }


  async obterTagsRelacoes(): Promise<void>{
    this.tagsService.getTagsRelacoes().subscribe((tags:Tag[])=>this.loop2(tags));
    await new Promise(f => setTimeout(f, 100));
    var string= "";
    var num= 0;
    for(var val of this.tagsRelacoes){
      if(num===0) {
        string = val.descricao;
        num++;
      }else{
        string=string+" , " + val.descricao;
      }

    }
    this.tagsRelacoesString=string;
  }

  loop2(tagsUtilizador : Tag[]){
    for (var val of tagsUtilizador) {
      this.tagsRelacoes.push(val);
    }
  }


  async obterTagsUtilizador(): Promise<void>{
    this.tagsService.getTagsUtilizador(this.jogadorService.userValue.id).subscribe((tags:Tag[])=>this.loop3(tags));
    await new Promise(f => setTimeout(f, 100));
    var string= "";
    var num= 0;
    for(var val of this.tagsUtilizador){
      if(num===0) {
        string = val.descricao;
        num++;
      }else{
        string=string+" , " + val.descricao;
      }

    }
    this.tagsUtilizadorString=string;
  }

  loop3(tagsUtilizador : Tag[]){
    for (var val of tagsUtilizador) {
      this.tagsUtilizador.push(val);
    }
  }

  async obterTagsRelacoesJog(): Promise<void>{
    this.tagsService.getTagsRelacoesJog(this.jogadorService.userValue.id).subscribe((tags:Tag[])=>this.loop4(tags));
    await new Promise(f => setTimeout(f, 100));
    var string= "";
    var num= 0;
    for(var val of this.tagsRelacoesJog){
      if(num===0) {
        string = val.descricao;
        num++;
      }else{
        string=string+" , " + val.descricao;
      }

    }
    this.tagsRelacoesJogString=string;
  }

  loop4(tagsUtilizador : Tag[]){
    for (var val of tagsUtilizador) {
      this.tagsRelacoesJog.push(val);
    }
  }




}
