const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permite qualquer domínio
    res.setHeader('Access-Control-Allow-Methods', '*'); // Permite apenas o método POST
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: 'Método não permitido' });
    }

    const { 
        'nome-nome': nome, 
        'nome-email': email, 
        'nome-logotipo': logotipo, 
        'numero-telefone': telefone, 
        'historia-marca': historia, 
        'slogan-empresa': slogan, 
        'sobre-voce': sobre, 
        'relacao-empresa': relacao, 
        'mercado': mercado, 
        'significado-abertura': significado 
    } = req.body;

    // Configurar o transporte de email usando Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'Gmail',  // Ou outro serviço de email
        auth: {
            user: process.env.EMAIL_USER, // Email para envio
            pass: process.env.EMAIL_PASS, // Senha ou app password
        },
    });

    // Modelo de email com os dados preenchidos
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_DESTINATARIO, // Email que receberá a mensagem
        subject: `Nova Mensagem de Contato de ${nome}`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2>Nova Mensagem de Contato</h2>
                <p><strong>Nome:</strong> ${nome}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Nome do Logotipo:</strong> ${logotipo}</p>
                <p><strong>Whatsapp:</strong> ${telefone}</p>
                <p><strong>História da Marca:</strong> ${historia}</p>
                <p><strong>Slogan da Empresa:</strong> ${slogan}</p>
                <p><strong>Sobre Você:</strong> ${sobre}</p>
                <p><strong>Relação com a Empresa:</strong> ${relacao}</p>
                <p><strong>Percepção do Mercado:</strong> ${mercado}</p>
                <p><strong>Significado da Abertura:</strong> ${significado}</p>
            </div>
        `,
    };

    try {
        // Enviar email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: 'E-mail enviado com sucesso!' });
    } catch (error) {
        console.error('Erro ao enviar o e-mail:', error);
        res.status(500).json({ error: 'Erro ao enviar o e-mail' });
    }
}
