/**
 * Created by Colby on 4/22/2017.
 */
define(["modules/global"], function (global) {
	function Arrow(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.verts = [];

		this.pX = this.x * global.ppm;
		this.pY = (global.physicsHeight - this.y) * global.ppm;
		this.pVerts = [];

		this.createBody();
	}

	Arrow.prototype = {
		createBody: function () {
			this.body = new p2.Body({mass: 1, position: [this.x, this.y]});
			this.body.addShape(this.createArrowShape());

			var axis = new p2.Body({position: [this.x, this.y]});
			var constraint = new p2.RevoluteConstraint(this.body, axis, {
				worldPivot: [this.x, this.y]
			});
			constraint.collideConnected = false;

			var left = new p2.Body({position: [this.x - 2, this.y]});
			var right = new p2.Body({position: [this.x + 2, this.y]});
			var leftConstraint = new p2.DistanceConstraint(this.body, left, {
				localAnchorA: [-this.w * 2, this.h * 0.25],
				collideConnected: false
			});
			var rightConstraint = new p2.DistanceConstraint(this.body, right, {
				localAnchorA: [this.w * 2, this.h * 0.25],
				collideConnected: false
			});
			var s = 100,
				r = 0;

			leftConstraint.setStiffness(s);
			leftConstraint.setRelaxation(r);
			rightConstraint.setStiffness(s);
			rightConstraint.setRelaxation(r);

			global.world.addBody(this.body);
			global.world.addBody(axis);
			global.world.addConstraint(constraint);
			global.world.addConstraint(leftConstraint);
			global.world.addConstraint(rightConstraint);
		},
		createArrowShape: function () {
			this.verts[0] = [0, this.h * 0.25];
			this.verts[1] = [-this.w * 0.5, 0];
			this.verts[2] = [0, -this.h * 0.75];
			this.verts[3] = [this.w * 0.5, 0];

			this.pVerts[0] = [this.verts[0][0] * global.ppm, -this.verts[0][1] * global.ppm];
			this.pVerts[1] = [this.verts[1][0] * global.ppm, -this.verts[1][1] * global.ppm];
			this.pVerts[2] = [this.verts[2][0] * global.ppm, -this.verts[2][1] * global.ppm];
			this.pVerts[3] = [this.verts[3][0] * global.ppm, -this.verts[3][1] * global.ppm];

			var shape = new p2.Convex(this.verts);
			shape.material = global.arrowMaterial;

			return shape;
		},
		draw: function () {
			global.ctx.save();
			global.ctx.translate(this.pX, this.pY);
			global.ctx.rotate(-this.body.angle);

			global.ctx.fillStyle = '#401911';

			global.ctx.beginPath();
			global.ctx.moveTo(this.pVerts[0][0], this.pVerts[0][1]);
			global.ctx.lineTo(this.pVerts[1][0], this.pVerts[1][1]);
			global.ctx.lineTo(this.pVerts[2][0], this.pVerts[2][1]);
			global.ctx.lineTo(this.pVerts[3][0], this.pVerts[3][1]);
			global.ctx.closePath();
			global.ctx.fill();

			global.ctx.restore();
		}
	};

	return Arrow;
});
