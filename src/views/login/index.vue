<template>
  <div class="login h100 ie-box">
    <div class="login__logo text-center">
      <van-icon class="logo__icon"
        name="gem"
        size="45" />
      <div class="text-weight-600 mt-6">花棠</div>
    </div>
    <div class="login__body d-flex ai-center jc-center pos-relative">
      <div class="body__user h100 d-flex flex-direction-column ai-center pos-absolute z-index-3">
        <van-image class="user__avatar ie-box p-10"
          round
          :src="avatar" />
        <div class="mt-10 text-weight-900 text-14">{{userInfo.nickName}}</div>
        <van-field class="user__name mt-20"
          input-align="center"
          v-model="form.name"
          placeholder="请输入用户名" />

        <div class="user__shortcut mt-20 my-24">
          <van-icon name="wechat"
            size="25" />
        </div>
        <!-- 登录按钮 -->
        <div class="body__sign pos-absolute  px-35 py-10 text-12 text-weight-700">NEXT</div>
      </div>
      <!-- 以下是背景 -->
      <div class="body__back pos-absolute"></div>
      <van-image class="body__prospect pos-absolute"
        :src="require('@/assets/login/prospect.svg')" />
    </div>

    <div class="login__footer pos-relative text-center text-weight-900">
      <div class="footer__back d-flex ai-center jc-center border-circle text-12 pos-absolute">←</div>
      <div class="">SIGN UP</div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {Icon, Image, Button, Field} from 'vant'
@Component({
  components: {
    [Icon.name]: Icon,
    [Image.name]: Image,
    [Button.name]: Button,
    [Field.name]: Field
  }
})
export default class Login extends Vue {
  userInfo = {avatar: '', nickName: '花棠璐璐'}
  form = {name: ''}
  get avatar() {
    return (
      this.userInfo.avatar ||
      'https://static.weixiaotong.com.cn/static/icon/mobilemain/oa_mytask.svg'
    )
  }

  reFindUserInfo() {
    // this.$callApi({api: '', param: {}})
    this.userInfo = {avatar: '', nickName: '花棠璐璐'}
  }
}
</script>

<style lang="scss" scoped>
.login {
  padding-top: 100px;
  background: linear-gradient(#fff 30%, #aaa);
  .logo__icon {
    text-shadow: 0 4px 10px #dbdbdb;
  }
  &__body {
    margin-top: 12vh;
    height: 72vw;
    .body__user {
      top: 0px;
      .user__avatar {
        width: 60px;
        height: 60px;
        background: #f5f5f5;
      }
      .user__name {
        width: 60vw;
        padding-bottom: 4px;
        border-bottom: 1.5px solid #e5e5e5;
        &::after {
          display: none;
        }
      }
    }

    .body__back {
      bottom: 14px;
      width: 70vw;
      height: 100px;
      background: #d4d4d4;
      border-radius: 5px;
      box-shadow: 0 4px 8px #999;
    }
    .body__prospect {
      width: 84vw;
      bottom: 20px;
      position: absolute;
      filter: drop-shadow(2px 2px 4px #bbb);
    }
    .body__sign {
      bottom: 0;
      background: #000;
      border-radius: 30px;
      color: #fff;
      box-shadow: 0 4px 10px #666;
    }
  }
  &__footer {
    margin-top: 15vh;
    line-height: 30px;
    .footer__back {
      left: 12vw;
      width: 30px;
      height: 30px;
      color: #fff;
      background: #000;
    }
  }
}
</style>
