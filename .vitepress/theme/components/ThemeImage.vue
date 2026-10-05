<script setup>
import { useData } from 'vitepress'

defineProps({
  light: { type: String, required: true },
  dark: { type: String, required: true },
  alt: { type: String, default: '' },
  caption: { type: String, default: '' },
})

const { isDark } = useData()
</script>

<template>
  <figure>
    <img :src="isDark ? dark : light" :alt="alt">
    <figcaption v-if="caption">{{ caption }}</figcaption>
  </figure>
</template>
