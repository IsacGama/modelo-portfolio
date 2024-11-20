import emailjs from 'emailjs-com';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Método não permitido" });
    }

    try {
        const { form } = req.body;

        if (!form) {
            return res.status(400).json({ error: "Dados do formulário são obrigatórios" });
        }

        // Inicializa o EmailJS
        emailjs.init(process.env.USER_ID);

        // Envia o e-mail usando EmailJS
        const response = await emailjs.send(
            process.env.SERVICE_ID,
            process.env.TEMPLATE_ID,
            form
        );

        res.status(200).json({ message: "E-mail enviado com sucesso!", response });
    } catch (error) {
        console.error("Erro no backend ao enviar e-mail:", error);
        res.status(500).json({ error: error.message });
    }
}