// src/stores/chat.js
import { defineStore } from "pinia";
import { ref } from "vue";
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';
import { useAuthStore } from './auth';

export const useChatStore = defineStore('chat', () => {
  // ===== States =====
  const messages = ref([]);
  let stop = null;

  // ===== Actions =====

  // Starter realtid-listener på beskeder for et projekt
  function startListener(projectId) {
    const q = query(
      collection(db, 'projects', projectId, 'messages'),
      orderBy('createdAt')
    );

    stop = onSnapshot(q, (snap) => {
      messages.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    });
  };

  // Stopper listeneren og rydder beskeder
  function stopListener() {
    if (stop) {
      stop()
      stop = null
    }
    messages.value = []
  }

  // Henter alle beskeder fra specifikt projekt
  async function fetchMessages(projectId) {
    const q = query(collection(db, 'projects', projectId, 'messages'), orderBy('createdAt'));

    const snap = await getDocs(q);
    messages.value = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }

  // Sender ny besked og opdaterer projektets seneste besked
  async function sendMessage(projectId, text) {
    const auth = useAuthStore();
    
    // 1. Tilføj besked
    await addDoc(collection(db, 'projects', projectId, 'messages'), {
      text,
      senderId: auth.user.uid,
      senderName: auth.name,
      createdAt: serverTimestamp(),
    });

    // 2. Opdater projekt med seneste besked
    await updateDoc(doc(db, 'projects', projectId), {
      lastMessage: text,
      lastMessageAt: serverTimestamp(),
    });
  };

  return { 
    messages, 
    startListener, 
    stopListener, 
    fetchMessages, 
    sendMessage,
  };
});