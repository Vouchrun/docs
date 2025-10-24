<script setup>
import { onMounted, ref } from 'vue';
import DefaultTheme from 'vitepress/theme';
import VouchWidget from './components/VouchWidget.vue';

const { Layout } = DefaultTheme;
const widgetRef = ref(null);

onMounted(() => {
  // Add click handler for Buy VOUCH button
  const handleBuyVouchClick = (e) => {
    const target = e.target.closest('a[href="#buy-vouch"]');
    if (target) {
      e.preventDefault();
      if (window.openVouchWidget) {
        window.openVouchWidget();
      }
    }
  };

  document.addEventListener('click', handleBuyVouchClick);

  return () => {
    document.removeEventListener('click', handleBuyVouchClick);
  };
});
</script>

<template>
  <Layout>
    <template #layout-bottom>
      <VouchWidget ref="widgetRef" />
    </template>
  </Layout>
</template>
