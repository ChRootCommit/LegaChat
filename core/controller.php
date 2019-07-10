<?php
	/**
	 * projet   : LegaChat
	 * version  : 0.1-a
	 * date     : 5/07/2019
	 * file     : controller.php
	 * location : /core/
	 * author   : Anarchy
	 */

	require('bddConnect.php');
	require('service.php');

	function isInput($data) { // Fonction checking input data
		return htmlspecialchars(stripslashes(trim($data)));
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
					if(($arr['name'] === $post['name']) && ($arr['pass'] === md5($pass))) {
						$post['error'] = NULL;
						$post['passed'] = true;
						$_SESSION['name'] = $arr['name'];
					}
				} break;

			case "checking": if(isset($_SESSION['name'])) { // Checking session
					$post = [
						'chatContent' => service::fetchMsg($bdd),
						'name'        => $_SESSION['name'],
						'passed'      => true
					];
				} break;

			case "sending": if(isset($_SESSION['name'])) { // Send Message
					$post['passed'] = service::insert($bdd, $_SESSION['name'], isInput($_POST['sendContent']));
				} break;

			case "logout": session_destroy(); break; // Logout
		}

		echo(json_encode($post));
		$bdd = dataBase::disconnect();
	}

	/**
	 * END
	 */
?>
