document.getElementById("contact-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formDataObj = {};
    formData.forEach((value, key) => {
        formDataObj[key] = value;
    });

    try {
        const response = await fetch('https://modelo-portfolio-psi.vercel.app/api/send-email.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataObj),
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message);
        } else {
            const errorData = await response.json();
            alert("Erro: " + errorData.error);
        }
    } catch (error) {
        console.error('Erro ao enviar o formulário:', error);
        alert('Erro ao enviar o formulário. Tente novamente.');
    }
});