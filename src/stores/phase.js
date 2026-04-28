import { defineStore } from "pinia";
import { ref } from "vue";
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';

export const usePhaseStore = defineStore('phase', () => {
  const standardPhases = ref([]);
  const phases = ref([]);
  const phase = ref(null);

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

  async function fetchPhase(projectId, phaseId) {
    const snap = await getDoc(doc(db, 'projects', projectId, 'phases', phaseId));
    phase.value = { id: snap.id, ...snap.data() };
  };

return { standardPhases, phases, phase, fetchStandardPhases, fetchPhases, fetchPhase };
});

