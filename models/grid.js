(function (container) {
    "use strict";

    container.Cell = function(x,y){
      this._x = x;
      this._y = y;
      this._value = null;
    };

    container.Cell.prototype = {
      set: function(value){
        this._value = value;
      },
      get: function(value){
        return this._value;
      },
      has: function(){
        return this._value != undefined && this._value != null;
      }
    };
    container.Grid = function(width, height){
      this._width = width;
      this._height = height;
      this._cells = new Array( this._width * this._height );
    };

    container.Grid.prototype = {
      get: function(x,y){
        if (this.isInside())
          return this._cells[y * this._width + x];
      },
      getByPosition: function(pos){
        return this.get(pos.x, pos.y);
      },
      move: function(x0,y0,x1,y1){
        var value = this.get(x0, y0);
        this.set(x1,y1,value);
        this.remove(x0,y0);
      },
      isInside: function(x,y){
        return x<this._width && y<this._height && x >= 0 && y >= 0;
      },
      set: function(x,y, value){
        this._cells[y * this._width + x] = value;
      },
      remove:function(x,y){
        this._cells[y * this._width + x] = null;
      },
      getWidth: function(){
        return this._width;
      },
      getHeight: function(){
        return this._height;
      },
      each: function(action){
        var self = this;
        for (var y = 0; y < this._height; y++){
          for (var x = 0; x < this._width; x++){
            action.bind(self)(x,y,this.get(x,y));
          }
        }
      },
      _range: function(n, fn){
        var self = this;
        Array.apply(null, Array(n)).map(function (_, i) {
          var callback = fn.bind(self);
          callback(i);
          return i;
        });
      },
      fill: function(object){
        var self = this;
        this.each(function(x,y,value){
          self.set(x, y, object);
        });
      },
      getRandom: function(cell){
        var cycles = 0;
        var tile = null;
        var rand = container.rand(this._width, this._height);
        var max = 0;
        // let's iterate as times cell is not the type indicated is
        while (max<100 && cycles<=1 && this._isNullOrValue(container.getPosition(rand,this._width, this._height),cell)){
          max++;
          rand++;
          if (rand >= this._width * this._height){
            rand = 0;
            cycles++;
          }
        }
        //console.log(rand,container.getPosition(rand, this._width, this._height));
        if (cycles>1) throw new Error('not available free place found');
        return container.getPosition(rand, this._width, this._height);
      },
      _isNullOrValue: function(value, expected){
        return ( value === undefined || // undefined values
            (expected !== undefined && expected.type !== undefined && expected.type === expected.type));
      },
      randomise: function(times, object, empty){
        var self = this;
        var left = times;
        var index = this._width * this._height;

        // filling only empty spaces
        while (left>0 && index>0){
          index--;
          var pos = container.randPosition(this._width, this._height);
          var value = this.get(pos.x, pos.y);
          if (this._isNullOrValue(value, empty)){
            this.set(pos.x, pos.y, object);
            left--;
          }
        }

        // if still left to fill, don't care about others
        if (left>0 && index<0){
          while (left>0){
            var pos = container.randPosition(this._width, this._height);
            this.set(pos.x, pos.y, object);
            left--;
          }
        }
      }
    };

})(mb);
