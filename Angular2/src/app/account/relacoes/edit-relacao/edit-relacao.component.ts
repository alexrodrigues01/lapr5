import { Component, OnInit } from '@angular/core';
import {RelacoesComponent} from "../relacoes.component";
import {RelacaoService} from "../../../relacao.service";
import {Relacao} from "../../../relacao";

import {Tag} from "../../../tag";


@Component({
  selector: 'app-edit-relacao',
  templateUrl: './edit-relacao.component.html',
  styleUrls: ['./edit-relacao.component.css']
})
export class EditRelacaoComponent implements OnInit {

  public relacaoSelecionada= new Relacao("","","","",-1,0,"");

  public tag= new Tag("","");
  constructor(public relacoesService:RelacaoService) { }

  ngOnInit(): void {
  }

  atualizarDados(){

    if(this.relacaoSelecionada.forcaLigacao==-1){
      this.relacaoSelecionada.forcaLigacao=this.relacoesService.relacaoSelecionada.forcaLigacao;
    }
    if(this.relacaoSelecionada.tagsRelacao==""){

      this.relacaoSelecionada.tagsRelacao="tag";
    }
    this.relacaoSelecionada.id=this.relacoesService.relacaoSelecionada.id;
    this.relacaoSelecionada.jogadorA=this.relacoesService.relacaoSelecionada.jogadorA;
    this.relacaoSelecionada.jogadorB=this.relacoesService.relacaoSelecionada.jogadorB;
    this.relacaoSelecionada.forcaRelacao=this.relacoesService.relacaoSelecionada.forcaRelacao;
    this.relacaoSelecionada.dataRelacao=this.relacoesService.relacaoSelecionada.dataRelacao.split(" ")[0];

    this.relacoesService.atualizarDados(this.relacaoSelecionada).subscribe((valor)=> this.relacaoSelecionada=valor);
    alert("Relacao Atualizada")
  }

  getTag(id:string){
    this.relacoesService.getTagById(id).subscribe((tag2:Tag)=>{this.tag=tag2});
  }

}
