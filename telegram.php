<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	if (!empty($_POST['name']) && !empty($_POST['phone'])){
		if (isset($_POST['name'])) {
		    if (!empty($_POST['name'])){
				$name = strip_tags($_POST['name']);
				$nameFieldset = "Имя: ";
			}
		}

		if (isset($_POST['email'])) {
			if (!empty($_POST['email'])){
				$email = strip_tags($_POST['email']);
				$emailFieldset = "Почта: ";
			}
		}

		if (isset($_POST['phone'])) {
			if (!empty($_POST['phone'])){
				$phone = strip_tags($_POST['phone']);
				$phoneFieldset = "Телефон: ";
			}
		}

		if (isset($_POST['message'])) {
			if (!empty($_POST['message'])){
				$message = strip_tags($_POST['message']);
				$messageFieldset = "Сообщение: ";
			}
		}


		$token = "470705213:AAGQOsKmQBU3udT1J44AfEg4-PDkbsEZc1w";
		$chat_id = "-313072622";
		$arr = array(
			$nameFieldset => $name,
			$emailFieldset => $email,
			$phoneFieldset => $phone,
			$messageFieldset => $message
		);

		foreach($arr as $key => $value) {
			$txt .= "<b>".$key."</b> ".$value."%0A";
		};

		$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");
		if ($sendToTelegram) {
			echo 'Спасибо за отправку вашего сообщения!';
		    return true;
		} else {
			echo 'Ошибка. Сообщение не отправлено!';
		}
	} else {
		echo 'Ошибка. Вы заполнили не все обязательные поля!';
	}
} else {
	header ("Location: /");
}
?>
