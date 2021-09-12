<template>
  <div class="detail fill-height">
    <v-img class="detail__banner"
      max-width="100%"
      height="40vh"
      src="~@/assets/home/banner.webp"></v-img>
    <v-avatar class="detail__avatar text-h5"
      color="primary white--text font-weight-bold"
      size="64">
      {{surname}}
    </v-avatar>
    <div class="detail__body rounded-t-xl white d-flex flex-column align-center">
      <div class="body__name text-h5 mt-1 font-weight-bold">{{customerInfo.customerName}}</div>
      <div class="body__other d-flex text-center mt-2 text-caption">
        <template v-if="customerInfo.gender">
          <div class="other__gender rounded-pill white--text pink">女</div>
          <div class="other__age ml-1 rounded-pill white--text pink">{{customerInfo.age}}岁</div>
        </template>
        <template>
          <div class="other__gender rounded-pill white--text light-blue">男</div>
          <div class="other__age ml-1 rounded-pill white--text light-blue">{{customerInfo.age}}岁</div>
        </template>
      </div>
      <div class="body__tabs flex-grow-1">
        <v-tabs class="mt-2 mb-8"
          fixed-tabs
          v-model="currentTab"
          centered>
          <v-tab v-for="tab of tabList"
            :key="tab.value"
            :href="'#'+tab.value">{{tab.label}}</v-tab>
        </v-tabs>
        <v-tabs-items class="tabs__item"
          v-model="currentTab">
          <v-tab-item value="base">
            <v-card class="tab__card mx-auto pa-4"
              width="90vw">
              <div class="card__cell d-flex align-center pb-3">
                <div class="grey--text text--darken-2 cell__label">电话：</div>
                <div class="flex-grow-1 black-text font-weight-bold pl-2 flex-wrap">{{customerInfo.phoneNum}}</div>
                <v-icon class="blue--text">call</v-icon>
              </div>
              <div class="d-flex align-center pt-3">
                <div class="cell__label grey--text text--darken-2 text-subtitle-1">住址：</div>
                <div class="flex-grow-1 black-text pl-2">{{customerInfo.address}}</div>
              </div>
            </v-card>
            <v-card class="tab__card mt-6 mx-auto pa-4"
              width="90vw">
              <div class="card__cell d-flex align-center pb-3">
                <div class="cell__label grey--text text--darken-2">皮肤类型：</div>
                <div class="flex-grow-1 black-text font-weight-bold pl-2">{{customerInfo.skinType.title}}</div>
              </div>
              <div class="d-flex align-center pt-3">
                <div class="cell__label grey--text text--darken-2 text-subtitle-1">皮肤状态：</div>
                <div class="flex-grow-1 black-text font-weight-bold  pl-2">{{customerInfo.skinCondition.title}}</div>
              </div>
            </v-card>
          </v-tab-item>
          <v-tab-item value="other">
            <v-card class="tab__card  mx-auto pa-4"
              width="90vw">
              <div class="card__cell d-flex align-center pb-3">
                <div class="cell__label grey--text text--darken-2">生日：</div>
                <div class="flex-grow-1 black-text font-weight-bold pl-2">{{customerInfo.birthDay}}</div>
              </div>
              <div class="d-flex align-center pt-3">
                <div class="cell__label grey--text text--darken-2 text-subtitle-1">职业：</div>
                <div class="flex-grow-1 black-text font-weight-bold  pl-2">{{customerInfo.occupation}}</div>
              </div>
            </v-card>
            <v-card class="tab__card mt-6 mx-auto pa-4"
              width="90vw">
              <div class="d-flex">
                <div class="grey--text text--darken-2">过去使用品牌：</div>
                <div class="flex-grow-1 black-text font-weight-bold pl-2">{{customerInfo.previousProduct}}</div>
              </div>
            </v-card>
            <v-card class="tab__card mt-6 mx-auto pa-4"
              width="90vw">
              <div>
                <div class="grey--text text--darken-2">皮肤描述：</div>
                <div class="flex-grow-1 black-text mt-2">{{customerInfo.skinDescription}}</div>
              </div>
            </v-card>
          </v-tab-item>
          <v-tab-item value="cost">
            <v-timeline class="pr-2"
              dense>
              <v-timeline-item class="mb-4"
                v-for="record of recordList"
                :key="record.id"
                :color="record.color"
                small>
                <div class="grey--text text--darken-2 text-h6 mb-2">{{record.createTime}}</div>
                <v-card class="pa-2 ">
                  <div><span class="grey--text text--darken-3 font-weight-bold">消费金额: </span>{{record.expense}}</div>
                  <div><span class="grey--text text--darken-3 font-weight-bold">购买产品及赠品: </span>{{record.product}}</div>
                  <div><span class="grey--text text--darken-3 font-weight-bold">售后情况: </span>{{record.afterSale}}</div>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </v-tab-item>
        </v-tabs-items>
        <v-btn class="cost__add"
          color="blue accent-3"
          fab
          absolute
          @click="onShowAddClick">
          <v-icon color="white">add</v-icon>
        </v-btn>
      </div>
    </div>
    <create-cost-dialog :visible.sync="costDialogVisible"
      :customerId="$route.params.customerId"></create-cost-dialog>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
interface CustomerInfo {
  id: string
  avatar: string
  customerName: string
  skinType: {title: string}
  skinCondition: {title: string}
}

interface RecordInfo {
  id: string
  color: string
}
@Component({
  components: {createCostDialog: () => import('./createCostDialog.vue')}
})
export default class CustomerDetail extends Vue {
  customerInfo: CustomerInfo = {
    id: '',
    avatar: '',
    customerName: '',
    skinType: {title: ''},
    skinCondition: {title: ''}
  }
  tabList = [
    {value: 'base', label: '基础信息'},
    {value: 'other', label: '其他信息'},
    {value: 'cost', label: '消费记录'}
  ]
  currentTab = 'cost'
  colorList = [
    'red',
    'brown',
    'purple',
    'pink',
    'blue',
    'yellow',
    'orange',
    'light-blue',
    'teal'
  ]
  recordList: RecordInfo[] = []
  page = {index: 1, total: 0, size: 30}
  costDialogVisible = false

  get surname() {
    return this.customerInfo.customerName.slice(0, 1)
  }

  onShowAddClick() {
    this.costDialogVisible = true
  }

  async reFindRecordList() {
    const {list, total} = await this.$callApi({
      api: '/record/list',
      param: {
        pageIndex: this.page.index,
        pageSize: this.page.size,
        customerId: this.$route.params.customerId
      }
    })
    let tempList = []
    tempList = [...list, ...list]
    tempList = JSON.parse(JSON.stringify([...tempList, ...tempList]))
    tempList = (tempList as RecordInfo[]).map((item, index) => {
      console.log('看看', index % (this.colorList.length - 1))
      item.id = index + item.id
      item.color = this.colorList[index % (this.colorList.length - 1)]
      return item
    })
    this.recordList = tempList
    this.page.total = total
  }
  async reFindCustomerDetail() {
    this.customerInfo = await this.$callApi({
      api: '/customer/detail',
      param: {customerId: this.$route.params.customerId}
    })
  }

  mounted() {
    this.reFindCustomerDetail()
    this.reFindRecordList()
  }
}
</script>

<style lang="scss" scoped>
.detail {
  .detail__avatar {
    // margin-top: -32px;
    position: absolute;
    z-index: 2;
    top: calc(30vh - 32px);
    left: calc(50% - 32px);
  }
  &__body {
    padding-top: 32px;
    width: 100%;
    position: absolute;
    top: 30vh;
    height: calc(100% - 30vh);
    overflow: hidden;
    .other__gender {
      width: 40px;
    }
    .other__age {
      width: 50px;
    }
    .body__tabs {
      width: 100%;
      overflow: hidden;
      position: relative;
      .tabs__item {
        height: calc(100% - 56px);
        ::v-deep .v-window__container {
          height: 100%;
          overflow: auto;
        }
        .tab__card {
          box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(229, 229, 229, 0.4);
        }
        .card__cell {
          border-bottom: 1px solid rgba(229, 229, 229, 0.75);
        }
        .cell__label {
          width: 81px;
          text-align: right;
        }
      }

      .cost__add {
        bottom: 30px;
        right: 30px;
      }
    }
  }
}
</style>
