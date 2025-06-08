import { Request, Response } from 'express';

type User = {
    id: number;
    nome: string;
    email: string;
}
let id = 0;
let lista_de_usuarios: User[] = [];

export class UsersController {
    static getAll(req: Request, res: Response) {
            res.send(lista_de_usuarios)
    } static getById(req: Request, res: Response) {

            res.send(lista_de_usuarios.find(user => user.id === Number(req.params.id)));

    } static update(req: Request, res: Response) {

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

    } static delete(req: Request, res: Response) {

            let _id = Number(req.params.id);
            const OfIndex = lista_de_usuarios.findIndex(_users => _users.id === _id)
            if (OfIndex !== -1) {
                lista_de_usuarios.splice(OfIndex, 1);
                res.send({"message" : "Usuário apagado com sucesso!"})
            } else {
                res.send({"message" : "Usuário não encontrado"})
            }

    } static save(req: Request, res: Response) {
            const users = req.body;
            users.id = ++id;
            lista_de_usuarios.push(users);
            res.send({"message": "Usuário adicionado com sucesso!"});   
            
        }
    }