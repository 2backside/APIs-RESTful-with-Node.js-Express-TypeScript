import {Response, Request} from 'express';

type User = {
    id: number;
    nome: string;
    email: string;
}
let id = 0;
let lista_de_usuarios: User[] = [];

export class UsersController {
    static home (req: Request, res: Response) {

        res.send("api rodando corretamente.");

    } static getAll (req: Request, res: Response) {

        res.send(lista_de_usuarios);

    } static create (req: Request, res: Response) {
        
        const { email, nome } = req.body;
        if (email && nome) {
            id = ++id
            const usuario: User = {email, nome, id}
            lista_de_usuarios.push(usuario)
            res.send({"message" : "Usuário criado com sucesso!"});
        } else {
            res.send({"message" : "'email' ou 'nome' não fornecido."});
        }
        
    } static getById (req: Request, res:Response){

        const _id = Number(req.params.id)
        const OfIndex = lista_de_usuarios.findIndex(_user => _user.id === _id) 
        if (OfIndex !== -1) {
            res.send(lista_de_usuarios[OfIndex]);
        } else {
            res.send({"message": "Usuário não encontrado."})
        }

    } static update (req: Request, res: Response) {

        const _id = Number(req.params.id);
        const { email, nome } = req.body;
        const indexof = lista_de_usuarios.findIndex(_user => _user.id === _id);
        if (indexof !== -1 && email && nome) {
            lista_de_usuarios[indexof].email = email
            lista_de_usuarios[indexof].nome = nome
            res.send({"message": "Usuário atualizado com sucesso!"})
        } else if (!email || !nome) {
            res.send({"message": "'email' ou 'nome' não fornecido."})
        } else {
            res.send({"message": "Usuário não encontrado..."})
        }

    } static delete (req: Request, res: Response) {

        const _id = Number(req.params.id)
        const indexOf = lista_de_usuarios.findIndex(_user => _user.id === _id)
        if (indexOf !== -1) {
            lista_de_usuarios.splice(indexOf, 1)
            res.send({"message":"usuário deletado com sucesso"})
        } else {
            res.send({"message":"usuário não encontrado"})
        }

    }
}