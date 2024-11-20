document.getElementById("contact-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target));

    try {
        const response = await fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao enviar o formulário.");
    }
});