<template>
  <div class="detail fill-height">
    <v-img class="detail__banner"
      max-width="100%"
      height="40vh"
      src="~@/assets/home/banner.webp"></v-img>
    <v-menu bottom
      left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="detail__edit"
          large
          absolute
          icon
          v-bind="attrs"
          v-on="on">
          <v-icon>more_horiz</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="onPushEditClick">
          <v-list-item-title class="blue--text text--darken-1 font-weight-bold">修改资料</v-list-item-title>
        </v-list-item>
        <v-list-item @click="onDelCustomerClick">
          <v-list-item-title class="red--text font-weight-bold">删除</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

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
        <v-tabs class="mt-2"
          fixed-tabs
          v-model="currentTab"
          centered>
          <v-tab v-for="tab of tabList"
            :key="tab.value"
            :href="'#'+tab.value">{{tab.label}}</v-tab>
        </v-tabs>
        <v-tabs-items class="tabs__item"
          mandatory
          v-model="currentTab">
          <v-tab-item class="fill-height"
            value="base">
            <v-card class="tab__card mt-6 mx-auto pa-4 mt-8"
              width="90vw">
              <div class="d-flex align-center">
                <div class="cell__label grey--text text--darken-2">账户余额：</div>
                <div class="flex-grow-1 black-text font-weight-bold pl-2">{{customerInfo.balance||0}} 元</div>
              </div>
            </v-card>
            <v-card class="tab__card mx-auto pa-4 my-6"
              width="90vw">
              <div class="card__cell d-flex align-center pb-3">
                <div class="grey--text text--darken-2 cell__label">电话：</div>
                <div class="flex-grow-1 black-text font-weight-bold pl-2 flex-wrap">{{customerInfo.phoneNum}}</div>
                <a :href="`tel:${customerInfo.phoneNum}`"
                  style="text-decoration: none;">
                  <v-icon class="blue--text">call</v-icon>
                </a>
              </div>
              <div class="d-flex align-center pt-3">
                <div class="cell__label grey--text text--darken-2 text-subtitle-1">住址：</div>
                <div class="flex-grow-1 black-text pl-2">{{customerInfo.address}}</div>
              </div>
            </v-card>
            <v-card class="tab__card mx-auto pa-4"
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
          <v-tab-item class="fill-height"
            value="other">
            <v-card class="tab__card  mx-auto pa-4 mt-8"
              width="90vw">
              <div class="card__cell d-flex align-center pb-3">
                <div class="cell__label grey--text text--darken-2">生日：</div>
                <div class="flex-grow-1 black-text font-weight-bold">{{customerInfo.birthDay}}</div>
              </div>
              <div class="d-flex align-center pt-3">
                <div class="cell__label grey--text text--darken-2 text-subtitle-1">职业：</div>
                <div class="flex-grow-1 black-text font-weight-bold ">{{customerInfo.occupation}}</div>
              </div>
            </v-card>
            <v-card class="tab__card mt-6 mx-auto pa-4"
              width="90vw">
              <div class="grey--text text--darken-2">过去使用品牌</div>
              <div class="flex-grow-1 black-text mt-2">{{customerInfo.previousProduct}}</div>
            </v-card>
            <v-card class="tab__card mt-6 mx-auto pa-4"
              width="90vw">
              <div class="grey--text text--darken-2">皮肤描述</div>
              <div class="flex-grow-1 black-text mt-2">{{customerInfo.skinDescription}}</div>
            </v-card>
          </v-tab-item>
          <v-tab-item class="fill-height"
            value="cost">
            <v-timeline class="pr-3"
              dense>
              <v-timeline-item class="mb-4"
                v-for="record of recordList"
                :key="record.id"
                :color="record.color"
                small>
                <div class="mb-2 d-flex justify-space-between align-center"
                  style="margin-left:-10px;padding-right:10px;">
                  <span class="grey--text text--darken-2 text-subtitle-1 font-weight-bold">{{record.createTime}}</span>
                  <span class="blue--text text-body-2 font-weight-bold"
                    @click="onShowAddClick(record)">编辑</span>
                </div>
                <v-card class="pa-2"
                  style="margin-left:-10px; box-shadow: 0px 0px 2px 0px #e5e5e5;">
                  <div v-for="(item,index) of recordItemList"
                    v-show="record[item.key]"
                    :key="index"><span class="grey--text text--darken-3 font-weight-bold">{{item.label}}: </span>{{record[item.key]}}
                    <span v-if="['discount'].includes(item.key)">折</span>
                    <span v-else-if="['consume','charge'].includes(item.key)">元</span>
                  </div>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </v-tab-item>
        </v-tabs-items>
        <v-btn v-show="currentTab==='cost'"
          class="cost__add"
          color="blue accent-3"
          fab
          absolute
          @click="onShowAddClick()">
          <v-icon color="white">add</v-icon>
        </v-btn>
      </div>
    </div>
    <create-cost-dialog :visible.sync="costDialogVisible"
      :customerId="$route.params.customerId"
      :recordInfo="currentRecordInfo"
      @operate="reFindRecordList"></create-cost-dialog>
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
  id?: string
  color?: string
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
  currentTab = 'base'
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
  recordItemList = [
    {label: '消费金额', key: 'consume'},
    {label: '产品折扣', key: 'discount'},
    {label: '余额', key: 'balance'},
    {label: '消费产品及项目', key: 'product'},
    {label: '售后情况', key: 'afterSale'}
  ]
  currentRecordInfo: RecordInfo = {}
  page = {index: 1, total: 0, size: 30}
  costDialogVisible = false

  get surname() {
    return this.customerInfo.customerName.slice(0, 1)
  }
  onPushEditClick() {
    sessionStorage.setItem(
      'editCustomerInfo',
      JSON.stringify(this.customerInfo)
    )
    this.$router.push({name: 'createCustomer', query: {edit: '1'}})
  }

  async onDelCustomerClick() {
    const flag = await this.$confirm('确认删除该客户？', {
      title: '操作',
      buttonTrueText: '确定',
      buttonTrueColor: 'red',
      buttonFalseText: '取消',
      color: 'red'
    })
    console.log('删除判断', flag)

    // flag && this.reDelCustomerInfo()
  }

  onShowAddClick(record?: RecordInfo) {
    this.currentRecordInfo = record || {}
    this.costDialogVisible = true
  }

  async reDelCustomerInfo() {
    await this.$callApi({
      api: '/customer/delete',
      param: {customerId: this.$route.params.customerId},
      config: {method: 'DELETE'}
    })
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
    this.recordList = (list as RecordInfo[]).map((item, index) => {
      item.color = this.colorList[index % (this.colorList.length - 1)]
      return item
    })
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
  position: relative;
  .detail__edit {
    z-index: 3;
    right: 8px;
    top: 8px;
  }
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
        overflow: hidden;
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
          width: 82px;
          // text-align: right;
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
