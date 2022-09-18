<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button
      type="button"
      @click="SelectFolder"
    >
      Select Foleder
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ msg: string }>();

const SelectFolder = async (): Promise<void> => {
  const path = 'C:\\Users\\daigu\\Downloads\\vitejs-vite-jjtwbr';
  const dir: { path: string; files: string[] } =
    await window.webAPI.selectFolder(path);
  console.log(dir);
};
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
