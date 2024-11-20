const nodemailer = require("nodemailer");

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Método não permitido" });
    }

    // Captura os dados enviados no formulário
    const formData = req.body;

    // Substitui os placeholders no HTML com os dados reais
    const generateEmailHtml = (data) => {
        const template = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nova Mensagem de Contato</title>
            <style>
                body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
                .email-container { max-width: 600px; margin: 20px auto; background-color: #fff; border-radius: 8px; padding: 20px; box-shadow: 0 0 15px rgba(0, 0, 0, 0.1); }
                .section-title { font-weight: bold; margin-top: 20px; color: #4CAF50; }
            </style>
        </head>
        <body>
            <div class="email-container">
                <h1>Nova Mensagem de Contato</h1>
                <p>Você recebeu uma nova oportunidade de investimento:</p>
                ${Object.entries(data).map(([key, value]) => `
                    <div class="section">
                        <p class="section-title">${key.replace(/-/g, ' ')}:</p>
                        <p>${value}</p>
                    </div>
                `).join('')}
            </div>
        </body>
        </html>`;
        return template;
    };

    // Configure o transporte do Nodemailer
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER, // Variável do Vercel
            pass: process.env.EMAIL_PASS, // Variável do Vercel
        },
    });

    try {
        // Envia o email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_DESTINATARIO,
            subject: "Nova mensagem de contato",
            html: generateEmailHtml(formData),
        });

        res.status(200).json({ message: "Email enviado com sucesso!" });
    } catch (error) {
        console.error("Erro ao enviar o email:", error);
        res.status(500).json({ message: "Erro ao enviar o email" });
    }
}