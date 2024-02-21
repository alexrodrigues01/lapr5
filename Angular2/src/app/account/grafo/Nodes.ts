import {JogadorService} from "../../jogador.service";

import * as THREE from 'three';
import {Relacao} from "../../relacao";
import {FontLoader} from "three/examples/jsm/loaders/FontLoader";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry";
import {TextureLoader,Vector3} from "three";
import {EstadohumorService} from "../../estadohumor.service";

export default class Nodes {

  aaa = 1;
  bbb = 1;


  constructor(private jogadorService: JogadorService) {
  }

  private font = "https://threejs.org/examples/fonts/helvetiker_bold.typeface.json";

  async addNodeJogador(scene: THREE.Scene, nivel: number, relacao: Relacao, anguloAux: number, name: number, camera: THREE.Camera, idLogado: string, playerIdList: string[], showEmotionalStatus: boolean, infoid: number,dimension: boolean,estadoHumorService: EstadohumorService) : Promise<void>{
    let avatar="https://cdn.pixabay.com/photo/2017/12/18/03/01/black-avatar-3025348_1280.png";
    let estadoHumorNenhum = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb1dJUWz0jvVPABWoTMu9l_G8IfTaoKdGrNg&usqp=CAU'
    let estadoHumorDistressed= "https://cdn.pixabay.com/photo/2020/08/04/04/14/juneteenth-5461576_960_720.png"
    let estadoHumorProud= "https://cdn.pixabay.com/photo/2017/03/05/21/55/emoticon-2120024_960_720.png"
    let estadoHumorAngry= "https://cdn.shopify.com/s/files/1/1061/1924/products/Super_Angry_Face_Emoji_ios10_large.png?v=1571606092"
    let estadoHumorBlessed="https://cdn1.iconfinder.com/data/icons/emoji-122/64/smile-emoji-emoticon-feeling-face-happy-cheerful-halo-angle-512.png"
    let estadoHumorRemorseful="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd2OraTHgm-weJm4ES_RLXS-nnklLFkAz7D0Oe_guK72I3njbBpoxw9Hk9DSpS5F9dhi0&usqp=CAU"
    let estadoHumorJoyful="https://cdn.pixabay.com/photo/2020/12/27/20/25/smile-5865209_960_720.png"
    let estadoHumorGrateful="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfk3l4CBMcHpQXUHWtYZ3KOOBgyh8IeW5NHA&usqp=CAU"
    let estadoHumorRelief= "https://media.istockphoto.com/vectors/relieved-face-emoji-icon-vector-id1328395254?k=20&m=1328395254&s=612x612&w=0&h=IatPNhBSwbWmvdDrTtkJ73DiRhgZkArM5rX3xmScMfA="
    let estadoHumorHopeful= "https://assets.wprock.fr/emoji/joypixels/512/1f97a.png"
    let estadoHumorDisapointed="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb1dJUWz0jvVPABWoTMu9l_G8IfTaoKdGrNg&usqp=CAU"
    const aux = name.toString();
    if (scene.getObjectByName("-5") == null && scene.getObjectByName("-3") == null) {
      let middlePointx = 0;
      let middlePointy = 0;
      let middlePoint2x = 0;
      let middlePoint2y = 1.5;
      let auxx = this.aaa;
      let auxx2 = this.bbb;

      this.jogadorService.getJogadorById(idLogado)
        .subscribe(data => {
          if (data) {
            const loader = new FontLoader();

            loader.load(this.font, function (font) {
              // TextGeometry(String, Object)
              const textObj = new TextGeometry((data.nome + "\n" + data.email).toString(), {
                font: font,
                size: 0.31,
                height: 0.01,
                curveSegments: 12
              });

              textObj.center();

              const material = new THREE.MeshBasicMaterial({color: 'black'});
              const sprite = new THREE.Mesh(textObj, material);

              const letterSize = -0.13;
              sprite.position.z = 1.5;
              //sprite.position.x = (data.Nome+ "->" + data.Email).toString().length * letterSize;
              sprite.position.y += middlePointy;
              sprite.position.x = middlePointx;
              sprite.name = '-5';
              sprite.lookAt(camera.position);


              let middlePoint3x = 2;
              let middlePoint3y = 7;
              const textObj2 = new TextGeometry(("Nome: " + data.nome + "\n" + "Email: " + data.email + "\n" + "Facebook: " + data.facebookLink + "\n" + "LinkedIn: " + data.linkedInLink + "\n"  + "Telefone: " + data.telefone).toString(), {
                font: font,
                size: 0.3,
                height: 0.01,
                curveSegments: 12
              });
              textObj2.center();
              const material2 = new THREE.MeshBasicMaterial({color: 'black'});
              const sprite2 = new THREE.Mesh(textObj2, material2);
              sprite2.position.z = 1.5;
              sprite2.position.y += middlePoint3y;
              sprite2.position.x = middlePoint3x;

              sprite2.name = "infoUser";
              sprite2.visible = false;
              sprite2.lookAt(camera.position);

              if (auxx == 2) {
                scene.add(sprite);
                scene.add(sprite2);

              }

              let loader2 = new TextureLoader().load(estadoHumorNenhum);
              estadoHumorService.getEstadoHumorById(data.estadoHumor).subscribe(estado=>{
                switch (estado.estado){
                  case "Joyful":
                    loader2= new TextureLoader().load(estadoHumorJoyful);
                    break;
                  case "Distressed":
                    loader2=new TextureLoader().load(estadoHumorDistressed);
                    break;
                  case "Hopeful":
                    loader2=new TextureLoader().load(estadoHumorHopeful);
                    break;
                  case "FearFul":
                    loader2=new TextureLoader().load(estadoHumorDistressed);
                    break;
                  case "Relieve":
                    loader2=new TextureLoader().load(estadoHumorRelief);
                    break;
                  case "Disappointed":
                    loader2=new TextureLoader().load(estadoHumorDisapointed);
                    break;
                  case "Proud":
                    loader2=new TextureLoader().load(estadoHumorProud);
                    break;
                  case "Remorseful":
                    loader2=new TextureLoader().load(estadoHumorRemorseful);
                    break;
                  case "Grateful":
                    loader2=new TextureLoader().load(estadoHumorGrateful);
                    break;
                  case "Angry":
                    loader2=new TextureLoader().load(estadoHumorAngry);
                    break;
                  default:
                    break;
                }
                var planeGeometry = new THREE.BoxGeometry(1, 1, 0.1);
                var planeMaterial = new THREE.MeshBasicMaterial({map: loader2});

                var plane = new THREE.Mesh(planeGeometry, planeMaterial);
                plane.position.x = middlePoint2x;
                plane.position.y += middlePoint2y;
                plane.position.z = 1.5;
                let str = name + 1
                plane.name = "-3";

                plane.lookAt(camera.position);

                if (auxx2 == 2 && showEmotionalStatus) {
                  scene.add(plane);
                }

              })

              let loader3 = new TextureLoader().load(avatar);
              var planeGeometry = new THREE.BoxGeometry(3, 3, 0.1);
              var planeMaterial = new THREE.MeshBasicMaterial({ map: loader3 });


              let middlePoint4x = middlePointx -7;
              let middlePoint4y = middlePointy + 7;
              var plane = new THREE.Mesh(planeGeometry, planeMaterial);
              plane.position.x = middlePoint4x;
              plane.position.y += middlePoint4y;
              plane.position.z = 1.5;
              plane.name = "avatarPrincipal";
              plane.visible=false;

              plane.lookAt(camera.position);

              scene.add(plane);

              //loader2.wrapS = THREE.RepeatWrapping;
              //loader2.wrapT = THREE.RepeatWrapping;
              //loader2.repeat.set( 4, 4 );

            });
          }
        });
      this.bbb++;
      this.aaa++;
    }
    const object = <THREE.Object3D><any>scene.getObjectByName(relacao.jogadorA);

    if (object == null) {
      let geometryJog = null;
      if(dimension) {
        geometryJog = new THREE.SphereGeometry(1.2, 32, 16);
      }else{
        geometryJog= new THREE.CircleGeometry(1,32);
      }



      const materialJog = new THREE.MeshPhongMaterial({color: 0x00a6ff});
      const sphereJog = new THREE.Mesh(geometryJog, materialJog);

      sphereJog.name = relacao.jogadorA;

      //const randx = Math.floor((anguloAux * (13 - 5 + 1) + 5) * (Math.round(anguloAux) ? 1 : -1));

      //const randy = Math.floor((anguloAux * (13 - 5 + 1) + 5) * (Math.round(anguloAux) ? 1 : -1));
      //const randx = anguloAux;

      //const randy = anguloAux;
      //sphereJog.position.add(new Vector3(randx, randy, 0));
      sphereJog.position.add(new Vector3(nivel * 10 * Math.cos(anguloAux), nivel * 10 * Math.sin(anguloAux), 0));
      sphereJog.receiveShadow = true;
      sphereJog.castShadow = true;
      sphereJog.userData = {type: "sphere"}
      scene.add(sphereJog);

      let middlePointx = sphereJog.position.x;
      let middlePointy = sphereJog.position.y;
      let middlePoint2x = sphereJog.position.x;
      let middlePoint2y = sphereJog.position.y + 1.5;


      this.jogadorService.getJogadorById(relacao.jogadorA)
        .subscribe(data => {
          if (data) {
            const loader = new FontLoader();

            loader.load(this.font, function (font) {
              // TextGeometry(String, Object)
              const textObj = new TextGeometry((data.nome + "\n" + data.email).toString(), {
                font: font,
                size: 0.3,
                height: 0.01,
                curveSegments: 12
              });
              textObj.center();
              const material = new THREE.MeshBasicMaterial({color: 'black'});
              const sprite = new THREE.Mesh(textObj, material);

              const letterSize = -0.13;
              sprite.position.z = 1.5;
              sprite.position.x = middlePointx + (data.nome + "->" + data.email).toString().length * letterSize;
              sprite.position.y = middlePointy;
              //sprite.position.x = middlePointx;

              sprite.name = aux;

              scene.add(sprite);

              sprite.lookAt(camera.position);


              let middlePoint3x = sphereJog.position.x + 2;
              let middlePoint3y = sphereJog.position.y + 7;
              const textObj2 = new TextGeometry(("Nome: " + data.nome + "\n" + "Email: " + data.email + "\n" + "Facebook: " + data.facebookLink + "\n" + "LinkedIn: " + data.linkedInLink + "\n"  + "Telefone: " + data.telefone).toString(), {
                font: font,
                size: 0.3,
                height: 0.01,
                curveSegments: 12
              });
              textObj2.center();
              const material2 = new THREE.MeshBasicMaterial({color: 'black'});
              const sprite2 = new THREE.Mesh(textObj2, material2);
              sprite2.position.z = 1.5;
              sprite2.position.y += middlePoint3y;
              sprite2.position.x = middlePoint3x;
              let str2 = name + 1
              /*sprite2.id = -2;
              const t = scene.getObjectById(-2)
              if(t){t.visible = true;}
              */
              sprite2.name = "info" + data.id;
              sprite2.visible = false;

              scene.add(sprite2);
              sprite2.lookAt(camera.position);


              let loader2 = new TextureLoader().load(estadoHumorNenhum);
              estadoHumorService.getEstadoHumorById(data.estadoHumor).subscribe(estado=>{
                switch (estado.estado){
                  case "Joyful":
                    loader2= new TextureLoader().load(estadoHumorJoyful);
                    break;
                  case "Distressed":
                    loader2=new TextureLoader().load(estadoHumorDistressed);
                    break;
                  case "Hopeful":
                    loader2=new TextureLoader().load(estadoHumorHopeful);
                    break;
                  case "FearFul":
                    loader2=new TextureLoader().load(estadoHumorDistressed);
                    break;
                  case "Relieve":
                    loader2=new TextureLoader().load(estadoHumorRelief);
                    break;
                  case "Disappointed":
                    loader2=new TextureLoader().load(estadoHumorDisapointed);
                    break;
                  case "Proud":
                    loader2=new TextureLoader().load(estadoHumorProud);
                    break;
                  case "Remorseful":
                    loader2=new TextureLoader().load(estadoHumorRemorseful);
                    break;
                  case "Grateful":
                    loader2=new TextureLoader().load(estadoHumorGrateful);
                    break;
                  case "Angry":
                    loader2=new TextureLoader().load(estadoHumorAngry);
                    break;
                  default:
                    break;
                }
                var planeGeometry = new THREE.BoxGeometry(1, 1, 0.1);
                var planeMaterial = new THREE.MeshBasicMaterial({map: loader2});

                var plane = new THREE.Mesh(planeGeometry, planeMaterial);
                plane.position.x = middlePoint2x;
                plane.position.y += middlePoint2y;
                plane.position.z = 1.5;
                let str = name + 2
                plane.name = str.toString();

                plane.lookAt(camera.position);

                if (showEmotionalStatus) {
                  scene.add(plane);
                }
              });

              let loader3 = new TextureLoader().load(avatar);
              var planeGeometry = new THREE.BoxGeometry(3, 3, 0.1);
              var planeMaterial = new THREE.MeshBasicMaterial({ map: loader3 });


              let middlePoint4x = sphereJog.position.x -7;
              let middlePoint4y = sphereJog.position.y + 7;
              var plane = new THREE.Mesh(planeGeometry, planeMaterial);
              plane.position.x = middlePoint4x;
              plane.position.y += middlePoint4y;
              plane.position.z = 1.5;
              plane.name = "avatar"+data.id;
              plane.visible=false;

              plane.lookAt(camera.position);

              scene.add(plane);
              })




          }
        });
    }
  }
  addNodeJogadorAmigo(scene: THREE.Scene, nivel: number, relacao: Relacao, anguloAux: number, namee: number, camera: THREE.Camera, playerIdList: string[], showEmotionalStatus: boolean, infoid: number,dimension : boolean, estadoHumorService: EstadohumorService) {
    const aux = namee.toString();
    let avatar="https://cdn.pixabay.com/photo/2017/12/18/03/01/black-avatar-3025348_1280.png";
    let estadoHumorNenhum = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb1dJUWz0jvVPABWoTMu9l_G8IfTaoKdGrNg&usqp=CAU'
    let estadoHumorDistressed= "https://cdn.pixabay.com/photo/2020/08/04/04/14/juneteenth-5461576_960_720.png"
    let estadoHumorProud= "https://cdn.pixabay.com/photo/2017/03/05/21/55/emoticon-2120024_960_720.png"
    let estadoHumorAngry= "https://cdn.shopify.com/s/files/1/1061/1924/products/Super_Angry_Face_Emoji_ios10_large.png?v=1571606092"
    let estadoHumorBlessed="https://cdn1.iconfinder.com/data/icons/emoji-122/64/smile-emoji-emoticon-feeling-face-happy-cheerful-halo-angle-512.png"
    let estadoHumorRemorseful="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd2OraTHgm-weJm4ES_RLXS-nnklLFkAz7D0Oe_guK72I3njbBpoxw9Hk9DSpS5F9dhi0&usqp=CAU"

    let estadoHumorJoyful="https://cdn.pixabay.com/photo/2020/12/27/20/25/smile-5865209_960_720.png"
    // let estadoHumorJoyful="https://cdn.pixabay.com/photo/2017/12/18/03/01/black-avatar-3025348_1280.png"
    let estadoHumorGrateful="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfk3l4CBMcHpQXUHWtYZ3KOOBgyh8IeW5NHA&usqp=CAU"
    let estadoHumorRelief= "https://media.istockphoto.com/vectors/relieved-face-emoji-icon-vector-id1328395254?k=20&m=1328395254&s=612x612&w=0&h=IatPNhBSwbWmvdDrTtkJ73DiRhgZkArM5rX3xmScMfA="
    let estadoHumorHopeful= "https://assets.wprock.fr/emoji/joypixels/512/1f97a.png"
    let estadoHumorDisapointed="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb1dJUWz0jvVPABWoTMu9l_G8IfTaoKdGrNg&usqp=CAU"



    const object = <THREE.Object3D><any>scene.getObjectByName(relacao.jogadorB);
    if (object == null) {
      let geometryJog = null;
      if(dimension) {
        geometryJog = new THREE.SphereGeometry(1.2, 32, 16);
      }else{
        geometryJog= new THREE.CircleGeometry(1,32);
      }
      var color = 0x00a6ff;
      /* if(nivel == 2) {
         color = 0xFF8000;

       }else{
         color = 0xF9E809;
       }*/
      const materialJog = new THREE.MeshPhongMaterial({ color: color });

      const sphereJog = new THREE.Mesh(geometryJog, materialJog);

      sphereJog.name = relacao.jogadorB;

      const i = Math.random() * (360 - 1) + 1;

      const angle = (i * Math.PI) / 180;
      const randx = anguloAux;

      const randy = anguloAux;
      //sphereJog.position.add(new Vector3(nivel*10 * Math.cos(angle),nivel * 10* Math.sin(angle), 0));
      sphereJog.position.add(new Vector3(nivel * 10 * Math.cos(randx), nivel * 10 * Math.sin(randy), 0));
      sphereJog.receiveShadow = true;
      sphereJog.castShadow = true;
      sphereJog.userData = { type: "sphere" }

      scene.add(sphereJog);



      let middlePointx = sphereJog.position.x;
      let middlePointy = sphereJog.position.y;
      let middlePoint2x = sphereJog.position.x;
      let middlePoint2y = sphereJog.position.y + 1.5;



      this.jogadorService.getJogadorById(relacao.jogadorB)
        .subscribe(data => {
          if (data) {

            const loader = new FontLoader();

            loader.load(this.font, function (font) {
              // TextGeometry(String, Object)
              const textObj = new TextGeometry((data.nome + "\n" + data.email).toString(), {
                font: font,
                size: 0.3,
                height: 0.01,
                curveSegments: 12
              });
              textObj.center();
              const material = new THREE.MeshBasicMaterial({ color: 'black' });
              const sprite = new THREE.Mesh(textObj, material);

              const letterSize = -0.13;
              sprite.position.z = 1.5;
              //sprite.position.x = (data.Nome+ "->" + data.Email).toString().length * letterSize;
              sprite.position.y += middlePointy;
              sprite.position.x = middlePointx;

              sprite.name = aux;

              scene.add(sprite);
              sprite.lookAt(camera.position);


              let middlePoint3x = sphereJog.position.x + 2;
              let middlePoint3y = sphereJog.position.y + 7;
              const textObj2 = new TextGeometry(("Nome: " + data.nome + "\n" + "Email: " + data.email + "\n" + "Facebook: " + data.facebookLink + "\n" + "LinkedIn: " + data.linkedInLink + "\n"  + "Telefone: " + data.telefone).toString(), {
                font: font,
                size: 0.3,
                height: 0.01,
                curveSegments: 12
              });
              textObj2.center();
              const material2 = new THREE.MeshBasicMaterial({ color: 'black' });
              const sprite2 = new THREE.Mesh(textObj2, material2);
              sprite2.position.z = 1.5;
              sprite2.position.y += middlePoint3y;
              sprite2.position.x = middlePoint3x;
              let str3 = namee + 1

              sprite2.name = "info" + data.id;
              //sprite2.id = infoid;
              sprite2.visible = false;

              scene.add(sprite2);
              sprite2.lookAt(camera.position);

              let loader2 = new TextureLoader().load(estadoHumorNenhum);
              estadoHumorService.getEstadoHumorById(data.estadoHumor).subscribe(estado=>{
                switch (estado.estado){
                  case "Joyful":
                    loader2= new TextureLoader().load(estadoHumorJoyful);
                    break;
                  case "Distressed":
                    loader2=new TextureLoader().load(estadoHumorDistressed);
                    break;
                  case "Hopeful":
                    loader2=new TextureLoader().load(estadoHumorHopeful);
                    break;
                  case "FearFul":
                    loader2=new TextureLoader().load(estadoHumorDistressed);
                    break;
                  case "Relieve":
                    loader2=new TextureLoader().load(estadoHumorRelief);
                    break;
                  case "Disappointed":
                    loader2=new TextureLoader().load(estadoHumorDisapointed);
                    break;
                  case "Proud":
                    loader2=new TextureLoader().load(estadoHumorProud);
                    break;
                  case "Remorseful":
                    loader2=new TextureLoader().load(estadoHumorRemorseful);
                    break;
                  case "Grateful":
                    loader2=new TextureLoader().load(estadoHumorGrateful);
                    break;
                  case "Angry":
                    loader2=new TextureLoader().load(estadoHumorAngry);
                    break;
                  default:
                    break;
                }
                var planeGeometry = new THREE.BoxGeometry(1, 1, 0.1);
                var planeMaterial = new THREE.MeshBasicMaterial({ map: loader2 });

                var plane = new THREE.Mesh(planeGeometry, planeMaterial);
                plane.position.x = middlePoint2x;
                plane.position.y += middlePoint2y;
                plane.position.z = 1.5;
                let str2 = namee + 2
                plane.name = str2.toString();

                plane.lookAt(camera.position);

                if (showEmotionalStatus) {
                  scene.add(plane);
                }

              })

              let loader3 = new TextureLoader().load(avatar);
              var planeGeometry = new THREE.BoxGeometry(3, 3, 0.1);
              var planeMaterial = new THREE.MeshBasicMaterial({ map: loader3 });


              let middlePoint4x = sphereJog.position.x -7;
              let middlePoint4y = sphereJog.position.y + 7;
              var plane = new THREE.Mesh(planeGeometry, planeMaterial);
              plane.position.x = middlePoint4x;
              plane.position.y += middlePoint4y;
              plane.position.z = 1.5;
              let str2 = namee + 2
              plane.name = "avatar"+data.id;
              plane.visible=false;

              plane.lookAt(camera.position);

              scene.add(plane);



              // let loader3 = new TextureLoader().load(estadoHumorNenhum);
              //loader2.wrapS = THREE.RepeatWrapping;
              //loader2.wrapT = THREE.RepeatWrapping;
              //loader2.repeat.set( 4, 4 );




            });



          }
        });
    }
  }
}
