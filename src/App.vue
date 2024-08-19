<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/vue"
import { ref } from "vue";
import { darkTheme, lightTheme } from "naive-ui";
import { DarkTheme20Regular } from "@vicons/fluent";

import SearchBar from "./components/SearchBar.vue";

let theme = ref(darkTheme);

function toggleTheme(): void {
  theme.value = theme.value.name!="dark" ? darkTheme : lightTheme;
}

</script>

<template>
  <SpeedInsights/>
  
  <n-config-provider :theme="theme">
    <n-global-style />

    <main>
      <n-flex vertical>
        <n-flex justify="center">
            <n-gradient-text :size=24 type="info">
              Display the city grid
            </n-gradient-text>
            <n-flex justify="end">
            <n-float-button @click="toggleTheme" :right="10" :top="10">
              <n-icon><DarkTheme20Regular/></n-icon>
            </n-float-button>
            </n-flex>
        </n-flex>
        <n-flex justify="center">
          <SearchBar/>
        </n-flex>
        
      <!--<n-flex justify="center">
          <n-button @click="toggleTheme">Toggle</n-button>
        </n-flex>-->
    </n-flex>
    </main>
  
  </n-config-provider>
</template>

<style scoped>
</style>
