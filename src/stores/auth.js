// src/stores/auth.js
import { defineStore } from "pinia";
import { ref } from 'vue';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc, query, collection, where, getDocs, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase';

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null);
    const role = ref(null);
    const ready = ref(false);

    const login = async (email, password) => {
        const { user: u } = await signInWithEmailAndPassword(auth, email, password);
        user.value = u;
        const snap = await getDoc(doc(db, 'users', u.uid));
        const userRole = snap.data()?.role;
        role.value = userRole;
        return userRole;
    };

    const logout = async () => {
        await signOut(auth);
    };

    const createUser = async ({ name, email, password, projectNumber}) => {
        const q = query(
            collection(db, 'projects'),
            where('projectNumber', '==', projectNumber)
        );
        const snap = await getDocs(q);

        if (snap.empty) {
            throw new Error('Projektnummer findes ikke');
        };

        const projectDoc = snap.docs[0];

        const { user: u } = await createUserWithEmailAndPassword(auth, email, password);
        user.value = u;

        await setDoc(doc(db, 'users', u.uid), {
            name,
            email,
            role: 'customer',
        });

        await updateDoc(projectDoc.ref, {
            customerId: u.uid
        });

        role.value = 'customer';
        return 'customer';
    }

    onAuthStateChanged(auth, async (u) => {
        user.value = u;
        if(u) {
            const snap = await getDoc(doc(db, 'users', u.uid));
            role.value = snap.data()?.role;
        } else {
            role.value = null;
        }
        ready.value = true;
    });

    return {
        user,
        role,
        ready,
        login,
        logout,
        createUser
    };
});