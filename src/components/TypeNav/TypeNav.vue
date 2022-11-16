<template>
  <!-- 商品分类导航 -->
  <!-- 事件委派 | 事件 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="isShow" @click="goSearch">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <!-- 过渡动画 -->
        <transition appear name="animate__animated animate__bounce" enter-active-class="animate__swing"
          leave-active-class="animate__backOutUp">
          <div class="sort" v-show="show">
            <!-- 利用事件委派和编程式导航 -->
            <div class="all-sort-list2">
              <!-- 一级分类 -->
              <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId"
                :class="{cur: currentIndex == index}">
                <h3 @mouseenter="changeIndex(index)">
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                </h3>
                <!-- 显示与隐藏二三级分类 -->
                <div class="item-list clearfix" :style="{display: currentIndex == index ? 'block' : 'none'}">
                  <div class="subitem" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                      </dt>
                      <dd>
                        <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import 'animate.css'
// 按需导入lodash 的函数
import throttle from 'lodash/throttle'
export default {
  name: 'TypeNav',
  data() {
    return {
      // 控制鼠标悬浮的一级分类
      currentIndex: -1,
      // 控制三级联动是否显示隐藏
      show: true
    }
  },
  // 组件挂载完毕，可以向服务器发请求
  mounted() {
    // 如果不是home页面就隐藏
    if (this.$route.path != '/home') {
      this.show = false
    }
  },
  // 计算属性
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList
    })
  },
  // 方法
  methods: {
    // 鼠标悬浮在某个一级分类上则显示背景颜色
    changeIndex: throttle(function (index) {
      // 这里用ES5的键值对书写方法，这里最好不用箭头函数
      //　节流
      // index:鼠标移上某一个一级分类的元素的索引值
      // 正常情况：（用户慢慢的操作）：鼠标进入每个一级分类都会触发鼠标事件
      // 非正常情况：（用户快速的操作）：本身全部的一级分类都应该触发鼠标事件，但经过业务测试，只会触发部分
      //　由于用户行为过快，导致浏览器反应不过来，如果当前回调函数中有大量业务，可能出现卡顿现象
      this.currentIndex = index
    }, 50),
    // 鼠标离开时取消背景颜色显示
    leaveIndex() {
      this.currentIndex = -1
      if (this.$route.path != '/home') {
        this.show = false
      }
    },
    //精益求精
    //将全部的子节点的事件委派给父节点->事件回调就一个
    goSearch(event) {
      //第一个问题:div父节点子元素太多【h3、h2、em、dt、dd、dl...a】？你怎么知道你点击的一定是a
      //第二个问题:要区分一级分类、二级分类、三级分类的a标签【category1Id|category2Id|category2Id】
      let targetNode = event.target;
      //获取触发事件节点的自定义属性【a:data-categoryName】
      let { categoryname, category1id, category2id, category3id } = targetNode.dataset;
      //判断点击的是a【不管是1|2|3】
      if (categoryname) {
        //点击只要是a,就是往search模块跳转
        var locations = {
          name: 'search',
          query: { categoryName: categoryname }
        }
        //一级分类的a
        if (category1id) {
          locations.query.category1Id = category1id;
        } else if (category2id) {
          //二级分类的a
          locations.query.category2Id = category2id;
        } else {
          //三级分类的a
          locations.query.category3Id = category3id;
        }
        // 判断：如果路由跳转的时候带有params参数 合并params和query参数
        if (this.$route.params.keyword) {
          locations.params = this.$route.params
        }
        this.$router.push(locations);
      }
    },
    // 鼠标经过时是否显示
    isShow() {
      if (this.$route.path != 'home') {
        this.show = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 28px;
            font-size: 14px;
            font-weight: 400px;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;
            cursor: pointer;

            a {
              color: #333;
              text-decoration-line: none;
            }
          }

          .item-list {
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;
                cursor: pointer;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          /*  &:hover {
            .item-list {
              display: block;
            }
          } */
        }

        .cur {
          background-color: skyblue;
        }
      }
    }
  }
}
</style>
