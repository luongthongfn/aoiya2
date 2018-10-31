<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

function sendMail($title, $content, $nTo, $mTo, $adressCC = '')
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
    $ccmail = explode(',', $adressCC);
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

//form contact home
if (isset($_POST['send_mail'])) {
    $request = $_POST['request'];
    $name = $_POST['name'];
    $company = $_POST['company'];
    $email = $_POST['email'];
    $question = $_POST['question'];
    try {
        

        //Content
        $content = 'お問い合わせ項目: ' . $request . '<br>'
            . 'お名前: ' . $name . '<br>'
            . '貴社名/部署名: ' . $company . '<br>'
            . 'メールアドレス: ' . $email . '<br>'
            . 'お問い合わせ内容: ' . $question . '<br>';
        // 'kanemitsu@wiredgroup.co.jp'; // Add a recipient
        if (sendMail($request, $content, $name, 'info@aoiyakk.com')) {
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

// form recruit
if (isset($_POST['recruit_form'])) {
    $job = $_POST['$job'];
    $name = $_POST['$name'];
    $gender = $_POST['$gender'];
    $birthday = $_POST['$birthday'];
    $email = $_POST['$email'];
    $phone = $_POST['$phone'];
    $zipCode = $_POST['$zipCode'];
    $Prefecture = $_POST['$pref'];
    $city = $_POST['$city'];
    $addr = $_POST['$addr'];

    try {
        //Content
        $content = '応募職種 : ' . $job . '<br>'
                 . 'お名前: ' . $name . '<br>'
                 . '生年月日: ' . $gender . '<br>'
                 . '性別: ' . $birthday . '<br>'
                 . 'E-mailアドレス: ' . $email . '<br>'
                 . '携帯用電話番号: ' . $phone . '<br>'
                 . '郵便番号: ' . $zipCode . '<br>'
                 . '都道府県: ' . $Prefecture . '<br>'
                 . '市区群・地名・番地: ' . $city . '<br>'
                 . '建物名・部屋番号: ' . $addr . '<br>';
        // 'kanemitsu@wiredgroup.co.jp'; // Add a recipient
        // if (sendMail($request, $content, $name, 'info@aoiyakk.com')) {
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
