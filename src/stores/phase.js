import { defineStore } from "pinia";
import { ref } from "vue";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';

export const usePhaseStore = defineStore('phase', () => {
  const standardPhases = ref([]);

  async function fetchStandardPhases() {
    const snap = await getDocs(collection(db, 'standardPhases'));
    standardPhases.value = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  };

return { standardPhases, fetchStandardPhases };
});

