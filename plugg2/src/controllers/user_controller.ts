import { Response, Request } from 'express';
import { getFirestore } from 'firebase-admin/firestore';

type User = {
    id: number;
    nome: string;
    email: string;
}
let lista_de_usuarios: User[] = [];

export class UsersController {
    static home (req: Request, res: Response) {

        res.send("api rodando corretamente.");

    } static async getAll (req: Request, res: Response) {

        const snapshot = await getFirestore().collection("users").get()
        const users = snapshot.docs.map(doc => {
            return doc.data() as User;
        })
        res.send(users)

    } static async create (req: Request, res: Response) {

        const user = req.body;
        await getFirestore().collection("users").add(user)
        res.send('usuário criado com sucesso')

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