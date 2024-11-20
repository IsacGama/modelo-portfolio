import React, { useState } from 'react';
import axios from 'axios';

function FormularioContato() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        nomeLogotipo: '',
        telefone: '',
        historiaMarca: '',
        sloganEmpresa: '',
        sobreVoce: '',
        relacaoEmpresa: '',
        percepcaoMercado: '',
        significadoAbertura: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:3001/enviar-email', 
                formData
            );
            alert(response.data.message);
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao enviar email');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="nome"
                placeholder="Nome"
                value={formData.nome}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="nomeLogotipo"
                placeholder="Nome do Logotipo"
                value={formData.nomeLogotipo}
                onChange={handleChange}
            />
            <input
                type="tel"
                name="telefone"
                placeholder="Whatsapp"
                value={formData.telefone}
                onChange={handleChange}
            />
            <textarea
                name="historiaMarca"
                placeholder="História da Marca"
                value={formData.historiaMarca}
                onChange={handleChange}
            />
            <input
                type="text"
                name="sloganEmpresa"
                placeholder="Slogan da Empresa"
                value={formData.sloganEmpresa}
                onChange={handleChange}
            />
            <textarea
                name="sobreVoce"
                placeholder="Sobre Você"
                value={formData.sobreVoce}
                onChange={handleChange}
            />
            <input
                type="text"
                name="relacaoEmpresa"
                placeholder="Relação com a Empresa"
                value={formData.relacaoEmpresa}
                onChange={handleChange}
            />
            <textarea
                name="percepcaoMercado"
                placeholder="Percepção do Mercado"
                value={formData.percepcaoMercado}
                onChange={handleChange}
            />
            <textarea
                name="significadoAbertura"
                placeholder="Significado da Abertura"
                value={formData.significadoAbertura}
                onChange={handleChange}
            />
            <button type="submit">Enviar</button>
        </form>
    );
}

export default FormularioContato;