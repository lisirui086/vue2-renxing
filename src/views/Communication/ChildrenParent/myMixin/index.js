export const giveMoney = {
  // 对外暴露
  methods: {
    giveMoney(money) {
      this.money -= money
      // $parent 可以获取到该子组件的父组件并可以获取操作父组件的数据和方法
      this.$parent.money += money
    }
  }
}