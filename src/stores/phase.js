// src/stores/phase.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { collection, getDocs, doc, getDoc, serverTimestamp, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';

export const usePhaseStore = defineStore('phase', () => {
  // ===== States =====
  const standardPhases = ref([]);
  const phases = ref([]);
  const phase = ref(null);
  const comments = ref([]);

  // ===== Getters =====

  // Beregner procent færdige faser
  const progress = computed(() => {
    if (!phases.value.length) return 0;
    const done = phases.value.filter(p => p.completed).length;
    return Math.round((done / phases.value.length) * 100);
  });

  // Finder nuværende fase
  const currentPhase = computed(() =>
    phases.value.find(p => !p.completed)
  );

  // Finder næste fase efter den nuværende
  const nextPhase = computed(() => {
    const currentIndex = phases.value.findIndex(p => !p.completed);
    if (currentIndex === -1) return null;
    return phases.value[currentIndex + 1] || null;
  });

  // ===== Actions =====

  // Henter standardfaser fra databasen (bruges ved oprettelse af projekt)
  async function fetchStandardPhases() {
    const snap = await getDocs(collection(db, 'standardPhases'));
    standardPhases.value = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  };

  // Henter alle faser for et projekt, sorteret efter rækkefølge
  async function fetchPhases(projectId) {
    const snap = await getDocs(collection(db, 'projects', projectId, 'phases'));
    phases.value = snap.docs
    .map(d => ({id: d.id, ...d.data() }))
    .sort((a, b) => a.order - b.order);
  };

  // Henter en specifik fase
  async function fetchPhase(projectId, phaseId) {
    const snap = await getDoc(doc(db, 'projects', projectId, 'phases', phaseId));
    phase.value = { id: snap.id, ...snap.data() };
  };

  // Henter kommentarer for en fase, nyeste først
  async function fetchComments(projectId, phaseId) {
    const snap = await getDocs(collection(db, 'projects', projectId, 'phases', phaseId, 'comments'));
    comments.value = snap.docs
    .map(d => ({ id: d.id, ...d.data() }))
    .sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
  };

  // Tilføjer ny kommentar med valgfrit billede
  async function addComment(projectId, phaseId, text, imageUrl = null) {
    await addDoc(collection(db, 'projects', projectId, 'phases', phaseId, 'comments'), {
      text,
      imageUrl,
      createdAt: serverTimestamp(),
    });
    await fetchComments(projectId, phaseId);
  };

  // Markerer fase som færdig/ikke færdig
  async function completePhase(projectId, phaseId, completed) {
    await updateDoc(
      doc(db, 'projects', projectId, 'phases', phaseId),
      { completed: !completed }
    );
    await fetchPhase(projectId, phaseId);
  };

  function clearPhase() {
    phase.value = null;
    comments.value = [];
  };

  return { 
    standardPhases,
    phases, 
    phase, 
    comments,
    progress, 
    currentPhase,
    nextPhase,
    fetchStandardPhases,
    fetchPhases, 
    fetchPhase, 
    fetchComments, 
    addComment,
    completePhase,
    clearPhase
  };
});

