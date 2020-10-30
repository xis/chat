<template>
  <div class="mymessage">
    {{ mesaj }}
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    mesaj: String,
  },
};
</script>

<style scoped>
.mymessage {
  width: auto;
  height: auto;
  max-width: 90%;
  word-wrap: break-word;
  bottom: 0;
  color: rgb(209, 198, 198);
  background-color: #1e1c1c;
  padding: 8px;
  font-size: 15px;
  position: relative;
  clear: both;
  margin: 5px 15px 5px;
  -webkit-app-region: no-drag;
}

.username {
  color: rgba(199, 198, 198, 0.623);
  font-size: 12px;
  clear: both;
  margin-right: 20px;
  margin-left: 20px;
  margin-bottom: 5px;
}

.video {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  clear: both;
  margin-bottom: 5px;
}

.code {
  margin: 0;
  font-size: 12px;
  white-space: pre-wrap;
}
.mesajKutusu {
  width: 50%;
  text-align: start;
  color: aqua;
  border-color: white;
  border-width: 10px;
}
</style>