import { NextFunction, Request, Response } from 'express';
import { User } from '../models/user.models'
import { UserService } from '../services/user.service';


export class usercontrollers {
    static async GetById(req: Request, res: Response, next: NextFunction) {
        const user = {
            id: req.params.id,
            name: req.body.name,
            email: req.body.email
        } as User
        res.send(await new UserService().GetById(user));
    }

    static async GetAll(req: Request, res: Response, next: NextFunction) {
        res.send(await new UserService().GetAll());
    }

    static async PutUser(req: Request, res: Response, next: NextFunction) {
        const user = {
            id: req.params.id,
            name: req.body.name,
            email: req.body.email
        } as User
        await new UserService().PutUser(user)
        res.send({message: "Atualização realizada com sucesso."});

    }

    static async DeleteUser(req: Request, res: Response, next: NextFunction) {
        const user = {
            id: req.params.id,
            name: req.body.name,
            email: req.body.email
        } as User
        res.status(204).send(await new UserService().DeleteUser(user));

    }

    static async PostUser(req: Request, res: Response, next: NextFunction) {
        const user = req.body as User
        await new UserService().PostUser(user)
        res.status(201).send({message: "Usuário criado com sucesso."});

    }

    static Gethome(req: Request, res: Response) {
        res.send("<h3>Home</h3>")
    }
}