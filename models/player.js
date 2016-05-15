(function (container) {
    "use strict";
    container.Player = function(){
      this._x = -1;
      this._y = -1;
      this._z = 0;
      this._area = null;
    };

    container.Player.prototype = {
      setPosition: function(position){
        this._x = position.x;
        this._y = position.y;
        this._z = position.z;
      },
      getPosition: function(){
        return {
          x: this._x,
          y: this._y
        };
      },
      setWorld: function(world){
        this._world = world;
      },
      setArea: function(area){
        this._area = area;
      },
      moveTo: function(position){
        this.setPosition(position);
        this._world.movePlayerTo(position);
      },
      getNextMove: function(action){
        var nextMove = this._world.getPosition({x: this._x, y: this._y}, action);
        if (nextMove === undefined || nextMove.value === undefined) return;
        return nextMove;
      },
      notify: function(){
        this._world.notify.apply(null, [].slice.call(arguments));
      },
      start: function(){
        this._controller.onEvent(this, {
          // player moves
          directions: function(action){
            var nextMove = this.getNextMove(action);
            if (nextMove){
              this.moveTo(nextMove.position);
            }else{
              var pos = this.getPosition();
              this.notify('Move {0} not allowed from x: {1}, y: {2} }', action, pos.x, pos.y);
            }
          },
          // player action
          action: function(){
            console.log('action');
          }
        });
      },
      addKeyListener: function(controller){
        this._controller = controller;
      }
    };
})(mb);
