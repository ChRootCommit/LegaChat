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

		public static function fetchUsrAdmin($bdd, $user) {
			/**
			 * fetchUsrAdmin(dataBase)
			 *
			 * Function : Fetching user permissions
			 */

			$req = $bdd->query('SELECT name, isAdmin FROM usr');

			while($output = $req->fetch(PDO::FETCH_ASSOC))
				if(($output['name'] === $user) && $output['isAdmin'])
					return true;

			return false;
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

		public static function addUsr($bdd, $newUsr) {
			/**
			 * addUsr(dataBase, [dataUser])
			 *
			 * Function : Add user in database
			 */

			$req = $bdd->prepare('INSERT INTO usr(name, pass) VALUES (?, ?)');

			if($req->execute(array($newUsr['usr'], crypto::usrPsw($newUsr['psw']))))
				return true;

			return false;
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
					2 => $output['content']
				];
				array_push($data, $output);
			}

			return $data;
		}

		public static function insert($bdd, $content) {
			/**
			 * insert(dataBase, msgContent)
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

		public static function updateSession($bdd, $session) {
			/**
			 * updateSession(dataBase, sessionUser)
			 *
			 * Function : Update time and address connection of user in database
			 */

			$req = [
				'Usr'    => $bdd->query('SELECT idUsr, name FROM usr'),
				'Update' => $bdd->prepare('UPDATE usr SET address=? WHERE idUsr=?')
			];

			while($output = $req['Usr']->fetch(PDO::FETCH_NUM))
				if($output[1] === $session) {
					$req['Update']->execute(array($_SERVER['REMOTE_ADDR'], $output[0]));
					return true;
				}

			return false;
		}

		public static function updateUsrPsw($bdd, $newPass) {
			/**
			 * updateUsrPsw(dataBase, newPass)
			 *
			 * Function : Change user password in database
			 */

			if(empty($newPass))
				return false;

			$req = [
				'Usr'    => $bdd->query('SELECT idUsr, name FROM usr'),
				'Update' => $bdd->prepare('UPDATE usr SET pass=? WHERE idUsr=?')
			];

			while($output = $req['Usr']->fetch(PDO::FETCH_NUM))
				if($output[1] === $_SESSION['name']) {
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
