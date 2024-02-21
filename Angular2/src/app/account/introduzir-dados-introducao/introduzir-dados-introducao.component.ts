import { Component, OnInit } from '@angular/core';
import {Pedidointroducao} from "../../pedidointroducao";
import {JogadorService} from "../../jogador.service";
import {PedidoIntroducaoService} from "../../pedidoIntroducaoService";

declare function pararGrafo():any;

@Component({
  selector: 'app-introduzir-dados-introducao',
  templateUrl: './introduzir-dados-introducao.component.html',
  styleUrls: ['./introduzir-dados-introducao.component.css']
})
export class IntroduzirDadosIntroducaoComponent implements OnInit {
  public novaIntroducao= new Pedidointroducao("","","","","","")
  constructor(public jogadorService: JogadorService, public pedidosIntroducaoService:PedidoIntroducaoService) { }

  ngOnInit(): void {
    pararGrafo();
  }

  criarPedidoIntroducao() {
    this.novaIntroducao.jogadorInicio=this.jogadorService.userValue.id.toString();
    this.novaIntroducao.jogadorIntermedio=this.pedidosIntroducaoService.jogadorIntermedioId;
    this.novaIntroducao.jogadorObjetivo=this.pedidosIntroducaoService.jogadorObjetivoId;
    this.pedidosIntroducaoService.criarPedidoIntroducao(this.novaIntroducao).subscribe((valor)=> this.novaIntroducao=valor);
    alert("Pedido Introdução criado")
  }
}
