import { User } from '../models/user.models'
import { UserRepository } from '../repositories/user.repository';
import { NotFoundError } from '../errors/not-found.error';

export class UserService {
    private userRepository: UserRepository
    constructor() {
        this.userRepository = new UserRepository
    }

    async getAll(): Promise<User[]> {
        return this.userRepository.getAll();
    } 
    async getByID(id : string): Promise<User> {
        const user = await this.userRepository.getById(id);
        if (!user) {
            throw new NotFoundError("usuário não encontrado")
        } else {
            return user
        }
    } 
    async update(nome: string, email: string, id: string): Promise<void> {
        const updated = this.userRepository.update(nome, email, id);
        if (!updated) {
            throw new NotFoundError("usuário não encontrado")
        }
    }
     async delete(id: string): Promise<void>{
        return this.userRepository.delete(id);
    }
     async create(nome: string, email: string) {
        return this.userRepository.create(nome, email);
    }
}