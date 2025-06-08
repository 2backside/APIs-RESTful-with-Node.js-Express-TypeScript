import { Response, Request } from 'express';
import { getFirestore } from 'firebase-admin/firestore';

type User = {
    id: number;
    nome: string;
    email: string;
}

export class UsersController {
    static home (req: Request, res: Response) {

        res.send("api rodando corretamente.");

    } static async getAll (req: Request, res: Response) {

        const snapshot = await getFirestore().collection("users").get()
        const users = snapshot.docs.map(doc => {
            return {
                ...doc.data(),
                id: doc.id
            }
        })

        res.send(users)

    } static async create (req: Request, res: Response) {
        const user = req.body as User
        await getFirestore().collection("users").add({
            nome: user.nome,
            email: user.email
        })
        res.status(201).send({"message": "usuário criado com sucesso"})

    } static async getById (req: Request, res:Response){
        
        const id = req.params.id
        const snapshot = await getFirestore().collection("users").doc(id).get();
        res.send({
            ...snapshot.data(),
            id: snapshot.id
        });

    } static async update (req: Request, res: Response) {

        const _id = String(req.params.id);
        const _body = req.body
        await getFirestore().collection("users").doc(_id).set({
            nome: _body.nome,
            email: _body.email
        })
        res.send({"message": "usuário atualizado com sucesso"})

    } static async delete (req: Request, res: Response) {

        const _id = req.params.id
        await getFirestore().collection("users").doc(_id).delete()
        res.send({"message": "usuário removido com sucesso"})
    }
}