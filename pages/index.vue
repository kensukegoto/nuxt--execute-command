<template>
  <div class="container" :class='{ creating:creating }'>
    <div>
      <logo />
      <h1 class="title">
        ボタンを押すとサイト生成されるよ
      </h1>

      <a class="btn--generate" @click="generate">サイト生成</a>
      <a v-if="created" class="btn--generate" href="/api/dl">DL</a>

    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  data(){
    return {
      creating : false,
      created : false
    }
  },
  components: {
    Logo
  },
  methods : {
    async generate() {
      this.creating = true;
      const url = "/api/generate";
      const response = await this.$axios.$get(url);
      this.creating = false;
      this.created = true;
      
    }
  }
}
</script>

<style lang="scss" scoped>

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  &.creating::after{
    content: "作成中...";
    font-size: 24px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: rgba(#fff,.8);
    position: absolute;
    top: 0;
    left: 0;
  }
}


.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 48px;
  color: #35495e;
  letter-spacing: 1px;
}
.btn--generate{
  margin-top: 1em;
  display: block;
  padding: 24px;
  border: 1px solid #333;
  border-radius: 15px;
  position: relative;
  cursor: pointer;
  font-weight: bold;

  &::before{
    display: block;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(#fff,0);

  }
  &:hover{
    &::before{
      background-color: rgba(#000,.1);
    }
  }
}

</style>
