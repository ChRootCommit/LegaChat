<?php
	/**
	 * projet   : LegaChat
	 * version  : 0.1-a
	 * date     : 5/07/2019
	 * file     : service.php
	 * location : /core/
	 * author   : Anarchy
	 */

	class service {
		/**
		 * service
		 */

		public static function fetchMsg($bdd) {
			/**
			 * fetchMsg(dataBase)
			 *
			 * Function : Fetching all messages in database
			 */

			$req = $bdd->query('SELECT msg.idOwner, msg.time, msg.content, usr.id, usr.name FROM msg, usr WHERE msg.idOwner=usr.id');
			$users = $data = [];

			while($output = $req->fetch(PDO::FETCH_ASSOC)) {
				$output = [
					0 => $output['name'],
					1 => date("Y/m/d H:i:s", strtotime($output['time'])),
					2 => str_rot13($output['content'])
				];
				array_push($data, $output);
			}

			return $data;
		}

		public static function fetchUsr($bdd) {
			/**
			 * fetchUsr(dataBase)
			 *
			 * Function : Fetching all users in database with password
			 */

			$req = $bdd->query('SELECT name, pass FROM usr');
			$data = [];

			while($output = $req->fetch(PDO::FETCH_ASSOC))
				array_push($data, $output);

			return $data;
		}

		public static function insert($bdd, $session, $content) {
			/**
			 * insert(dataBase, sessionUser)
			 *
			 * Function : Save message in database
			 */

			if(empty($content))
				return false;

			$req = [
				'Usr'  => $bdd->query('SELECT id, name FROM usr'),
				'Send' => $bdd->prepare("INSERT INTO msg(idOwner, content) VALUES(?, ?)")
			]; $content = str_rot13($content);

			while($output = $req['Usr']->fetch(PDO::FETCH_NUM))
				if($output[1] === $session) {
					$req['Send']->execute(array($output[0], $content));
					return true;
				}

			return false;
		}
	}

	/**
	 * END
	 */
?>
