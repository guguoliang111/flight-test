<template>
  <el-form class="search-form" :inline="true" size="mini" :model="search" >
    <el-form-item :label="item.label" v-for="(item, index) in items" :key="index">
      <template v-if="item.type === 'input'">
        <el-input v-model="search[item.value]" :placeholder="item.placeholder" clearable></el-input>
      </template>
      <template v-else-if="item.type === 'select'">
        <el-select v-model="search[item.value]" clearable :placeholder="item.placeholder" :filterable="item.filterable" :loading="item.loading"
          @focus="$listeners.selectFocus && $listeners.selectFocus($event, item)"
          @change="item.changeEvent && $listeners.change && $listeners.change($event)">
            <el-option
              v-for="i in item.selectOption"
              :key="i.id"
              :label="i.name"
              :value="i.value">
            </el-option>
        </el-select>
      </template>
      <template v-else-if="item.type === 'date-picker'">
        <el-date-picker
          v-model="search[item.value]"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </template>
      <template v-else-if="item.type === 'button'">
        <el-button style="background: #4BC2FE; color: #fff;" @click="$listeners.btnClick && $listeners.btnClick(item)">{{ item.btnTxt }}</el-button>
      </template>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'SearchForm',
  props: {
    items: {
      type: Array,
      default: () => ([])
    },
    search: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    handleEvent (i) {
      console.log(i)
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-form {
    .el-input, .el-select {
      width: 150px;
    }
  }
</style>
