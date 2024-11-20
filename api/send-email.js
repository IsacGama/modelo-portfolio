import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    // Configuração de CORS
    res.setHeader('Access-Control-Allow-Origin', 'https://modelo-portfolio-psi.vercel.app'); // Altere para o domínio do seu frontend
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        // Responde a requisições OPTIONS (preflight)
        res.status(200).end();
        return;
    }

    if (req.method === 'POST') {
        const { nome, email, mensagem } = req.body;

        // Configuração do transportador Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail', // ou outro serviço, como 'Outlook'
            auth: {
                user: process.env.EMAIL_USER, // Seu e-mail configurado em variáveis de ambiente
                pass: process.env.EMAIL_PASS, // Sua senha ou senha de app
            },
        });

        try {
            // Envia o e-mail
            await transporter.sendMail({
                from: `"Contato do Site" <${process.env.EMAIL_USER}>`,
                to: 'diasgamaisac0@gmail.com', // E-mail do destinatário
                subject: 'Nova mensagem de contato',
                text: `Você recebeu uma nova mensagem:
                Nome: ${nome}
                E-mail: ${email}
                Mensagem: ${mensagem}`,
                html: `
                    <h1>Nova Mensagem de Contato</h1>
                    <p><strong>Nome:</strong> ${nome}</p>
                    <p><strong>E-mail:</strong> ${email}</p>
                    <p><strong>Mensagem:</strong> ${mensagem}</p>
                `,
            });

            res.status(200).json({ message: 'E-mail enviado com sucesso!' });
        } catch (error) {
            console.error('Erro ao enviar o e-mail:', error);
            res.status(500).json({ error: 'Erro ao enviar o e-mail.' });
        }
    } else {
        // Responde com erro 405 para métodos não permitidos
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ error: `Método ${req.method} não permitido.` });
    }
}