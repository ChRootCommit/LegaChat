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
	require('modules.php');

	$bdd = dataBase::connect();
	$all = [];

	foreach(service::fetchMsg($bdd) as $arr)
		array_push($all, $arr);

	echo(json_encode($all));