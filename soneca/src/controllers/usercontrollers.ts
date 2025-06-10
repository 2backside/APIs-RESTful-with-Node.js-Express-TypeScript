import { NextFunction, Request, Response } from 'express';
import { User } from '../models/user.models'
import { UserService } from '../services/user.service';

export class usercontrollers {

    static async GetById(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        res.send(await new UserService().GetById(id));
    }

    static async GetAll(req: Request, res: Response, next: NextFunction) {
        res.send(await new UserService().GetAll());
    }

    static async PutUser(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        const body = req.body as User
        const name = body.name
        const email = body.email
        res.send(await new UserService().PutUser(id,name,email));

    }

    static async DeleteUser(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        res.status(204).send(await new UserService().DeleteUser(id));

    }

    static async PostUser(req: Request, res: Response, next: NextFunction) {
        const body = req.body as User
        const name = body.name
        const email = body.email
        res.status(201).send(await new UserService().PostUser(name,email))

    }

    static Gethome(req: Request, res: Response) {
        res.send("<h3>Home</h3>")
    }
}