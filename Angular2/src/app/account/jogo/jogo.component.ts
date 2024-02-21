import {Component, ElementRef, OnInit, ViewChild, ViewRef} from '@angular/core';
import {Jogador} from "../../jogador";
import {Relacao} from "../../relacao";
import {JogadorService} from "../../jogador.service";
import {FlyControls} from "three/examples/jsm/controls/FlyControls";




declare function createDrawing(relacoes: string[],emailLog : string): any;

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})



export class JogoComponent implements OnInit {

  public listaRelacoes  : string [] ;
  public listaRelacoesComum: string [];


  //
  // private renderer: THREE.WebGL1Renderer;
  // private scene : THREE.Scene;
  // private camera: THREE.PerspectiveCamera;


  @ViewChild('renderView') renderView!: ElementRef;
  constructor(public jogadorService: JogadorService) {
    this.listaRelacoes= [];
    this.listaRelacoesComum= [];

  //   const geometry = new SphereGeometry(15,30);
  //   const material = new THREE.MeshBasicMaterial({
  //     color: "#ffffff",
  //     wireframe: true
  //   });
  //   const mesh = new THREE.Mesh(geometry,material);
  //   this.scene=new THREE.Scene();
  //   this.camera= new PerspectiveCamera(110,window.innerWidth/window.innerHeight,0.1,1000);
  //   this.renderer= new WebGL1Renderer();
  //   this.scene.add(mesh);
  // this.camera.translateZ(20);
  //   var drawing;
  //   function createDrawing() {
  //     drawing = new Drawing.SimpleGraph({layout: '2d', selection: true, numNodes: 3, graphLayout:{attraction: 5, repulsion: 0.5}, showStats: false, showInfo: true, showLabels: true});
  //   }
  }


  async ngOnInit(): Promise<void> {
    if(this.jogadorService.grafoComum===0) {
      this.getRelacoes();
      await new Promise(f => setTimeout(f, 2000));
      createDrawing(this.listaRelacoes, this.jogadorService.userValue.email.toString());
    }
    else{
      this.getRelacoesAmigoComum();
      await new Promise(f => setTimeout(f, 2000));
      createDrawing(this.listaRelacoesComum, this.jogadorService.userValue.email.toString());
      this.jogadorService.grafoComum=0;
    }
  }

  getRelacoes(){

      this.jogadorService.getRelacoes(this.jogadorService.userValue.id,(this.jogadorService.nivelGrafo+1)+"").subscribe((relacoes2:string[])=>this.loop(relacoes2));

    }
    loop(relacoesArray:string[]){
    for(var val of relacoesArray){
      console.log("AAAAAAAAAAAAAAAAAA")
      console.log(val);
      this.listaRelacoes.push(val);
    }
  }

  getRelacoesAmigoComum(){
    this.jogadorService.getRelacoesAmigoComum(this.jogadorService.userValue.id,this.jogadorService.amigoGrafoComum).subscribe((relacoes3:string[])=>this.loop2(relacoes3));
  }

  loop2(relacoesArray:string[]) {
    for (var val of relacoesArray) {
      this.listaRelacoesComum.push(val);
    }
  }

  ngAfterViewInit(){
    // this.renderer.setSize(window.innerWidth,window.innerHeight);
    // this.renderView.nativeElement.appendChild(this.renderer.domElement);
    // this.animate();
  }

  animate(){
    requestAnimationFrame(()=>this.animate())
    // this.renderer.render(this.scene,this.camera);
    // this.renderer.setSize(window.innerWidth,window.innerHeight);
  }



}
