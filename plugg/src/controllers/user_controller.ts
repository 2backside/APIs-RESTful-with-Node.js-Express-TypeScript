import { NextFunction, Response, Request } from 'express';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

export class UsersController {
    static home(req: Request, res: Response, next: NextFunction) {
        res.send("fucnionando corretamente.");
    }
    static async create(req: Request, res: Response, next: NextFunction) {
        const User = req.body as User;
        await new UserService().create(User);
        res.status(201).send({ "message": "usuário criado com sucesso" });
    }
    static async getAll(req: Request, res: Response, next: NextFunction) {
        res.send(await new UserService().getAll());
    }
    static async getById(req: Request, res: Response, next: NextFunction) {
        const User = {
            nome: req.body.nome,
            email: req.body.email,
            id: req.params.id
        } as User;
        res.send(await new UserService().getByID(User));
    }
    static async update(req: Request, res: Response, next: NextFunction) {
        const User = {
            nome: req.body.nome,
            email: req.body.email,
            id: req.params.id
        } as User;
        await new UserService().update(User);
        res.send({ "message": "usuário atualizado com sucesso" });
    }
    static async delete(req: Request, res: Response, next: NextFunction) {
        const User = {
            nome: req.body.nome,
            email: req.body.email,
            id: req.params.id
        } as User;
        res.status(204).send(await new UserService().delete(User));
    }
}