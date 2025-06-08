import express, { Request, Response} from "express";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send('OIIII SAFADAO');
});

type User = {
    id: number;
    nome: string;
    email: string;
}

let id = 0;
let lista_de_usuarios: User[] = [];

app.get("/users", (req: Request, res: Response) =>{
    res.send(lista_de_usuarios)
});

app.get("/users/:id", (req: Request, res: Response) => {
    res.send(lista_de_usuarios.find(user => user.id === Number(req.params.id)));
});

app.put("/users/:id", (req: Request, res: Response) => {
    let _id = Number(req.params.id)
    let _body = req.body
    const IndexOf = lista_de_usuarios.findIndex(_users => _users.id === _id)
    if (IndexOf !== -1) {
        lista_de_usuarios[IndexOf].nome = _body.nome
        lista_de_usuarios[IndexOf].email = _body.email
        res.send({"message": "Usuário atualizado com sucesso!"})
    } else {
        res.send({"message": "Usuário não encontrado"})
    }
});

app.delete("/users/:id", (req: Request, res: Response) => {
    let _id = Number(req.params.id);
    const OfIndex = lista_de_usuarios.findIndex(_users => _users.id === _id)
    if (OfIndex !== -1) {
        lista_de_usuarios.splice(OfIndex, 1);
        res.send({"message" : "Usuário apagado com sucesso!"})
    } else {
    res.send({"message" : "Usuário não encontrado"})
    }
})

app.post("/users", (req: Request, res: Response) => {
    const users = req.body;
    users.id = ++id;
    lista_de_usuarios.push(users);
    res.send({"message": "Usuário adicionado com sucesso!"});   
})

app.listen(3000, () => {
    console.log('servidor ativo na porta 3000');
});