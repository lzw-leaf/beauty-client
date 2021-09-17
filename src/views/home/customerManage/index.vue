<template>
  <div class="customer-manage fill-height grey lighten-5">
    <div class="manage__filter grey darken-1 px-4 py-3 black-text d-flex align-center">
      <v-text-field class="mt-0 pt-0"
        v-model="searchText"
        background-color="white"
        color="grey darken-1"
        placeholder="请输入客户姓名搜索"
        prepend-inner-icon="search"
        :hide-details="true"
        single-line
        rounded
        clearable
        @focus="isSearchFocus=true"
        @blur="isSearchFocus=false"
        @change="onSearchChange"
        @click:clear="onSearchChange"></v-text-field>
      <div v-show="!isSearchFocus"
        class="ml-2 font-weight-bold white--text"> 筛选</div>
    </div>
    <v-virtual-scroll class="manage__list"
      :bench="1"
      height="calc(100vh - 112px)"
      item-height="154"
      :items="customerList"
      @scroll.native="onListScroll">
      <template #default="{item}">
        <v-card class="list__card mx-4 mt-4"
          flat
          :key="item.id">
          <v-card-title class="d-flex justify-space-between">
            <div class="font-weight-black"> {{item.customerName}}</div>
            <v-btn class="px-0 font-weight-bold"
              text
              color="grey darken-1"
              @click="onDetailClick(item)">
              查看详情
            </v-btn>
          </v-card-title>
          <v-card-text>
            <div class="d-flex justify-space-between">
              <div>
                <span class="font-weight-medium grey-darken-4-text">皮肤检测：</span>{{item.skinCondition.title}}
              </div>
              <div style="width:158px;">
                <span class="font-weight-medium grey-darken-4-text">电话号码：</span>{{item.phoneNum}}
              </div>
            </div>
            <div class="d-flex justify-space-between">
              <div>
                <span class="font-weight-medium grey-darken-4-text">皮肤类型：</span>{{item.skinType.title}}
              </div>
              <div style="width:158px;">
                <span class="font-weight-medium grey-darken-4-text">建档时间：</span>{{item.createTime|formatDate}}
              </div>
            </div>
          </v-card-text>
        </v-card>
      </template>
    </v-virtual-scroll>

    <v-btn class="manage__add"
      color="grey darken-1"
      fab
      absolute
      @click="onPushAddClick">
      <v-icon color="white">add</v-icon>
    </v-btn>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import dayjs from 'dayjs'

interface CustomerInfo {
  id: string
  createTime: string
  phoneNum: string
  skinCondition: {code: string; title: string}
  skinType: {code: string; title: string}
}
@Component({
  filters: {
    formatDate(val: string) {
      return dayjs(val).format('YYYY-MM-DD')
    }
  }
})
export default class CustomerManage extends Vue {
  searchText = ''
  isSearchFocus = false
  customerList: CustomerInfo[] = []
  page = {index: 1, total: 0, size: 10}
  isFinished = false
  isLoading = false
  count = 0

  onSearchChange() {
    this.page.index = 1
    this.customerList = []
    this.reFindCustomerList()
  }

  onListScroll(event: Event) {
    const element = (event.currentTarget || event.target) as Element
    if (
      element &&
      element.scrollHeight - element.scrollTop === element.clientHeight
    ) {
      if (this.isFinished || this.isLoading) return
      this.count++
      this.isLoading = true
      this.isFinished = this.page.index * this.page.size >= this.page.total
      this.page.index++
      this.reFindCustomerList(this.count)
    }
  }

  onPushAddClick() {
    this.$router.push({name: 'createCustomer'})
  }

  onDetailClick(item: CustomerInfo) {
    console.log('跳转详情', item)
    this.$router.push({name: 'detailCustomer', params: {customerId: item.id}})
  }

  async reFindCustomerList(count?: number) {
    try {
      const {list, total} = await this.$callApi({
        api: '/customer/list',
        param: {
          customerName: this.searchText,
          pageIndex: this.page.index,
          pageSize: this.page.size
        }
      })
      console.log('count', count)
      this.customerList = [...this.customerList, ...list]
      this.page.total = total
    } catch (error) {}
    this.isLoading = false
  }

  mounted() {
    this.onSearchChange()
  }
}
</script>

<style lang="scss" scoped>
.customer-manage {
  .manage__list {
    .list__card {
      box-shadow: 0px 0px 2px 0px #e5e5e5 !important;
      .v-card__title {
        padding: 10px 16px;
      }
    }
  }
  .manage__add {
    right: 16px;
    bottom: 32px;
  }
}
</style>
