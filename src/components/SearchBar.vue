<script setup lang="ts">
import { ref, computed } from "vue"
import { Search12Regular } from '@vicons/fluent'

const text = ref("")
const options = computed(() => {
        return ['@gmail.com', '@163.com', '@qq.com'].map((suffix) => {
          const prefix = text.value.split('@')[0]
          return {
            label: prefix + suffix,
            value: prefix + suffix
          }
		})
	})
</script>

<template>
  <n-auto-complete type="text" placeholder="Search city" style="max-width: 30%" v-model:value="text" :options>
	<template #suffix>
	  <n-icon :component="Search12Regular"/>
	</template> 
  </n-auto-complete>
</template>