import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { User } from "../models/user.models";

export class UserRepository {
    private collection: CollectionReference
    constructor() {
        this.collection = getFirestore().collection("users")
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
    async update(id: string, nome: string, email: string): Promise<boolean> {
        const docRef = this.collection.doc(id)
        if ((await (docRef.get())).exists) {
            await docRef.set({
                nome: nome,
                email: email
            })
            return true
        } else {
            return false;
        }
    }
    async delete(id: string) {
        await this.collection.doc(id).delete()
    }
    async create(nome: string, email: string) {
        await this.collection.add({
            nome: nome,
            email: email,
        });
    }
}