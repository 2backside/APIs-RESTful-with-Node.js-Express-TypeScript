import { NextFunction, Request, Response } from 'express';
import { getFirestore } from 'firebase-admin/firestore';
import { ValidationError } from '../errors/validation.error';
import { NotFound } from '../errors/not-found.error';
import { User } from '../models/user.models'

export class usercontrollers {

    static async GetById(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        const snapshot = await getFirestore().collection("users").doc(id).get();
        if (snapshot.exists) {
            res.send({
                id: snapshot.id,
                ...snapshot.data()
            });
        }
        else {
            throw new NotFound("ID do usuário não encontrado.")
        }

    }

    static async GetAll(req: Request, res: Response, next: NextFunction) {
        const snapshot = await getFirestore().collection("users").get();
        const users = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })
        res.send(users)

    }

    static async PutUser(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        const body = req.body as User
        const name = body.name
        const email = body.email

        if ((!body.email || Number(body.email?.length) === 0) && (!body.name || Number(body.name?.length) === 0)) {
            throw new ValidationError("O nome e o e-mail são obrigatórios");
        } else if (!body.name || Number(body.name?.length) === 0) {
            throw new ValidationError("O nome é obrigatório");
        } else if (!body.email || Number(body.email?.length) === 0) {
            throw new ValidationError("O e-mail é obrigatório");
        }

        const DocRef = getFirestore().collection("users").doc(id);

        if ((await (DocRef.get())).exists) {
            await DocRef.set({
                name: name,
                email: email
            })
            res.send({ message: "Usuário atualizado com sucesso!" })
        } else {
            throw new NotFound("ID do usuário não encontrado.")
        };

    }

    static async DeleteUser(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        await getFirestore().collection("users").doc(id).delete();
        res.status(204).end()

    }

    static async PostUser(req: Request, res: Response, next: NextFunction) {
        const body = req.body as User

        await getFirestore().collection("users").add({
            name: body.name,
            email: body.email
        })
        res.status(201).send({ message: "Usuário adicionado com sucesso!" })


    }

    static Gethome(req: Request, res: Response) {
        res.send("<h3>Home</h3>")
    }
}