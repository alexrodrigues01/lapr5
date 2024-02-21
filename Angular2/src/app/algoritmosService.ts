import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Jogador } from './jogador';
import {Estadohumor} from "./estadohumor";
import {Pedidoligacao} from "./pedidoligacao";
import {Relacao} from "./relacao";
import {Pedidointroducao} from "./pedidointroducao";
import {Tamanho} from "./tamanho";
import {Conexoes} from "./Conexoes";
import {dfsDto} from "./dfsDto";
import {grupoDTO} from "./grupoDTO";


@Injectable({
  providedIn:'root'
})
export class AlgoritmosService {
  private prologURL : string= "https://vs-gate.dei.isep.ipp.pt:30811/"


  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private listaJogadoresCurto: Jogador [];


  constructor(
    private http: HttpClient,
  ) {
    this.listaJogadoresCurto=[];
  }

  obterTamanhoRede(id:string, nivel: string): Observable<Tamanho>{
    return  this.http.get<Tamanho>(this.prologURL+ "getTamanho?i=" + id + "&n="+ nivel).pipe(catchError(this.handleError<Tamanho>("obterTamanhoRede")))

  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  public auxiliarConexoes: Conexoes= new Conexoes("");

  obterConexoes(s: string, nivelConexoes: string) {
    return this.http.get<Tamanho>(this.prologURL+"getSugestoes?i="+s+ "&n="+ nivelConexoes).pipe(catchError(this.handleError<Tamanho>("obterConexoes")))
  }

   obterComum(numeroTags: string, tagsComum: string) {

     return this.http.get<Conexoes>(this.prologURL+"getTagsPartilhadas?i="+numeroTags + "&t=" + tagsComum).pipe(catchError(this.handleError<Conexoes>("obterComum")))
       ;
  }

  obterCaminhoCurto(idOrigem : string, idDestino: string){
    console.log("ID ORIGEM")
    console.log(idOrigem)
    console.log("ID DESTINO")
    console.log(idDestino)
    return this.http.get<Tamanho>(this.prologURL+"caminhoCurto?i="+idOrigem + "&n=" + idDestino).pipe(catchError(this.handleError<Tamanho>("obterComum")))
  }

  obterCaminhoForte(idOrigem: string, idDestino: string) {
    console.log("ID ORIGEM")
    console.log(idOrigem)
    console.log("ID DESTINO")
    console.log(idDestino)
    return this.http.get<Tamanho>(this.prologURL+"caminhoForte?i="+idOrigem + "&n=" + idDestino).pipe(catchError(this.handleError<Tamanho>("obterCaminhoForte")))
  }

  dfsMaxN(id: String, id2: String, n: string) {
    return this.http.get<dfsDto>(this.prologURL+"plan_dfsMaxN_R?o="+id + "&d=" + id2+"&n="+n).pipe(catchError(this.handleError<dfsDto>("dfsMaxN")))
  }

  dfsMaxN_multicriterio_R(id: String, id2: String, n: string) {
    return this.http.get<dfsDto>(this.prologURL+"dfsMaxN_multicriterio_R?o="+id + "&d=" + id2+"&n="+n).pipe(catchError(this.handleError<dfsDto>("dfsMaxN")))
  }

  plan_dfs_multi_emoR(id: String, id2: String, n3: string, estados: string, limiteForca: string) {
    return this.http.get<dfsDto>(this.prologURL+"plan_dfs_multi_emoR?o="+id + "&d=" + id2+"&n="+n3+"&estados="+estados+"&l="+limiteForca).pipe(catchError(this.handleError<dfsDto>("plan_dfs_multi_emoR")))
  }


  plan_grupoR(id: String, n4: string, tags: string, obrigatorias: string) {
    return this.http.get<grupoDTO>(this.prologURL+"plan_grupoR?o="+id + "&n="+n4+"&t="+tags+"&obg="+obrigatorias).pipe(catchError(this.handleError<grupoDTO>("plan_dfs_multi_emoR")))
  }
}
