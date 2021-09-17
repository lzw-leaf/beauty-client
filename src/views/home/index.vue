<template>
  <div class="home fill-height">
    <v-main class="home__main fill-height">
      <router-view></router-view>
    </v-main>
    <v-bottom-navigation class="home__bar"
      v-model="currentTab"
      background-color="deep-purple"
      dark
      shift
      app
      grow
      @change="onTabChange">
      <v-btn v-for="tab of tabList"
        :key="tab.value"
        :value="tab.value">
        <span>{{tab.label}}</span>
        <v-icon>{{tab.icon}}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component({
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.name !== 'home') {
        ;(vm as Home).currentTab = to.name!
      }
    })
  }
})
export default class Home extends Vue {
  currentTab = 'customerManage'
  tabList = [
    {
      label: '统计',
      icon: 'assessment',
      value: 'statistics'
    },
    {
      label: '客户管理',
      icon: 'people',
      value: 'customerManage'
    },
    {
      label: '消费管理',
      icon: 'credit_card',
      value: 'costManage'
    }
  ]

  // get currentTabColor() {
  //   const tabInfo = this.tabList.find(item => item.value === this.currentTab)
  //   return tabInfo ? tabInfo.bgColor : 'light-blue'
  // }
  onTabChange() {
    this.$router.push({name: this.currentTab})
  }
}
</script>

<style lang="scss" scoped>
.home {
  &__bar {
    // bottom: constant(safe-area-inset-bottom);
    // bottom: env(safe-area-inset-bottom);
  }
}
</style>

