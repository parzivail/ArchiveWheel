/**
 * Created by Colby on 4/22/2017.
 */
define(["modules/global"], function (global) {
	function Wheel(x, y, radius, segments, pinRadius, pinDistance) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.segments = segments;
		this.pinRadius = pinRadius;
		this.pinDistance = pinDistance;

		this.pX = this.x * global.ppm;
		this.pY = (global.physicsHeight - this.y) * global.ppm;
		this.pRadius = this.radius * global.ppm;
		this.pPinRadius = this.pinRadius * global.ppm;
		this.pPinPositions = [];

		this.deltaPI = Math.PI * 2 / this.segments;

		this.createBody();
		this.createPins();
	}

	Wheel.prototype = {
		createBody: function () {
			this.body = new p2.Body({mass: 10, position: [this.x, this.y]});
			this.body.angularDamping = 0.2;
			this.body.addShape(new p2.Circle(this.radius));
			this.body.shapes[0].sensor = true; //TODO use collision bits instead

			var axis = new p2.Body({position: [this.x, this.y]});
			var constraint = new p2.LockConstraint(this.body, axis);
			constraint.collideConnected = false;

			global.world.addBody(this.body);
			global.world.addBody(axis);
			global.world.addConstraint(constraint);
		},
		createPins: function () {
			var l = this.segments,
				pin = new p2.Circle(this.pinRadius);

			pin.material = global.pinMaterial;

			for (var i = 0; i < l; i++) {
				var x = Math.cos(i / l * Math.PI * 2) * this.pinDistance,
					y = Math.sin(i / l * Math.PI * 2) * this.pinDistance;

				this.body.addShape(pin, [x, y]);
				this.pPinPositions[i] = [x * global.ppm, -y * global.ppm];
			}
		},
		draw: function () {
			// TODO this should be cached in a canvas, and drawn as an image
			// also, more doodads
			global.ctx.save();
			global.ctx.translate(this.pX, this.pY);

			global.ctx.beginPath();
			global.ctx.fillStyle = '#FF7F00';
			global.ctx.arc(0, 0, this.pRadius + 24, 0, Math.PI * 2);
			global.ctx.fill();

			global.ctx.rotate(-this.body.angle);

			global.ctx.fillStyle = '#000';
			global.ctx.strokeStyle = '#FF7F00';
			global.ctx.lineWidth = 3;

			for (var i = 0; i < this.segments; i++) {
				global.ctx.beginPath();
				global.ctx.arc(0, 0, this.pRadius, i * this.deltaPI, (i + 1) * this.deltaPI);
				global.ctx.lineTo(0, 0);
				global.ctx.closePath();

				global.ctx.fill();

				global.ctx.save();
				global.ctx.rotate(i * this.deltaPI);
				global.ctx.translate(500 / 2, 0);
				global.ctx.rotate(108 / 180 * Math.PI);
				global.ctx.translate(-500 / 2 + 40, -(500 / global.demos[i].image.width) / 2 - 150);

				global.ctx.clip();
				global.ctx.drawImage(global.demos[i].image, 0, 0, global.demos[i].image.width, global.demos[i].image.height,     // source rectangle
					0, 0, 500, (500 / global.demos[i].image.width) * global.demos[i].image.height); // destination rectangle
				global.ctx.restore();

				global.ctx.stroke();
			}

			global.ctx.fillStyle = '#FFF';

			this.pPinPositions.forEach(function (p) {
				global.ctx.beginPath();
				global.ctx.arc(p[0], p[1], this.pPinRadius, 0, Math.PI * 2);
				global.ctx.fill();
			}, this);

			global.ctx.restore();
		}
	};
	return Wheel;
});
