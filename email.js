emailjs.init(process.env.USER_ID); // Substitua com seu User ID fornecido pelo EmailJS

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Obtenha o elemento do formulário
    const form = document.getElementById("contact-form");

    // Envie o formulário usando emailjs.sendForm
    emailjs.sendForm(process.env.SERVICE_ID, process.env.TEMPLATE_ID, form)
        .then((response) => {
            console.log("E-mail enviado com sucesso!", response);
            alert("E-mail enviado com sucesso!");
            form.reset(); // Reseta o formulário após envio bem-sucedido
        })
        .catch((error) => {
            console.error("Erro ao enviar o e-mail:", error);
            alert("Erro ao enviar o e-mail: " + error.text);
        });
});