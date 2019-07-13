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

		$('#login').fadeIn(() => {
			setTimeout(() => $('#login h2').animate({ opacity: 1 }, 500), 1000);
			setTimeout(() => {
				$('#login .inputBox').animate({ opacity: 1 }, 500);
				$('#login input[type="submit"]').animate({ opacity: 1 }, 500);
			}, 1500);
		});

		$('#login form').submit(e => {
			e.preventDefault();
			$("#login form .error").css({ display: 'none' });
			let post = $("#login form").serialize();

			xhr.login(post);
		});

		setTimeout(loader.close, 1000);
	}

	static chat(data) {
		/**
		 * Chat resources
		 */

		$("<script></script>", {
			language: "javascript",
			type: "text/javascript",
			src: "./front/js/core.js"
		}).appendTo("head");

		$('title').html(`${title} | Connected_`);

		$('#chat').fadeIn(() => {
			setTimeout(() => $('#chat #chatHeader').animate({ opacity: 1 }, 500), 1000);
			setTimeout(() => $('#chat #chatOutput').animate({ opacity: 1 }, 500), 1500);
			setTimeout(() => $('#chat #chatEntry').animate({ opacity: 1 }, 500), 2000);
		});

		$('#save').click(() => core.saveChat({ chatContent: data.chatContent }));

		$('#updateUsrPsw').click(function() {
			$(this).prop('disabled', true);
			$('#chat #popup').load('./front/views/newPass.html', function() {
				$(this).find('#popupClose').click(() => {
					$('#chat #popup').fadeOut();
					$('#updateUsrPsw').prop('disabled', false);
				});

				$(this).find('form').submit(function(e) {
					e.preventDefault();
					if($(this).find('input[name="password"]').val() === '')
						return false;

					let post = $(this).serialize();
					xhr.setPassword(post);
				});

				$(this).fadeIn();
			});
		});

		$('#chatLogOut').click(() => {
			$('title').html(`${title} | Disconnecting_`);
			xhr.logout();
			setTimeout(() => document.location.reload(), 500);
		});

		$('#chatSession').append(data.name);

		Object.entries(data.chatContent).forEach(key => {
			core.generateMsg(key[1], data.name);
		});

		$('#chat form').submit(e => {
			e.preventDefault();
			if($('#chat form textarea').val() === '')
				return false;

			let post = $("#chat form").serialize();
			$("#chat form")[0].reset();

			xhr.sendMsg(post);
		});

		$('#chat textarea')
			.keypress(e => {
				if(e.keyCode === 13) {
					$('#chat form').submit();
					setTimeout(() => $("#chat form")[0].reset(), 50);
				}
			})
			.focus();

		xhr.refresh(data.chatContent);
		setTimeout(loader.close, 1000);
	}
}

/**
 * END
 */
