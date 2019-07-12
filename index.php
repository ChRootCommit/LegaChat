<?php
	/**
	 * projet   : LegaChat
	 * version  : 0.1-a
	 * date     : 5/07/2019
	 * file     : index.php
	 * location : /core/
	 * author   : Anarchy
	 */

	if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
		/**
		 * XHR Request Only
		 */

		require('./core/controller.php');
	}

	else {
		/**
		 * HTTP Request & Other
		 */

		require('./front/index.html');
	}

	/**
	 * END
	 */
?>
