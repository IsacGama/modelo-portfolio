emailjs.init(USER_ID);

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const form = document.getElementById("contact-form");

    // Envie o formulário usando emailjs.sendForm
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form)
        .then((response) => {
            console.log("E-mail enviado com sucesso!", response);
            alert("E-mail enviado com sucesso!");
            form.reset();
        })
        .catch((error) => {
            console.error("Erro ao enviar o e-mail:", error);
            alert("Erro ao enviar o e-mail: " + error.text);
        });
});
