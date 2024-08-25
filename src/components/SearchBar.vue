<script setup lang="ts">
import { ref, computed, watch, type VNode, type VNodeChild } from "vue"
import { Search12Regular } from '@vicons/fluent'
import { searchCities } from "@/lib/SearchCities.mjs";
import type { SelectOption } from "naive-ui";

const text = ref("")
const options = ref([]);
/*const options = computed(() => {
        return ['@gmail.com', '@163.com', '@qq.com'].map((suffix) => {
          const prefix = text.value.split('@')[0]
          return {
            label: prefix + suffix,
            value: prefix + suffix
          }
		})
	})*/

  function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (...args: Parameters<T>) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

const debouncedSearch = debounce(
  (newText) => searchCities(newText).then((val)=>
    val.result.map((e: any) => {return {label: `${e.name}, ${e.country}`, value: `${e.geonameid}`}}
  )).then((val) => options.value = val),
  200
);

watch(text, (newText) => {
  if(newText.length <= 3) return;

  /*searchCities(newText).then((val)=>
    val.result.map((e: any) => {return {label: `${e.name}, ${e.country}`, value: `${e.geonameid}`}}
  )).then((val) => options.value = val);*/
  debouncedSearch(newText);
});

/*function renderLabel(option: SelectOption): VNodeChild{
  return [option.label as string, ", ", (option.value as string).split(",")[1]]
}*/

</script>

<template>
  <n-auto-complete type="text" placeholder="Search city" style="max-width: 30%" v-model:value="text" :options>
	<template #suffix>
	  <n-icon :component="Search12Regular"/>
	</template> 
  </n-auto-complete>
</template>