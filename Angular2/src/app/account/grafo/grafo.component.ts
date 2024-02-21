import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as THREE from 'three'
import {Relacao} from "../../relacao";
import {RelacaoService} from "../../relacao.service";
import {JogadorService} from "../../jogador.service";
import {Jogador} from "../../jogador";
import {GUI} from "dat.gui";
import {RelacaoGrafo} from "../../relacaoGrafo";
import {PerspectiveCamera, WebGLRenderer} from "three";
import {FlyControls} from "three/examples/jsm/controls/FlyControls";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Nodes from "./Nodes";
import Graph from "./Graph";
import {AlgoritmosService} from "../../algoritmosService";
import {NodeDto} from "../../NodeDto";
import {EstadohumorService} from "../../estadohumor.service";


@Component({
  selector: 'app-grafo',
  templateUrl: './grafo.component.html',
  styleUrls: ['./grafo.component.css']
})
export class GrafoComponent implements OnInit {

  @ViewChild('canvas')
  // private canvasRef: ElementRef;
  email: string="";

  listaRelacoesTemp  : RelacaoGrafo []=[] ;

  sphereMesh: THREE.Mesh=new THREE.Mesh();

  raycaster = new THREE.Raycaster();

  scene: THREE.Scene= new THREE.Scene();

  camera: THREE.PerspectiveCamera= new PerspectiveCamera();

  miniMapCamera: THREE.OrthographicCamera= new THREE.OrthographicCamera(-30, 30, 30, -30);

  nivel: number=0;
  lines: boolean=true;
  navigate: boolean=false;
  jogadorEmail: string;
  jogadorEmailPath: string="";
  pathType: string="";
  dimension: boolean=true;
  autoRotate: boolean=false;
  circles: boolean=false;
  name: number;
  first: number;
  // id: string;
  infoid: number;
  relacoesString: string[]= [];
  emailsJogadores: NodeDto[]= [];
  niveis: []= [];
  renderer: THREE.WebGLRenderer= new WebGLRenderer();

  relacoesLista: Relacao[] = [];
  // @ts-ignore
  light1: THREE.PointLight;
  // @ts-ignore
  light2: THREE.PointLight;
  // @ts-ignore
  light4: THREE.PointLight;
  cameraLight: boolean=false;
  fixedLights: boolean=false;
  ambientLight: boolean=false;
  mostrarEmoji:boolean=true;
  showEmoji: boolean = true;
  caminhhoCurto: string= "";

  lightHelper: boolean=false;
  playerIdList: string[] = [];
  f: number=1;
  mouse: { x: number; y: number; } ={
    x: 8,
    y: 4};

  canvas: any;
  nodeTemp: any;
  labelTemp: any;
  avatarTemp:any;
  intersects: any;
  limit: number=0;
  jogador: Jogador;
  nodes: Nodes= new Nodes(this.jogadorService);
  graph: Graph= new Graph();

  constructor(private relacaoService: RelacaoService, private jogadorService: JogadorService, private algoritmoService: AlgoritmosService, private estadoHumorService: EstadohumorService) {
    this.name = 0;
    this.infoid = 0;
    this.jogador = new Jogador("", "", "", "", "", "", "", "", "", "", "", "", "", "");
    this.first = 0;
    this.jogadorEmail = "no"
  }


  async ngOnInit(): Promise<void>{
    this.canvas=document.getElementById("canvas");
    this.f = 1;
    this.email = this.jogadorService.userValue.email + "";
    this.cameraLight = true;
    this.fixedLights = true;
    this.ambientLight = true;
    this.lightHelper = false;


    const gui = new GUI({
      width: 350,
      autoPlace: false
    });
    gui.domElement.style.color=0x4287f5+"";
    var customContainer = document.getElementById('gui-container');
    if (customContainer)
      customContainer.appendChild(gui.domElement);

    const graphParams = {
      nivelParam: 0,
    }
    const graph3D = {
      nivelParam2: true,
    }
    const autoRotate = {
      nivelParam3: false,
    }
    const lines = {
      nivelParam4: true,
    }

    const flyControls = {
      nivelParam5: false,
    }
    const jogadorObjetivo = {
      nivelParam6: "Player Email",
    }

    const lights = {
      op1: false,
      op2: true,
      op3: true,
      op4: true,
    }
    const emoji = {
      mostrarEmoji: true
    }
    gui.add(graphParams, 'nivelParam', 0, 10).name('Depth Level').step(1).onFinishChange(() => {
      this.setNivel(graphParams.nivelParam);
    });
    gui.add(graph3D, 'nivelParam2', false).name('3D').onFinishChange(() => {
      this.setDimension(graph3D.nivelParam2);
    });
    gui.add(autoRotate, 'nivelParam3', false).name('Auto Rotate').onFinishChange(() => {
      this.setAutoRotate(autoRotate.nivelParam3);
      // this.renderer.render(this.scene, this.camera)
    });
    gui.add(lines, 'nivelParam4', false).name('Levels Lines').onFinishChange(() => {
      this.setLines(lines.nivelParam4);
    });
    gui.add(flyControls, 'nivelParam5', false).name('Navigate').onFinishChange(() => {
      this.setFlyControls(flyControls.nivelParam5);
    });
    gui.add(lights, 'op1', false).name('Show lights helper').onFinishChange(() => {
      this.setLightHelper(lights.op1);
    });
    gui.add(lights, 'op2', true).name('Ambient light').onFinishChange(() => {
      this.setAmbientLight(lights.op2);
    });
    gui.add(lights, 'op3', true).name('Two Fixed lights').onFinishChange(() => {
      this.setFixedLights(lights.op3);
    });
    gui.add(lights, 'op4', true).name('Camera light').onFinishChange(() => {
      this.setCameraLight(lights.op4);
    });
    gui.add(emoji, 'mostrarEmoji', true).name('Show emotional status').onFinishChange(() => {
      this.setMostarEmoji(emoji.mostrarEmoji);
    });
    gui.add(jogadorObjetivo, 'nivelParam6').name('Show path to ').onFinishChange(() => {
      this.setJogadorObjetivo(jogadorObjetivo.nivelParam6);
    });


    var arrow_keys_handler = function (e: { code: any; preventDefault: () => void; }) {
      switch (e.code) {
        case "ArrowUp": case "ArrowDown": case "ArrowLeft": case "ArrowRight":
        case "Space": e.preventDefault(); break;
        default: break; // do not block other keys
      }
    };
    window.addEventListener("keydown", arrow_keys_handler, false);

    this.mouse = {
      x: 8,
      y: 4
    }

    this.jogador=this.jogadorService.userValue;

    this.first=1;

    this.nivel=8;

    this.jogadorService.getRelacoesNivel(this.jogador.id,this.nivel).subscribe(dados=>{this.loop(dados);
    this.listaRelacoesTemp.forEach(relacao=>{
      if(!(this.playerIdList.includes(relacao.value.jogadorA))){
        this.playerIdList.push(relacao.value.jogadorA)
      }
      if(!(this.playerIdList.includes(relacao.value.jogadorB))){
        this.playerIdList.push(relacao.value.jogadorB)
      }
    })})

    console.log(this.listaRelacoesTemp)


    await new Promise(f => setTimeout(f, 1000));
    this.Scene();
    this.startRenderingLoop();
    this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));

  }

  loop(relacoesArray:RelacaoGrafo[]){
    for(var val of relacoesArray){
      this.listaRelacoesTemp.push(val);
    }
  }

  onMouseMove(event: any) {
    let canvasBound = this.canvas.getBoundingClientRect();
    var rect = this.renderer.domElement.getBoundingClientRect();

    //mouse.x = (event.clientX / canvas.width) * 2 - 1;
    //mouse.y = -(event.clientY /canvas.width) * 2 - 1;
    this.mouse.x = ( ( event.clientX - rect.left ) / ( rect.right - rect.left ) ) * 2 - 1 ;
    this.mouse.y = -( ( event.clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera)
  }

  Scene(){
    this.scene= new THREE.Scene();


    const material = new THREE.LineBasicMaterial({ color: 0x999999 });
    const points = [];
    const points2 = [];
    const points3 = [];
    const points4 = [];
    const points5 = [];
    const points6 = [];
    const points7 = [];

    var angulo = 0;
    for (var i = 0; i < 51; i++) {
      if (this.nivel > 0) {
        points.push(new THREE.Vector3(Math.cos(angulo) * 10, Math.sin(angulo) * 10, 0));
      }
      if (this.nivel > 1) {
        points2.push(new THREE.Vector3(Math.cos(angulo) * 20, Math.sin(angulo) * 20, 0));
      }
      if (this.nivel > 2) {
        points3.push(new THREE.Vector3(Math.cos(angulo) * 30, Math.sin(angulo) * 30, 0));
      }
      if (this.nivel > 3) {
        points4.push(new THREE.Vector3(Math.cos(angulo) * 40, Math.sin(angulo) * 40, 0));
      }
      if (this.nivel > 4) {
        points5.push(new THREE.Vector3(Math.cos(angulo) * 50, Math.sin(angulo) * 50, 0));
      }
      if (this.nivel > 5) {
        points6.push(new THREE.Vector3(Math.cos(angulo) * 60, Math.sin(angulo) * 60, 0));
      }
      if (this.nivel > 6) {
        points7.push(new THREE.Vector3(Math.cos(angulo) * 70, Math.sin(angulo) * 70, 0));
      }

      angulo = angulo + 2 * Math.PI / 50;
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    line.visible = this.lines;
    this.scene.add(line);

    const material2 = new THREE.LineBasicMaterial({ color: 0x999999 });
    const geometry2 = new THREE.BufferGeometry().setFromPoints(points2);
    const line2 = new THREE.Line(geometry2, material2);
    line2.visible = this.lines;
    this.scene.add(line2);

    const material3 = new THREE.LineBasicMaterial({ color: 0x999999 });
    const geometry3 = new THREE.BufferGeometry().setFromPoints(points3);
    const line3 = new THREE.Line(geometry3, material3);
    line3.visible = this.lines;
    this.scene.add(line3);

    const material4 = new THREE.LineBasicMaterial({ color: 0x999999 });
    const geometry4 = new THREE.BufferGeometry().setFromPoints(points4);
    const line4 = new THREE.Line(geometry4, material4);
    line4.visible = this.lines;
    this.scene.add(line4);

    const material5 = new THREE.LineBasicMaterial({ color: 0x999999 });
    const geometry5 = new THREE.BufferGeometry().setFromPoints(points5);
    const line5 = new THREE.Line(geometry5, material5);
    line5.visible = this.lines;
    this.scene.add(line5);

    const material6 = new THREE.LineBasicMaterial({ color: 0x999999 });
    const geometry6 = new THREE.BufferGeometry().setFromPoints(points6);
    const line6 = new THREE.Line(geometry6, material6);
    line6.visible = this.lines;
    this.scene.add(line6);

    const material7 = new THREE.LineBasicMaterial({ color: 0x999999 });
    const geometry7 = new THREE.BufferGeometry().setFromPoints(points7);
    const line7 = new THREE.Line(geometry7, material7);
    line7.visible = this.lines;
    this.scene.add(line7);

    //creating main camera
    this.camera = new THREE.PerspectiveCamera(7, window.innerWidth / window.innerHeight, 0.1, 3000);

    //creating mini-map camera
    this.miniMapCamera = new THREE.OrthographicCamera(-30, 30, 30, -30);
    this.miniMapCamera.up = new THREE.Vector3(0, 0, 0);
    this.miniMapCamera.lookAt(new THREE.Vector3(0, 0, -1));
    this.miniMapCamera.position.z = 50;

    let geometryJog = null;
    if(this.dimension) {
      geometryJog = new THREE.SphereGeometry(1.2, 32, 16);
    }else{
      geometryJog= new THREE.CircleGeometry(1.2,32);
    }


    const materialJog = new THREE.MeshLambertMaterial({ color: 0xB61616 });
    const sphereJog = new THREE.Mesh(geometryJog, materialJog);


    this.sphereMesh = sphereJog;


    sphereJog.name = this.jogador.id+"";
    sphereJog.userData = {type:"infoUser"}

    this.scene.add(sphereJog);

    this.light1 = new THREE.PointLight(0xffffff, 0.4, 100);
    this.light1.position.set(20, 0, 20);
    this.light1.castShadow = true;
    this.light1.shadow.mapSize.width = 100;
    this.light1.shadow.mapSize.height = 100;
    this.light1.name = 'light1';

    this.light2 = new THREE.PointLight(0xffffff, 0.4, 100);
    this.light2.position.set(-20, 0, 20);
    this.light2.castShadow = true;
    this.light2.shadow.mapSize.width = 100;
    this.light2.shadow.mapSize.height = 100;
    this.light2.name = 'light2';
    if (this.fixedLights) {
      this.scene.add(this.light1);
      this.scene.add(this.light2);
    }
    this.light4 = new THREE.PointLight(0xffffff, 1, 200);
    this.light4.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);
    this.light4.castShadow = true;
    this.light4.shadow.mapSize.width = 20;
    this.light4.shadow.mapSize.height = 20;
    this.light4.name = 'light4';
    if (this.cameraLight) {
      this.scene.add(this.light4);
    }
    const light3 = new THREE.AmbientLight(0x404040); // soft white light
    if (this.ambientLight) {
      this.scene.add(light3);
    }
    if (this.lightHelper && this.fixedLights) {
      this.scene.add(new THREE.PointLightHelper(this.light1, 0.5, 0xff0000));
      this.scene.add(new THREE.PointLightHelper(this.light2, 0.5, 0xff0000));
    }
    if (this.lightHelper && this.cameraLight) {
      this.scene.add(new THREE.PointLightHelper(this.light4, 0.5, 0xff0000));
    }

    this.nodes = new Nodes(this.jogadorService);
    this.graph = new Graph();

    var nivel1 = 0;
    var nivel2 = 0;
    var nivel3 = 0;
    var nivel4 = 0;
    var nivel5 = 0;
    var nivel6 = 0;
    var nivel7 = 0;
    var nivel8 = 0;
    var nivel9 = 0;
    var nivel10 = 0;
    var angulo1 = 0;
    var angulo2 = 2 * Math.PI / 34;
    var angulo3 = 2 * Math.PI / 30;
    var angulo4 = 2 * Math.PI / 26;
    var angulo5 = 2 * Math.PI / 22;
    var angulo6 = 2 * Math.PI / 18;
    var angulo7 = 2 * Math.PI / 14;
    var angulo8 = 2 * Math.PI / 10;
    var angulo9 = 2 * Math.PI / 6;
    var angulo10 = 2 * Math.PI / 2;
    var anguloAux = 0;
    this.listaRelacoesTemp.forEach(element => {
      if (element.key == 1) {
        nivel1++;
      } else if (element.key == 2) {
        nivel2++;
      } else if (element.key == 3) {
        nivel3++;
      } else if (element.key == 4) {
        nivel4++;
      } else if (element.key == 5) {
        nivel5++;
      } else if (element.key == 6) {
        nivel6++;
      } else if (element.key == 7) {
        nivel7++;
      } else if (element.key == 8) {
        nivel8++;
      } else if (element.key == 9) {
        nivel9++;
      } else if (element.key == 10) {
        nivel10++;
      }
    });



    this.listaRelacoesTemp.forEach(element => {

      if (element.key <= this.nivel) {
        if (element.key == 1) {
          angulo1 = angulo1 + 2 * Math.PI / nivel1;
          anguloAux = angulo1;
        } else if (element.key == 2) {
          angulo2 = angulo2 + 2 * Math.PI / nivel2;
          anguloAux = angulo2;
        } else if (element.key == 3) {
          angulo3 = angulo3 + 2 * Math.PI / nivel3;
          anguloAux = angulo3;
        } else if (element.key == 4) {
          angulo4 = angulo4 + 2 * Math.PI / nivel4;
          anguloAux = angulo4;
        } else if (element.key == 5) {
          angulo5 = angulo5 + 2 * Math.PI / nivel5;
          anguloAux = angulo5;
        } else if (element.key == 6) {
          angulo6 = angulo6 + 2 * Math.PI / nivel6;
          anguloAux = angulo6;
        } else if (element.key == 7) {
          angulo7 = angulo7 + 2 * Math.PI / nivel7;
          anguloAux = angulo7;
        } else if (element.key == 8) {
          angulo8 = angulo8 + 2 * Math.PI / nivel8;
          anguloAux = angulo8;
        } else if (element.key == 9) {
          angulo9 = angulo9 + 2 * Math.PI / nivel9;
          anguloAux = angulo9;
        } else if (element.key == 10) {
          angulo10 = angulo10 + 2 * Math.PI / nivel10;
          anguloAux = angulo10;
        }
        this.infoid++;
        this.name++;
        this.nodes.addNodeJogador(this.scene, element.key, element.value, anguloAux, this.name, this.camera, this.jogador.id+"", this.playerIdList, this.mostrarEmoji, this.infoid,this.dimension,this.estadoHumorService);
        this.name++;
        this.name++;
        this.name++;
        this.infoid++;
        this.nodes.addNodeJogadorAmigo(this.scene, element.key, element.value, anguloAux, this.name, this.camera, this.playerIdList, this.mostrarEmoji, this.infoid,this.dimension,this.estadoHumorService);
        this.name++;
        this.name++;
        this.name++;
        this.graph.criarConexao(this.scene, element.key, element.value, this.camera, this.name, this.jogadorService, this.dimension);

      }
    });

    this.camera.position.z=300;
    this.camera.position.y=-100;
  }

  private async startRenderingLoop() : Promise<void>{


    this.canvas = document.getElementById("canvas");
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    });

    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.renderer.shadowMap.enabled = true;


    for (let s = 0; s < 2; s++) {
    if(this.jogadorEmail!="no") {
      this.jogadorService.getJogadorByEmail(this.jogadorEmail).subscribe(jogador => {
        this.jogadorEmailPath = jogador.id+""
        this.algoritmoService.obterCaminhoCurto(this.jogador.id + "", this.jogadorEmailPath).subscribe(value => {
          this.caminhhoCurto = value.t
          let caminho = (value.t+"").split(",");
          for (let i = 0; i < caminho.length-1; i++) {
          this.jogadorService.getJogadorById(caminho[i]).subscribe(nome1=>{
            this.jogadorService.getJogadorById(caminho[i+1]).subscribe(nome2=>{
              if (this.scene.getObjectByName(nome1.email + "," + nome2.email) != null) {
                ((this.scene.getObjectByName(nome1.email + "," + nome2.email) as THREE.Mesh).material as THREE.Material) = new THREE.MeshBasicMaterial({color: 0x6a9705});
              }
              if (this.scene.getObjectByName(nome2.email + "," + nome1.email) != null) {
                ((this.scene.getObjectByName(nome2.email + "," + nome1.email) as THREE.Mesh).material as THREE.Material) = new THREE.MeshBasicMaterial({color: 0x6a9705});
              }
            })

          })


          }
        });
      });
    }




    }



    this.name = 0;
    this.light4.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);

    let component: GrafoComponent = this;


    const controls = new FlyControls(this.camera, this.renderer.domElement);
    controls.movementSpeed = 300;
    controls.rollSpeed = 0.105;
    controls.autoForward = false;
    controls.dragToLook = true;
    //}else{

    const controls2 = new OrbitControls(this.camera, this.renderer.domElement);
    controls2.enableRotate = this.dimension;
    controls2.enableDamping = true;
    controls2.enablePan = true;
    controls2.autoRotate = this.autoRotate;

    controls2.autoRotateSpeed = 1;

    let playerList = this.playerIdList
    let aux = this.navigate;

    let rayc = this.raycaster;
    let intersects = this.intersects;

    let camera = this.camera;
    let scene = this.scene;
    let canvas = this.canvas;
    let canvasBound = canvas.getBoundingClientRect();
    let mouse = this.mouse;
    let nodeTemp = this.nodeTemp;
    let labelTemp = this.labelTemp;
    let avatarTemp=this.avatarTemp;
    let listaRelacoes= this.listaRelacoesTemp;
    playerList.forEach(elemento=>{
      this.jogadorService.getJogadorById(elemento).subscribe(jogador=>{
        this.emailsJogadores.push(new NodeDto(jogador.id+"",jogador.email+""));
      })
    })
    listaRelacoes.forEach(elemento=>{
      this.jogadorService.getJogadorById(elemento.value.jogadorA).subscribe(jogadorA=>{
        this.jogadorService.getJogadorById(elemento.value.jogadorB).subscribe(jogadorB=>{
          this.relacoesString.push(( jogadorA.email)+ ","+(jogadorB.email));

        })
      })

    });
    await new Promise(f => setTimeout(f, 1000));
    let relacoesStringDistancia= this.relacoesString;
    let jogadoresListaDistancia= this.emailsJogadores;



    (function render() {

      //
      let cameraPosition = new THREE.Vector3(0, 0, 0);
      cameraPosition.x = camera.position.x
      cameraPosition.y = camera.position.y
      cameraPosition.z = camera.position.z;

      //console.log(mouse.x + " , " + mouse.y)


      intersects = rayc.intersectObjects(scene.children, false);
      if (intersects.length > 0) {
        for (let i = 0; i < intersects.length; i++) {
          if (nodeTemp != null) {
            nodeTemp.material.opacity = 1;
          }
          if (labelTemp != null) {
            labelTemp.visible = false;
          }
          if(avatarTemp!=null){
            avatarTemp.visible=false;
          }
          let name
          let objeto

          //@ts-ignore
          if (intersects[i].object.userData.type === "sphere") {

            //@ts-ignore
            objeto = intersects[i].object
            name = "info" + intersects[i].object.name;

            var objectAvatar=scene.getObjectByName("avatar"+ intersects[i].object.name)

            var object2 = scene.getObjectByName(name);


            //@ts-ignore
            object2?.visible = true;


            // @ts-ignore
            objectAvatar?.visible=true;
            //@ts-ignore
            intersects[i].object.material.transparent = true;
            //@ts-ignore
            intersects[i].object.material.opacity = 0.2;

            nodeTemp = objeto;
            labelTemp = object2;
            avatarTemp=objectAvatar;

            //@ts-ignore
          }
          //@ts-ignore
          if (intersects[i].object.userData.type === "infoUser") { //para o node principal, logado

            objeto = intersects[i].object
            name = "infoUser"
            var objectAvatar=scene.getObjectByName("avatarPrincipal");

            var object2 = scene.getObjectByName(name);


            //@ts-ignore
            object2?.visible = true;


            //@ts-ignore
            objectAvatar?.visible=true;
            //@ts-ignore
            intersects[i].object.material.transparent = true;
            //@ts-ignore
            intersects[i].object.material.opacity = 0.2;
            nodeTemp = objeto;
            labelTemp = object2;
            avatarTemp=objectAvatar;

          }
          // this.nodeTemp = nodeTemp;
        }
      }
      //this.renderer.render(scene,camera);


      if (aux) {
        controls.update(0.002);
        controls2.enableRotate = false;
        controls2.enableDamping = false;
        controls2.enablePan = false;
        //controls2.update();
      } else {

        controls.update(0);
        controls2.update();
      }

      requestAnimationFrame(render);


      // console.log(cameraPosition.x + "-" + cameraPosition.y + "-" + cameraPosition.z)


      for (var ii = -5; ii < 100; ii++) {
        var object2 = scene.getObjectByName((ii).toString());
        object2?.lookAt(camera.position);
      }

      playerList.forEach(element => {
        let name2 = "info" + element;
        var object2 = scene.getObjectByName((name2).toString());
        object2?.lookAt(camera.position);

      });

      var object2 = scene.getObjectByName(("infoUser").toString());
      object2?.lookAt(camera.position);
      //name ="info"+ intersects[i].object.name;


      var temp = scene.getObjectByName('light4');
      temp?.position.set(camera.position.x, camera.position.y, camera.position.z);

      component.renderer.autoClear = false;
      component.renderer.clearColor();
      component.renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
      component.renderer.setClearColor(0x111111, 1);
      component.renderer.setScissor(0, 0, window.innerWidth, window.innerHeight);
      component.renderer.setScissorTest(true);
      component.camera.updateProjectionMatrix();
      component.renderer.render(component.scene, component.camera);

      component.renderer.clear(false, true, false);

      // component.renderer.setScissorTest(true);
      // component.renderer.setScissor(window.innerWidth * 0.6395,  window.innerHeight * 0.039, 202, 202);
      // component.renderer.setClearColor(0x000000, 1); // border color
      // component.renderer.clearColor();

      component.renderer.setViewport(window.innerWidth * 0.84, window.innerHeight * 0.09, 200, 200);
      component.renderer.setClearColor(0x000000, 0.05);
      component.renderer.setScissor(window.innerWidth * 0.84, window.innerHeight * 0.09, 200, 200);
      component.renderer.setScissorTest(true);
      component.miniMapCamera.updateProjectionMatrix();
      component.renderer.render(component.scene, component.miniMapCamera);

      playerList.forEach(element => {
        //console.log("posicao cada esfera " + this.scene.getObjectByName(element)?.position.x +  this.scene.getObjectByName(element)?.position.y + this.scene.getObjectByName(element)?.position.z)
        //    this.light4.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);
        // let element = "b20d1a5c-62bf-4727-82c3-7b46b915eeff";
        let node = scene.getObjectByName(element);
        //console.log(node?.id)
        //@ts-ignore
        let distance = Math.sqrt( Math.pow(node?.position.x - camera.position.x, 2) + Math.pow(node?.position.y - camera.position.y, 2) + Math.pow(node?.position.z - camera.position.z, 2) )
        // console.log("distancia:  " +distance)
        var vec= new THREE.Vector3(-cameraPosition.x,-cameraPosition.y,-cameraPosition.z);
        vec.setLength(16);

        if(distance < 3){
          camera.position.x = cameraPosition.x
          camera.position.y = cameraPosition.y
          camera.position.z = cameraPosition.z
        }
        //this.camera.distanceTo(this.scene.getObjectByName(element))
      });

      // relacoesStringDistancia.forEach(element => {
      //   //console.log("posicao cada esfera " + this.scene.getObjectByName(element)?.position.x +  this.scene.getObjectByName(element)?.position.y + this.scene.getObjectByName(element)?.position.z)
      //   //    this.light4.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);
      //   // let element = "b20d1a5c-62bf-4727-82c3-7b46b915eeff";
      //   let aresta = scene.getObjectByName(element);
      //   if(aresta==null){
      //     aresta= scene.getObjectByName(element.split(",")[1]+","+element.split(",")[0])
      //   }
      //   let id= "";
      //   for(let i=0; i<jogadoresListaDistancia.length;i++){
      //     if(jogadoresListaDistancia[i].email===element.split(",")[0]){
      //       id=jogadoresListaDistancia[i].id;
      //       break;
      //     }
      //   }
      //   let node3= scene.getObjectByName(id)
      //
      //   for(let i=0; i<jogadoresListaDistancia.length;i++){
      //     if(jogadoresListaDistancia[i].email===element.split(",")[1]){
      //       id=jogadoresListaDistancia[i].id;
      //       break;
      //     }
      //   }
      //   let node4= scene.getObjectByName(id)
      //
      //   //console.log(node?.id)
      //
      //
      //
      // });
      let pontoMedio = new THREE.Vector3(0,0,0);

      listaRelacoes.forEach(element => {
        let node1 = scene.getObjectByName(element.value.jogadorA);
        let node2 = scene.getObjectByName(element.value.jogadorB);
        //@ts-ignore
        let posicao1 = node1?.position;


        //@ts-ignore
        let posicao2 = node2?.position;



        let angle;
        //@ts-ignore
        posicao1.sub( camera.position );
        //@ts-ignore
        posicao2.sub( camera.position  );
        //@ts-ignore
        angle = posicao1.angleTo( posicao2 );

        //@ts-ignore
        posicao1.add( camera.position );
        //@ts-ignore
        posicao2.add( camera.position );

        if(angle > 3.0){
          camera.position.x = cameraPosition.x
          camera.position.y = cameraPosition.y
          camera.position.z = cameraPosition.z
        }

      });

    }());
    }

    findJogadorID(listaJogadores: NodeDto[],email: string) : string{
      for (let i = 0; i < listaJogadores.length; i++) {
        if(listaJogadores[i].email===email)
          return listaJogadores[i].id
      }
      return ""
    }

  ngAfterViewInit() {
    this.Scene();
    this.startRenderingLoop();

  }

  setNivel(niv: number) {
    this.nivel = niv;
    this.ngAfterViewInit();
  }

  setDimension(dimension: boolean) {
    this.dimension = dimension;
    this.ngAfterViewInit();
  }

  setAutoRotate(autoRotate: boolean) {
    this.autoRotate = autoRotate;
    this.ngAfterViewInit();
  }

  setLines(lines: boolean) {
    this.lines = lines;
    this.ngAfterViewInit();
  }
  setFlyControls(navigate: boolean) {
    this.navigate = navigate;
    this.ngAfterViewInit();
  }

  setJogadorObjetivo(jogadorEmail: string) {
    this.jogadorEmail = jogadorEmail;
    this.ngAfterViewInit();
  }

  setPath(path: string) {
    this.pathType = path;
    this.ngAfterViewInit();
  }


  setCameraLight(op4: boolean) {
    this.cameraLight = op4;
    this.ngAfterViewInit();
  }
  setMostarEmoji(mostrarEmoji: boolean) {
    this.mostrarEmoji = mostrarEmoji;
    this.ngAfterViewInit();
  }
  setFixedLights(op3: boolean) {
    this.fixedLights = op3;
    this.ngAfterViewInit();
  }
  setAmbientLight(op2: boolean) {
    this.ambientLight = op2;
    this.ngAfterViewInit();
  }
  setLightHelper(op1: boolean) {
    this.lightHelper = op1;
    this.ngAfterViewInit();
  }

  setLimit(niv: number) {
    this.limit = niv;
    this.ngAfterViewInit();
  }
}
