import emailjs from 'emailjs-com';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Método não permitido" });
    }

    try {
        const { form } = req.body;

        // Validação básica
        if (!form || Object.keys(form).length === 0) {
            return res.status(400).json({ error: "Dados do formulário são obrigatórios." });
        }

        // Inicializa o EmailJS
        emailjs.init(process.env.USER_ID);

        // Log para debug
        console.log("Enviando com:", {
            userId: process.env.USER_ID,
            serviceId: process.env.SERVICE_ID,
            templateId: process.env.TEMPLATE_ID,
        });

        // Enviar e-mail usando EmailJS
        const response = await emailjs.send(
            process.env.SERVICE_ID,
            process.env.TEMPLATE_ID,
            form
        );

        console.log("Resposta do EmailJS:", response);

        return res.status(200).json({ message: "E-mail enviado com sucesso!", response });
    } catch (error) {
        console.error("Erro no backend ao enviar o e-mail:", error);
        return res.status(500).json({ error: "Erro ao enviar o e-mail. Verifique o log." });
    }
}