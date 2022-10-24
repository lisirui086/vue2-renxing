<template>
  <div>
    <!-- 全局组件商品分类 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类名称面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <!-- 移除分类名称 -->
              <i @click="removeIcon">×</i>
            </li>
            <!-- 关键字面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="removeKeyWord">×</i>
            </li>
            <!-- 品牌名称面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="removeTrademark">×</i>
            </li>
            <!-- 产品参数面包屑 -->
            <li class="with-x" v-for="(val, index) in searchParams.props" :key="index">
              {{ val.split(":")[1] }}
              <i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @brandinfo="brandinfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changOrder('1')">
                  <!-- 默认高亮综合价格降序 -->
                  <a>综合<span v-show="isOne" class="iconfont" :class="{ 'icon-shengxu': upOrder, 'icon-jiangxu': downOrder }">
                    </span>
                  </a>
                </li>
                <li :class="{ active: isTow }" @click="changOrder('2')">
                  <a>升序<span v-show="isTow" class="iconfont" :class="{ 'icon-shengxu': upOrder, 'icon-jiangxu': downOrder }">
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 展示商品 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(goods, index) in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goods.id}`">
                      <!-- 在路由跳转的时候切记要带商品的id (params参数) -->
                      <img :src="goods.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="goods.title">
                      {{ goods.title }}
                    </a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>{{ goods.id }}</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页 默认展示第一页，每一页展示3条数据，总共有多少数据 -->
          <Pagination :pageNo="searchParams.pageNo" 
          :pageSize="searchParams.pageSize" 
          :total="total" :continues="5" 
          @getPageNo='getPageNo'/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from '@/views/Search/SearchSelector/SearchSelector'
import { mapGetters,mapState } from 'vuex';
export default {
  name: "Search",
  data() {
    return {
      // 产品对应的参数带给服务器的参数
      searchParams: {
        category1Id: "", //一级分类的id
        category2Id: "", //二级分类的id
        category3Id: "", //三级分类的id
        categoryName: "", //商品的名字
        keyword: "", //用户搜索的关键字
        props: [], //商品属性的搜索条件
        trademark: "", //品牌的搜索条件
        order: "1:desc", //排序的参数 【默认初始值:1:desc】 默认综合降序 
        pageNo: 1, //当前分页器的页码  【默认初始值:1】
        pageSize: 3, //代表当前一页显示几条数据 【默认初始值:10】
      },
    };
  },
  components: { SearchSelector },
  // 当组件挂载完毕前执行一次 | 可以在发请求之前将带有的参数进行修改
  // beforeMount 和created都行
  beforeMount() {
    //商品分类搜索条件
    // this.searchParams.category1Id = this.$route.query.category1Id;
    // this.searchParams.category2Id = this.$route.query.category2Id;
    // this.searchParams.category3Id = this.$route.query.category3Id;
    // this.searchParams.categoryName = this.$route.query.categoryName;
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  // 组件挂载完毕执行一次 
  mounted() {
    // 在发请求之前带给服务器参数 searchParams参数发生变化有数值带给服务器
    this.getSearchData()
  },
  computed: {
    // vuex
    ...mapGetters(['goodsList']),
    // 排序的高亮给谁
    isOne() {
      // 1 代表综合 2代表升序 这两个按钮
      return this.searchParams.order.indexOf('1') != -1
    },
    isTow() {
      return this.searchParams.order.indexOf('2') != -1
    },
    // 升序
    upOrder() {
      return this.searchParams.order.indexOf('asc') != -1
    },
    // 降序
    downOrder() {
      return this.searchParams.order.indexOf('desc') != -1
    },
    // mapState
    // total 数居总计
    ...mapState({
      total:state => state.search.searchList.total
    })
  },
  // 函数
  methods: {
    // 向服务器发请求，获取search模块的数据（根据参数不同返回不同数据进行展示）
    // 把这次请求封装成一个函数，当数据改变时页面重新渲染展示
    getSearchData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    // 每次请求后清空部分参数
    // 带给服务器参数说明可有可无的如果属性值为空串，还是会把相应的字段带给服务器
    // 但是你把相应的字段值变为undefind，当前字段不会带给服务器
    // 移除面包屑上得按钮
    removeIcon() {
      this.searchParams.categoryName = "";
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      /* // 再次发请求
      this.getSearchData() */
      // 进行路由跳转 保留params参数
      this.$router.push({ name: 'search', params: this.$route.params })
    },
    // 面包屑上的关键字
    removeKeyWord() {
      // 给服务器带来的参数searchParams的keyword置空
      this.searchParams.keyword = undefined
      /* // 再次发请求
      this.getSearchData() */
      // 搜索框的value值清空
      // 2. $emit 通知兄弟组件Hearder组件 清空关键字 keyword
      this.$bus.$emit('clearVal', this.keyword)
      // 进行路由跳转 保留query参数
      this.$router.push({ name: 'search', query: this.$route.query })
    },
    removeTrademark() {
      // 品牌信息置空
      this.searchParams.trademark = undefined
      // 再次发请求
      this.getSearchData()
    },
    // 移除某一个产品参数的面包屑 通过索引值
    removeAttr(index) {
      this.searchParams.props.splice(index, 1)
      this.getSearchData()
    },
    // 品牌
    brandinfo(trademark) {
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      this.getSearchData()
    },
    // 产品参数子传父
    attrInfo(attr, val) {
      // 整理需要发送的参数 示例: ["2:6.0～6.24英寸:屏幕尺寸"]  ["属性ID:属性值:属性名"]
      let props = `${attr.attrId}:${val}:${attr.attrName}`
      // 追加到data里面 注意判断是否已经存在 已有则不重复追加 
      // 数组去重
      if (this.searchParams.props.indexOf(props) === -1)
        this.searchParams.props.push(props)
      // 再次发送请求
      this.getSearchData()
    },
    // 切换排序的操作
    changOrder(flag) {
      // 默认的是 综合 1
      let originFlag = this.searchParams.order.split(":")[0]
      // 默认是降序 desc 
      let originSort = this.searchParams.order.split(":")[1]
      // 准备存储切换后的数据 1/2 desc/asc的改变 心得order值
      let newOrigin = ''
      // 判断点击的是综合还是价格
      // 是综合的话
      if (flag == originFlag) {
        // 排序取反操作
        newOrigin = `${originFlag}:${originSort == 'desc' ? 'asc' : 'desc'}`
      } else {
        newOrigin = `${flag}:desc`
      }
      // 把新的order值给searchParams
      this.searchParams.order = newOrigin
      // 重新发请求
      this.getSearchData()
    },
    // 自定义事件 获取当前第几页
    getPageNo(pageNo) {
      // 接收点击了哪一页
      this.searchParams.pageNo = pageNo
      // 再次发请求
      this.getSearchData()
    }
  },
  // 侦听
  watch: {
    $route() {

      // 每次请求完毕，应该把相应的1，2，3级分类的id置空，让他接收下次相应的123
      // 分类名和关键字不用清理，因为每次路由发生变化都会赋予新的数据
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      // 再次发送请求
      this.getSearchData()
    }
  }
}
</script>

<style lang='less' scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }



    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

    }

    .hot-sale {
      margin-bottom: 5px;
      border: 1px solid #ddd;

      .title {
        font-weight: 700;
        font-size: 14px;
        line-height: 21px;
        border-bottom: 1px solid #ddd;
        background: #f1f1f1;
        color: #333;
        margin: 0;
        padding: 5px 0 5px 15px;
      }

      .hot-list {
        padding: 15px;

        ul {
          display: flex;

          li {
            width: 25%;
            height: 100%;

            .list-wrap {

              .p-img,
              .price,
              .attr,
              .commit {
                padding-left: 15px;
              }

              .p-img {
                img {
                  max-width: 100%;
                  vertical-align: middle;
                  border: 0;
                }
              }

              .attr {
                width: 85%;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
              }

              .price {
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .commit {
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
              }
            }
          }
        }
      }
    }
  }
}

.toolbar {
  position: fixed;
  z-index: 999;
  width: 300px;
  height: 100%;
  background-color: #7a6e6e;
  transition: right .3s ease-in-out 0s;

  &.toolbar-out {
    top: 0px;
    right: 0px;
  }

  &.toolbar-wrap {
    top: 0px;
    right: -294px;
  }

  .content {
    position: relative;
    left: 6px;
    width: 294px;
    background-color: bisque;
    height: 100%;
    z-index: 99;
  }

  .but {
    position: relative;
    width: 35px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    margin-bottom: 1px;
    cursor: pointer;
    background-color: #7a6e6e;
    border-radius: 3px 0 0 3px;
    position: absolute;
    top: 0;
    /*right: -6px;*/
    left: -29px;

    &.list {
      background-image: url(./images/list.png);
      background-repeat: no-repeat;
      background-size: cover;
    }

    &.pull-wrap {
      background-image: url(./images/cross.png);
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  .toolist {
    position: absolute;
    top: 50%;
    left: -29px;
    width: 35px;
    margin-top: -80px;

    /*background-color: cadetblue;*/
    .pull {
      position: relative;
      width: 35px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      margin-bottom: 1px;
      cursor: pointer;
      background-color: #7a6e6e;
      border-radius: 3px 0 0 3px;
      z-index: 66;

      .vip {
        background-image: url(./images/toolbars.png);
        background-position: -88px -175px;
      }

      .cart {
        background-image: url(./images/toolbars.png);
        background-position: -50px 0;
      }

      .follow {
        background-image: url(./images/toolbars.png);
        background-position: -50px -50px;
      }

      .history {
        background-image: url(./images/toolbars.png);
        background-position: -50px -100px;
      }

      .message {
        background-image: url(./images/toolbars.png);
        background-position: -190px -150px;
      }

      .jimi {
        background-image: url(./images/toolbars.png);
        background-position: -50px -150px;
      }

      .top {
        background-image: url(./images/toolbars.png);
        background-position: -50px -250px;
      }

      .tab-text {
        width: 62px;
        height: 35px;
        line-height: 35px;
        color: #fff;
        text-align: center;
        font-family: 微软雅黑;
        position: absolute;
        /*position: relative;*/
        z-index: 1;
        left: 35px;
        top: 0;
        background-color: #7a6e6e;
        border-radius: 3px 0 0 3px;
        font-style: normal;
        -webkit-transition: left .3s ease-in-out .1s;
        transition: left .3s ease-in-out .1s;
      }

      .tab-ico {
        display: inline-block;
        position: relative;
        /*background-image: url(img/toolbars.png);*/
        background-color: #7a6e6e;
        border-radius: 3px 0 0 3px;
        z-index: 2;
        width: 35px;
        height: 35px;
      }
    }
  }

  &>.pull {
    position: relative;
    width: 35px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    margin-bottom: 1px;
    cursor: pointer;
    background-color: #7a6e6e;
    border-radius: 3px 0 0 3px;
    z-index: 66;

    .tab-ico {
      display: inline-block;
      position: relative;
      /*background-image: url(img/toolbars.png);*/
      background-color: #7a6e6e;
      border-radius: 3px 0 0 3px;
      z-index: 2;
      width: 35px;
      height: 35px;
    }

    .top {
      background-image: url(./images/toolbars.png);
      background-position: -50px -250px;
    }

    .tab-text {
      width: 62px;
      height: 35px;
      line-height: 35px;
      color: #fff;
      text-align: center;
      font-family: 微软雅黑;
      position: absolute;
      /*position: relative;*/
      z-index: 1;
      left: 35px;
      top: 0;
      background-color: #7a6e6e;
      border-radius: 3px 0 0 3px;
      font-style: normal;
      -webkit-transition: left .3s ease-in-out .1s;
      transition: left .3s ease-in-out .1s;
    }
  }

  &>.back {
    position: absolute;
    bottom: 0;
    /*right: -6px;*/
    left: -29px;
    display: inline-block;
    background-image: url(./images/toolbars.png);

  }
}
</style>
