<script setup>
import { onMounted, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useCustomerProject } from '@/composables/useCustomerProject';
import CommentCard from '@/components/cards/CommentCard.vue';

const route = useRoute();
const { projectId, phaseStore } = useCustomerProject();

const loadData = async () => {
  if (projectId.value && route.params.id) {
    await phaseStore.fetchPhase(projectId.value, route.params.id);
    await phaseStore.fetchComments(projectId.value, route.params.id);
  }
};

onMounted(loadData);
watch(() => route.params.id, loadData);

const currentPhaseIcon = computed(() => {
  const name = phaseStore.phase?.name?.toLowerCase() || '';
  if (name.includes('fundament')) return 'Foundation.png';
  if (name.includes('vægge')) return 'Wall.png';
  if (name.includes('tag')) return 'Roof.png';
  if (name.includes('vinduer')) return 'Window.png';
  if (name.includes('dør')) return 'Door.png';
  if (name.includes('interiør') || name.includes('opbygning')) return 'Indoor.png';
  if (name.includes('nøgle')) return 'Key.png';
  return '';
});
</script>

<template>
  <Topbar 
    :leftIcons="['back']" 
    :rightIcons="['notifications']"
    :phaseIcon="currentPhaseIcon"
    :isCompleted="phaseStore.phase?.completed || false"
  />

  <div class="details-page" v-if="phaseStore.phase">
    <main class="details-content">
      
      <div v-if="phaseStore.comments && phaseStore.comments.length > 0">
        <CommentCard 
          v-for="comment in phaseStore.comments" 
          :key="comment.id" 
          :comment="comment"
        />
      </div>
      
      <div v-else class="empty-state">
        <p>Der er endnu ikke tilføjet opdateringer eller billeder til denne fase.</p>
      </div>
      
    </main>
  </div>
</template>