var Key=function(game,number){
  GameObject.call(this,"key",game);

  this.number=number;
  this.spike=null;

  var key = BABYLON.Mesh.CreateTorus("key",0.75,0.25,10,this.getScene());
  key.parent=this;

  game.shadows.getShadowMap().renderList.push(key);
};

Key.prototype=Object.create(GameObject.prototype);
Key.prototype.constructor=Key;

Key.prototype.link=function(spike){
  this.spike=spike;
};

Key.prototype.delete=function () {
  this.spike.delete();
  this.dispose();
};
