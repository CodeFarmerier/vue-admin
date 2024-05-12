<template>
  <el-card style="max-width: '50%'">
    <template #header>
      <div class="font-semibold text-xl">{{ props.title }}</div>
    </template>
    <slot name="default"></slot>
  </el-card>
</template>
<script lang="ts" setup>
const props = defineProps<{
  title: string
}>()
</script>
