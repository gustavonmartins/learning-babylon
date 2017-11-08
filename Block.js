var Block=function (x,z,game) {
  GameObject.call(this,"block",game);
  var vertexData=BABYLON.VertexData.CreateBox(1,BABYLON.Mesh.DEFAULTSIDE);
  vertexData.applyToMesh(this);

  this.position.x=x;
  this.position.z=-z;

  this.activateShadows();

};

Block.prototype=Object.create(GameObject.prototype);
Block.prototype.constructor=Block;

Block.TYPES={
  NOTHING: '-',
  NORMAL: 0,
  START: 'S',
  FINISH: 'F'
};

Block.prototype.activateShadows=function(){
  this.receiveShadows=true;
};
