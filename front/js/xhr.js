/**
 * projet   : LegaChat
 * version  : 0.1-a
 * date     : 5/07/2019
 * file     : xhr.js
 * location : /front/js/
 * author   : Anarchy
 */

class xhr {
	static index() {
		/**
		 * Xhr Login Request
		 */

		$.ajax({
			type: 'post',
			url: './?process=checking',
			dataType: 'json',
			success: result => {
				if(result.passed) {
					loader.status('Chargement des composants du chat');
					$('title').html(`${title} | Connecting_`);
					$('section').load('./front/views/chat.html', () => process.chat(result));
				} else {
					loader.status('Chargement de la page d\'authentification');
					$('title').html(`${title} | Authentification_`);
					$('section').load('./front/views/login.html', process.login);
				}
			}
		});
	}

	static login(data, func) {
		/**
		 * Xhr Login Request
		 */

		$.ajax({
			type: 'post',
			url: './?process=login',
			data: data,
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
	}

	static isAdmin(func) {
		$.ajax({
			type: 'post',
			url: './?process=isAdmin',
			dataType: 'json',
			success: result => {
				if(result.isAdmin)
					func();
			}
		});
	}

	static logout() {
		/**
		 * Xhr Logout Request
		 */

		$.ajax({
			type: 'post',
			url: './?process=logout'
		});
	}

	static addUser(data) {
		/**
		 * Xhr Update User Password
		 */

		$.ajax({
			type: 'post',
			url: './?process=addUser',
			data: data,
			dataType: 'json',
			success: result => {
				if(result.passed) {
					$("#popup form .error")
						.css({ color: 'rgb(0, 150, 0)' })
						.html('user added')
						.fadeIn();

					$("#popup form input[type='submit']").prop('disabled', true);

					setTimeout(() => $('#popup #popupClose').click(), 1000);
				} else {
					$("#popup form .error")
						.html('failed')
						.fadeIn();
				}
			}
		});
	}

	static setPassword(data) {
		/**
		 * Xhr Update User Password
		 */

		$.ajax({
			type: 'post',
			url: './?process=setPassword',
			data: data,
			dataType: 'json',
			success: result => {
				if(result.passed) {
					$("#popup form .error")
						.css({ color: 'rgb(0, 150, 0)' })
						.html('password changed')
						.fadeIn();

					$("#popup form input[type='submit']").prop('disabled', true);

					setTimeout(() => $('#popup #popupClose').click(), 1000);
				} else {
					$("#popup form .error")
						.html('failed')
						.fadeIn();
				}
			}
		});
	}

	static save() {
		$.ajax({
			type: 'post',
			url: './?process=checking',
			dataType: 'json',
			success: result => {
				console.log(result.chatContent);
				core.download({ chatContent: result.chatContent });
			}
		});
	}

	static refresh(chatContent) {
		/**
		 * Xhr Refresh Output Area when recieve event Loop Request
		 */

		$.ajax({
			type: 'post',
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

		setTimeout(() => xhr.refresh(chatContent), 1000);
	}

	static sendMsg(data) {
		/**
		 * Xhr Sending Chat Message Request
		 */

		$.ajax({
			type: 'post',
			url: './?process=sending',
			data: data,
			dataType: 'json'
		});
	}
}

/**
 * END
 */
