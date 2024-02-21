import { Component, OnInit } from '@angular/core';
import {JogadorService} from "../jogador.service";
import {Estadohumor} from "../estadohumor";
import {Jogador} from "../jogador";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  jogador=new Jogador("","","","","","","","",new Date().toDateString(),"","","","",new Date().toDateString());


  constructor(public jogadorservice:JogadorService) { }

  ngOnInit(): void {

  }

   login(){
    this.jogadorservice.login((<HTMLInputElement>document.getElementById("login")).value,(<HTMLInputElement>document.getElementById("password")).value).subscribe((estado1 : Jogador) =>{this.jogador=estado1});
  }

}
