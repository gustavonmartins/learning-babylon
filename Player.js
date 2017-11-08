var Player=function(game){
  GameObject.call(this,"player",game);

  this.body=null;
  this.direction=[0,0];
  this.rotations=[0,0];

  this.activateTransparency();

  var vertexData=BABYLON.VertexData.CreateSphere(16,0.75,BABYLON.Mesh.DEFAULTSIDE);
  vertexData.applyToMesh(this);

  this.position.y=Player.START_HEIGHT;

  var _this=this;
  this.getScene().registerBeforeRender(function(){
    if (_this.position.y<10) {
      //_this.game.reset();
    }
  });
};

Player.prototype=Object.create(GameObject.prototype);
Player.prototype.constructor=Player;

Player.prototype.activateTransparency=function(){
  //Transparency and fresnel
  var material=new BABYLON.StandardMaterial("playerMaterial",this.getScene());
  material.diffuseColor=new BABYLON.Color3.Red();
  material.emissivecolor=new BABYLON.Color3(1,1,1);
  material.alpha=0.1;

  var color=BABYLON.Color3.Yellow();

  material.emissiveFresnelParameters = new BABYLON.FresnelParameters();
  material.emissiveFresnelParameters.bias=0.6;
  material.emissiveFresnelParameters.power=2;
  material.emissiveFresnelParameters.leftColor=BABYLON.Color3.Black();
  material.emissiveFresnelParameters.rightColor=color;

  material.opacityFresnelParameters=new BABYLON.FresnelParameters();
  material.opacityFresnelParameters.leftColor=BABYLON.Color3.White();
  material.opacityFresnelParameters.rightColor=BABYLON.Color3.Black();

  this.material=material;
  //End of transparency and fresnel
};
