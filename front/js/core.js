/**
 * projet   : LegaChat
 * version  : 0.1-a
 * date     : 5/07/2019
 * file     : core.js
 * location : /front/js/
 * author   : Anarchy
 */

class core {
	static rot13(data) {
		/**
		 * Translate rot13 string to lisible string
		 */

		let rot = {
			input: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
			output: 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm'
		};

		let index     = x => rot.input.indexOf(x);
		let translate = x => index(x) > -1 ? rot.output[index(x)] : x;

		return data.split('').map(translate).join('');
	}

	static charToLink(data) {
		/**
		 * Transform string to hypertext link
		 */

		let msg = '';

		data.split(' ').forEach(key => {
			if(key.split('http://').length > 1 || key.split('https://').length > 1)
				msg += `<a href="${key}" target="_blank">${key}</a> `;
			else
				msg += `${key} `;
		});

		return msg;
	}

	static generateMsg(data, name) {
		/**
		 * Create a msg box
		 */

		let msg = '';

		if(data[0] === name) msg += '<article class="owner">';
		else msg += '<article>';

		msg += `<p class="msgOwner">${data[0]}</p>`;
		msg += `<p class="msgDate">${data[1]}</p>`;
		msg += `<p class="msgContent">${core.charToLink(core.rot13(data[2]))}</p>`;
		msg += '</article>';

		$('#chatOutput').append(msg);
		setTimeout(() => $('#chatOutput').scrollTop($('#chatOutput')[0].scrollHeight), 100);
	}

	static saveChat(exportObj) {
		/**
		 * Save chat output as json file
		 */

		let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
		let downloadAnchorNode = document.createElement('a');

		downloadAnchorNode.setAttribute("href", dataStr);
		downloadAnchorNode.setAttribute("download", `LegaChat_${Date.now()}.json`);
		document.body.appendChild(downloadAnchorNode);
		downloadAnchorNode.click();
		downloadAnchorNode.remove();
	}
}

/**
 * END
 */
