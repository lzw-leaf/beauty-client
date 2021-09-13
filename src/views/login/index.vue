<template>
  <div class="login white h100">
    <v-img class="login__banner"
      position="center bottom"
      max-height="50vh"
      src="/img/prospect.svg">
    </v-img>
    <div class="login__slogan white--text text-h4 font-weight-bold">Welcome Back</div>
    <v-form ref="loginForm"
      class="login__form px-10  font-weight-bold"
      v-model="formValid">
      <v-text-field class="pt-0"
        v-model="form.username"
        color="pink lighten-2"
        height="3.4rem"
        :rules="userNameRules"
        label="Username"
        required></v-text-field>
      <v-text-field class="pt-0"
        color="pink lighten-2"
        v-model="form.password"
        height="3.4rem"
        :rules="passwordRules"
        type="password"
        label="Password"
        required
        @keydown.enter="onSignClick"></v-text-field>
    </v-form>
    <div class="login__active font-weight-black px-10 mt-2 text-h5 d-flex align-center justify-space-between">
      <span>Sign in</span>
      <v-btn class="active__button"
        color="rgb(164 96 149)"
        elevation="2"
        fab
        x-large
        @click="onSignClick">
        <v-icon color="#fff">east</v-icon>
      </v-btn>
    </div>

    <div class="login__footer px-10 font-weight-black d-flex justify-space-between">
      <span class="text-decoration-underline">Sign up</span>
      <span class="text-decoration-underline">Forget Password</span>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Ref, Vue} from 'vue-property-decorator'
@Component
export default class Login extends Vue {
  @Ref('loginForm') loginFormRef!: any
  form = {username: '', password: ''}
  formValid = false
  userNameRules = [v => !!v || 'username is required'] as ((
    v: string
  ) => boolean)[]
  passwordRules = [v => !!v || 'password is required'] as ((
    v: string
  ) => boolean)[]

  async onSignClick() {
    const isValid = this.loginFormRef.validate()
    isValid && this.reLogin()
  }

  async reLogin() {
    // await this.$callApi({api: '', param: {}})
    if (this.form.username !== 'lulu' || this.form.password !== 'll123456') {
      return this.$message.error('用户或密码错误')
    }
    sessionStorage.setItem('ht_id', 'll123456')
    this.$router.push({name: 'home'})
  }
}
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  &__slogan {
    position: absolute;
    width: 10rem;
    line-height: 3rem;
    top: 15vh;
    left: 3rem;
  }
  &__form {
    ::v-deep .v-input .v-label {
      color: #999;
    }
  }
  &__active {
    font-family: 'Poppins';
    .active__button {
      width: 90px;
      height: 90px;
    }
  }
  &__footer {
    width: 100%;
    margin-top: 10vh;
  }
}
</style>
