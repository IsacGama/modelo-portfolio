document.getElementById("contact-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = new FormData(document.getElementById("contact-form"));

    try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ form: Object.fromEntries(formData) }),
        });

        if (!response.ok) {
            throw new Error("Erro ao enviar o e-mail");
        }

        const data = await response.json();
        alert(data.message);
        document.getElementById("contact-form").reset();
    } catch (error) {
        console.error(error);
        alert("Erro ao enviar o e-mail: " + error.message);
    }
});