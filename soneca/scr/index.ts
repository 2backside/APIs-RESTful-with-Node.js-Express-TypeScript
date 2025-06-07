import express from 'express';

const app = express();

app.get('/', (req, res) =>  {
 res.send('Seja bem-vindo a API!');
});

app.listen(3000, () => { 
  console.log('Server está ativo na porta: 3000')
});
