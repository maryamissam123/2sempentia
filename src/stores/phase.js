import { defineStore } from "pinia";
import { ref } from "vue";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';

export const usePhaseStore = defineStore('phase', () => {
  const standardPhases = ref([]);
  const phases = ref([]);

  async function fetchStandardPhases() {
    const snap = await getDocs(collection(db, 'standardPhases'));
    standardPhases.value = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  };

  async function fetchPhases(projectId) {
    const snap = await getDocs(collection(db, 'projects', projectId, 'phases'));
    phases.value = snap.docs
    .map(d => ({id: d.id, ...d.data() }))
    .sort((a, b) => a.order - b.order);
  }

return { standardPhases, phases, fetchStandardPhases, fetchPhases };
});

