<script setup lang="ts">
//import geojson2svg from "geojson-to-svg";
import { GeoJSON2SVG } from "geojson2svg";
import osmtogeojson from "osmtogeojson";
import { callOverpassAPI } from "../lib/GetStreets.mjs";
import { ref, type Ref } from "vue"
//import { optimize, type Config } from "svgo";
// @ts-ignore
import parseSVG from "parse-svg";

const map_size = ref({x: 800, y: 800});
const svgContent = ref("");
const paths: Ref<string[]> = ref([]);

callOverpassAPI(
  "https://overpass.private.coffee/api/interpreter",
`
[out:json];
area[name="Bakı"]->.searchArea;
(
  way["highway"](area.searchArea);
);
out body;
>;
out skel qt;
`
)
.then((data) => {
  console.log(data);
  return data;
})
.then((data) => {
  console.log("Convert to geojson");
  let geo = osmtogeojson(data);
  return geo;
})
.then((data) => {
  console.log("Convert to svg");
  const converter = new GeoJSON2SVG({
    attributes: {'style': 'fill: white;'},
    viewportSize: {width: map_size.value.x, height: map_size.value.y},
    output: "path"
  });
  const coords = converter.convert(
    data
  );
  console.log(coords);
  
  const new_coords = coords.map((coord) => {
    const xys = coord.split(" ");
    return xys[0] + " " + xys.slice(1).map((s) => `L${s}`).join(" ");
  })

  console.log(new_coords);
  paths.value = new_coords;

  /*const documentFrangment = parseSVG(svgStrings);
  const serializer = new XMLSerializer();
  return serializer.serializeToString(documentFrangment);*/
})
/*.then((svg) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="400" height="400">${svg}</svg>`
})
.then((svg) => {
  console.log("Put in div");
  svgContent.value = svg;
  //console.log(svg);
});*/

</script>

<template>
  <div v-if="!paths" style="min-width: 40%;">
    <n-skeleton text :repeat="5" :sharp="false"/>
  </div>
  <!--<div v-html="svgContent" id="svg-holder"></div>-->
  <div>
    <svg :width="map_size.x" :height="map_size.y" xmlns="http://www.w3.org/2000/svg">
      <path v-for="path in paths" :d="path" stroke="white" fill="none"/>
    </svg>
  </div>
</template>