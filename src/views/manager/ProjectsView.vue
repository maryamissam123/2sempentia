<script setup>
import { onMounted } from 'vue';
import { useManagerProject } from '@/composables/useManagerProject';
import BaseList from '@/components/base/BaseList.vue';
import BaseCard from '@/components/base/BaseCard.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const { projectStore, loadProjects } = useManagerProject();

onMounted(loadProjects);

function getDestination(projectId) {
  const goto = route.query.goto
  if (goto === 'documents') return { name: 'manager-documents', params: { projectId } };
  if (goto === 'process') return { name: 'manager-process', params: { projectId } };
  return { name: 'manager-project-details', params: { id: projectId } };
};

</script>

<template>
  <BaseList :items="projectStore.projects">
    <template #item="{ item }">
      <RouterLink 
        :to="getDestination(item.id)" 
        class="no-underline">
			<BaseCard
				class="base-card--with-image"
				:title="`PROJEKT #${item.projectNumber}`"
				:subtitle="item.address"
			>
				<template #icon>
					<img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.name" />
				</template>
			</BaseCard>
      </RouterLink>
    </template>
  </BaseList>
</template>