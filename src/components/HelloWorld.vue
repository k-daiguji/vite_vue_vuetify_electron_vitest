<script setup lang="ts">
defineProps<{ msg: string }>();

const SelectFolder = async (): Promise<void> => {
  const path = "C:\\Users\\daigu\\Downloads\\vitejs-vite-jjtwbr";
  const dir: { path: string; files: string[] } =
    await window.webAPI.selectFolder(path);
  console.log(dir);
};

/**
 * @param time タイムアウトの秒数
 */
const TimerAlarm = (time: number): void => {
  setTimeout((): void => {
    alert("output");
  }, time * 1000);
};
</script>

<template>
  <h1>{{ msg }}</h1>
  <v-btn>aaa</v-btn>
  <div class="card">
    <button
      type="button"
      @click="SelectFolder"
    >
      Select Foleder
    </button>
  </div>
  <div>
    <button
      type="button"
      @click="TimerAlarm(60)"
    >
      1min Timer
    </button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
