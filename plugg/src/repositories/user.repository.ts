import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { User } from "../models/user.model";

export class UserRepository {
    private collection: CollectionReference
    constructor() {
        this.collection = getFirestore().collection("users")
    }
    async create(User: User) {
        await this.collection.add({
            nome: User.nome,
            email: User.email,
            id: User.id
        });
    }
    async getAll(): Promise<User[]> {
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => {
            return {
                ...doc.data(),
                id: doc.id
            };
        }) as User[];
    }
    async getById(id: string): Promise<User | null> {
        const user = await this.collection.doc(id).get()
        const user_data = ({...user.data()})
        if (user.exists) {
            return {
                nome: String(user_data.nome),
                email: String(user_data.email),
                id: String(user.id)
            } as User
        } else {
            return null;
        }
    }
    async update(User: User, id: string): Promise<boolean> {
        const docRef = this.collection.doc(id)
        if ((await (docRef.get())).exists) {
            await docRef.set({
                nome: User.nome,
                email: User.email
            })
            return true
        } else {
            return false;
        }
    }
    async delete(id: string) {
        await this.collection.doc(id).delete()
    }
}