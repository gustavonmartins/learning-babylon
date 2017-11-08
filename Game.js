window.addEventListener(
  "DOMContentLoaded",
  function(){
    new Game("gameCanvas");
  },
  false
);

var Game=function(canvasId){
  var canvas = document.getElementById(canvasId);
  this.engine=new BABYLON.Engine(canvas,true);

  this.scene=this._initScene(this.engine);
  this.assets=[];
  this.currentLevel=1;
  this.player=null;
  this.level=null;
  this._initGame();
  var _this=this;
  this.engine.runRenderLoop(function () {
  _this.scene.render();
  });
};

Game.prototype._initScene=function(engine){
  var scene = new BABYLON.Scene(engine);
  var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(2.5,6,-6.5),scene);
  camera.rotation=new BABYLON.Vector3(Math.PI/3.5,0,0);
  camera.attachControl(engine.getRenderingCanvas());

  var light = new BABYLON.HemisphericLight("light",new BABYLON.Vector3(0,1,0),scene);
  light.intensity=0.7;

  this.activateSkybox(scene);

  //Begin Shadows
  var dl=new BABYLON.DirectionalLight("dir",new BABYLON.Vector3(2,-10,-20)),scene;
  dl.position=new BABYLON.Vector3(0,2,100);
  this.shadows=new BABYLON.ShadowGenerator(1024,dl);
  this.shadows.useBlurExponentialShadowMap=true;
  //End shadows

  return scene
};

Game.prototype._initGame=function(){
  this.player=new Player(this);

  var levels=

[
  [],
  [
    ['S',0,0,0,-1,'-'],
    [1,'-','-','-','-','-'],
    [1,'-',0,0,-2,'-'],
    [0,0,0,'-','-','-'],
    ['-','-',2,0,0,'F']
  ]

]
  ;
  this.level=Level.FromInts(levels[this.currentLevel],this);
  //this.level=Level.FromInts(levels,this);

  this.player.position=this.level.start.position.clone();

  this.player.position.y=2;

  this.scene.debugLayer.show();
};

Game.prototype.activateSkybox=function(scene){
  //Skybox method
  var skybox=BABYLON.Mesh.CreateBox("skyBox",100.0,scene);
  var skyboxMaterial = new BABYLON.StandardMaterial("skyBox",scene);
  skyboxMaterial.backFaceCulling=false;
  skyboxMaterial.reflectionTexture=new BABYLON.CubeTexture("assets/skybox/sky",scene);
  skyboxMaterial.reflectionTexture.coordinatesMode=BABYLON.Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor=new BABYLON.Color3(0,0,0);
  skyboxMaterial.specularColor=new BABYLON.Color3(0,0,0);
  skybox.material=skyboxMaterial;
  //Enf of skybox method
};
