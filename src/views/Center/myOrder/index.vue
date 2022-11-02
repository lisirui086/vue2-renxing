<template>
  <!-- 我的订单 -->
  <div class="order-content">
    <div class="title">
      <h3>我的订单</h3>
    </div>
    <!-- 订单表头 -->
    <div class="chosetype">
      <table>
        <thead>
          <tr>
            <th width="29%">商品</th>
            <th width="31%">订单详情</th>
            <th width="13%">收货人</th>
            <th>金额</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
      </table>
    </div>
    <!-- 订单信息 -->
    <div class="orders">
      <!-- 每一次下单的订单 -->
      <table class="order-item" v-for="(order, index) in myOrder.records" :key="order.id">
        <!-- records 信息 -->
        <thead>
          <tr>
            <th colspan="5">
              <span class="ordertitle">{{ order.createTime }}　订单编号: {{ order.outTradeNo }}
                <span class="pull-right delete">
                  <img src="../images/delete.png">
                </span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- 商品信息 -->
          <tr v-for="(goods, index) in order.orderDetailList" :key="goods.id">
            <td width="60%">
              <div class="typographic">
                <img style="width:82px;heigth:82px" :src="goods.imgUrl">
                <a href="#" class="block-text">{{ goods.skuName }}}</a>
                <span>x{{ goods.skuNum }}</span>
                <a href="#" class="service">售后申请</a>
              </div>
            </td>
            <!-- template不会解析成标签 v-for和f-if尽量避免同时使用 放这个可以少写重复的几行 -->
            <template v-if="index == 0">
              <td :rowspan="order.orderDetailList.length" width="8%" class="center">{{ order.consignee }}</td>
              <td :rowspan="order.orderDetailList.length" width="13%" class="center">
                <ul class="unstyled">
                  <li>总金额¥{{ goods.orderPrice }}</li>
                  <li>{{ goods.orderStatusName }}</li>
                </ul>
              </td>
              <!-- 订单状态 -->
              <td :rowspan="order.orderDetailList.length" width="8%" class="center">
                <a href="#" class="btn">{{ order.orderStatusName }} </a>
              </td>
              <td :rowspan="order.orderDetailList.length" width="13%" class="center">
                <ul class="unstyled">
                  <li>
                    <a href="mycomment.html" target="_blank">评价|晒单</a>
                  </li>

                </ul>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 分页 -->
    <div class="choose-order">
    <!-- 分页 默认展示第一页，每一页展示3条数据，总共有多少数据 -->
      <Pagination :pageNo="page" 
      :pageSize="limit" 
      :total="myOrder.total" 
      :continues="5"
      @getPageNo='getPageNo' />
    </div>

  </div>
</template>

<script>
export default {
  name: 'MyOrder',
  data() {
    return {
      // 第几页 默认第一页
      page: 1,
      // 每一页展示几条
      limit: 3,
      // 接收getMyOrderList获取到的数据对象
      myOrder: {}
    }
  },
  mounted() {
    this.getMyOrderList()
  },
  methods: {
    // 获取我的订单列表
    async getMyOrderList() {
      // 解构参数 
      const { page, limit } = this
      let result = await this.$API.reqMyOrderList(page, limit)
      if (result.code == 200) {
        this.myOrder = result.data
      }
    },
    // 获取点击了第几页的数据 这里传page但是分页器那没有page是因为通过$event获得的
    getPageNo(page) {
      this.page = page
      this.getMyOrderList()
    }
  }
}
</script>

<style lang='less' scoped>
.order-content {
  margin: 0 20px;
  color: #666;

  //标题
  .title {
    margin-bottom: 22px;
    border: 1px solid #ddd;

    h3 {
      padding: 12px 10px;
      font-size: 15px;
      background-color: #f1f1f1;

    }
  }

  //表头
  .chosetype {
    margin-bottom: 15px;
    color: #666;

    table {
      border: 1px solid #e6e6e6;
      border-collapse: separate;
      border-radius: 2px;
      width: 100%;
      max-width: 100%;
      border-spacing: 0;

      th {
        padding: 6px 8px;
        color: #666;
        font-weight: 700;
        vertical-align: bottom;
        background-color: #f4f4f4;
        line-height: 18px;
        border-bottom: 1px solid #e6e6e6;
        font-size: 12px;
        text-align: left;
      }
    }
  }

  // 表单内容
  .orders {
    font-size: 12px;

    a {
      &:hover {
        color: #4cb9fc;
      }
    }

    table {
      border: 1px solid #e6e6e6;
      border-collapse: collapse;
      border-radius: 2px;
      width: 100%;
      margin-bottom: 18px;
      max-width: 100%;

      th {
        padding: 6px 8px;
        line-height: 18px;
        text-align: left;
        vertical-align: bottom;
        background-color: #f4f4f4;
        font-size: 12px;
        color: #666;

        .pull-right {
          float: right;
          cursor: pointer;

          img {
            margin-right: 10px;
            vertical-align: middle;
          }
        }
      }

      td {
        font-size: 12px;
        color: #666;
        padding: 6px 8px;
        line-height: 18px;
        text-align: left;
        vertical-align: middle;
        border: 1px solid #e6e6e6;

        &.center {
          text-align: center;
        }

        .typographic {
          img {
            float: left;
            margin-right: 10px;
          }

          a {
            float: left;
            min-width: 80px;
            max-width: 250px;
            color: #e1251b;

            &.service {
              color: #666;
            }
          }

          span {
            float: left;
            min-width: 80px;
            max-width: 250px;
            text-align: center;
          }

        }
      }

    }
  }

  // 分页
  .choose-order {
    .pagination {
      margin: 38px 0;

      ul {
        font-size: 0;
        display: inline-block;

        li {
          display: inline-block;
          padding: 4px 9px;
          font-size: 14px;
          border: 1px solid #e0e9ee;

          &.prev,
          &.next {
            background-color: #fafafa;
          }

          &.prev {
            border-right-color: #28a3ef;
          }

          &.page {
            border-color: #28a3ef;
            border-left: 0;

            &.actived {
              background-color: #28a3ef;

              a {
                color: #fff;
              }

            }
          }
        }
      }

      div {
        display: inline-block;
        font-size: 14px;
        color: #333;
      }
    }
  }
}
</style>