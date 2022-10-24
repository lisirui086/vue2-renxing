<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">上一页</button>

    <button v-if="StartAndEnd.start > 1" @click="$emit('getPageNo', 1)">1</button>

    <!-- 前面的... 在大于2的时候存在 -->
    <button v-if="StartAndEnd.start > 2">···</button>

    <!-- 中间部分 v-for 与 f-if 最好不要同时使用 -->
    <template v-for="page in StartAndEnd.end">
      <button  v-if="page >= StartAndEnd.start" :key="page"
        @click="$emit('getPageNo', page)" 
        :class="{ active: pageNo == page }">
        {{ page }}
      </button>
    </template>

    <button v-if="StartAndEnd.end < totalPage - 1">···</button>

    <button v-if="StartAndEnd.end < totalPage" @click="$emit('getPageNo', totalPage)">
      {{ totalPage }}
    </button>

    <button :disabled="pageNo == totalPage" @click="$emit('getPageNo', pageNo + 1)">
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ totalPage }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  // 计算属性
  computed: {
    // 分页器一共多少页（总条数/每页展示数）
    totalPage() {
      // 向上取整
      return Math.ceil(this.total / this.pageSize)
    },

    // 开头、连续五个数字、结尾
    StartAndEnd() {
      // 给开头和结尾定义初始值
      let start = 0, end = 0;
      // 解构赋值 总页数，连续页数，当前页数
      const { totalPage, continues, pageNo } = this
      // 特殊情况，总页数小于连续页码数

      if (totalPage < continues) {
        // 开始页为1，结尾是总页数
        start = 1
        end = totalPage
      } else {
        // 正常情况：总页数大于连续页码数 
        start = pageNo - parseInt(continues / 2)
        end = pageNo + parseInt(continues / 2)
        //约束start|end在合理范围之内 start开头不能小于1，结尾不能超过总页数
        //约束头部
        if (start < 1) {
          start = 1
          end = continues
        }
        //约束尾部
        if (end > totalPage) {
          end = totalPage
          start = totalPage - continues + 1
        }
      }
      return { start, end };
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #ff4040;
      color: #fff;
    }
  }
}
</style>
 