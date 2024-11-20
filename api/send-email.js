import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    const {
        nome,
        email,
        logotipo,
        telefone,
        historiaMarca,
        sloganEmpresa,
        sobreVoce,
        relacaoEmpresa,
        mercado,
        significadoAbertura,
    } = req.body;

    // Configurar o transporte SMTP
    const transporter = nodemailer.createTransport({
        service: "gmail", // ou 'hotmail', 'yahoo', etc.
        auth: {
            user: process.env.EMAIL_USER, // Seu e-mail
            pass: process.env.EMAIL_PASS, // Sua senha ou senha de aplicativo
        },
    });

    // HTML do e-mail com placeholders substituídos
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nova Mensagem de Contato</title>
        <style>
            /* O estilo que você já forneceu */
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="email-header">
                <h1>Nova Mensagem de Contato</h1>
            </div>
            <div class="email-content">
                <p>Você recebeu uma nova oportunidade de investimento:</p>
                <div class="section">
                    <p class="section-title">Nome:</p>
                    <p>${nome}</p>
                </div>
                <div class="section">
                    <p class="section-title">Email:</p>
                    <p>${email}</p>
                </div>
                <div class="section">
                    <p class="section-title">Nome do Logotipo:</p>
                    <p>${logotipo}</p>
                </div>
                <div class="section">
                    <p class="section-title">Whatsapp:</p>
                    <p>${telefone}</p>
                </div>
                <div class="section">
                    <p class="section-title">História da Marca:</p>
                    <p>${historiaMarca}</p>
                </div>
                <div class="section">
                    <p class="section-title">Slogan da Empresa:</p>
                    <p>${sloganEmpresa}</p>
                </div>
                <div class="section">
                    <p class="section-title">Sobre Você:</p>
                    <p>${sobreVoce}</p>
                </div>
                <div class="section">
                    <p class="section-title">Relação com a Empresa:</p>
                    <p>${relacaoEmpresa}</p>
                </div>
                <div class="section">
                    <p class="section-title">Percepção do Mercado:</p>
                    <p>${mercado}</p>
                </div>
                <div class="section">
                    <p class="section-title">Significado da Abertura:</p>
                    <p>${significadoAbertura}</p>
                </div>
            </div>
            <div class="email-footer">
                <p>Atenciosamente,</p>
                <p><strong>Nunes Enterprise</strong></p>
            </div>
        </div>
    </body>
    </html>
    `;

    try {
        // Enviar o e-mail
        await transporter.sendMail({
            from: '"Nunes Enterprise" noreply.nunesenterprise@gmail.com', // Remetente
            to: "diasgamaisac0@gmail.com", // Destinatário
            subject: "Nova Mensagem de Contato", // Assunto
            html: htmlContent, // Conteúdo HTML
        });

        res.status(200).json({ message: "E-mail enviado com sucesso!" });
    } catch (error) {
        console.error("Erro ao enviar o e-mail:", error);
        res.status(500).json({ error: "Erro ao enviar o e-mail." });
    }
}