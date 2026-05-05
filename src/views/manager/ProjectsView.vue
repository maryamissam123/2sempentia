<script setup>
import { onMounted } from 'vue';
import { useManagerProject } from '@/composables/useManagerProject';
import BaseList from '@/components/base/BaseList.vue';
import BaseCard from '@/components/base/BaseCard.vue';

const { projectStore, loadProjects } = useManagerProject();

onMounted(loadProjects);

</script>

<template>
  <BaseList :items="projectStore.projects">
    <template #item="{ item }">
      <RouterLink
        :to="{ name: 'manager-project-details', params: { id: item.id } }"
        class="no-underline"
      >
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