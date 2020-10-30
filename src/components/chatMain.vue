<template>
  <div name="Chat" style="clear: both; height: 100%">
    <div class="messages" id="messageBox">
      <div
        style="
          text-align: center;
          font-size: 14px;
          font-weight: 400;
          color: #3d3a3a;
        "
      >
        <p>"/username yourusername" to set your username</p>
        <hr style="border: 0.4px solid #3d3a3a; width: 80%" />
        <div v-for="message in messages" :key="message" class="konteynir">
          <Message :mesaj="message" />
        </div>
      </div>
    </div>
    <!-- <h1 style="border: 0.4px solid #3d3a3a color">{{ currentText }}</h1> -->
    <textarea
      ref="sifirla"
      v-model="currentText"
      @keypress.enter="sendMessage()"
      id="messageInput"
      class="messageInput"
    ></textarea>
  </div>
</template>

<script>
import Message from "./Message";

export default {
  name: "Chat",
  components: {
    Message,
  },
  data() {
    return {
      currentText: "",
      emptyText: "",
      messages: {
        message: "",
        timeStamp: "",
      },
    };
  },
  methods: {
    sendMessage() {
      if (this.message != "") {
      this.messages.message = this.currentText;
      this.currentText = null;

      }
    },
  },
};
</script>


<style scoped>
h1 {
  color: white;
}
.messages {
  width: 100%;
  height: 80%;
  margin-top: 25px;
  overflow: auto;
  -webkit-app-region: no-drag;
}

.messageInput {
  outline: 0;
  background: rgba(255, 255, 255, 0.041);
  color: white;
  border: 0;
  width: 100%;
  height: 16%;
  resize: none;
  padding: 9px;
  font-size: 14px;
  font-family: inherit;
  -webkit-app-region: no-drag;
  box-sizing: border-box;
}

.konteynir {
  display: flex;
  flex-direction: column-reverse;
}
</style>
