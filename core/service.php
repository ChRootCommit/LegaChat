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

		public static function fetchMsg($bdd) {
			/**
			 * fetchMsg(dataBase)
			 *
			 * Function : Fetching all messages in database
			 */

			$req = $bdd->query('SELECT msg.idOwner, msg.time, msg.content, usr.idUsr, usr.name FROM msg, usr WHERE msg.idOwner=usr.idUsr');
			$data = [];

			while($output = $req->fetch(PDO::FETCH_ASSOC)) {
				$output = [
					0 => $output['name'],
					1 => date("Y/m/d H:i:s", strtotime($output['time'])),
					2 => crypto::msg($output['content'])
				];
				array_push($data, $output);
			}

			return $data;
		}

		public static function insert($bdd, $content) {
			/**
			 * insert(dataBase, sessionUser, msgContent)
			 *
			 * Function : Save message in database
			 */

			if(empty($content))
				return false;

			$req = [
				'Usr'  => $bdd->query('SELECT idUsr, name FROM usr'),
				'Send' => $bdd->prepare('INSERT INTO msg(idOwner, content) VALUES(?, ?)')
			];

			while($output = $req['Usr']->fetch(PDO::FETCH_NUM))
				if($output[1] === $_SESSION['name']) {
					$req['Send']->execute(array($output[0], crypto::msg($content)));
					return true;
				}

			return false;
		}

		public static function updateUsrPass($bdd, $newPass) {
			/**
			 * updateUsrPass(dataBase, sessionUser, newPass)
			 *
			 * Function : Change user password in database
			 */

			if(empty($newPass))
				return false;

			$req = [
				'Usr'    => $bdd->query('SELECT name FROM usr'),
				'Update' => $bdd->prepare('UPDATE usr SET pass=? WHERE name=?')
			];

			while($output = $req['Usr']->fetch(PDO::FETCH_NUM))
				if($output[0] === $_SESSION['name']) {
					$req['Update']->execute(array(crypto::usrPsw($newPass), $output[0]));
					return true;
				}

			return false;
		}
	}

	/**
	 * END
	 */
?>
