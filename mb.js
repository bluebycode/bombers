var mb = {};

mb.rand = function(width,height){
  return Math.floor(Math.random() * width * height);
};
mb.getPosition = function(index, width, height){
  return { x: parseInt(index / width),
           y: index - (width * parseInt(index / width))};
};
mb.randPosition = function(width,height){
  return mb.getPosition(mb.rand(width, height), width, height);
};

String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] != 'undefined'
      ? args[number]
      : match
    ;
  });
};
