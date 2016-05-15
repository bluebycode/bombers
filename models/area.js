(function (container) {
    "use strict";

    container.Area = function(grid, render){
      this._grid = grid;
      this._render = render;
    };

    container.Area.prototype = {
      _drawTile: function(x,y,tile){
        this._render.drawPoint(x,y,tile.color);
      },
      getGrid: function(){
        return this._grid;
      },
      draw: function(){
        var self = this;
        this._grid.each(function(x,y,tile){
          self._drawTile(x,y,tile);
        });
      }
    };

    container.Status = function(render){
      this._message = null;
      this._expiresAt = null;
      this._render = render;
      this._x = 0;
      this._y = 450;
    };

    container.Status.prototype = {
      setMessage: function(message, expiration){
        this._message = message;
        this._expiresAt = new Date().getTime() + expiration;
      },
      draw: function(){
        if (this._message === undefined || this._message === null){
          return;
        }
        if (this._message !== undefined && this._message !== null
          && this._expiresAt !== null && this._expiresAt <= new Date().getTime()){
          console.log('expired!!!');
          this._render.clearText(this._x,this._y,this._message.length);
          this._message = null;
          this._expiresAt = null;
          return;
        }
        this._render.drawText(this._x,this._y,this._message);
      }
    };
})(mb);
