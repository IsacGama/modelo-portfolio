<?php
// Configuração de CORS
header("Access-Control-Allow-Origin: https://modelo-portfolio-psi.vercel.app");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); // Responde a requisições preflight
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Método não permitido
    echo json_encode(["error" => "Método não permitido"]);
    exit;
}

// Obter os dados enviados do frontend
$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['nome'], $data['email'], $data['logotipo'], $data['telefone'], $data['historia'], $data['slogan'], $data['sobre'], $data['relacao'], $data['mercado'], $data['significado'])) {
    http_response_code(400); // Requisição inválida
    echo json_encode(["error" => "Dados incompletos"]);
    exit;
}

// Dados do e-mail
$nome = htmlspecialchars($data['nome']);
$email = htmlspecialchars($data['email']);
$logotipo = htmlspecialchars($data['logotipo']);
$telefone = htmlspecialchars($data['telefone']);
$historia = htmlspecialchars($data['historia']);
$slogan = htmlspecialchars($data['slogan']);
$sobre = htmlspecialchars($data['sobre']);
$relacao = htmlspecialchars($data['relacao']);
$mercado = htmlspecialchars($data['mercado']);
$significado = htmlspecialchars($data['significado']);

// Template do e-mail
$emailTemplate = file_get_contents('email-template.html');
$emailTemplate = str_replace('{{nome-nome}}', $nome, $emailTemplate);
$emailTemplate = str_replace('{{nome-email}}', $email, $emailTemplate);
$emailTemplate = str_replace('{{nome-logotipo}}', $logotipo, $emailTemplate);
$emailTemplate = str_replace('{{numero-telefone}}', $telefone, $emailTemplate);
$emailTemplate = str_replace('{{historia-marca}}', $historia, $emailTemplate);
$emailTemplate = str_replace('{{slogan-empresa}}', $slogan, $emailTemplate);
$emailTemplate = str_replace('{{sobre-voce}}', $sobre, $emailTemplate);
$emailTemplate = str_replace('{{relacao-empresa}}', $relacao, $emailTemplate);
$emailTemplate = str_replace('{{mercado}}', $mercado, $emailTemplate);
$emailTemplate = str_replace('{{significado-abertura}}', $significado, $emailTemplate);

// Enviar e-mail com PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com'; // Servidor SMTP
    $mail->SMTPAuth = true;
    $mail->Username = getenv('EMAIL_USER'); // Configurado como secret no Vercel
    $mail->Password = getenv('EMAIL_PASSWORD'); // Configurado como secret no Vercel
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->setFrom(getenv('EMAIL_USER'), 'Contato do Site');
    $mail->addAddress(getenv('EMAIL_DESTINATION')); // Destinatário final

    $mail->isHTML(true);
    $mail->Subject = 'Nova mensagem de contato';
    $mail->Body = $emailTemplate;

    $mail->send();

    http_response_code(200);
    echo json_encode(["message" => "E-mail enviado com sucesso!"]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erro ao enviar o e-mail: {$mail->ErrorInfo}"]);
}