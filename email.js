async function sendEmail(formData) {
    const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData }),
    });

    if (!response.ok) {
        throw new Error('Erro ao enviar o e-mail.');
    }

    const data = await response.json();
    console.log(data.message);
} 