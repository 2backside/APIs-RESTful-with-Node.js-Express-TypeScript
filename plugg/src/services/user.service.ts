import { UserRepository } from '../repositories/user.repository';
import { NotFoundError } from '../errors/not-found.error';
import { User } from '../models/user.model';

export class UserService {
    private userRepository: UserRepository;
    constructor() {
        this.userRepository = new UserRepository;
    }
    
    async create(User: User) {
       return this.userRepository.create(User);
   }
    async getAll(): Promise<User[]> {
        return this.userRepository.getAll();
    }
    async getByID(id : string): Promise<User> {
        const user = await this.userRepository.getById(id);
        if (!user) {
            throw new NotFoundError("usuário não encontrado");
        } else {
            return user;
        }
    }
    async update(User: User, id: string): Promise<void> {
        const updated = this.userRepository.update(User, id);
        if (!updated) {
            throw new NotFoundError("usuário não encontrado");
        }
    }
     async delete(id: string): Promise<void>{
        return this.userRepository.delete(id);
    }
}