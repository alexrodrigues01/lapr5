import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Jogador } from './jogador';
import {Estadohumor} from "./estadohumor";
import {Pedidoligacao} from "./pedidoligacao";
import {RelacaoGrafo} from "./relacaoGrafo";


@Injectable({
  providedIn:'root'
})
export class JogadorService{
  private jogadoresUrl= "https://localhost:5001/api/Jogadores";
  private estadosUrl = 'https://localhost:5001/api/EstadosHumor'; // URL to web api
  private pedidosUrl= 'https://localhost:5001/api/PedidosLigacao'
  private userSubject: BehaviorSubject<Jogador>;
  public user: Observable<Jogador>;
  public nivelGrafo: number= 0;
  public grafoComum: number=0;
  public amigoGrafoComum: string="";


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };




  constructor(
    private http : HttpClient,
  ) {
    this.userSubject = new BehaviorSubject<Jogador>(JSON.parse(<string>localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }
  public get userValue(): Jogador {
    return this.userSubject.value;
  }
  login(username:string, password:string) {
    console.log("LOGIN");
    return this.http.get<Jogador>("https://localhost:5001/api/jogadores/autenticar/"+ username + "/"+ password)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  /** POST: adiciona um jogador */
   addJogador(jogador : Jogador) : Observable<Jogador>{

    console.log("CHEGUEI");
    console.log(jogador);
    return this.http.post<Jogador>(this.jogadoresUrl, jogador,this.httpOptions).pipe(
      catchError(this.handleError<Jogador>('addJogador')));



    // return this.http.get<Estadohumor>(this.estadosUrl+"/07215e28-af6e-4853-996e-d51848ae1292").pipe(catchError(this.handleError<Estadohumor>('addJogador')));
  }

  atualizarDadosJogador(jogador: Jogador){
     return this.http.put<Jogador>(this.jogadoresUrl + "/"+ this.userValue.id,jogador,this.httpOptions).pipe(catchError( this.handleError<Jogador>('atualizarDadosJogador')));

   // return this.http.put<Estadohumor>(this.estadosUrl+"/"+estado.id,estado,this.httpOptions).pipe(catchError( this.handleError<Estadohumor>('getEstadoHumorById')));
  //}
  }

  getJogadorById2(id:string){
    // return this.http.get<Jogador>(this.jogadoresUrl + "/"+ id).pipe(catchError( this.handleError<Jogador>('getJogadorById')));
    let jogador:Jogador=new Jogador("","","","","","","","","","","","","","");
     fetch(this.jogadoresUrl + "/"+ id).then(res=>res.json()).then(json=>{console.log(json);jogador=new Jogador(json.id,json.nome,json.email,json.telefone,json.pais,json.rua,json.localidade,json.codigoPostal,json.dataNascimento,json.linkedInLink,json.facebookLink,json.interestTags,json.estadoHumor,json.dataEstadoHumor)});

     return jogador;
   }
  getJogadorById(id:string){
    return this.http.get<Jogador>(this.jogadoresUrl + "/"+ id).pipe(catchError( this.handleError<Jogador>('getJogadorById')));
  }

  getJogadorByEmail(email:string){
    return this.http.get<Jogador>(this.jogadoresUrl + "/e,"+ email).pipe(catchError( this.handleError<Jogador>('getJogadorById')));
  }

  getAllJogadores():Observable<Jogador[]>{
    console.log("Pedidos Ligacao");
    return this.http.get<Jogador[]>(this.jogadoresUrl+'/GetAllNaoAmigos/'+this.userValue.id)
      .pipe(catchError(this.handleError<Jogador[]>('getAllJogadores')));
  }

  getJogadoresObjetivo():Observable<Jogador[]>{
     return this.http.get<Jogador[]>(this.jogadoresUrl+"/jogadoresobjetivo/"+this.userValue.id).pipe(catchError(this.handleError<Jogador[]>("getJogadoresObjetivo")));
  }

  enviarPedido(id: string) : Observable<Pedidoligacao> {
      return this.http.post<Pedidoligacao>(this.pedidosUrl,new Pedidoligacao("",this.userValue.id.toString(),id),this.httpOptions).pipe(catchError(this.handleError<Pedidoligacao>("enviarPedido")));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  getJogadoresIntermedio(jogadorObjetivoid:string) {
    return this.http.get<Jogador[]>(this.jogadoresUrl+"/"+this.userValue.id +"&"+ jogadorObjetivoid).pipe(catchError(this.handleError<Jogador[]>("getJogadoresIntermedio")));
  }

  getRelacoes(id: String,nivel : string) {
    return this.http.get<string[]>(this.jogadoresUrl+"/u"+this.userValue.id+ "/"+ nivel).pipe(catchError(this.handleError<string[]>("getRelacoes")));
  }

  getRelacoesAmigoComum(id: String, amigoGrafoComum: string) {
    return this.http.get<string[]>(this.jogadoresUrl+"/grafoComum/usr1="+id+"&usr2="+amigoGrafoComum).pipe(catchError(this.handleError<string[]>("getRelacoesAmigoComum")));
  }

  getForcaLigacao(caminho: string){
    return this.http.get<string>(this.jogadoresUrl+"/getForcaCaminho/"+caminho).pipe(catchError(this.handleError<string>("getForcaLigacao")))
  }

  getLigacoesSegundoN(jogadorId: string) {
    return this.http.get<string>(this.jogadoresUrl+"/ligacoesSegundoN/"+jogadorId).pipe(catchError(this.handleError<string>("getLigacoesSegundoN")))
  }

  getRelacoesNivel(id: String, nivel: number) {
    return this.http.get<RelacaoGrafo[]>(this.jogadoresUrl+"/relacoesNivel/"+id+"/"+nivel).pipe(catchError(this.handleError<RelacaoGrafo[]>("getRelacoesNivel")))
  }
}
