<template>
  <div class="create fill-height px-4 pt-4">
    <v-form class="create__form"
      ref="form">
      <v-card class="mx-auto">
        <v-card-subtitle>基础信息</v-card-subtitle>
        <v-text-field class="form__cell"
          v-model="form.customerName"
          solo
          flat
          filled
          hide-details
          placeholder="请填写"
          :rules="requiredRules"
          required>
          <template #prepend-inner>
            <div class="cell__label font-weight-bold">姓名：</div>
          </template>
        </v-text-field>
        <div class="form__sex d-flex pa-4 justify-space-between">
          <div class="cell__label font-weight-bold">性别：</div>
          <v-btn-toggle v-model="form.gender"
            active-class="white--text grey darken-1"
            background-color="white"
            color="grey"
            rounded
            borderless
            mandatory>
            <v-btn small>男</v-btn>
            <v-btn small>女</v-btn>
          </v-btn-toggle>
        </div>
        <v-text-field class="form__cell"
          type="number"
          v-model="form.age"
          placeholder="请填写"
          pattern="[0-9]*"
          solo
          flat
          filled
          hide-details>
          <template #prepend-inner>
            <div class="cell__label font-weight-bold">年龄：</div>
          </template>
        </v-text-field>
        <v-text-field class="form__cell"
          type="number"
          v-model="form.phoneNum"
          placeholder="请填写"
          pattern="[0-9]*"
          solo
          flat
          filled
          hide-details
          :rules="requiredRules"
          required>
          <template #prepend-inner>
            <div class="cell__label font-weight-bold">电话：</div>
          </template>
        </v-text-field>
      </v-card>
      <v-card class="mx-auto my-4">
        <v-card-subtitle>皮肤信息</v-card-subtitle>

        <v-overflow-btn v-model="form.skinType"
          class="my-2 form__cell"
          :items="skinTypeList"
          placeholder="请选择"
          item-text="title"
          item-value="title"
          solo
          hide-details
          flat
          filled>
          <template #prepend-inner>
            <div class="cell__label font-weight-bold ">皮肤类型：</div>
          </template>
        </v-overflow-btn>
        <v-select class="form__cell skin-state"
          v-model="form.skinConditions"
          :items="skinStateList"
          item-text="title"
          item-value="title"
          placeholder="请选择"
          chips
          multiple
          solo
          hide-details
          flat
          filled>
          <template #prepend-inner>
            <div class="cell__label font-weight-bold ">皮肤状态：</div>
          </template>
        </v-select>
      </v-card>
      <v-card class="mx-auto my-4">
        <v-card-subtitle>其他信息</v-card-subtitle>
        <v-menu v-model="isShowDate"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field class="form__cell"
              v-model="form.birthDay"
              solo
              flat
              filled
              hide-details
              readonly
              placeholder="请选择"
              v-bind="attrs"
              v-on="on">
              <template #prepend-inner>
                <div class="cell__label font-weight-bold">生日：</div>
              </template>
            </v-text-field>
          </template>
          <v-date-picker v-model="form.birthDay"
            no-title
            color="grey darken-1"
            :day-format="formatDay"
            @input="isShowDate = false"></v-date-picker>
        </v-menu>
        <v-text-field class="form__cell"
          v-model="form.occupation"
          solo
          flat
          filled
          hide-details
          placeholder="请填写">
          <template #prepend-inner>
            <div class="cell__label font-weight-bold">职业：</div>
          </template>
        </v-text-field>
        <v-text-field class="form__cell"
          v-model="form.address"
          solo
          flat
          filled
          hide-details
          placeholder="请填写">
          <template #prepend-inner>
            <div class="cell__label font-weight-bold">住址：</div>
          </template>
        </v-text-field>
        <v-text-field class="form__cell"
          v-model="form.previousProduct"
          solo
          flat
          filled
          hide-details
          placeholder="请填写">
          <template #prepend-inner>
            <div class="cell__label font-weight-bold">过去使用品牌：</div>
          </template>
        </v-text-field>
        <v-menu v-model="isShowCreateTimeDate"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field class="form__cell"
              v-model="form.createTime"
              solo
              flat
              filled
              hide-details
              readonly
              placeholder="请选择"
              v-bind="attrs"
              v-on="on">
              <template #prepend-inner>
                <div class="cell__label font-weight-bold">建档时间：</div>
              </template>
            </v-text-field>
          </template>
          <v-date-picker v-model="form.createTime"
            no-title
            color="grey darken-1"
            :day-format="formatDay"
            @input="isShowCreateTimeDate = false"></v-date-picker>
        </v-menu>
      </v-card>
      <v-card class="mx-auto my-4">
        <v-card-subtitle>皮肤描述</v-card-subtitle>
        <v-textarea v-model="form.skinDescription"
          placeholder="请输入"
          hide-details
          flat
          solo></v-textarea>
      </v-card>
      <v-btn class="form__save"
        height="40"
        :loading="saving"
        :disabled="saving"
        color="grey darken-1 white--text"
        fixed
        @click="onSaveClick">
        保存
        <template v-slot:loader>
          <span class="custom-loader">
            <v-icon light>cached</v-icon>
          </span>
        </template>
      </v-btn>
    </v-form>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class CreateCustomer extends Vue {
  form = {
    customerName: '',
    phoneNum: '',
    age: '',
    address: '',
    gender: 1,
    skinType: '',
    skinConditions: [],
    skinDescription: '',
    birthDay: '',
    createTime: ''
  }
  isShowDate = false
  isShowCreateTimeDate = false
  requiredRules = [(v: any) => !!v]
  skinTypeList = []
  skinStateList = []
  saving = false
  onSaveClick() {
    this.saving = true
    console.log('保存')
    if (this.form.createTime) {
      this.form.createTime = dayjs(this.form.createTime).format(
        'YYYY-MM-DD HH:mm:ss'
      )
    }
    this.reSaveCustomerInfo()
  }

  formatDay(date: string) {
    return dayjs(date).format('D')
  }

  async reFindSkinInfoList() {
    const {skinConditionList, skinTypeList} = await this.$callApi({
      api: '/customer/skin'
    })
    this.skinTypeList = skinTypeList
    this.skinStateList = skinConditionList
  }

  async reSaveCustomerInfo() {
    await this.$callApi({
      api: '/customer/save',
      param: this.form,
      config: {method: 'POST'}
    })
    this.saving = false
    this.$message.success('保存成功！')
    this.$router.go(-1)
  }

  async initData() {
    await this.reFindSkinInfoList()
    if (this.$route.query.edit) {
      const infoJson = sessionStorage.getItem('editCustomerInfo')
      const info = JSON.parse(infoJson!)
      info && (this.form = info)
    }
  }

  mounted() {
    this.initData()
  }

  destroyed() {
    this.$route.query.edit && sessionStorage.removeItem('editCustomerInfo')
  }
}
</script>

<style lang="scss" scoped>
.create {
  position: relative;
  padding-bottom: 60px;
  .create__form {
    .form__cell {
      color: #333;
      &.skin-state {
        ::v-deep {
          .v-select__selections {
            justify-content: flex-end;
            input {
              display: none;
            }
          }
        }
      }
      &.primary--text {
        color: #333 !important;
      }

      .cell__label {
        white-space: nowrap;
      }

      ::v-deep {
        .v-input__slot {
          padding: 0 16px;
          position: relative;
          border: none;
          box-shadow: none;
          &[role='combobox'] {
            padding-right: 0;
            .v-select__selection {
              order: 2;
            }
            input {
              order: 1;
            }
          }
          &::before {
            border-color: #e5e5e5 !important;
            content: '';
            display: block;
            position: absolute;
            width: calc(100% - 24px);
            margin: 0 12px;
            bottom: 0;
            box-sizing: border-box;
          }
          &::after {
            display: none;
          }
          input {
            text-align: right;
          }
        }
      }
    }
    .form__sex {
      position: relative;
      &::after {
        content: '';
        position: absolute;
        left: 12px;
        bottom: 0;
        width: calc(100% - 24px);
        border-color: #e5e5e5;
        border-style: solid;
        border-width: thin 0 0 0;
      }
    }
    .form__save {
      width: calc(100% - 32px);
      bottom: 16px;
    }
  }

  ::v-deep .v-card {
    box-shadow: 0px 0px 10px -2px rgb(0 0 0 / 12%);
  }
}
</style>
