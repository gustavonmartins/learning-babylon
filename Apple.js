var Apple=function(game){
  GameObject.call(this,"apple",game);

  var apple = BABYLON.Mesh.CreateTorusKnot("knot",0.25,0.05,64,64,2,3,this.getScene());
  apple.parent=this;

};

Apple.prototype=Object.create(GameObject.prototype);
Apple.prototype.constructor=Apple;
