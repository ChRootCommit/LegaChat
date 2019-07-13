<?php
	/**
	 * projet   : LegaChat
	 * version  : 0.1-a
	 * date     : 5/07/2019
	 * file     : controller.php
	 * location : /core/
	 * author   : Anarchy
	 */

	require_once('bddConnect.php');
	require_once('crypto.php');
	require_once('service.php');

	function isInput($data) { // Fonction checking input data
		$data = trim($data);
		$data = stripslashes($data);
		$data = htmlspecialchars($data);
		
		return $data;
	}

	if($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['process'])) {
		/**
		 * Execute when post request method and get process exist
		 */

		$bdd = dataBase::connect();
		$post = ['passed' => false];

		switch($_GET['process']) {
			case "login": $post = [ // Login
					'name'    => isInput($_POST['username']),
					'error'   => 'incorrect !'
				]; $pass = isInput($_POST['password']);

				foreach(service::fetchUsr($bdd) as $arr) {
					if(($arr['name'] === $post['name']) && ($arr['pass'] === crypto::usrPsw($pass))) {
						$post['error'] = NULL;
						$post['passed'] = true;
						$_SESSION['name'] = $arr['name'];
					}
				} break;

			case "setPassword": if(isset($_SESSION['name'])) { // Change user password
					$post['passed'] = service::updateUsrPass($bdd, isInput($_POST['password']));
				} break;

			case "logout": session_destroy(); break; // Logout

			case "checking": if(isset($_SESSION['name'])) { // Checking session
					$post = [
						'chatContent' => service::fetchMsg($bdd),
						'name'        => $_SESSION['name'],
						'passed'      => true
					];
				} break;

			case "sending": if(isset($_SESSION['name'])) { // Send Message
					$post['passed'] = service::insert($bdd, isInput($_POST['sendContent']));
				} break;
		}

		echo(json_encode($post));
		$bdd = dataBase::disconnect();
	}

	/**
	 * END
	 */
?>
