import { defineStore } from "pinia";
import { ref } from "vue";
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';
import { useAuthStore } from './auth';

export const useChatStore = defineStore('chat', () => {
  const messages = ref([]);
  let stop = null;

  function startListener(projectId) {
    const q = query(collection(db, 'projects', projectId, 'messages'),
      orderBy('createdAt')
    );

    stop = onSnapshot(q, (snap) => {
      messages.value = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    });
  };

  function stopListener() {
    if (stop) {
      stop();
      stop = null;
    }
    messages.value = [];
  }

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
      senderName: auth.name || (auth.role === 'manager' ? 'Byggeleder' : 'Kunde'),
      createdAt: serverTimestamp(),
    });
    await fetchMessages(projectId);
  };

  async function fetchLastMessage(projectId) {
    const q = query(
      collection(db, 'projects', projectId, 'messages'),
      orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs[0]?.data() || null;
  }

  return { messages, startListener, stopListener, fetchMessages, sendMessage, fetchLastMessage };
});