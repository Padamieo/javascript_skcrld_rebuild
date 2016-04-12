
var col = {

  calculate_rotated_square: function(obj){
    var V = SAT.Vector;
    var P = SAT.Polygon;

    var x = obj.x;
    var y = obj.y;
    var a = obj.angle;
    var l = obj.left;
    var r = obj.right;
    var t = obj.top;
    var b = obj.bottom;

    var tl = col.rotate(x, y, l, t, a);
    var tr = col.rotate(x, y, r, t, a);
    var br = col.rotate(x, y, r, b, a);
    var bl = col.rotate(x, y, l, b, a);

    obj.poly = new P(new V(x, y), [ new V(tl[0], tl[1]), new V(tr[0], tr[1]), new V(br[0], br[1]), new V(bl[0], bl[1]) ]);

  },

  isionCheck: function(obj_a, obj_b){

    // points are negative because objects are bottom right aligned
    //var carPoly = new P(new V(car.x, car.y), [new V(-200, -184), new V(-6, -76), new V(-90, -25), new V(-285, -132)]);
    //var obstaclePoly = new P(new V(obstacle.x, obstacle.y), [new V(-200, -184), new V(-6, -76), new V(-90, -25), new V(-285, -132)]);

    col.calculate_rotated_square(obj_a);
    col.calculate_rotated_square(obj_b);

    // var response = new SAT.Response();

    var collided = SAT.testPolygonPolygon(obj_a.poly, obj_b.poly/*, response*/); //response object is optional, will contain all the points that overlap

    if (collided){
      // console.log(one.key, two.key, collided);
      two.tint = 0xFF0000;
    }else{
      two.tint = 0xFFFFFF;
    }
  },

  rotate: function(cx, cy, x, y, angle){

      var posangle = (angle < 0 ? angle+Math.PI*2 : angle);
      var radians = (Math.PI / 180) * posangle;
      var cos = Math.cos(radians);
      var sin = Math.sin(radians);

        var nx = (x - cx) * cos - (y - cy) * sin;
        var ny = (y - cy) * cos + (x - cx) * sin;
        //OLD
        // nx = (cos * (x - cx)) - (sin * (y - cy)) + cx,
        // ny = (cos * (y - cy)) + (sin * (x - cx)) + cy;
      return [nx, ny];
  }

};

module.exports = col;
