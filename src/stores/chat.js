import { defineStore } from "pinia";
import { ref } from "vue";
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase';
import { useAuthStore } from './auth';

export const useChatStore = defineStore('chat', () => {
  const messages = ref([]);

  async function fetchMessages(projectId) {
    const q = query(collection(db, 'projects', projectId, 'messages'), orderBy('createdAt'));

    const snap = await getDocs(q);
    messages.value = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }

  async function sendMessage(projectId, text) {
    const auth = useAuthStore();
    await addDoc(collection(db, 'projects', projectId, 'messages'), {
      text,
      senderId: auth.user.uid,
      senderName: auth.role === 'manager' ? 'Byggeleder' : 'Kunde',
      createdAt: serverTimestamp(),
    });
    await fetchMessages(projectId);
  };

  return { messages, fetchMessages, sendMessage };
});