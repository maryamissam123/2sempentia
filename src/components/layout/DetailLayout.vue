<script setup>
import TopBar from '@/components/TopBar.vue';
</script>

<template>
	<div class="detail-layout">
		<TopBar :left-icons="['back']" />
		<main class="detail-layout__content">
			<slot />
		</main>
	</div>
</template>