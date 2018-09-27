<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

if (isset($_POST['send_mail'])) {
    $request  = $_POST['request'];
    $name     = $_POST['name'];
    $company  = $_POST['company'];
    $email    = $_POST['email'];
    $question = $_POST['question'];

    //Load composer's autoloader
    require 'vendor/autoload.php';
    $mail = new PHPMailer(true); // Passing `true` enables exceptions
    try {
        //Server settings
        // $mail->SMTPDebug = 2; // Enable verbose debug output
        $mail->isSMTP(); // Set mailer to use SMTP
        $mail->Host = 'smtp.gmail.com'; // Specify main and backup SMTP servers
        $mail->SMTPAuth = true; // Enable SMTP authentication
        $mail->Username = 'luongthongvfu@gmail.com'; // SMTP username
        $mail->Password = 'kpxvxernkwreuoen'; // SMTP password/security app token
        $mail->SMTPSecure = 'ssl'; // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 465; // TCP port to connect to

        //Recipients
        $mail->setFrom($email, $name);
        $mail->addAddress('luongthongvfu@gmail.com'); // Add a recipient

        //Content
        $mail->isHTML(true); // Set email format to HTML
        $mail->Subject = $request;
        $mail->Body = $question.'<hr>'.$company;
        $mail->AltBody = $question.'from: '.$company;

        $mail->send();
        echo 'success!';

    } catch (Exception $e) {
        
        echo 'Message could not be sent.';
        echo 'Mailer Error: ' . $mail->ErrorInfo;
    }
}
