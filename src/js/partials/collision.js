
var c = {

  alculate_rotated_square: function(obj){
    var V = SAT.Vector;
    var P = SAT.Polygon;

    var x = obj.x;
    var y = obj.y;
    var a = obj.angle;
    var l = obj.left;
    var r = obj.right;
    var t = obj.top;
    var b = obj.bottom;

    var tl = c.rotate(x, y, l, t, a);
    var tr = c.rotate(x, y, r, t, a);
    var br = c.rotate(x, y, r, b, a);
    var bl = c.rotate(x, y, l, b, a);

    obj.poly = new P(new V(x, y), [ new V(tl[0], tl[1]), new V(tr[0], tr[1]), new V(br[0], br[1]), new V(bl[0], bl[1]) ]);

  },

  ollision_square_square: function(obj_a, obj_b){

    // points are negative because objects are bottom right aligned
    //var carPoly = new P(new V(car.x, car.y), [new V(-200, -184), new V(-6, -76), new V(-90, -25), new V(-285, -132)]);
    //var obstaclePoly = new P(new V(obstacle.x, obstacle.y), [new V(-200, -184), new V(-6, -76), new V(-90, -25), new V(-285, -132)]);

    // c.alculate_rotated_square(obj_a);
    // c.alculate_rotated_square(obj_b);

    // var response = new SAT.Response();

    var collided = SAT.testPolygonPolygon(obj_a.poly, obj_b.poly/*, response*/); //response object is optional, will contain all the points that overlap

    if (collided){
      // console.log(one.key, two.key, collided);
      //two.tint = 0xFF0000;
      return true;
    }else{
      return false;
      //two.tint = 0xFFFFFF;
    }
  },

  ollision_circle_square: function(obj_a, obj_b){
    var V = SAT.Vector;
    var C = SAT.Circle;

    var circle = new C(new V(obj_b.x,obj_b.y), 0);

    c.alculate_rotated_square(obj_a);

    var collided = SAT.testPolygonCircle(obj_a.poly, circle );

    if (collided){
      return true;
    }else{
      return false;
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
  },

  alculate_cordinates: function(object){
    for (var i = 0, l = object.length; i < l; i++){
      if(object[i].alive){
        c.alculate_rotated_square(object[i]);
      }
    }
  }

};

module.exports = c;
