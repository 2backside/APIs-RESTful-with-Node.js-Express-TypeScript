import { getAuth, UserRecord } from 'firebase-admin/auth'
import { User } from '../models/user.model'
export class AuthService {
    create(User: User): Promise<UserRecord> {
    return getAuth().createUser({
        email: User.email,
        displayName: User.nome
    })
}
}