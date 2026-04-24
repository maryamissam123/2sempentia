import { defineStore } from 'pinia';
import { ref } from 'vue';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase'

export const useProjectStore = defineStore('project', () => {
	const projects = ref([]);
	const project = ref(null)

  async function fetchProjects() {
		const snap = await getDocs(collection(db, 'projects'));
		projects.value = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  };

	async function fetchProject() {
		const snap = await getDocs(doc(db, 'projects', id));
		project.value = { id: snap.id, ...snap.data() }
	}

  return { projects, project, fetchProjects, fetchProject };
});