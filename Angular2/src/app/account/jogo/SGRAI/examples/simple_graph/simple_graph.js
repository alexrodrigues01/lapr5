/**
 @author David Piegza

 Implements a simple graph drawing with force-directed placement in 2D and 3D.

 It uses the force-directed-layout implemented in:
 https://github.com/davidpiegza/Graph-Visualization/blob/master/layouts/force-directed-layout.js

 Drawing is done with Three.js: http://github.com/mrdoob/three.js

 To use this drawing, include the graph-min.js file and create a SimpleGraph object:

 <!DOCTYPE html>
 <html>
 <head>
 <title>Graph Visualization</title>
 <script type="text/javascript" src="path/to/graph-min.js"></script>
 </head>
 <body onload="new Drawing.SimpleGraph({layout: '3d', showStats: true, showInfo: true})">
 </bod>
 </html>

 Parameters:
 options = {
    layout: "2d" or "3d"

    showStats: <bool>, displays FPS box
    showInfo: <bool>, displays some info on the graph and layout
              The info box is created as <div id="graph-info">, it must be
              styled and positioned with CSS.


    selection: <bool>, enables selection of nodes on mouse over (it displays some info
               when the showInfo flag is set)


    limit: <int>, maximum number of nodes

    numNodes: <int> - sets the number of nodes to create.
    numEdges: <int> - sets the maximum number of edges for a node. A node will have
              1 to numEdges edges, this is set randomly.
  }


 Feel free to contribute a new drawing!

 */


var drawing;
var parar;


function pararGrafo(){
  parar=1;
}

function createDrawing(string, email) {
  parar=0;
  nodePrincipal = email;
  for (let i = 0; i < string.length; i++) {
    edgesGrafo.push(string[i].split(","))
  }

  console.log("JAVASCRIPPPPTTT")
  console.log(edgesGrafo[0])
  console.log(edgesGrafo[1])
  console.log(string[1])

  console.log(edgesGrafo)

  recursive_2(nodePrincipal, [], [[0, nodePrincipal]]);

  console.log("NIVEIS")
  console.log(niveis)

  numeroniveis(niveis);

  console.log(numeroNiveis);

  drawing = new Drawing.SimpleGraph({
    layout: '3d',
    selection: false,
    numNodes: 3,
    graphLayout: {attraction: 5, repulsion: 0.5},
    showStats: false,
    showInfo: false,
    showLabels: true
  });
}

function numeroniveis(niveis) {
  let nivelMaior = 0;
  for (let i = 0; i < niveis.length; i++) {
    if (niveis[i][0] > nivelMaior)
      nivelMaior = niveis[i][0]
  }
  for (let i = 0; i <= nivelMaior; i++) {
    numeroNiveis[i] = 0;
  }

  for (let i = 0; i < niveis.length; i++) {
    console.log(niveis[i][1])
    numeroNiveis[niveis[i][0]]++;
  }
}

function recursive(node, nivel, nodesPassados) {
  if (nivel === 0) {
    niveis.push([0, nodePrincipal]);
  } else {
    niveis.push([nivel, node]);
  }
  nodesPassados.push(node);
  var relacoesDiretas = getRelacoesDiretas(node);
  for (let i = 0; i < relacoesDiretas.length; i++) {
    if (!contains1(relacoesDiretas[i], nodesPassados)) {
      recursive(relacoesDiretas[i], nivel + 1, nodesPassados);
    }
  }
}

function recursive_2(node, nodesPassados, queue) {
  if (queue.length === 0) {
    return;
  }
  let nivel = queue[0][0];
  if (nivel === 0) {
    niveis.push([0, nodePrincipal]);
  } else {
    niveis.push([queue[0][0], node]);
  }

  queue.splice(0, 1);

  nodesPassados.push(node);
  var relacoesDiretas = getRelacoesDiretas(node);
  for (let i = 0; i < relacoesDiretas.length; i++) {
    if (!contains1(relacoesDiretas[i], nodesPassados)) {
      nodesPassados.push(relacoesDiretas[i]);
      console.log("QUEUE PUSHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
      console.log(relacoesDiretas[i])
      console.log(nivel + 1);
      queue.push([nivel + 1, relacoesDiretas[i]])
    }
    console.log(queue)
  }
  if (!(queue.length === 0))
    recursive_2(queue[0][1], nodesPassados, queue);
}

function getRelacoesDiretas(node) {
  var listaNodes = [];
  for (let i = 0; i < edgesGrafo.length; i++) {
    if (edgesGrafo[i][0] === node) {
      listaNodes.push(edgesGrafo[i][1])
    }
    if (edgesGrafo[i][1] === node) {
      listaNodes.push(edgesGrafo[i][0])
    }
  }
  console.log("LISTA DIRETAS" + node + "->" + listaNodes)
  return listaNodes;
}


function contains1(node, lista) {
  for (let i = 0; i < lista.length; i++) {
    if (node === lista[i])
      return true
  }
  return false
}


function createArray(length) {
  var arr = new Array(length || 0),
    i = length;

  if (arguments.length > 1) {
    var args = Array.prototype.slice.call(arguments, 1);
    while (i--) arr[length - 1 - i] = createArray.apply(this, args);
  }

  return arr;
}

var nodes;
var Drawing = Drawing || {};

Drawing.SimpleGraph = function (options) {

  options = options || {};

  this.layout = options.layout || "2d";
  this.layout_options = options.graphLayout || {};
  this.show_stats = options.showStats || false;
  this.show_info = options.showInfo || false;
  this.show_labels = options.showLabels || false;
  this.selection = options.selection || false;
  this.limit = options.limit || 10;
  this.nodes_count = options.numNodes || 20;
  this.edges_count = options.numEdges || 10;

  var camera, minimapaCamera, controls, controls2, scene, renderer, interaction, geometry, object_selection;
  var stats;
  var info_text = {};
  var graph = new GRAPHVIS.Graph({limit: options.limit});

  var geometries = [];

  var that = this;

  init();
  createGraphNew();
  // controls.update();
  // render();
  //createGraph();
  render1();

  function init() {
    // Three.js initialization
    renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);


    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000000);

    camera.position.z = 10000;

    minimapaCamera = camera.clone();
    controls = new THREE.TrackballControls(camera);

    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 5.2;
    controls.panSpeed = 0.5;

    controls.noZoom = false;
    controls.noPan = false;
    //
    controls.noRotate = false;


    //

    controls.staticMoving = false;
    controls.dynamicDampingFactor = 0.3;

    controls.keys = [65, 83, 68];

    // controls2 = new THREEE.FlyControls( camera, renderer.domElement );
    // controls2.movementSpeed = 30;
    // controls2.rollSpeed = 0.105;
    // controls2.autoForward = false;
    // controls2.dragToLook = true;


    controls.addEventListener('change', render);

    scene = new THREE.Scene();

    // Node geometry
    if (that.layout === "3d") {
      geometry = new THREE.SphereGeometry(30);
    } else {
      //geometry = new THREE.BoxGeometry( 200, 200, 0 );
      geometry = new THREE.CircleGeometry(100, 100);
    }

    // Create node selection, if set
    if (that.selection) {
      object_selection = new THREE.ObjectSelection({
        domElement: renderer.domElement,
        selected: function (obj) {
          // display info
          if (obj !== null) {
            info_text.select = "Object " + obj.id + " | " + obj.position.x + "," + obj.position.y;
          } else {
            delete info_text.select;
          }
        },
        clicked: function (obj) {
        }
      });
    }

    document.body.appendChild(renderer.domElement);

    // Stats.js
    if (that.show_stats) {
      stats = new Stats();
      stats.domElement.style.position = 'absolute';
      stats.domElement.style.top = '0px';
      document.body.appendChild(stats.domElement);
    }

    // Create info box
    if (that.show_info) {
      var info = document.createElement("div");
      var id_attr = document.createAttribute("id");
      id_attr.nodeValue = "graph-info";
      info.setAttributeNode(id_attr);
      document.body.appendChild(info);
    }
  }

  function createGraphNew() {
    let edges = edgesGrafo;

    //primeiro node
    var node = new GRAPHVIS.Node(nodePrincipal);
    node.data.title = node.id + " (eu)";
    graph.addNode(node);
    drawNode(node);
    console.log("PRIMEIRO NODE");

    nodes = [];
    nodes.push(node);

    for (var i = 0; i < edges.length; i++) {

      var node1 = new GRAPHVIS.Node(edges[i][0]);
      node1.data.title = node1.id;

      if (graph.addNode(node1)) {
        drawNode(node1);
        nodes.push(node1);
        //console.log("entrou 1");
      } else {
        for (var y = 0; y < nodes.length; y++) {
          var actualnode = nodes[y];
          if (actualnode.id === edges[i][0]) {
            node1 = actualnode;
          }
        }
      }

      var node2 = new GRAPHVIS.Node(edges[i][1]);
      node2.data.title = node2.id;

      if (graph.addNode(node2)) {
        drawNode(node2);
        nodes.push(node2);
        //console.log("entrou 2");
      } else {
        for (var y = 0; y < nodes.length; y++) {
          var actualnode = nodes[y];
          if (actualnode.id === edges[i][1]) {
            node2 = actualnode;
          }
        }
      }

      if (graph.addEdge(node1, node2)) {
        drawEdge(node1, node2);
      }

    }

    that.layout_options.width = that.layout_options.width || 2000;
    that.layout_options.height = that.layout_options.height || 2000;
    that.layout_options.iterations = that.layout_options.iterations || 100000;
    that.layout_options.layout = that.layout_options.layout || that.layout;
    graph.layout = new Layout.ForceDirected(graph, that.layout_options);
    graph.layout.init();
    info_text.nodes = "Nodes " + graph.nodes.length;
    info_text.edges = "Edges " + graph.edges.length;
  }

  /**
   *  Create a node object and add it to the scene.
   */
  function drawNode(node) {
    var draw_object;

    /*if(node.id === nodePrincipal){
      draw_object = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( {  color: 0x00000, opacity: 1 } ) );
    }else{
      draw_object = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( {  color: Math.random() * 0xe0e0e0, opacity: 1 } ) );
    }*/

    draw_object = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: Math.random() * 0xe0e0e0, opacity: 1}));

    var label_object;

    if (that.show_labels) {
      if (node.data.title !== undefined) {
        label_object = new THREE.Label(node.data.title);
      } else {
        label_object = new THREE.Label(node.id);
      }
      node.data.label_object = label_object;
      scene.add(node.data.label_object);
    }

    var area = 5000;

    //nao ta a fazer nada :/
    let nivelNode = 0;
    for (let i = 0; i < niveis.length; i++) {
      if (niveis[i][1] === node.id) {
        nivelNode = niveis[i][0];
      }
    }
    let pos = 0;
    for (let i = 0; i < niveis.length; i++) {
      if (niveis[i][0] === nivelNode) {
        pos++;
      }
      if (niveis[i][1] === node.id)
        break;
    }
    console.log("POSICAO")
    console.log(pos)
    let quantidadeNodesNivel = numeroNiveis[nivelNode];
    let angle = pos * (2 * Math.PI / quantidadeNodesNivel)
    let cos = Math.cos(angle)
    let sin = Math.sin(angle)

    if (node.id === nodePrincipal) {
      draw_object.position.x = 0;
      draw_object.position.y = 0;
      console.log(node.id + "===" + nodePrincipal);
    } else {
      draw_object.position.x = 1000 * nivelNode * cos;
      draw_object.position.y = 1000 * nivelNode * sin;
    }
    //draw_object.position.x = Math.floor(Math.random() * (area + area + 1) - area);draw_object.position.y = Math.floor(Math.random() * (area + area + 1) - area);

    if (that.layout === "3d") {
      draw_object.position.z = Math.floor(Math.random() * (area + area + 1) - area);
    }

    draw_object.id = node.id;
    node.data.draw_object = draw_object;
    node.position = draw_object.position;
    scene.add(node.data.draw_object);

    console.log("Node: " + node.id);
  }


  /**
   *  Create an edge object (line) and add it to the scene.
   */
  function drawEdge(source, target) {
    material = new THREE.LineBasicMaterial({color: 0x606060});

    var tmp_geo = new THREE.Geometry();
    tmp_geo.vertices.push(source.data.draw_object.position);
    tmp_geo.vertices.push(target.data.draw_object.position);

    let line = new THREE.LineSegments(tmp_geo, material);
    line.scale.x = line.scale.y = line.scale.z = 1;
    line.originalScale = 1;

    // NOTE: Deactivated frustumCulled, otherwise it will not draw all lines (even though
    // it looks like the lines are in the view frustum).
    line.frustumCulled = false;

    geometries.push(tmp_geo);

    scene.add(line);

    console.log("Edge: " + source.id + " -> " + target.id);
  }

  function render1() {
    if(parar===1){
      document.querySelector('canvas').remove();
      renderer.domElement.addEventListener('dbclick',null,false);
      scene=null;
      camera=null;
      controls=null;
      return;
    }
    requestAnimationFrame(render1);
    controls.update();
    render();
  }

  function empty(elem) {
    while (elem.lastChild) elem.removeChild(elem.lastChild);
  }

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
    if (that.show_info) {
      printInfo();
    }

    // for(var i = 0; i < nodes.length; i++){
    //   if(nodes[i].id === nodePrincipal){
    //     console.log("obrigar posicao a 0");
    //     nodes[i].position.x = 0;
    //     nodes[i].position.y = 0;
    //   }
    // }

  }


  function render() {
    var i, length, node;

    // Generate layout if not finished
    // if(!graph.layout.finished) {
    //   console.log("gerar");
    //   info_text.calc = "<span style='color: red'>Calculating layout...</span>";
    //   graph.layout.generate();
    // } else {
    //   info_text.calc = "";
    // }

    // Update position of lines (edges)
    for (i = 0; i < geometries.length; i++) {
      geometries[i].verticesNeedUpdate = true;
    }


    // Show labels if set
    // It creates the labels when this options is set during visualization
    if (that.show_labels) {
      length = graph.nodes.length;
      for (i = 0; i < length; i++) {
        node = graph.nodes[i];
        if (node.data.label_object !== undefined) {
          node.data.label_object.position.x = node.data.draw_object.position.x;
          node.data.label_object.position.y = node.data.draw_object.position.y + 100;
          node.data.label_object.position.z = node.data.draw_object.position.z;
          node.data.label_object.lookAt(camera.position);
        } else {
          var label_object;
          if (node.data.title !== undefined) {
            label_object = new THREE.Label(node.data.title, node.data.draw_object);
          } else {
            label_object = new THREE.Label(node.id, node.data.draw_object);
          }
          node.data.label_object = label_object;
          scene.add(node.data.label_object);
        }
      }
    } else {
      length = graph.nodes.length;
      for (i = 0; i < length; i++) {
        node = graph.nodes[i];
        if (node.data.label_object !== undefined) {
          scene.remove(node.data.label_object);
          node.data.label_object = undefined;
        }
      }
    }

    // render selection
    if (that.selection) {
      object_selection.render(scene, camera);
    }

    // update stats
    if (that.show_stats) {
      stats.update();
    }

    // render scene
    renderer.setViewport(0, 0, window.innerWidth, window.innerHeight)
    renderer.setScissor(0, 0, window.innerWidth, window.innerHeight)
    renderer.setScissorTest(false);
    renderer.render(scene, camera);

    // renderer.setScissorTest(true);
    // renderer.setScissor(0, 0, 0,  0);
    // renderer.setClearColor(0x000000, 1); // border color
    // renderer.clearColor(); // clear color buffer
    //
    renderer.clear(false, true, false)
    renderer.setViewport(1300, 300, 200, 200);
    renderer.setScissor(1300, 300, 200, 200);
    renderer.setScissorTest(true);
    // minimapaCamera.updateProjectionMatrix();
    renderer.render(scene, minimapaCamera);

  }

  /**
   *  Prints info from the attribute info_text.
   */
  function printInfo(text) {
    var str = '';
    for (var index in info_text) {
      if (str !== '' && info_text[index] !== '') {
        str += " - ";
      }
      str += info_text[index];
    }
    document.getElementById("graph-info").innerHTML = str;
  }

  // Generate random number
  function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
  }

  // Stop layout calculation
  this.stop_calculating = function () {
    graph.layout.stop_calculating();
  };
};
