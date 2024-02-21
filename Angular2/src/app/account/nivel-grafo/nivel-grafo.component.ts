import { Component, OnInit } from '@angular/core';
import {JogadorService} from "../../jogador.service";

declare function pararGrafo():any;

@Component({
  selector: 'app-nivel-grafo',
  templateUrl: './nivel-grafo.component.html',
  styleUrls: ['./nivel-grafo.component.css']
})
export class NivelGrafoComponent implements OnInit {

  public nivelGrafo : number= 0;
  constructor(public jogadorService: JogadorService) { }

  ngOnInit(): void {
    pararGrafo();
  }

  guardarnivel() {
    console.log("NIVEL GRAFO")
    console.log(this.nivelGrafo)
    this.jogadorService.nivelGrafo=this.nivelGrafo;
  }
}
