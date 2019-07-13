/**
 * projet   : LegaChat
 * version  : 0.1-a
 * date     : 5/07/2019
 * file     : main.js
 * location : /front/js/
 * author   : Anarchy
 */

var title = 'LegaChat';

class background {
	static grid(ct) {
		if(!ct) var ct = 'light';
		const theme = {
			light: {
				bg: "rgba(255, 255, 255, .15)",
				gd: ["rgba(0, 0, 0, .05)", "rgba(0, 0, 0, .025)"]
			},
			dark: {
				bg: "rgba(0, 0, 0, .15)",
				gd: ["rgba(255, 255, 255, .05)", "rgba(255, 255, 255, .025)"]
			}
		}

		var ctx = $("#grid")[0].getContext("2d"),
			obj = Array(50, 10),
			ratio = {
				x: [window.innerWidth/obj[0], window.innerWidth/obj[1]],
				y: [window.innerHeight/obj[0], window.innerHeight/obj[1]]
			};

		ctx.canvas.height = window.innerHeight;
		ctx.canvas.width = window.innerWidth;
		ctx.fillStyle = theme[ct].bg;
		ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

		ctx.lineWidth = 2;
		ctx.lineCap = 'square';
		ctx.setLineDash([2, 8]);

		for(let k = 0; k < 2; k++) {
			for(let i = 0; i < ratio.y[k]; i++) {
				for(let j = 0; j < ratio.x[k]; j++) {
					ctx.strokeStyle = theme[ct].gd[k];
					ctx.strokeRect(j*obj[k]-1, i*obj[k]-1, obj[k], obj[k]);
				}
			}
		}

		$("#grid").fadeIn();
	}
}

class loader {
	constructor() {
		var cl = new CanvasLoader('contentLoader');
		cl.setColor('#EEEEEE');
		cl.setShape('spiral');
		cl.setDiameter(100);
		cl.setDensity(100);
		cl.setRange(.6);
		cl.setSpeed(3);
		cl.setFPS(60);
		cl.show();

		$('#loader').fadeIn();
	}

	static status(msg) {
		if($('#loader #statusLoader').html())
			$('#loader #statusLoader').fadeOut(function() {
				$(this)
					.html(msg)
					.fadeIn();
			});
		else
			$('#loader #statusLoader')
				.html(msg)
				.fadeIn();
	}

	static close() {
		$('#loader').fadeOut(() => {
			$('#loader #contentLoader').html('');
			$('#loader #statusLoader')
				.html('')
				.css({ display: 'none' });
		});
	}
}

$(document).ready(() => {
	background.grid();

	new loader();
	loader.status('Chargement des ressources');
	$('title').html(`${title} | Loading_`);

	setTimeout(xhr.index, 1000);
});

/**
 * END
 */
