import express from 'express';
import nodemailer from 'nodemailer';

const app = express();
app.use(express.json()); // Middleware para entender JSON

app.post('/api/send-email', async (req, res) => {
    const { nome, email, logotipo, telefone, historiaMarca, sloganEmpresa, sobreVoce, relacaoEmpresa, mercado, significadoAbertura } = req.body;

    // Configuração do Nodemailer para enviar o e-mail
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Coloque aqui sua variável de ambiente
            pass: process.env.EMAIL_PASS, // Coloque aqui sua senha ou senha de app
        },
    });

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
        await transporter.sendMail({
            from: '"Nunes Enterprise" noreply.nunesenterprise@gmail.com',
            to: 'diasgamaisac0@gmail.com',
            subject: 'Nova Mensagem de Contato',
            html: htmlContent,
        });
        res.status(200).json({ message: 'E-mail enviado com sucesso!' });
    } catch (error) {
        console.error('Erro ao enviar o e-mail:', error);
        res.status(500).json({ error: 'Erro ao enviar o e-mail' });
    }
});

app.listen(5500, () => {
    console.log('Servidor rodando na porta 3000');
});