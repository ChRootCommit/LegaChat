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
		$("<link/>", {
			rel: "stylesheet",
			type: "text/css",
			href: "./front/css/chat.css"
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

		Object.entries(data.chatContent).forEach((key, value) => {
			let msg = '';

			if(key[1][0] === data.name) msg += '<article class="owner">';
			else msg += '<article>';

			msg += `<p class="msgOwner">${key[1][0]}</p>`;
			msg += `<p class="msgDate">${key[1][1]}</p>`;
			msg += `<p class="msgContent">${key[1][2]}</p>`;
			msg += '</article>';

			$('#chatOutput').append(msg);
		});

		$('#chat form').submit(e => {
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

		$('#chat textarea').keypress(e => {
			if(e.keyCode === 13) {
				$('#chat form').submit();
				setTimeout(() => $("#chat form")[0].reset(), 50);
			}
		});

		setTimeout(() => process.chatRefresh(data.chatContent), 200);
		setTimeout(() => $('#chatOutput').scrollTop($('#chatOutput')[0].scrollHeight), 100);
		setTimeout(loader.close, 1000);
	}

	static chatRefresh(chatContent) {
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
					let msg = '';

					if(result.chatContent[count[1]][0] === result.name) msg += '<article class="owner">';
					else msg += '<article>';

					msg += `<p class="msgOwner">${result.chatContent[count[1]][0]}</p>`;
					msg += `<p class="msgDate">${result.chatContent[count[1]][1]}</p>`;
					msg += `<p class="msgContent">${result.chatContent[count[1]][2]}</p>`;
					msg += '</article>';

					$('#chatOutput').append(msg);
					setTimeout(() => $('#chatOutput').scrollTop($('#chatOutput')[0].scrollHeight), 100);

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
