import { Component, OnInit } from '@angular/core';
import {Post} from "../../../post";
import {JogadorService} from "../../../jogador.service";
import {PostService} from "../../../post.service";
import {ComentarioService} from "../../../ComentarioService";
import {Comentario} from "../../../comentario";
import {Jogador} from "../../../jogador";
import {RelacaoService} from "../../../relacao.service";


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {


  public comments:Comentario[]=[];
  public nomes:string[]=[];
  public texto:string="";

  constructor(public postService :PostService,public comentarioService:ComentarioService,public jogadorService:JogadorService, public relacaoService: RelacaoService) { }

  async ngOnInit(): Promise<void> {
    this.getAllComments();
    await new Promise(f => setTimeout(f, 1000));
    this.obterJogador();
  }

  async comentar():Promise<void>{
    this.comentarioService.comentar(this.texto,this.postService.postEscolhido.id,this.jogadorService.userValue.id+"" ).subscribe(d=>  {  this.comments.push(d);this.nomes.push(this.jogadorService.userValue.nome+"")});
    this.texto="";
    this.relacaoService.atualizarForcaRelacaoAcima(this.jogadorService.userValue.id+"",this.postService.postEscolhido.utilizador).subscribe(d=>console.log("Aumentar Forca Relacao"))
    alert("Comentário publicado com sucesso")
  }

  getAllComments() {
    console.log(this.postService.postEscolhido.comentarios)
    for(var id of this.postService.postEscolhido.comentarios){
      this.comentarioService.getById(id).subscribe(d=>this.comments.push(d));
    }

  }
  obterJogador(){
    for (var comment of this.comments) {
      this.jogadorService.getJogadorById(comment.utilizador).subscribe((jogador:Jogador)=>this.nomes.push(jogador.nome+""));
    }
  }
}
