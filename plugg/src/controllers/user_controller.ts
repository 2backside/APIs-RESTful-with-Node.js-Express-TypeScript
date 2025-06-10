import { NextFunction, Response, Request } from 'express';
import { UserService } from '../services/user.services';

export class UsersController {
    static home(req: Request, res: Response, next: NextFunction) {
        res.send("fucnionando corretamente.");
    }
    static async getAll(req: Request, res: Response, next: NextFunction) {
        res.send(await new UserService().getAll())
    }
    static async create(req: Request, res: Response, next: NextFunction) {
        const nome = String(req.body.nome);
        const email = String(req.body.email);
        await new UserService().create(nome, email)
        res.status(201).send({ "message": "usuário criado com sucesso" })
    }
    static async getById(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        res.send(await new UserService().getByID(id));
    }
    static async update(req: Request, res: Response, next: NextFunction) {
        const nome = String(req.body.nome);
        const email = String(req.body.email);
        const id = String(req.params.id);
        await new UserService().update(nome, email, id)
        res.send({ "message": "usuário atualizado com sucesso" })
    }
    static async delete(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        res.status(204).send(await new UserService().delete(id))
    }
}