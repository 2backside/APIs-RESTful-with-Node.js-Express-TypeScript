import { NotFound } from "../errors/not-found.error";
import { User } from "../models/user.models";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
    private UserRepository: UserRepository

    constructor() {
        this.UserRepository = new UserRepository();
    }

    async GetAll(): Promise<User[]> {
        return this.UserRepository.GetAll();
    }

    async PutUser(user: User): Promise<void> {
        const verification = this.UserRepository.PutUser(user);
        if (!verification) 
            {throw new NotFound("Usuário não encontrado.");}

    }

    async DeleteUser(id: string): Promise<void> {
        return this.UserRepository.DeleteUser(id)
    }

    async PostUser(user: User): Promise<void> {
        return this.UserRepository.PostUser(user)
    }

    async GetById(id: string): Promise<User | null> {
        const verification = this.UserRepository.GetById(id)
        if (!verification) {
            throw new NotFound("Usuário não encontrado.")
        } else {
            return verification
        }
    }
}
