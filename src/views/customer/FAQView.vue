<script setup>
import { ref, onMounted } from 'vue';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import { ChevronRight, ChevronUp } from '@lucide/vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import TabBar from '@/components/TabBar.vue';

const faqs = ref([]);
const activeId = ref(null);

const fetchFaqs = async () => {
  try {
    const q = query(collection(db, 'faqs'), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    
    faqs.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log("Data fundet:", faqs.value);
  } catch (error) {
    console.error("Firebase fejl:", error);
  }
};

const toggleFaq = (id) => {
  activeId.value = activeId.value === id ? null : id;
};

onMounted(fetchFaqs);
</script>

<template>
  <Topbar :leftIcons="['back']" title="FAQ" />

  <div class="faq-page">
    <div class="faq-container">
      <div 
        v-for="faq in faqs" 
        :key="faq.id" 
        class="faq-item"
        @click="toggleFaq(faq.id)"
      >
        <BaseCard :class="['faq-card', { 'is-active': activeId === faq.id }]">
          <template #default>
            <div class="faq-header">
              <span class="faq-question">{{ faq.question }}</span>
              <component 
                :is="activeId === faq.id ? ChevronUp : ChevronRight" 
                class="faq-icon"
              />
            </div>
            
            <Transition name="expand">
              <div v-if="activeId === faq.id" class="faq-answer">
                <p>{{ faq.answer }}</p>
              </div>
            </Transition>
          </template>
        </BaseCard>
      </div>
    </div>
  </div>

  <TabBar />
</template>