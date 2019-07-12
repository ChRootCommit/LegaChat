/**
 * projet   : LegaChat
 * version  : 0.1-a
 * date     : 5/07/2019
 * file     : process.js
 * location : /front/js/
 * author   : Anarchy
 */

class process {
	static login() {
		/**
		 * Login resources
		 */

		$("<link/>", {
			rel: "stylesheet",
			type: "text/css",
			href: "./front/css/login.css"
		}).appendTo("head");

		$('#login form').submit(e => {
			e.preventDefault();
			$("#login form .error").css({ display: 'none' });
			let post = $("#login form").serialize();

			$.ajax({
				type: 'POST',
				url: './?process=login',
				data: post,
				dataType: 'json',
				success: result => {
					if(result.passed) {
						$("#login form .error")
							.css({ color: 'rgb(0, 150, 0)' })
							.html("connexion...")
							.fadeIn();

						$("#login form input[type='submit']").prop('disabled', true);

						setTimeout(() => document.location.reload(), 500);
					} else {
						$("#login form .error")
							.html(result.error)
							.fadeIn();
					}
				}
			});
		});

		setTimeout(loader.close, 1000);
	}

	static chat(data) {
		/**
		 * Chat resources
		 */

		$("<link/>", {
			rel: "stylesheet",
			type: "text/css",
			href: "./front/css/chat.css"
		}).appendTo("head");

		$("<script></script>", {
			language: "javascript",
			type: "text/javascript",
			src: "./front/js/core.js"
		}).appendTo("head");

		$('title').html(`${title} | Connected_`);

		$('#chatLogOut').click(() => {
			$.ajax({
				type: 'POST',
				url: './?process=logout'
			});

			setTimeout(() => document.location.reload(), 500);
		});

		$('#chatSpeaker').append(data.name);

		Object.entries(data.chatContent).forEach(key => {
			core.generateMsg(key[1], data.name);
		});

		$('#chat form').submit(e => {
			if($('#chat form textarea').val() === '')
				return false;

			e.preventDefault();
			let post = $("#chat form").serialize();
			$("#chat form")[0].reset();

			$.ajax({
				type: 'POST',
				url: './?process=sending',
				data: post,
				dataType: 'json'
			});
		});

		$('#chat textarea')
			.keypress(e => {
				if(e.keyCode === 13) {
					$('#chat form').submit();
					setTimeout(() => $("#chat form")[0].reset(), 50);
				}
			})
			.focus();

		setTimeout(() => process.chatRefresh(data.chatContent), 200);
		setTimeout(loader.close, 1000);
	}

	static chatRefresh(chatContent) {
		/**
		 * Refresh Output Area when recieve event
		 */

		$.ajax({
			type: 'POST',
			url: './?process=checking',
			dataType: 'json',
			success: result => {
				let count = [
					Object.keys(result.chatContent).length,
					Object.keys(chatContent).length
				];

				if(count[0] > count[1]) {
					core.generateMsg(result.chatContent[count[1]], result.name);
					chatContent = result.chatContent;
				}
			}
		});

		setTimeout(() => process.chatRefresh(chatContent), 1000);
	}
}

/**
 * END
 */
