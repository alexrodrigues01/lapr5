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
var nodes;
var Drawing = Drawing || {};

Drawing.SimpleGraph = function(options) {

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

  var camera, controls, scene, renderer, interaction, geometry, object_selection;
  var stats;
  var info_text = {};
  var graph = new GRAPHVIS.Graph({limit: options.limit});

  var geometries = [];

  var that=this;

  init();
  createGraphNew();
  //createGraph();
  animate();

  function init() {
    // Three.js initialization
    renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);


    camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 1000000);
    camera.position.z = 10000;

    controls = new THREE.TrackballControls(camera);

    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 5.2;
    controls.panSpeed = 0.5;

    controls.noZoom = false;
    controls.noPan = false;
    //
    controls.noRotate = true;
    //

    controls.staticMoving = false;
    controls.dynamicDampingFactor = 0.3;

    controls.keys = [ 65, 83, 68 ];

    controls.addEventListener('change', render);

    scene = new THREE.Scene();

    // Node geometry
    if(that.layout === "3d") {
      geometry = new THREE.SphereGeometry(30);
    } else {
      //geometry = new THREE.BoxGeometry( 200, 200, 0 );
      geometry = new THREE.CircleGeometry( 100, 100 );
    }

    // Create node selection, if set
    if(that.selection) {
      object_selection = new THREE.ObjectSelection({
        domElement: renderer.domElement,
        selected: function(obj) {
          // display info
          if(obj !== null) {
            info_text.select = "Object " + obj.id + " | " + obj.position.x + "," + obj.position.y;
          } else {
            delete info_text.select;
          }
        },
        clicked: function(obj) {
        }
      });
    }

    document.body.appendChild( renderer.domElement );

    // Stats.js
    if(that.show_stats) {
      stats = new Stats();
      stats.domElement.style.position = 'absolute';
      stats.domElement.style.top = '0px';
      document.body.appendChild( stats.domElement );
    }

    // Create info box
    if(that.show_info) {
      var info = document.createElement("div");
      var id_attr = document.createAttribute("id");
      id_attr.nodeValue = "graph-info";
      info.setAttributeNode(id_attr);
      document.body.appendChild( info );
    }
  }

  function createGraphNew(){
    let edges = edgesGrafo;

    //primeiro node
    var node = new GRAPHVIS.Node(nodePrincipal);
    node.data.title = node.id + " (eu)";
    graph.addNode(node);
    drawNode(node);
    console.log("PRIMEIRO NODE");

    nodes = [];
    nodes.push(node);

    for(var i = 0; i < edges.length; i++){

      var node1 = new GRAPHVIS.Node(edges[i][0]);
      node1.data.title = node1.id;

      if(graph.addNode(node1)){
        drawNode(node1);
        nodes.push(node1);
        //console.log("entrou 1");
      }else{
        for(var y = 0; y < nodes.length; y++){
          var actualnode = nodes[y];
          if(actualnode.id === edges[i][0]){
            node1 = actualnode;
          }
        }
      }

      var node2 = new GRAPHVIS.Node(edges[i][1]);
      node2.data.title = node2.id;

      if(graph.addNode(node2)){
        drawNode(node2);
        nodes.push(node2);
        //console.log("entrou 2");
      }else{
        for(var y = 0; y < nodes.length; y++){
          var actualnode = nodes[y];
          if(actualnode.id === edges[i][1]){
            node2 = actualnode;
          }
        }
      }

      if(graph.addEdge(node1, node2)) {
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

    draw_object = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( {  color: Math.random() * 0xe0e0e0, opacity: 1 } ) );

    var label_object;

    if(that.show_labels) {
      if(node.data.title !== undefined) {
        label_object = new THREE.Label(node.data.title);
      } else {
        label_object = new THREE.Label(node.id);
      }
      node.data.label_object = label_object;
      scene.add( node.data.label_object );
    }

    var area = 5000;

    //nao ta a fazer nada :/
    if(node.id === nodePrincipal){draw_object.position.x = 0;draw_object.position.y = 0;console.log(node.id + "===" + nodePrincipal);}else{draw_object.position.x = Math.floor(Math.random() * (area + area + 1) - area);draw_object.position.y = Math.floor(Math.random() * (area + area + 1) - area);}

    //draw_object.position.x = Math.floor(Math.random() * (area + area + 1) - area);draw_object.position.y = Math.floor(Math.random() * (area + area + 1) - area);

    if(that.layout === "3d") {
      draw_object.position.z = Math.floor(Math.random() * (area + area + 1) - area);
    }

    draw_object.id = node.id;
    node.data.draw_object = draw_object;
    node.position = draw_object.position;
    scene.add( node.data.draw_object );

    console.log("Node: " + node.id);
  }


  /**
   *  Create an edge object (line) and add it to the scene.
   */
  function drawEdge(source, target) {
      material = new THREE.LineBasicMaterial({ color: 0x606060 });

      var tmp_geo = new THREE.Geometry();
      tmp_geo.vertices.push(source.data.draw_object.position);
      tmp_geo.vertices.push(target.data.draw_object.position);

      line = new THREE.LineSegments( tmp_geo, material );
      line.scale.x = line.scale.y = line.scale.z = 1;
      line.originalScale = 1;

      // NOTE: Deactivated frustumCulled, otherwise it will not draw all lines (even though
      // it looks like the lines are in the view frustum).
      line.frustumCulled = false;

      geometries.push(tmp_geo);

      scene.add( line );

    console.log("Edge: " + source.id + " -> " + target.id);
  }


  function animate() {
    requestAnimationFrame( animate );
    controls.update();
    render();
    if(that.show_info) {
      printInfo();
    }

    for(var i = 0; i < nodes.length; i++){
      if(nodes[i].id === nodePrincipal){
        console.log("obrigar posicao a 0");
        nodes[i].position.x = 0;
        nodes[i].position.y = 0;
      }
    }

  }


  function render() {
    var i, length, node;

    // Generate layout if not finished
    if(!graph.layout.finished) {
      console.log("gerar");
      info_text.calc = "<span style='color: red'>Calculating layout...</span>";
      graph.layout.generate();
    } else {
      info_text.calc = "";
    }

    // Update position of lines (edges)
    for(i=0; i<geometries.length; i++) {
      geometries[i].verticesNeedUpdate = true;
    }


    // Show labels if set
    // It creates the labels when this options is set during visualization
    if(that.show_labels) {
      length = graph.nodes.length;
      for(i=0; i<length; i++) {
        node = graph.nodes[i];
        if(node.data.label_object !== undefined) {
          node.data.label_object.position.x = node.data.draw_object.position.x;
          node.data.label_object.position.y = node.data.draw_object.position.y + 100;
          node.data.label_object.position.z = node.data.draw_object.position.z;
          node.data.label_object.lookAt(camera.position);
        } else {
          var label_object;
          if(node.data.title !== undefined) {
            label_object = new THREE.Label(node.data.title, node.data.draw_object);
          } else {
            label_object = new THREE.Label(node.id, node.data.draw_object);
          }
          node.data.label_object = label_object;
          scene.add( node.data.label_object );
        }
      }
    } else {
      length = graph.nodes.length;
      for(i=0; i<length; i++) {
        node = graph.nodes[i];
        if(node.data.label_object !== undefined) {
          scene.remove( node.data.label_object );
          node.data.label_object = undefined;
        }
      }
    }

    // render selection
    if(that.selection) {
      object_selection.render(scene, camera);
    }

    // update stats
    if(that.show_stats) {
      stats.update();
    }

    // render scene
    renderer.render( scene, camera );
  }

  /**
   *  Prints info from the attribute info_text.
   */
  function printInfo(text) {
    var str = '';
    for(var index in info_text) {
      if(str !== '' && info_text[index] !== '') {
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
  this.stop_calculating = function() {
    graph.layout.stop_calculating();
  };
};
