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

		let form = {};
		$.get('./front/views/addUser.html', content => form.addUser = content);
		$.get('./front/views/newPass.html', content => form.newPass = content);

		$('<script></script>', {
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

		xhr.isAdmin(() => {
			$('.btnArea').prepend('<button id="addUser"><span class="fal fa-user-plus"></span></button>');
			$('#addUser').click(function() {
				$('#chat #popup').html(function() {
					$(this)
						.html(form.addUser)
						.find('#popupClose').click(() => $('#chat #popup').fadeOut());

					$(this).find('form').submit(function(e) {
						e.preventDefault();
						if(
							!$(this).find('input[name="username"]').val()
							|| !$(this).find('input[name="password"]').val()
							|| !$(this).find('input[name="confirm"]').val()
						)
							return false;

						if($(this).find('input[name="password"]').val() !== $(this).find('input[name="confirm"]').val()) {
							$(this)
								.find('input[name="password"]')
								.select();

							$(this)
								.find('.error')
								.html('different password')
								.fadeIn();

							return false;
						}

						let post = $(this).serialize();
						xhr.addUser(post);
					});

					$(this).fadeIn(function() {
						$(this).find('input[name="username"]').focus();
					});
				});
			});
		});

		$('#save').click(xhr.save);

		$('#updateUsrPsw').click(function() {
			$('#chat #popup').html(function() {
				$(this)
					.html(form.newPass)
					.find('#popupClose').click(() => $('#chat #popup').fadeOut());

				$(this).find('form').submit(function(e) {
					e.preventDefault();
					if(
						!$(this).find('input[name="password"]').val()
						|| !$(this).find('input[name="confirm"]').val()
					)
						return false;

					if($(this).find('input[name="password"]').val() !== $(this).find('input[name="confirm"]').val()) {
						$(this)
							.find('input[name="password"]')
							.select();

						$(this)
							.find('.error')
							.html('different password')
							.fadeIn();

						return false;
					}

					let post = $(this).serialize();
					xhr.setPassword(post);
				});

				$(this).fadeIn(function() {
					$(this).find('input[name="password"]').focus();
				});
			});
		});

		$('#chatLogOut').click(() => {
			$('title').html(`${title} | Disconnecting_`);
			xhr.logout();
			setTimeout(() => document.location.reload(), 500);
		});

		$('#chatSession').append(data.name);

		Object.entries(data.chatContent).forEach(key => core.generateMsg(key[1], data.name));

		$('#chat #chatEntry form').submit(function(e) {
			e.preventDefault();
			if($(this).find('textarea').val() === '')
				return false;

			let post = $("#chat form").serialize();
			$(this)[0].reset();

			xhr.sendMsg(post);
		});

		$('#chat #chatEntry textarea')
			.keypress(e => {
				if(e.keyCode === 13) {
					$('#chat #chatEntry form').submit();
					setTimeout(() => $("#chat #chatEntry form")[0].reset(), 50);
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
