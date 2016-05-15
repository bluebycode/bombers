(function (container) {
    "use strict";

    container.Colors = {
      clear:    "#ccccb3",
      green:    "#999966",
      brown:    "#5c5c3d",
      red:      "#ff0000",
      darkgrey: "#3B3432",
      grey:     "#757473",
      black:    "#000000",
      yellow:   "#ffcc00"
    };

    container.Tiles = {
      Empty: { type:  0, hits: 0,    color: container.Colors.clear},
      Stone: { type:  1, hits: 1000, color: container.Colors.darkgrey},
      Sand:  { type:  2, hits: 200,  color: container.Colors.grey},
    };

})(mb);
