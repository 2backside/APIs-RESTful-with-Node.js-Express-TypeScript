import { NotFound } from "../errors/not-found.error";
import { User } from "../models/user.models";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
    private UserRepository: UserRepository

    constructor() {
        this.UserRepository = new UserRepository();
    }

    async GetAll(): Promise<User[]> {
        return await this.UserRepository.GetAll();
    }

    async PutUser(user: User): Promise<void> {
        const verification = await this.UserRepository.GetById(user)
        if (!verification) { throw new NotFound("Usuário não encontrado."); }
        else {
            await this.UserRepository.PutUser(user)
        }

    }

    async DeleteUser(user: User): Promise<void> {
        return await this.UserRepository.DeleteUser(user)
    }

    async PostUser(user: User): Promise<void> {
        return await this.UserRepository.PostUser(user)
    }

    async GetById(user: User): Promise<User | null> {
        const verification = await this.UserRepository.GetById(user)
        if (!verification) {
            throw new NotFound("Usuário não encontrado.")
        } else {
            return verification
        }
    }
}
