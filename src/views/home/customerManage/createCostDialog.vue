<template>
  <v-bottom-sheet v-model="visibleSync">
    <v-card class="white pa-4">
      <v-btn v-if="isEdit"
        class="create__del"
        text
        color="red"
        @click="onDelRecordClick">
        删除
      </v-btn>
      <div class="text-h6 text-center pb-4">{{isEdit?'修改':'新增'}}消费记录</div>
      <v-form class="create__form "
        ref="form">
        <v-card class="form__card mx-auto">
          <v-text-field class="form__cell"
            type="number"
            pattern="[0-9]*"
            v-model="form.charge"
            placeholder="请填写"
            solo
            flat
            filled
            hide-details>
            <template #prepend-inner>
              <div class="font-weight-bold">充值金额：</div>
            </template>
            <template #append>
              <div class="font-weight-bold">元</div>
            </template>
          </v-text-field>
          <v-text-field class="form__cell"
            type="number"
            pattern="[0-9]*"
            v-model="form.consume"
            placeholder="请填写"
            solo
            flat
            filled
            hide-details>
            <template #prepend-inner>
              <div class="font-weight-bold">消费金额：</div>
            </template>
            <template #append>
              <div class="font-weight-bold">元</div>
            </template>
          </v-text-field>
        </v-card>
        <v-card class="form__card mx-auto my-4">
          <v-card-subtitle class="font-weight-bold">购买产品及赠品</v-card-subtitle>
          <v-textarea v-model="form.product"
            placeholder="请输入"
            rows="2"
            hide-details
            dense
            flat
            solo></v-textarea>
          <v-card-subtitle class="font-weight-bold">售后情况</v-card-subtitle>
          <v-textarea v-model="form.afterSale"
            placeholder="请输入"
            rows="2"
            hide-details
            dense
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
import {Component, Prop, PropSync, Vue, Watch} from 'vue-property-decorator'
interface RecordInfo {
  id?: string
  color?: string
  charge: number
  consume: number
  product: string
  afterSale: string
}
@Component
export default class CreateCostDialog extends Vue {
  @PropSync('visible') visibleSync!: boolean
  @Prop({default: ''}) customerId!: string
  @Prop({default: () => ({})}) recordInfo!: RecordInfo
  form: RecordInfo = {id: '', charge: 0, consume: 0, product: '', afterSale: ''}
  saving = false

  get isEdit() {
    return !!Object.keys(this.recordInfo).length
  }

  async onDelRecordClick() {
    const flag = await this.$confirm('确认删除该条记录？', {
      title: '操作',
      buttonTrueText: '确定',
      buttonTrueColor: 'red',
      buttonFalseText: '取消',
      color: 'red'
    })
    flag && this.reDelRecordInfo()
  }

  onSaveClick() {
    this.saving = true
    const flag = Object.keys(this.form).some(
      key => this.form[key as keyof RecordInfo]
    )
    flag
      ? this.reSaveRecordInfo()
      : this.$message.warning('至少填一项服务内容！') && (this.saving = false)
  }
  async reDelRecordInfo() {
    await this.$callApi({
      api: '/record/delete',
      param: {recordId: this.form.id},
      config: {method: 'DELETE'}
    })
    this.$message.success('记录删除成功！')
    this.visibleSync = false
    this.$emit('operate')
  }
  async reSaveRecordInfo() {
    await this.$callApi({
      api: '/record/save',
      param: {customerId: this.customerId, ...this.form},
      config: {method: 'POST'}
    })
    this.saving = false
    this.$message.success('保存成功！')
    this.visibleSync = false
    this.$emit('operate')
  }

  @Watch('visible', {immediate: true})
  onVisibleSyncChange(value: boolean) {
    value && (this.form = this.recordInfo)
  }
}
</script>

<style lang="scss" scoped>
.create__del {
  position: absolute;
  top: 20px;
  right: 16px;
}
.create__form {
  .form__card {
    box-shadow: 0px 0px 10px -2px rgb(0 0 0 / 12%);
  }
  .form__cell {
    color: #333;
    &.primary--text {
      color: #333 !important;
    }

    ::v-deep {
      .v-input__slot {
        padding: 0 16px;
        position: relative;
        border: none;
        box-shadow: none;

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
</style>
