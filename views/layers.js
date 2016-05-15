(function (container) {
    "use strict";

    container.Layer = function(canvas){
      var newCanvas = canvas.cloneNode(true);
      this._canvas = newCanvas;
      this._context = newCanvas.getContext("2d");
      this._size = 8;
      this._offset = 0;
    };

    container.Layer.prototype = {
      get: function(){
        return {
          canvas: this._canvas,
          context: this._context
        };
      },
      getCanvas: function(){
        return this._canvas;
      },
      getContext: function(){
        return this._context;
      },
      clear: function(){
        this._context.beginPath(); // clearing the lines
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
      },
      drawText: function(x,y,text){
        var size = this._size;
        this._context.font = "10px Verdana";
        this._context.fillStyle = mb.Colors.black;
        this._context.fillText(text,x,y);
      },
      clearText: function(x,y,length){
        console.log(arguments);
        this._context.clearRect(x, y, 500, y+30);
      },
      drawPoint: function(x,y,color){
        var size = this._size;
        this._context.fillStyle = color;
        this._context.fillRect((x+this._offset) * size+this._offset,  (y+this._offset) * size+this._offset,  size-this._offset,  size-this._offset);
      }
    };

    container.Layers = function(dom){
      this._dom = dom;
      this._layers = {};
      var style = window.getComputedStyle(dom, null);
      var canvas = document.createElement("canvas");
      canvas.width = dom.offsetWidth;
      canvas.height = dom.offsetHeight;
      this._canvas = canvas;
    };
    container.Layers.prototype = {
      append: function(id){
        var layer = new container.Layer(this._canvas);
        this._dom.appendChild(layer.get().canvas);
        this._layers[id] = layer;
      },
      getLayer: function(id){
        return this._layers[id];
      }
    };
})(mb);
