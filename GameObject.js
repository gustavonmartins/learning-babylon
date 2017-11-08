//////////////////////
var GameObject=function(name,game){
  BABYLON.Mesh.call(this,name,game.scene);

  this.game=game;
  this.scene=game.scene;
};

GameObject.prototype=Object.create(BABYLON.Mesh.prototype);
GameObject.prototype.constructor=GameObject;
//////////////////////
