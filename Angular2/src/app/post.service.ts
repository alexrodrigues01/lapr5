import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Post} from "./post";
import {Jogador} from "./jogador";
import {catchError} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {PostCreate} from "./postCreate";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url= "http://localhost:3000/api/posts";
  private data=new Date();
  public postEscolhido:Post=new Post("","","","",[],[],[]);
  public jogadorEscolhido:string="Desconhecido";


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };



  constructor(
    private http : HttpClient,
  ) {
  }

  createPost(post:PostCreate){
    return this.http.post<PostCreate>(this.url, post,this.httpOptions).pipe(
      catchError(this.handleError<PostCreate>('createPost')));
  }

  getAllPosts(userId:string){

  }

  postByUser(userId:string){
    return this.http.get<Post[]>(this.url+"/postsByUser/"+userId).pipe(catchError(this.handleError<Post[]>("postByUser")));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  like(userId:string,postId:string) {
    const body={post:postId , userID:userId, valor:"1"}
    return this.http.put<Post>(this.url+"/reacao", body,this.httpOptions).pipe(catchError(this.handleError<Post>("like")));
  }

  dislike(userId:string,postId:string) {
    const body={post:postId , userID:userId, valor:"0"}
    return this.http.put<Post>(this.url+"/reacao", body,this.httpOptions).pipe(catchError(this.handleError<Post>("dislike")));
  }
}
