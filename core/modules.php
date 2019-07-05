<?php
	/**
	 * projet   : LegaChat
	 * version  : 0.1-a
	 * date     : 5/07/2019
	 * file     : modules.php
	 * location : /core/
	 * author   : Anarchy
	 */

	class service {
		/**
		 * service
		 */

		public static function fetchMsg($bdd) {
			/**
			 * fetchMsg()
			 *
			 * Function : Fetching all messages in database
			 */

			$req = [
				'Usr' => $bdd->query('SELECT id, name FROM usr'),
				'Msg' => $bdd->query('SELECT idOwner, time, content FROM msg')
			]; $users = $data = [];

			while($output = $req['Usr']->fetch(PDO::FETCH_NUM))
				array_push($users, $output);

			while($output = $req['Msg']->fetch(PDO::FETCH_NUM)) {
				$output[0] = $users[$output[0]-1][1];
				array_push($data, $output);
			}

			return $data;
		}

		public static function fetchUsr($bdd) {
			/**
			 * fetchUsr()
			 *
			 * Function : Fetching all users in database with password
			 */

			$req = $bdd->query('SELECT name, pass FROM usr');
			$data = [];

			while($output = $req->fetch(PDO::FETCH_ASSOC))
				array_push($data, $output);

			return $data;
		}

		public static function insert($bdd) {
			
		}
	}
