<template>
  <div>
    <h1>EventTest组件</h1>
    <ul>
      <li>事件：系统事件，click 双击 鼠标系列等等</li>
      <li>自定义事件</li>
      <li>事件源 事件回调</li>
    </ul>
    <!-- 原生DOM事件-->
    <button @click="handler">原生DOM绑定原生事件</button>
    <!-- Event1组件 Event1非原生DOM节点，绑定的click事件也非原生事件，而是自定义事件 -->
    <!-- .native可以把自定义事件变成原生的DOM事件 -->
    <Event1 @click.native="handler1"/>
    <!-- 给原生DOM绑定自定义事件 -->
    <!-- 没有任何意义，因为没有办法触发$emit函数 -->
    <button @btn="handler2">原生DOM绑定自定义事件</button>
    <!-- -->
    <Event2 @click="handler3">组件标签</Event2>
  </div>
</template>

<script>
// 引入子组件
import Event1 from '@/views/Communication/EventTest/Event1.vue'
import Event2 from '@/views/Communication/EventTest/Event2.vue'
export default {
  name: 'EventTest',
  components: { Event1, Event2 },
  methods: {
    // 原生DOM绑定原生事件
    handler(event) {
      console.log('原生DOM绑定原生事件',event);
    },
    // Event1
    handler1() {
      console.log('Event1的事件回调');
    },
    // 给原生DOM绑定自定义事件
    handler2() {
      console.log('给原生DOM绑定自定义事件');
    },
    // Event2
    handler3(params) {
      console.log('Event2的自定义事件回调',params)
    }
  }
}
</script>

<style lang='less' scoped>
</style>
