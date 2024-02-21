import {Component, NgZone, OnInit} from '@angular/core';
import {Estadohumor} from "../../../estadohumor";
import{EstadohumorService} from "../../../estadohumor.service";
import{ProfileComponent} from "../profile.component";
import{AccountComponent} from "../../account.component";
import {JogadorService} from "../../../jogador.service";


@Component({
  selector: 'app-get-estado-humor',
  templateUrl: './get-estado-humor.component.html',
  styleUrls: ['./get-estado-humor.component.css']
})
export class GetEstadoHumorComponent implements OnInit {


  estado2 = new Estadohumor('',"",'vazio');
  estado = new Estadohumor('',"",'vazio');
  data=new Date();

  estados=["Joyful",
    "Distressed",
    "Hopeful",
    "Fearful",
    "Relieve",
    "Disappointed",
    "Proud",
    "Remorseful",
    "Grateful",
    "Angry"];

  constructor(private estadohumorservice:EstadohumorService,public jogadorservice:JogadorService) { }

  ngOnInit(): void {
    this.getEstadoHumor();
  }

  getEstadoHumor(){
    this.estadohumorservice.getEstadoHumorById(this.jogadorservice.userValue.estadoHumor).subscribe((estado1 : Estadohumor) =>{this.estado=estado1});
  }

  atualizarEstadoHumor(){
    this.data = new Date();
    let value = (<HTMLSelectElement>document.getElementById('estado_selecionar')).value;
    console.log(value);
    this.estadohumorservice.atualizarEstadoHumor(new Estadohumor(this.jogadorservice.userValue.estadoHumor, this.data.getDay()+1+"/"+this.data.getMonth()+"/"+this.data.getFullYear(),value)).subscribe((data: Estadohumor) => this.estado=data);
    alert("Estado de humor atualizado")
  }




}
