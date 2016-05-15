(function (container) {
    "use strict";

    container.World = function(areaView, objectsView){
      this._areaView = areaView;
      this._objectsView = objectsView;
      this._area = null;
      this._sector = null;
      this._status = null;
    };

    container.World.prototype = {

      notify: function(){
        var args = [].slice.call(arguments);
        var message = args.shift();
        console.log(String.prototype.format.apply(message, args));
      },

      /**
       * Terrain auxiliary functions.
       */
      spawnArea: function(dimension){
        var status = new mb.Status(this._areaView);
        status.setMessage('Spawning area..', 10000);
        this._status = status;


        // creating objects from the beginning, also player's
        var grid = new container.Grid(dimension.width, dimension.height);
        this._sector = new container.Objects(grid, this._objectsView);

        // creating layout to contain tileset
        var tiles = new container.Grid(dimension.width, dimension.height);
        tiles.fill(container.Tiles.Empty);
        tiles.randomise((dimension.width * dimension.height)/9, container.Tiles.Stone,container.Tiles.Empty);
        tiles.randomise((dimension.width * dimension.height)/2, container.Tiles.Sand,container.Tiles.Empty);

        var area = new container.Area(tiles, this._areaView);
        this._area = area;
        return area;
      },
      getPosition: function(position, direction){
        var nextPosition = function(pos, direction){
          var x = pos.x,
              y = pos.y;
          switch (direction){
            case 'up':   y-=1; break;
            case 'down': y+=1; break;
            case 'left': x-=1; break;
            case 'right': x+=1; break;
          }
          return {x: x, y: y};
        };

        var terrain = this._area.getGrid(),
            pos = (direction === undefined) ? position : nextPosition(position, direction);

        var value = terrain.getByPosition(pos);
        return {
          position: { x: pos.x, y: pos.y},
          value: value
        };
      },

      /**
       * Objects interactions.
       */
      moveObject: function(objectId, position){
        var object = this._sector.removeObject(objectId);
        if (object !== undefined){
          this._sector.addObject(position.x, position.y, object);
        }
      },
      addObject: function(position, object){
        this._sector.addObject(position.x, position.y, object);
      },

      getObject: function(position){
        return this._sector.get(position.x, position.y);
      },

      /**
       * Players interactions.
       */
      spawnPlayer: function(player){
        // get random empty place to begin
        var terrain = this._area.getGrid();
        var spawnedAt = terrain.getRandom(container.Tiles.Empty);
        if (spawnedAt === undefined){
          console.log('Player was not spawned correctly');
          return;
        }
        this.addObject(spawnedAt, { id: 'player', color: container.Colors.green});
        return spawnedAt;
      },
      movePlayerTo: function(position){
        this.moveObject('player', position);
      },

      /**
       * Step.
       */
      step: function(){
        this._drawCurrentArea();
        this._drawObjects();
        this._drawGameContext();
      },
      /**
       * Drawing auxiliar functions
       */
      _drawCurrentArea: function(){
        this._area.draw();
      },
      _drawObjects: function(){
        this._sector.draw();
      },
      _drawGameContext: function(){
        this._status.draw();
      }
    };
})(mb);
