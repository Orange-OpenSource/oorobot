<script setup>
import { onMounted, ref } from "vue";

import BlocklyComponent from "./BlocklyComponent.vue";
import "../blocks/stocks";
import {OoRoBoT} from "../oorobot";
import $ from 'jquery';
import { javascriptGenerator } from "blockly/javascript";

const foo = ref();
const code = ref();
const canvas = ref("canvas");
const launched = ref(false);
const modalOpened = ref(false);
let oorobot;

const options = {
  media: "media/",
  grid: {
    spacing: 25,
    length: 3,
    colour: "#ccc",
    snap: true,
  },
	  zoom: {
		controls: true,
		wheel: true,
		startScale: 1,
		maxScale: 3,
		minScale: 0.3,
		scaleSpeed: 1.05
	  },
  trashcan: true,    
  toolbox: `<xml>
           <block type="Start"></block>
	     <sep gap="10"></sep>
           <block type="Up">   </block>
      	     <sep gap="10"></sep>
	   <block type="Down"></block>
	     <sep gap="10"></sep>
	   <block type="Left"></block>
	     <sep gap="10"></sep>
	   <block type="Right"></block>
	     <sep gap="10"></sep>
	   <block type="Loop"></block>
	      <sep gap="10"></sep>
	    <block type="PenUp"></block>
	      <sep gap="10"></sep>
	    <block type="PenDown"></block>
	      <sep gap="10"></sep>
	    <block type="PenColor"></block>
	      <sep gap="10"></sep>
	    <block type="CircleRight"></block>
	      <sep gap="10"></sep>
            <block type="CircleLeft"></block>
	      <sep gap="10"></sep>
	    <block type="Pause"> </block>
        </xml>`,
};

const showCode = () => (code.value = javascriptGenerator.workspaceToCode(foo.value.workspace));
const testCode = () => {
  modalOpened.value=true;
  const code = javascriptGenerator.workspaceToCode(foo.value.workspace);
  console.log("set commands", code);
  oorobot.setCommands(code);
  oorobot.draw();
};
    
const launchCode = () => {
  const code = javascriptGenerator.workspaceToCode(foo.value.workspace);
  launched.value=true;
  $.ajax({
    url: `http://localhost:8383/api/v1/launch`,
    type: 'put',
    contentType: 'text/plain',
    data: code,
    success: (r) => {
      launched.value=false;
      console.log(r);
    },
    error: (resp, status, error) => {
      launched.value=false;
      console.log('error! ' + error);
    }
  });


};

onMounted(() => {
  oorobot = new OoRoBoT(canvas.value, 'black');
})

</script>

<template>
  <h1>Programmer l'OoRoBoT</h1>
  <div>
    <BlocklyComponent id="blockly" :options="options" ref="foo"></BlocklyComponent>
  </div>
  <div id="control">
    <button class="primary" v-on:click="testCode()">Tester</button>
    <button :disabled="launched" v-on:click="launchCode()">Lancer</button>
    <button>Partager</button>
    <button>Scanner</button>
  </div>
  <div v-show="modalOpened" id="myModal" class="modal" >
    <div class="modal-content">
      <span class="close" v-on:click="modalOpened=false">&times;</span>
      <canvas id="canvas" ref="canvas"></canvas>    
    </div>
  </div>    
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#control {
    position: absolute;
    bottom: 60px;
  display: grid;
    width: 100%;
       max-width: 1024px;
    background-color: #e3e3e3;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding-top: 5px;
      padding-bottom: 5px;
}

#code {
  margin: 0;
  display: block;
  position: absolute;
  right: 0;
  width: 50%;
}

#blockly {
  position: absolute;
  width: 100%;
  max-width: 1024px;
    
  height: calc(100% - 140px);
}
</style>
