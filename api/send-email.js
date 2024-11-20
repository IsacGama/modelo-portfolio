import express from 'express';
import nodemailer from 'nodemailer';

const app = express();
app.use(express.json());

app.post('/api/send-email', async (req, res) => {
    const { nome, email, logotipo, telefone, historiaMarca, sloganEmpresa, sobreVoce, relacaoEmpresa, mercado, significadoAbertura } = req.body;

    // Criação do transportador Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Ou outro serviço de e-mail
        auth: {
            user: process.env.EMAIL_USER, // A variável de ambiente do e-mail
            pass: process.env.EMAIL_PASS, // A senha ou senha de aplicativo
        },
    });

    // Corpo do e-mail em HTML
    const htmlContent = `
        <h1>Nova Mensagem de Contato</h1>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Nome do Logotipo:</strong> ${logotipo}</p>
        <p><strong>Whatsapp:</strong> ${telefone}</p>
        <p><strong>História da Marca:</strong> ${historiaMarca}</p>
        <p><strong>Slogan da Empresa:</strong> ${sloganEmpresa}</p>
        <p><strong>Sobre Você:</strong> ${sobreVoce}</p>
        <p><strong>Relação com a Empresa:</strong> ${relacaoEmpresa}</p>
        <p><strong>Percepção do Mercado:</strong> ${mercado}</p>
        <p><strong>Significado da Abertura:</strong> ${significadoAbertura}</p>
    `;

    try {
        // Enviar o e-mail
        await transporter.sendMail({
            from: `"Nunes Enterprise" <${process.env.EMAIL_USER}>`,
            to: 'destinatario@exemplo.com', // Coloque o e-mail de destino aqui
            subject: 'Nova Mensagem de Contato',
            html: htmlContent,
        });

        // Resposta bem-sucedida
        res.status(200).json({ message: 'E-mail enviado com sucesso!' });
    } catch (error) {
        console.error('Erro ao enviar o e-mail:', error);
        res.status(500).json({ error: 'Erro ao enviar o e-mail. Detalhes: ' + error.message });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
