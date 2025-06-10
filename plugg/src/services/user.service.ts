import { UserRepository } from '../repositories/user.repository';
import { NotFoundError } from '../errors/not-found.error';
import { User } from '../models/user.model';

export class UserService {
    private userRepository: UserRepository;
    constructor() {
        this.userRepository = new UserRepository;
    }
    
    async create(User: User) {
       return await this.userRepository.create(User);
   }
    async getAll(): Promise<User[]> {
        return await this.userRepository.getAll();
    }
    async getByID(User: User): Promise<User | boolean> {
        const user = await this.userRepository.getById(User);
        if (!user) {
            throw new NotFoundError("usuário não encontrado");
        } else {
            return user;
        }
    }
    async update(User: User): Promise<void> {
        const get = await this.userRepository.getById(User);
        if (!get) {
            throw new NotFoundError("usuário não encontrado");
        } else {
            return await this.userRepository.update(User);
        }
    }
     async delete(User: User): Promise<void>{
        return await this.userRepository.delete(User);
    }
}