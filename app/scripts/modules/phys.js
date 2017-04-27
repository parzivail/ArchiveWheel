/**
 * Created by Colby on 4/22/2017.
 */
define(['modules/global', 'modules/wheel', 'modules/arrow', 'modules/ui'], function (global, Wheel, Arrow, ui) {
	return {
		begin: function () {
			function initDrawingCanvas() {
				global.drawingCanvas.width = global.viewWidth;
				global.drawingCanvas.height = global.viewHeight;
				global.ctx = global.drawingCanvas.getContext('2d');

				// global.drawingCanvas.addEventListener('mousemove', updateMouseBodyPosition);
				// global.drawingCanvas.addEventListener('mousedown', checkStartDrag);
				// global.drawingCanvas.addEventListener('mouseup', checkEndDrag);
				// global.drawingCanvas.addEventListener('mouseout', checkEndDrag);
			}

			function updateMouseBodyPosition(e) {
				var p = getPhysicsCoord(e);
				global.mouseBody.position[0] = p.x;
				global.mouseBody.position[1] = p.y;
			}

			function checkStartDrag(e) {
				if (global.world.hitTest(global.mouseBody.position, [global.wheel.body])[0]) {

					global.mouseConstraint = new p2.RevoluteConstraint(global.mouseBody, global.wheel.body, {
						worldPivot: global.mouseBody.position,
						collideConnected: false
					});

					global.world.addConstraint(global.mouseConstraint);
				}

				if (global.wheelSpinning === true) {
					global.wheelSpinning = false;
					global.wheelStopped = true;
				}
			}

			function checkEndDrag(e) {
				if (global.mouseConstraint) {
					global.world.removeConstraint(global.mouseConstraint);
					global.mouseConstraint = null;

					if (global.wheelSpinning === false && global.wheelStopped === true) {
						global.wheelSpinning = true;
						global.wheelStopped = false;
					}
				}
			}

			function getPhysicsCoord(e) {
				var rect = global.drawingCanvas.getBoundingClientRect(),
					x = (e.clientX - rect.left) / global.ppm,
					y = global.physicsHeight - (e.clientY - rect.top) / global.ppm;

				return {x: x, y: y};
			}

			function initPhysics() {
				global.world = new p2.World();
				global.world.solver.iterations = 10;
				global.world.solver.tolerance = 0;

				global.arrowMaterial = new p2.Material();
				global.pinMaterial = new p2.Material();
				global.contactMaterial = new p2.ContactMaterial(global.arrowMaterial, global.pinMaterial, {
					friction: 0.5,
					restitution: 0.1
				});
				global.world.addContactMaterial(global.contactMaterial);

				var wheelRadius = 16,
					wheelX = global.physicsCenterX,
					wheelY = global.physicsCenterY,
					arrowX = wheelX,
					arrowY = wheelY + wheelRadius + 0.625;

				global.wheel = new Wheel(wheelX, wheelY, wheelRadius, 10, 0.25, wheelRadius - 0.3);
				global.wheel.body.angle = (Math.PI / 32.5);
				global.wheel.body.angularVelocity = -(50 + 30 * Math.random());
				global.arrow = new Arrow(arrowX, arrowY, 0.5, 1.5);
				global.arrow.body.angularDamping = 1;
				global.mouseBody = new p2.Body();

				global.wheelSpinning = true;
				global.wheelStopped = false;

				global.world.addBody(global.mouseBody);
			}

			function update() {
				var steps = 3;
				for (var i = 1; i <= steps; i++)
					global.world.step(global.timeStep * (i / steps));

				if (global.wheelSpinning === true && global.wheelStopped === false &&
					Math.abs(global.wheel.body.angularVelocity) < 0.01) {

					global.wheelStopped = true;
					global.wheelSpinning = false;

					global.wheel.body.angularVelocity = 0;

					var currentRotation = (global.wheel.body.angle / Math.PI * 180) % 360;
					if (currentRotation < 0)
						currentRotation = 360 + currentRotation;

					var currentSegment = Math.ceil(currentRotation / 36 - 0.4) - 3;
					if (currentSegment == 10)
						currentSegment = 0;
					else if (currentSegment < 0)
						currentSegment = 10 + currentSegment;

					global.currentIndex = currentSegment;
					ui.showDemo();
				}
			}

			function draw() {
				global.ctx.clearRect(0, 0, global.viewWidth, global.viewHeight);

				global.wheel.draw();
				global.arrow.draw();
			}

			function loop() {
				update();
				draw();

				requestAnimationFrame(loop);
			}

			initDrawingCanvas();
			initPhysics();

			requestAnimationFrame(loop);

			ui.doAnim();
		}
	}
});
