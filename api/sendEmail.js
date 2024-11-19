import emailjs from 'emailjs-com';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { formData } = req.body;

    try {
        emailjs.init(process.env.USER_ID); // Sem o prefixo "NEXT_PUBLIC_"
        await emailjs.send(
            process.env.SERVICE_ID,
            process.env.TEMPLATE_ID,
            formData
        );
        res.status(200).json({ message: 'E-mail enviado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao enviar o e-mail', error });
    }
}
