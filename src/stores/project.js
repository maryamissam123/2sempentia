import { defineStore } from 'pinia';
import { ref } from 'vue';
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'

export const useProjectStore = defineStore('project', () => {
	const projects = ref([]);

  async function fetchProjects() {
		const snap = await getDocs(collection(db, 'projects'));
		projects.value = snap.docs.map(d => ({ id: d.id, ...d.data() }));

  };

  return { projects, fetchProjects };
});