// src/stores/auth.js
import { defineStore } from "pinia";
import { ref } from 'vue';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase';

export const useAuthStore = defineStore('auth', () => {
    const login = async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password)
    };

    return {
        login
    };
})