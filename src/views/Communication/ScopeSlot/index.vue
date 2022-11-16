<template>
  <div>
    <h2>效果一：显示TODO列表时，已完成的TODO为绿色</h2>
    <!-- 子组件 List -->
    <List :todos="todos">
      <!-- 子组件决定不了结构和外观 -->
      <template slot-scope="child">
        <span :style="{ color: child.child.isComplete ? 'green' : 'red' }">{{ child.child.text }}</span>
      </template>
    </List>
    <hr>

    <h2>效果二：显示TODO列表时，带序号，TODO颜色为蓝绿搭配</h2>
    <List2 :todos="todos">
      <tempalate slot-scope="{count,index}">
        <span :style="{color: index % 2 ? 'orange' : 'purple'}">{{ index }}--{{ count.text }}</span>
      </tempalate>
    </List2>
  </div>
</template>

<script>
import List from './List.vue'
import List2 from './List2.vue'
export default {
  name: 'ScopeSlot',
  components: { List, List2 },
  data() {
    return {
      todos: [
        { id: 1, text: 'AAA', isComplete: false },
        { id: 2, text: 'BBB', isComplete: true },
        { id: 3, text: 'CCC', isComplete: true },
        { id: 4, text: 'DDD', isComplete: false },
      ]
    }
  }
}
</script>

<style lang='less' scoped>

</style>