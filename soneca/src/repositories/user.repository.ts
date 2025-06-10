import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { User } from "../models/user.models";
export class UserRepository {
    private collection: CollectionReference;
    constructor() {
        this.collection = getFirestore().collection("users");
    }

    async GetAll(): Promise<User[]> {
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        }) as User[];
    }

    async PutUser(user: User): Promise<void> {
        const DocRef = this.collection.doc(user.id);
        await DocRef.set({
            name: user.name,
            email: user.email
        });
    }

    async DeleteUser(user:User): Promise<void> {
        await this.collection.doc(user.id).delete();
    }

    async PostUser(user: User): Promise<void> {
        await this.collection.add({
            name: user.name,
            email: user.email
        });
    }

    async GetById(user:User): Promise<User | null> {
        const snapshot = await this.collection.doc(user.id).get();
        if (snapshot.exists) {
            return ({
                id: snapshot.id,
                ...snapshot.data()
            }) as User;
        } else {
            return null;
        }
    }
}
