<script setup lang="ts">
import { ref } from "vue";
import DocumentPIP from "./components/DocumentPIP.vue";
import PIPContent from "./components/PIPContent.vue";

const isPipOpen = ref(false);

const togglePIP = () => {
  isPipOpen.value = !isPipOpen.value;
};
</script>

<template>
  <div style="width: 500px; height: 200px">
    <DocumentPIP :isPipOpen="isPipOpen" :size="{ width: 500, height: 200 }">
      <PIPContent></PIPContent>
    </DocumentPIP>
  </div>
  <button @click="togglePIP">Toggle PIP</button>
</template>

<style scoped></style>
