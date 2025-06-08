import { NextFunction, Response, Request } from 'express';
import { getFirestore } from 'firebase-admin/firestore';
import { ValidationError } from '../errors/validation.error';

type User = {
    id: number;
    nome: string;
    email: string;
}

export class UsersController {
    static home(req: Request, res: Response, next: NextFunction) {

        res.send("api rodando corretamente.");

    } static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            // throw new Error("Erro aleatorio ai")
            const snapshot = await getFirestore().collection("users").get()
            const users = snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            })

            res.send(users)
        } catch (error) {
            next(error);
        }

    } static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.body as User
            await getFirestore().collection("users").add({
                nome: user.nome,
                email: user.email
            })
            res.status(201).send({ "message": "usuário criado com sucesso" })
        } catch (error) {
            if (!req.body.nome || Number(req.body.nome?.length) === 0) {
                throw new ValidationError("Nome precisa ser fornecido")
            } else if (!req.body.email || Number(req.body.name?.length) === 0) {
                throw new ValidationError("Email precisa ser fornecido")
            } else {
                next(error)
            }
        }

    } static async getById(req: Request, res: Response, next: NextFunction) {

        try {
            const id = req.params.id
            const snapshot = await getFirestore().collection("users").doc(id).get();
            res.send({
                ...snapshot.data(),
                id: snapshot.id
            });
        } catch (error) {
            next(error);
        }

    } static async update(req: Request, res: Response, next: NextFunction) {

        try {
            const _id = String(req.params.id);
            const _body = req.body
            await getFirestore().collection("users").doc(_id).set({
                nome: _body.nome,
                email: _body.email
            })
            res.send({ "message": "usuário atualizado com sucesso" })
        } catch (error) {
            next(error);
        }

    } static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const _id = req.params.id
            await getFirestore().collection("users").doc(_id).delete()
            res.status(204).end()
        } catch (error) {
            next(error);
        }
    }
}