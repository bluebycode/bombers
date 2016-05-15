(function (container) {
    "use strict";

    container.Objects = function(grid, render){
      this._grid = grid;
      this._objects = new Array(255);
      this._map = {};
      this._removed = [];
      this._render = render;
    };

    container.Objects.prototype = {
      get: function(){
        return this._objects;
      },
      getById: function(id){
        if (this._map[id] === undefined){
          return;
        }
        var index = this._map[id];
        return this._objects[index];
      },
      removeObject: function(id){
        if (this._map[id] === undefined){
          return;
        }
        var index = this._map[id];
        var value = this._objects[index];
        this._objects[index] = undefined;
        this._grid.remove(value.x, value.y);
        delete this._map[index];
        this._removed.push(index);
        return value.object;
      },
      getObject: function(posx,posy){
        return this._grid.get(posx, posy);
      },
      addObject: function(posx,posy,obj){
        var value = { x: posx, y: posy, object: obj };
        var index = this._objects.length;
        if (this._removed.length > 0 ){
          index = this._removed.splice(0, 1);
          this._objects[index] = value;
        } else {
          this._objects.push(value);
        }
        this._grid.set(value.x, value.y, value.object);

        if (obj.id !== undefined){
          this._map[obj.id] = index;
        }
      },
      _drawObject: function(x,y,object){
        this._render.drawPoint(x,y,object.color);
      },
      draw: function(){
        // clear all objects from the layout
        this._render.clear();

        // iterating over to objects to draw their updated status
        var self = this;
        this._objects.forEach(function(value){
          if (value === undefined || value.x === undefined || value.y === undefined || value.object === undefined){
            return;
          }
          //console.log('drawing object', value.x, value.y, value.object);
          self._drawObject(value.x, value.y, value.object);
        });
      }
    };
})(mb);
