import {Component, OnInit} from '@angular/core';
import {JogadorService} from "../../jogador.service";
import {PostService} from "../../post.service";
import {Post} from "../../post";
import {RelacaoService} from "../../relacao.service";
import {Relacao} from "../../relacao";
import {Jogador} from "../../jogador";
import {PostCreate} from "../../postCreate";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(public jogadorService: JogadorService, public postService: PostService, public relacaoService: RelacaoService) {
  }

  flag: boolean = false;
  flagDislike: boolean = false;
  relacoes: Relacao[] = [];
  posts: Post[] = [];
  postsAux: Post[] = [];
  jogadores: string[]=[];

  async ngOnInit(): Promise<void> {

    await this.getAllPosts();

    await new Promise(f => setTimeout(f, 1000));
    await this.verificarLikes();
    this.obterJogador();
  }

  like(event: Event) {
    // @ts-ignore
    var str = event.target.id;
    console.log(str)
    if ( // @ts-ignore
      document.getElementById(str).classList.contains('bodyClass2')) {


      // @ts-ignore
      // @ts-ignore
      document.getElementById(str).classList.remove('bodyClass2')

      // @ts-ignore
      document.getElementById(str).classList.add('bodyClass1');
    } else {

      var strSplitted2 = str.split("-");
      // this.posts[strSplitted2[1]].likes.push(this.jogadorService.userValue.id + "");

      this.postService.like(this.jogadorService.userValue.id+"",this.posts[strSplitted2[1]].id).subscribe(d=>{this.posts[strSplitted2[1]].dislikes=d.dislikes;this.posts[strSplitted2[1]].likes=d.likes});
      this.relacaoService.atualizarForcaRelacaoAcima(this.jogadorService.userValue.id+"",this.posts[(strSplitted2[1])].utilizador).subscribe(d=>console.log("Aumentar Forca"));

      // @ts-ignore
      document.getElementById(str).classList.remove('bodyClass1');
      // @ts-ignore
      document.getElementById(str).classList.add('bodyClass2');
    }

    var strSplitted = str.split("-");
    // @ts-ignore
    document.getElementById("dislike-" + strSplitted[1]).classList.remove('bodyClass2');
  }

  deslike(event: Event) {
    // @ts-ignore
    var str = event.target.id;
    console.log(str)
    if ( // @ts-ignore
      document.getElementById(str).classList.contains('bodyClass2')) {

      // @ts-ignore
      document.getElementById(str).classList.remove('bodyClass2')

      // @ts-ignore
      document.getElementById(str).classList.add('bodyClass1');
    } else {
      var strSplitted2 = str.split("-");
      // this.posts[strSplitted2[1]].dislikes.push(this.jogadorService.userValue.id + "");


      this.postService.dislike(this.jogadorService.userValue.id+"",this.posts[(strSplitted2[1])].id).subscribe(d=>{this.posts[strSplitted2[1]].dislikes=d.dislikes;this.posts[strSplitted2[1]].likes=d.likes});

      this.relacaoService.atualizarForcaRelacaoAbaixo(this.jogadorService.userValue.id+"",this.posts[(strSplitted2[1])].utilizador).subscribe(d=>console.log("Diminuri Forca"));

      const index = this.posts[strSplitted2[1]].likes.indexOf(this.jogadorService.userValue.id+"");
      if (index > -1) {
        this.posts[strSplitted2[1]].likes.splice(index, 1);
      }


      // @ts-ignore
      document.getElementById(str).classList.remove('bodyClass1');
      // @ts-ignore
      document.getElementById(str).classList.add('bodyClass2');

    }

    var strSplitted = str.split("-");
    // @ts-ignore
    document.getElementById("like-" + strSplitted[1]).classList.remove('bodyClass2');

  }

  createPost(texto: string, tags: string) {
    this.postService.createPost(new PostCreate(texto, tags, this.jogadorService.userValue.id.toString())).subscribe((post: PostCreate) => console.log(post.texto));
    alert("Post publicado com sucesso")
  }

  obterJogador(){
    for (var post of this.posts) {
      this.jogadorService.getJogadorById(post.utilizador).subscribe((jogador:Jogador)=>this.jogadores.push(jogador.nome+""));
    }

  }

  async getAllPosts(): Promise<void> {
    this.relacoes = [];
    this.posts = [];

    // this.posts.push(new Post("", "Gosto de esparguete", "massa,esparguete,pasta", "User1", [this.jogadorService.userValue.id+""], [], []));

    this.relacaoService.getRelacoes(this.jogadorService.userValue.id.toString()).subscribe(rel => this.loop(rel));

    await new Promise(f => setTimeout(f, 1000));
    for (var rel of this.relacoes) {

      if (rel.jogadorA !== this.jogadorService.userValue.id) {
        this.postService.postByUser(rel.jogadorA).subscribe(post => this.loopPost(post));

      } else {
        this.postService.postByUser(rel.jogadorB).subscribe(post => this.loopPost(post));
      }
    }

  }

  loop(relacaos: Relacao[]) {
    for (var val of relacaos) {
      this.relacoes.push(val);
    }
  }

  loopPost(posts: Post[]) {
    for (var val of posts) {
      console.log(val)
      this.posts.push(val);
    }
  }

  lenghtLista(lista: string[]): string {
    return lista.length + "";
  }

  private async verificarLikes(): Promise<void> {

    for (var val of this.posts) {
      console.log("Entrei na verificacao de likes")
      if(val.likes.includes(this.jogadorService.userValue.id+"")){
        console.log("DEI LIKE  "+ this.jogadorService.userValue.id +" no post: " + val.id)
        // @ts-ignore
        document.getElementById("like-" + this.posts.indexOf(val)).classList.add('bodyClass2')
      }

      if(val.dislikes.includes(this.jogadorService.userValue.id+"")){
        // @ts-ignore
        document.getElementById("dislike-" + this.posts.indexOf(val)).classList.add('bodyClass2')
      }

    }
  }

  seeComments(post:Post) {
    this.postService.postEscolhido=post;
    this.postService.jogadorEscolhido=this.jogadores[this.posts.indexOf(post)]
  }
}
