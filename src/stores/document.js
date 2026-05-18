// src/stores/document.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { collection, addDoc, getDocs, query, orderBy, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '@/firebase';

export const useDocumentStore = defineStore('document', () => {
  // ===== States =====
  const documents = ref([]);

  // ===== Actions =====

  // Henter alle dokumenter for et projekt
  async function fetchDocuments(projectId) {
    const q = query(
      collection(db, 'projects', projectId, 'documents'),
      orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    documents.value = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  };

  // Uploader fil og gemmer metadata i Firestore
  async function uploadDocument(projectId, file) {
    const path = `documents/${projectId}/${Date.now()}_${file.name}`;
    const fileRef = storageRef(storage, path);

    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);

    await addDoc(collection(db, 'projects', projectId, 'documents'), {
      name: file.name,
      url,
      path,
      createdAt: serverTimestamp(),
    });

    await fetchDocuments(projectId);
  };

  // Sletter fil fra Storage og metadata fra Firestore
  async function deleteDocument(projectId, document) {
    await deleteObject(storageRef(storage, document.path));
    await deleteDoc(doc(db, 'projects', projectId, 'documents', document.id));
    await fetchDocuments(projectId);
  };

  return {
    documents,
    fetchDocuments,
    uploadDocument,
    deleteDocument,
  };
});