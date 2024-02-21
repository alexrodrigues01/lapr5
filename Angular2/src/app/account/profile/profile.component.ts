import { Component, OnInit } from '@angular/core';
import {JogadorService} from "../../jogador.service";
import {PostService} from "../../post.service";
import {ComentarioService} from "../../ComentarioService";
import {RelacaoService} from "../../relacao.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  constructor(public jogadorService: JogadorService, public relacaoService: RelacaoService) { }

  ngOnInit(): void {
  }

  apagarConta() {
    alert("Conta apagada com sucesso")
    // this.relacaoService.apagarRelacoes(this.jogadorService.userValue.id.toString());
  }
}
