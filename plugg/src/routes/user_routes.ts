import express, {Request, Response} from 'express';

export const userRoutes = express.Router()

type User = {
    id: number;
    nome: string;
    email: string;
}
let id = 0;
let lista_de_usuarios: User[] = [];

userRoutes.get("/users", (req: Request, res: Response) =>{
    res.send(lista_de_usuarios)
});

userRoutes.get("/users/:id", (req: Request, res: Response) => {
    res.send(lista_de_usuarios.find(user => user.id === Number(req.params.id)));
});

userRoutes.put("/users/:id", (req: Request, res: Response) => {
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

userRoutes.delete("/users/:id", (req: Request, res: Response) => {
    let _id = Number(req.params.id);
    const OfIndex = lista_de_usuarios.findIndex(_users => _users.id === _id)
    if (OfIndex !== -1) {
        lista_de_usuarios.splice(OfIndex, 1);
        res.send({"message" : "Usuário apagado com sucesso!"})
    } else {
    res.send({"message" : "Usuário não encontrado"})
    }
})

userRoutes.post("/users", (req: Request, res: Response) => {
    const users = req.body;
    users.id = ++id;
    lista_de_usuarios.push(users);
    res.send({"message": "Usuário adicionado com sucesso!"});   
})