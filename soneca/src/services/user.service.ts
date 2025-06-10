import { User } from "../models/user.models";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
    private UserRepository: UserRepository

    constructor() {
        this.UserRepository  = new UserRepository();
    }

    async GetAll(): Promise<User[]> {
        return this.UserRepository.GetAll();
    }

    async PutUser(user:User): Promise<void> {
        return this.UserRepository.PutUser(user)

    }

    async DeleteUser(id: string): Promise<void> {
        return this.UserRepository.DeleteUser(id)
    }

    async PostUser(user:User): Promise<void> {
        return this.UserRepository.PostUser(user)
    }

    async GetById(id: string): Promise<{id: string}> {
        return this.UserRepository.GetById(id)
    }
}
