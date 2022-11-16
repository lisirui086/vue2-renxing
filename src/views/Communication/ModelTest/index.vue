<template>
  <div>
    <h1>深入v-mdeol</h1>
    <ul>
      <span>v-model它是vue框架中的指令，它主要结合表单元素一起使用（文本框，单，复选框</span>
      <span>它主要是收集表单的数据</span>
    </ul>
    <input type="text" v-model="msg">
    <span>{{msg}}</span>
    <hr/>
    <h2>用v-bind和v-on实现v-model功能</h2>
    <!-- 原生DOM当中是有oninput事件，
      它经常结合表单元素一起使用，当表单元素文本内容发生变化的时候就会发出一次回调
      可以通过value和input事件实现v-model的功能 -->
    <input type="text" :value="msg" @input="msg = $event.target.vaule">
    <span>{{msg}}</span>
    <hr/>
    <!-- :value是谁 这可是props，父子组件通信
      @click是谁  并非原生DOM的input事件，属于自定义事件 -->
    <!-- <Cinput :value="msg" @input="msg = $event" /> -->
    <!-- 简写 -->
    <Cinput v-model="msg" />
  </div>
</template>

<script>
import Cinput from '@/views/Communication/ModelTest/Cinput.vue'
export default {
  name: 'ModelTest',
  components: { Cinput },
  data() {
    return {
      msg:'v-model数据双向绑定'
    }
  }
}
</script>

<style lang='less' scoped>
</style>