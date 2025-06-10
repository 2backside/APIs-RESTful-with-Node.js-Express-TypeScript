import { NextFunction, Response, Request } from 'express';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';

export class UsersController {
    static home(req: Request, res: Response, next: NextFunction) {
        res.send("fucnionando corretamente.");
    }
    static async create(req: Request, res: Response, next: NextFunction) {
        const User = req.body as User;
        const userID = await new AuthService().create(User);
        User.id = userID.uid;
        await new UserService().create(User);
        res.status(201).send({ "message": "usuário criado com sucesso" });
    }
    static async getAll(req: Request, res: Response, next: NextFunction) {
        res.send(await new UserService().getAll());
    }
    static async getById(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        res.send(await new UserService().getByID(id));
    }
    static async update(req: Request, res: Response, next: NextFunction) {
        const User = req.body as User;
        const id = String(req.params.id);
        await new UserService().update(User, id);
        res.send({ "message": "usuário atualizado com sucesso" });
    }
    static async delete(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        res.status(204).send(await new UserService().delete(id));
    }
}