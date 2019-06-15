//===================================================
//
// Module:  Ellipsoid
// Library:	Mecho 4.0
// License:	CC-3.0 SA NC
//
// Constructors:
//		ellipsoid(center)
//		ellipsoid(center,length)
//		ellipsoid(center,length,width)
//		ellipsoid(center,length,width,height)
//
//===================================================

Mecho.Ellipsoid = function(center,length,width,height,custom)
{
	Mecho.Mecholet.apply(this,arguments);
	arguments[this.customIndex] = undefined;

	this.nice = true;
	this.center = center;
	this.length = length||1;
	this.width = width||this.length;
	this.height = height||this.width;

	var n = Mecho.N(PI*this.length/2);
	this.tiles = [2*n,n];
	
	this.custom(this.customValues);
}


Mecho.Ellipsoid.prototype = Object.create(Mecho.Mecholet.prototype);


Mecho.Ellipsoid.prototype.drawFaces = function()
{
	this.prepareMaterial(0);
	this.ctx.gl.uniform3f(this.ctx.uPos,0,0,0);
	this.ctx.gl.uniform3f(this.ctx.uScale,this.length/2,this.width/2,this.height/2);
	this.ctx.gl.uniform2f(this.ctx.uTexScale,this.tiles[0],this.tiles[1]);
	this.ctx.geometrySphere[this.nice].drawFaces();
}


Mecho.Ellipsoid.prototype.atPoint = function(relX,relY,relZ)
{
	if (relY===undefined) // atPoint(z)
		return this.point([relX*this.height/2,0,0]);
	else // atPoint(x,y,z)
		return this.point([relX*this.height/2,relY*this.width/2,relZ*this.height/2]);
}


function ellipsoid(center,length,width,height,custom)
{
	return new Mecho.Ellipsoid(center,length,width,height,custom);
}
