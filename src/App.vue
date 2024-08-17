<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/vue"
import { ref } from "vue";
import { darkTheme } from "naive-ui";
import { Search12Regular } from '@vicons/fluent'
import { Icon } from '@vicons/utils'

const theme = ref(darkTheme);
</script>

<template>
  <SpeedInsights/>
  
  
  <n-config-provider :theme="theme">
    <n-global-style />

    <main>
      <n-flex vertical>
        <n-flex justify="center">
          <n-gradient-text :size=24 type="info">
            Aydin!
          </n-gradient-text>
        </n-flex>
        
        <n-flex justify="center">
          <n-input type="text" placeholder="Search city" style="max-width: 30%"/>
          <n-button>
            <Icon>
              <Search12Regular/>
            </Icon>
          </n-button>
        </n-flex>
    </n-flex>
    </main>
  
  </n-config-provider>
</template>

<style scoped>
</style>
