import { NextFunction, Request, Response } from 'express';
import { getFirestore } from 'firebase-admin/firestore';
import { ValidationError } from '../errors/validation.error';

type User = {
    id: number;
    name: string;
    email: string;
};

export class usercontrollers {

    static async GetById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const snapshot = await getFirestore().collection("users").doc(id).get();
            res.send({
                id: snapshot.id,
                ...snapshot.data()
            })

        } catch (error) {
            next(error);
        }

    }

    static async GetAll(req: Request, res: Response, next: NextFunction) {
        try {
            const snapshot = await getFirestore().collection("users").get();
            const users = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })
            res.send(users)

        } catch (error) {
            next(error);
        }

    }

    static async PutUser(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const body = req.body as User
            await getFirestore().collection("users").doc(id).set({
                name: body.name,
                email: body.email
            });
            res.send({ message: "Usuário atualizado com sucesso!" })

        } catch (error) {
            if (!req.body.name || Number(req.body.name.length) == 0) {
                throw new ValidationError("O nome é obrigatório");
            } else if (!req.body.email || Number(req.body.email.length) == 0) {
                throw new ValidationError("O email é obrigatório");
            } else {
                next(error);
            }

        }

    }

    static async DeleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            await getFirestore().collection("users").doc(id).delete();
            res.status(204).end()

        } catch (error) {
            next(error);
        }

    }

    static async PostUser(req: Request, res: Response, next: NextFunction) {
        try {
            let user = req.body as User
            await getFirestore().collection("users").add({
                name: user.name,
                email: user.email
            })
            res.status(201).send({ message: "Usuário adicionado com sucesso!" })

        } catch (error) {
            next(error);
        }

    }

    static Gethome(req: Request, res: Response) {
        res.send("<h3>Home</h3>")
    }
}