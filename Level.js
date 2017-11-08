var Level=function (game) {
  this.scene=game.scene;
  this.game=game;

  this.start=null;
  this.keys=[];
  this.spikes=[];
  this.blocks=[];

};

Level.prototype.dispose=function(){
  this.blocks.forEach(function(b){
    b.dispose();
  });
this.keys.forEach(function(k){
  k.delete();
})
};

Level.FromInts=function(matrix,game){
  var level=new Level(game);

  //This should go into box class
  var groundMat = new BABYLON.StandardMaterial("ground",game.scene);
  groundMat.diffuseTexture=new BABYLON.Texture("assets/ground4.jpg",game.scene);
  //End of box class

  for(var z=0;z<matrix.length;z++){
    for (var x=0;x<matrix[z].length;x++){
      var type=matrix[z][x];
      var block=null;
      if (type==Block.TYPES.NOTHING){
        //Nothing to do here
      } else {
        block = new Block(x,z,game);

        //This should go into box class
        block.material=groundMat;
        //End of box class

        level.blocks.push(block);
        if (type==Block.TYPES.NORMAL){
          //Useless to do more
        } else if (type==Block.TYPES.START){
          level.start=block;
        } else if (type==Block.TYPES.FINISH){
          var a = new Apple(game);
          a.position=block.position.clone();
          a.position.y=1;
          level.finish=block;
        } else {
          if (type>0){
            var s = new Spikes(game,Math.abs(type));
            s.position=new BABYLON.Vector3(x,0.5,-z);
            level.spikes.push(s);
          } else {
            var k = new Key(game,Math.abs(type));
            k.position=new BABYLON.Vector3(x,0.75,-z);
            level.keys.push(k);
          }
        }
      }
    }
  }

  for (var k=0;s<level.keys.length;k++) {
    var currentKey=level.keys[k];
    for (var s=0;s<level.spikes.length;s++) {
      var currentSpike=level.spikes[s];
      if (currentSpike.number==currentKey.number){
        currentKey.link(currentSpike);
      }
    }
  }
  return level;
};
