<template>
  <v-bottom-sheet v-model="visibleSync">
    <v-card class="white pa-4">
      <div class="text-h6 text-center pb-4">新增消费记录</div>
      <v-form class="create__form "
        ref="form">
        <v-card class="mx-auto">
          <v-text-field class="form__cell"
            type="number"
            v-model="form.expense"
            placeholder="请填写"
            solo
            flat
            filled
            hide-details>
            <template #prepend-inner>
              <div class="cell__label font-weight-bold">消费金额：</div>
            </template>
          </v-text-field>
        </v-card>
        <v-card class="mx-auto my-4">
          <v-card-subtitle class="font-weight-bold">购买产品及赠品</v-card-subtitle>
          <v-textarea v-model="form.product"
            placeholder="请输入"
            hide-details
            flat
            solo></v-textarea>
          <v-card-subtitle class="font-weight-bold">售后情况</v-card-subtitle>
          <v-textarea v-model="form.afterSale"
            placeholder="请输入"
            hide-details
            flat
            solo></v-textarea>
        </v-card>
        <v-btn class="form__save mt-4"
          height="40"
          :loading="saving"
          :disabled="saving"
          color="blue accent-3 white--text"
          @click="onSaveClick">
          保存
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>cached</v-icon>
            </span>
          </template>
        </v-btn>
      </v-form>
    </v-card>
  </v-bottom-sheet>
</template>

<script lang="ts">
import {Component, Prop, PropSync, Vue} from 'vue-property-decorator'

@Component
export default class CreateCostDialog extends Vue {
  @PropSync('visible') visibleSync!: boolean
  @Prop({default: ''}) customerId!: string
  form = {expense: 0, product: '', afterSale: ''}
  saving = false
  onSaveClick() {
    this.saving = true
    this.reSaveRecordInfo()
  }

  async reSaveRecordInfo() {
    await this.$callApi({
      api: '/record/save',
      param: {
        afterSale: this.form.afterSale,
        customerId: this.customerId,
        expense: this.form.expense,
        product: this.form.product
      },
      config: {method: 'POST'}
    })
    this.saving = false
    this.$message.success('保存成功！')
  }
}
</script>

<style lang="scss" scoped>
.create__form {
  .form__cell {
    color: #333;
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

  .form__save {
    width: 100%;
  }
}

::v-deep .v-card {
  box-shadow: 0px 0px 10px -2px rgb(0 0 0 / 12%);
}
</style>
