import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Configuração do Nodemailer usando variáveis de ambiente do Vercel
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post('/enviar-email', async (req, res) => {
    try {
        const { 
            nome, 
            email, 
            nomeLogotipo, 
            telefone, 
            historiaMarca,
            sloganEmpresa,
            sobreVoce,
            relacaoEmpresa,
            percepcaoMercado,
            significadoAbertura 
        } = req.body;

        // Ler template de email
        const emailTemplate = fs.readFileSync(
            path.join(__dirname, 'template-email.html'), 
            'utf-8'
        );

        // Substituir placeholders
        const emailHTML = emailTemplate
            .replace('{{nome-nome}}', nome)
            .replace('{{nome-email}}', email)
            .replace('{{nome-logotipo}}', nomeLogotipo)
            .replace('{{numero-telefone}}', telefone)
            .replace('{{historia-marca}}', historiaMarca)
            .replace('{{slogan-empresa}}', sloganEmpresa)
            .replace('{{sobre-voce}}', sobreVoce)
            .replace('{{relacao-empresa}}', relacaoEmpresa)
            .replace('{{mercado}}', percepcaoMercado)
            .replace('{{significado-abertura}}', significadoAbertura);

        // Configurações do email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_DESTINATARIO,
            subject: 'Nova Oportunidade de Investimento',
            html: emailHTML
        };

        // Enviar email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ 
            message: 'Email enviado com sucesso!' 
        });

    } catch (error) {
        console.error('Erro ao enviar email:', error);
        res.status(500).json({ 
            message: 'Erro ao enviar email', 
            error: error.message 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});