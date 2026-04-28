import { defineStore } from "pinia";
import { ref } from "vue";
import { collection, getDocs, doc, getDoc, serverTimestamp, addDoc } from 'firebase/firestore';
import { db } from '@/firebase';

export const usePhaseStore = defineStore('phase', () => {
  const standardPhases = ref([]);
  const phases = ref([]);
  const phase = ref(null);
  const comments = ref([]);

  async function fetchStandardPhases() {
    const snap = await getDocs(collection(db, 'standardPhases'));
    standardPhases.value = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  };

  async function fetchPhases(projectId) {
    const snap = await getDocs(collection(db, 'projects', projectId, 'phases'));
    phases.value = snap.docs
    .map(d => ({id: d.id, ...d.data() }))
    .sort((a, b) => a.order - b.order);
  };

  async function fetchPhase(projectId, phaseId) {
    const snap = await getDoc(doc(db, 'projects', projectId, 'phases', phaseId));
    phase.value = { id: snap.id, ...snap.data() };
  };

  async function fetchComments(projectId, phaseId) {
    const snap = await getDocs(collection(db, 'projects', projectId, 'phases', phaseId, 'comments'));
    comments.value = snap.docs
    .map(d => ({ id: d.id, ...d.data() }))
    .sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
  };

  async function addComment(projectId, phaseId, text) {
    await addDoc(collection(db, 'projects', projectId, 'phases', phaseId, 'comments'), {
      text,
      createdAt: serverTimestamp(),
    });
    await fetchComments(projectId, phaseId);
  };

  return { 
    standardPhases, 
    phases, 
    phase, 
    comments, 
    fetchStandardPhases, 
    fetchPhases, 
    fetchPhase, 
    fetchComments, 
    addComment 
  };
});

