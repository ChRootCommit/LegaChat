<?php
	/**
	 * projet   : LegaChat
	 * version  : 0.1-a
	 * date     : 5/07/2019
	 * file     : crypto.php
	 * location : /core/
	 * author   : Anarchy
	 */

	class crypto {
		/**
		 * service
		 */

		public static function usrPsw($data) {
			/**
			 * usrPws(data)
			 *
			 * Function : Encodes a data type for User
			 */

			$data = hash('sha256', $data);
			$data = str_rot13($data);

			return $data;
		}

		public static function msg($data) {
			/**
			 * msg(data)
			 *
			 * Function : Encodes a data type for Chanel Text Output
			 */

			$data = str_rot13($data);

			return $data;
		}
	}

	/**
	 * END
	 */
?>
