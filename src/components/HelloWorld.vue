<script setup lang="ts">
defineProps<{ msg: string }>();

const CreateFolder = async (): Promise<void> => {
  const path = "C:\\Users\\daigu\\Downloads\\vitejs-vite-jjtwbr";
  const selectFolder: string = await window.webAPI.selectFolder(path);
  if (!selectFolder) return;
  const date: Date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const folderName = date
    .toLocaleString(undefined, options)
    .replace(/[^0-9]/g, "");
  const exportPath: string = await window.webAPI.createFolder(
    `${selectFolder}\\${folderName}`
  );
  console.log(exportPath);
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
      @click="CreateFolder"
    >
      Create Foleder
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
