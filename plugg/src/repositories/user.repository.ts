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
    async getById(User: User): Promise<User | null> {
        const user = await this.collection.doc(User.id).get()
        if (user.exists) {
            return {
                id: String(User.id),
                ...user.data()
            } as User
        } else {
            return null;
        }
    }
    async update(User: User): Promise<void> {
        const docRef = await this.collection.doc(User.id);
        await docRef.set({
            nome: User.nome,
            email: User.email
        })
    }
    async delete(User: User) {
        await this.collection.doc(User.id).delete()
    }
}