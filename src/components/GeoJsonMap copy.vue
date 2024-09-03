<script setup lang="ts">
//import geojson2svg from "geojson-to-svg";
import { GeoJSON2SVG } from "geojson2svg";
import osmtogeojson from "osmtogeojson";
import { callOverpassAPI } from "../lib/GetStreets.mjs";
import { ref } from "vue"
//import { optimize, type Config } from "svgo";
// @ts-ignore
import parseSVG from "parse-svg";

const svgContent = ref("");

callOverpassAPI(
  "https://overpass.private.coffee/api/interpreter",
`
[out:json];
area[name="Bleiswijk"]->.searchArea;
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
  return osmtogeojson(data);
})
.then((data) => {
  console.log("Convert to svg");
  const converter = new GeoJSON2SVG();
  const svgStrings = converter.convert(data, {attributes: {'style': 'fill: white;'}, explode: true});
  const documentFrangment = parseSVG(svgStrings);
  const serializer = new XMLSerializer();
  return serializer.serializeToString(documentFrangment);
})
.then((svg) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="400" height="400">${svg}</svg>`
})
.then((svg) => {
  console.log("Put in div");
  svgContent.value = svg;
  //console.log(svg);
});

</script>

<template>
  <div v-if="!svgContent" style="min-width: 40%;">
    <n-skeleton text :repeat="5" :sharp="false"/>
  </div>
  <div v-html="svgContent" id="svg-holder"></div>
</template>