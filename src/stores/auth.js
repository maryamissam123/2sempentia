// src/stores/auth.js
import { defineStore } from "pinia";
import { ref, computed } from 'vue';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc, query, collection, where, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase';

export const useAuthStore = defineStore('auth', () => {
  // ===== States =====
  const user = ref(null);
  const role = ref(null);
  const name = ref(null); 
  const ready = ref(false);

  // ===== Getters =====

  const isAuthenticated = computed(() => !!user.value);
  const isManager = computed(() => role.value === 'manager');
  const isCustomer = computed(() => role.value === 'customer');

  // ===== Actions =====

  // Logger ind og henter brugerdata fra Firestore
  async function login(email, password) {
    const { user: u } = await signInWithEmailAndPassword(auth, email, password);
    user.value = u;

    const snap = await getDoc(doc(db, 'users', u.uid));
    const data = snap.data();
    role.value = data?.role;
    name.value = data?.name;

    return data?.role;
  };

    async function logout() {
      await signOut(auth);
      user.value = null;
      role.value = null;
    };

    // Opretter ny customer og tilknytter dem til et eksisterende projekt
    async function createCustomer({ name, email, password, projectNumber }) {
      const q = query(
        collection(db, 'projects'),
        where('projectNumber', '==', projectNumber)
      );
      const snap = await getDocs(q);

      if (snap.empty) throw new Error('Projektnummer findes ikke');

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
    };

    // Opretter ny manager og fjerner deres medarbejdernummer fra whitelist
    async function createManager({ name, email, password, employeeNumber }) {
      const whitelistRef = doc(db, 'employeeWhitelist', employeeNumber);
      const whitelistSnap = await getDoc(whitelistRef); // Tjekker om medarbejdernummeret findes i whitelist collection
      
      if (!whitelistSnap.exists()) throw new Error('Medarbejdernummer findes ikke');

      const { user: u } = await createUserWithEmailAndPassword(auth, email, password);
      user.value = u;

      await setDoc(doc(db, 'users', u.uid), {
        name,
        email,
        employeeNumber,
        role: 'manager',
      });

      await deleteDoc(whitelistRef);

      role.value = 'manager';
      return 'manager';
    };

    // Opdaterer brugerens data i Firestore
    async function updateUser(data) {
      if (!user.value) return;
      await updateDoc(doc(db, 'users', user.value.uid), data);
      if (data.name !== undefined) name.value = data.name;
    };

    // Lytter på auth-state og synkroniserer med Firestore
    onAuthStateChanged(auth, async (u) => {
      user.value = u;

      if (u) {
        const snap = await getDoc(doc(db, 'users', u.uid));
        const data = snap.data();
        console.log('user data:', data);
        role.value = data?.role;
        name.value = data?.name;
      };

      ready.value = true;
    });

    return {
      user,
      role,
      name,
      ready,
      isAuthenticated,
      isManager,
      isCustomer,
      login,
      logout,
      createCustomer,
      createManager,
      updateUser
    };
});