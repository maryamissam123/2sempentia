// src/stores/auth.js
import { defineStore } from "pinia";
import { ref } from 'vue';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase';

export const useAuthStore = defineStore('auth', () => {
    const role = ref(null);
    const ready = ref(false);

    const login = async (email, password) => {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        const snap = await getDoc(doc(db, 'users', user.uid))
        const userRole = snap.data()?.role
        role.value = userRole
        return userRole
    };

    const logout = async () => {
        await signOut(auth)
    };

    onAuthStateChanged(auth, async (user) => {
        if(user) {
            const snap = await getDoc(doc(db, 'users', user.uid));
            role.value = snap.data()?.role;
        } else {
            role.value = null;
        }
        ready.value = true;
    });

    return {
        role,
        ready,
        login,
        logout
    };
})