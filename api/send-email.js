const emailjs = require('emailjs-com'); 

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Método não permitido" });
    }

    const { form } = req.body;

    if (!form) {
        return res.status(400).json({ error: "Dados do formulário são obrigatórios" });
    }

    try {
        emailjs.init(process.env.USER_ID);

        const response = await emailjs.sendForm(
            process.env.SERVICE_ID,
            process.env.TEMPLATE_ID,
            form
        );

        return res.status(200).json({ message: "E-mail enviado com sucesso!", response });
    } catch (error) {
        console.error("Erro ao enviar o e-mail:", error);
        return res.status(500).json({ error: "Erro ao enviar o e-mail" });
    }
}