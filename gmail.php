<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

function sendMail($title, $content, $nTo, $mTo, $diachicc = '')
{
    $nFrom = 'Aoiya';
    $mFrom = 'webtestwav@gmail.com'; //your mail
    $mPass = 'qweqweqwe1@'; //your mail's pass or app token

    //Load composer's autoloader
    require 'vendor/autoload.php';
    $mail = new PHPMailer(true);

    $mail->isSMTP(); // Set mailer to use SMTP
    $mail->Host = 'smtp.gmail.com'; // Specify main and backup SMTP servers
    $mail->CharSet = "utf-8";
    $mail->SMTPAuth = true; // Enable SMTP authentication
    $mail->SMTPDebug = 0; // enables SMTP debug information (for testing)
    $mail->SMTPSecure = "ssl"; // sets the prefix to the servier
    $mail->Port = 465;
    $mail->Username = $mFrom; // SMTP username
    $mail->Password = $mPass; // SMTP password/security app token
    // end server config

    $body = $content;
    $mail->SetFrom($mFrom, $nFrom);

    //string to array
    $ccmail = explode(',', $diachicc);
    $ccmail = array_filter($ccmail);
    if (!empty($ccmail)) {
        foreach ($ccmail as $k => $v) {
            $mail->AddCC($v);
        }
    }
    $mail->Subject = $title;
    $mail->MsgHTML($body);
    $address = $mTo;
    $mail->AddAddress($address, $nTo); // Add a recipient
    // $mail->AddReplyTo($email, 'Aoiya');
    if (!$mail->Send()) {
        return 0;
    } else {
        return 1;
    }
}

if (isset($_POST['send_mail'])) {
    $request = $_POST['request'];
    $name = $_POST['name'];
    $company = $_POST['company'];
    $email = $_POST['email'];
    $question = $_POST['question'];
    try {
        // $mail->addAddress('kanemitsu@wiredgroup.co.jp'); // Add a recipient

        //Content
        $content = 'お問い合わせ項目: ' . $request . '<br>'
            . 'お名前: ' . $name . '<br>'
            . '貴社名/部署名: ' . $company . '<br>'
            . 'メールアドレス: ' . $email . '<br>'
            . 'お問い合わせ内容: ' . $question . '<br>';

        if (sendMail($request, $content, $name, 'webtestwav@gmail.com')) {
            // if receive then auto reply
            sendMail('title reply', '$content reply', '$name', $email);
        }

        logMail($content);
        // replyMail($name, $email);
        echo 'success!';

    } catch (Exception $e) {

        echo 'Message could not be sent.';
        echo 'Mailer Error: ' . $mail->ErrorInfo;
    }
}

function logMail($content)
{
    $file = fopen('logmail.txt', 'a');
    $time = date("d/m/Y h:i:s A");
    $log = '---log: ' . $time . "--log content: " . $content;
    $log .= "\n";

    fwrite($file, $log);
    fclose($file);
}
