<?php
	/**
	 * projet   : LegaChat
	 * version  : 0.1-a
	 * date     : 5/07/2019
	 * file     : bddConnect.php
	 * location : /core/
	 * author   : Anarchy
	 */

	class dataBase {
		public static function disconnect() { return self::$bdd['db'] = NULL; }
		public static function connect() {
			session_start();
			try {
				self::$bdd['db'] = new PDO(
					'mysql:host='.self::$bdd['host'].'; dbname='.self::$bdd['name'].'; charset='.self::$bdd['char'],
					self::$bdd['user'],
					self::$bdd['pass'],
					array(PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING)
				);
			}
			catch(Exception $e) { die("[Err]:[{$e->getmessage()}]"); }

			return self::$bdd['db'];
		}

		private static $bdd = array(
			"db"   => NULL,
			"host" => "127.0.0.1",
			"name" => "legachat",
			"char" => "utf8",
			"user" => "root",
			"pass" => "toor"
		);
	}

	/**
	 * END
	 */
?>
