import express from "express";

const app = express();


const PORT = (3000, () => {
    console.log('servidor ativo na porta 3000')
});

console.log(`Servidor rodando na porta ${PORT}`);