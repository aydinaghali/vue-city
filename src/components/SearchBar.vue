<script setup lang="ts">
import { ref, computed, watch, type VNode, type VNodeChild } from "vue"
import { Search12Regular } from '@vicons/fluent'
import { searchCities } from "@/lib/SearchCities.mjs";
import type { SelectOption } from "naive-ui";

const WaitInterval = 1000;

const text = ref("")
const options = ref([]);
let lastTyped = WaitInterval;
let timer: NodeJS.Timeout;


function createSearch(newText: string){
  return () => {
    searchCities(newText).then((val)=>
      val.result.map((e: any) => {return {label: `${e.name}, ${e.country}`, value: `${e.geonameid}`}}
    )).then((val) => options.value = val);
  }
}

watch(text, (newText) => {
  options.value = [];
  clearTimeout(timer);

  let actualLastTyped = lastTyped;
  lastTyped = performance.now();
  let elapsed = Math.min(performance.now() - actualLastTyped, 1);
  if(text.value.length <= 2) return;

  timer = setTimeout(createSearch(newText), WaitInterval - elapsed);
  
  if(newText.length <= 2) return;

  /*searchCities(newText).then((val)=>
    val.result.map((e: any) => {return {label: `${e.name}, ${e.country}`, value: `${e.geonameid}`}}
  )).then((val) => options.value = val);*/
  //++i;
});

/*function renderLabel(option: SelectOption): VNodeChild{
  return [option.label as string, ", ", (option.value as string).split(",")[1]]
}*/

/*function showOptions(){
  searchCities(text.value).then((val)=>
    val.result.map((e: any) => {return {label: `${e.name}, ${e.country}`, value: `${e.geonameid}`}}
  )).then((val) => options.value = val);
}*/

</script>

<template>
  <n-auto-complete type="text" placeholder="Search city" style="max-width: 30%" v-model:value="text" :options>
	<template #suffix>
	  <n-icon :component="Search12Regular"/>
	</template> 
  </n-auto-complete>
</template>