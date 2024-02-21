import { Component, OnInit } from '@angular/core';
import {Jogador} from "../../../../jogador";
import {JogadorService} from "../../../../jogador.service";
import {Estadohumor} from "../../../../estadohumor";

declare function pararGrafo():any;

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  data=new Date();
  jogador=new Jogador("","","","","","","","",new Date().toDateString(),"","","","",this.data.getDay()+"/"+this.data.getMonth()+"/"+this.data.getFullYear());
  constructor(public jogadorservice:JogadorService) { }

  ngOnInit(): void {
    pararGrafo();
  }

  atualizarDados(){
      if(this.jogador.nome==="")
        this.jogador.nome=this.jogadorservice.userValue.nome;
    if(this.jogador.email==="")
      this.jogador.email=this.jogadorservice.userValue.email;
      if(this.jogador.telefone==="")
        this.jogador.telefone=this.jogadorservice.userValue.telefone;
      if(this.jogador.pais==="")
        this.jogador.pais=this.jogadorservice.userValue.pais;
      if(this.jogador.rua==="")
        this.jogador.rua=this.jogadorservice.userValue.rua;
      if(this.jogador.localidade==="")
        this.jogador.localidade=this.jogadorservice.userValue.localidade;
      if(this.jogador.codigoPostal==="")
        this.jogador.codigoPostal=this.jogadorservice.userValue.codigoPostal;
      if(this.jogador.linkedInLink==="")
        this.jogador.linkedInLink=this.jogadorservice.userValue.linkedInLink;
      if(this.jogador.facebookLink==="")
        this.jogador.facebookLink=this.jogadorservice.userValue.facebookLink;
      // if(this.jogador.interestTags==="")
      //
      //
      //   this.jogador.interestTags=this.jogadorservice.userValue.interestTags;
      this.jogador.interestTags="tag1";
      this.jogador.id=this.jogadorservice.userValue.id;
      this.jogador.estadoHumor=this.jogadorservice.userValue.estadoHumor;
      this.jogador.dataNascimento= this.jogadorservice.userValue.dataNascimento.split(' ')[0];
      this.jogador.dataEstadoHumor=this.jogadorservice.userValue.dataEstadoHumor;

      this.jogadorservice.atualizarDadosJogador(this.jogador).subscribe((valor)=> this.jogador=valor);
      alert("Dados do perfil atualizados")
  }

}
