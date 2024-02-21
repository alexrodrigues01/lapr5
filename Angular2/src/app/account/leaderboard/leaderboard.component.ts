import { Component, OnInit } from '@angular/core';
import {Jogador} from "../../jogador";
import {JogadorLeaderboard} from "../../jogadorLeaderboard";
import {LeaderBoardService} from "../../leaderBoardService";

declare function pararGrafo():any;

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  leaderBoardDim : JogadorLeaderboard[];
  leaderBoardFort: JogadorLeaderboard[];

  constructor(public leaderBoardService:LeaderBoardService) {
    this.leaderBoardDim=[];
    this.leaderBoardFort=[];
    // this.leaderBoardDim.push(new JogadorLeaderboard("Rui Pedro","rui@gmail.com","20"));
    // this.leaderBoardDim.push(new JogadorLeaderboard("Alex Rodrigues","alex@gmail.com","27"));
  }

  ngOnInit(): void {
    pararGrafo();
    this.getLeaderBoardDimesao()
    this.getLeaderBoardFortaleza()

  }

  async getLeaderBoardDimesao(){
  this.leaderBoardService.getLeaderBoardDimensao().subscribe((jogadores:JogadorLeaderboard[])=>this.loop(jogadores));
  }

  loop(jogLeader: JogadorLeaderboard[]){
    for(var val of jogLeader){
      this.leaderBoardDim.push(val);
    }
  }


  async getLeaderBoardFortaleza(){
    this.leaderBoardService.getLeaderBoardFortaleza().subscribe((jogadores:JogadorLeaderboard[])=>this.loop2(jogadores));
  }

  loop2(jogLeader: JogadorLeaderboard[]){
    for(var val of jogLeader){
      this.leaderBoardFort.push(val);
    }
  }


}
