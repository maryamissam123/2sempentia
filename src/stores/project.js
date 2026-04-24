import { defineStore } from 'pinia';
import { ref } from 'vue';
import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
import { db } from '@/firebase';
import { useAuthStore } from './auth';

export const useProjectStore = defineStore('project', () => {
	const projects = ref([]);
	const project = ref(null)

  async function fetchProjects() {
		const auth = useAuthStore();
		const field = auth.role === 'manager' ? 'managerId' : 'customerId';

		const q = query(
			collection(db, 'projects'),
			where(field, '==', auth.user.uid)
		);

		const snap = await getDocs(q);
		projects.value = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  };

	async function fetchProject(id) {
		const snap = await getDoc(doc(db, 'projects', id));
		project.value = { id: snap.id, ...snap.data() };
	};

  return { projects, project, fetchProjects, fetchProject };
});