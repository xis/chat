<template>
  <div id="app">
    <chatMain />
  </div>
</template>

<script>
import chatMain from "./components/chatMain.vue";

export default {
  name: "App",
  components: {
    chatMain,
  },
};
</script>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.css";

#app {
  width: 100%;
  height: 100%;
}

html,
body {
  margin: 0;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  background-color: #111010;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-app-region: drag;
}

a {
  text-decoration: none;
  color: #a59a9d;
  font-weight: 600;
}

::selection {
  background-color: #1e1c1c;
  color: white;
}
::-webkit-scrollbar {
  width: 6px;
  height: 5px;
  padding-bottom: 5px;
}

::-webkit-scrollbar-track {
  border-radius: 00px;
}

::-webkit-scrollbar-thumb {
  border-radius: 0px;
  background-color: #4c00ff;
}

.titlebar {
  height: 30px;
  float: right;
}

.titlebutton {
  height: 100%;
  width: 25px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  color: white;
  -webkit-app-region: no-drag;
}

.titlebutton:hover {
  background-color: #1e1c1c;
}
</style>
