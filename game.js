(function (container,window) {
    "use strict";

    container.KeyController = function(context){
      this._context = context;
      this._listener = {};
    };
    container.KeyController.prototype = {
      _registerEvents: function(){
        var self = this;
        window.addEventListener("keydown", function(e) {
          if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
            var action;
            var key = e.keyCode ? e.keyCode : e.which;
            switch (key){
              case 38: action = 'up'; break;
              case 40: action = 'down'; break;
              case 37: action = 'left'; break;
              case 39: action = 'right'; break;
              case 32: action = 'action'; break;
            }

            if (action === undefined){
              return;
            }

            if (self._listener[action] !== undefined){
              self._listener[action].bind(self._context)();
            }

            if([37, 38, 39, 40].indexOf(key) > -1) {
              self._listener.directions.bind(self._context)(action);
            }
          }
        }, false);
      },
      onEvent: function(context, events){
        for (var event in events) {
          if (events.hasOwnProperty(event)) {
            this._listener[event] = events[event].bind(context);
          }
        }
        this._registerEvents();
      }
    };

    container.Game = function(world){
      this._world = world;
      this._player = null;
      this._status = 0;
    };

    container.Game.prototype = {
      addPlayer: function(player){
        this._player = player;
      },
      run: function(msec) {
        this.initialise();
        var self = this;
        msec = msec || 500;
        this._interval = setInterval(function() { this._step(); }.bind(this), msec);
      },
      stop: function() {
        clearInterval(this._interval);
        this._interval = null;
      },
      _step: function(){
        this._world.step();
      },
      initialise: function(root){
        var area = this._world.spawnArea({width: 50, height: 50});

        var player = this._player;
        var initialPosition = this._world.spawnPlayer(player);
        player.setPosition(initialPosition);

        player.addKeyListener(new mb.KeyController(this));
        player.setWorld(this._world);
        player.setArea(area);

        player.start();
      }
    };
})(mb, window);
