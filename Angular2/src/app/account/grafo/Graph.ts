import * as THREE from 'three';
import {Relacao} from "../../relacao";
import {JogadorService} from "../../jogador.service";
import {FontLoader} from "three/examples/jsm/loaders/FontLoader";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry";

export default class Graph {
  private font = "https://threejs.org/examples/fonts/helvetiker_bold.typeface.json";

  constructor() {
  }

  criarConexao(scene: THREE.Scene, nivel: number, relacao: Relacao, camera: THREE.Camera, namee: number, jogadorService: JogadorService, dimension: boolean) {
    const aux = namee.toString();
    var metade_pi = Math.PI * 0.5;
    var verticeI = new THREE.Vector3(scene.getObjectByName(relacao.jogadorA)?.position.x,scene.getObjectByName(relacao.jogadorA)?.position.y ,scene.getObjectByName(relacao.jogadorA)?.position.z );
    var verticeF = new THREE.Vector3(scene.getObjectByName(relacao.jogadorB)?.position.x,scene.getObjectByName(relacao.jogadorB)?.position.y,scene.getObjectByName(relacao.jogadorB)?.position.z);
    var distance = verticeI.distanceTo(verticeF);
    var position  = verticeF.clone().add(verticeI).divideScalar(2);

    var aux1 = relacao.forcaLigacao;
    var aux2 = relacao.forcaLigacao;
    if(aux1 > 10){
      aux1 = 10;
    }
    if(aux1 < 0){
      aux1 = 0;
    }
    if(aux2 < 0) {
      aux2 = 0;
    }
    var forca = ((aux1 + aux2)/2) /60;

    if(nivel > 1){
      forca = 0;
    }

    var material = new THREE.MeshPhongMaterial({color:0x9F9F9F});
    let cylinder = null;
    if(dimension) {
      cylinder = new THREE.CylinderGeometry(0.10+forca,0.10+forca,distance,10,10,false);
    }else{
     cylinder= new THREE.CylinderGeometry(0.1,0.1,distance,2,2,false);
    }


    var orientation = new THREE.Matrix4();
    var offsetRotation = new THREE.Matrix4();
    orientation.lookAt(verticeI,verticeF,new THREE.Vector3(0,1,0));
    offsetRotation.makeRotationX(metade_pi);
    orientation.multiply(offsetRotation);
    cylinder.applyMatrix4(orientation);

    var mesh = new THREE.Mesh(cylinder,material);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    mesh.position.add(position);
    jogadorService.getJogadorById(relacao.jogadorA).subscribe(data =>{
      jogadorService.getJogadorById(relacao.jogadorB).subscribe(data2 =>{
        console.log("conexao: "+data.email + "," + data2.email);
        mesh.name = data.email + "," + data2.email;
        scene.add(mesh);

      });
    });

    let middlePointx = (verticeI.x + verticeF.x) / 2;
    let middlePointy = (verticeI.y + verticeF.y) / 2;


    const loader = new FontLoader();

    // loader.load(this.font, function (font) {
    //   // TextGeometry(String, Object)
    //   const textObj = new TextGeometry(relacao.tagsRelacao.toString(), {
    //     font: font,
    //     size: 0.3,
    //     height: 0.01,
    //     curveSegments: 12
    //   });
    //   textObj.center();
    //   const material = new THREE.MeshBasicMaterial({ color: 'black' });
    //   const sprite = new THREE.Mesh(textObj, material);
    //
    //   const letterSize = -0.13;
    //   sprite.position.z = 1 ;
    //   sprite.position.x = relacao.tagsRelacao.split(",").length * letterSize;
    //   sprite.position.y += middlePointy;
    //   sprite.position.x += middlePointx;
    //
    //   sprite.name = aux;
    //   scene.add(sprite);
    //
    //   sprite.lookAt(camera.position);
    //
    // });
  }
}
