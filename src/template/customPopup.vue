<template>
  <el-card class="box-card pop-card" shadow="never">
    <div slot="header" class="clearfix card-head">
      <span @click="current = 1" :class="{ 'active': current === 1 }">原始属性</span>
      <span @click="current = 2" :class="{ 'active': current === 2 }">自定义属性</span>
    </div>
    <el-scrollbar v-if="current === 1" style="width: 100%; height: 360px">
      <div style="width: 100%; padding: 10px;">
        <template v-for="item in originData">
          <div :key="item.key" class="text item">
            {{ `${item.key}: ${item.val}` }}
          </div>
        </template>
      </div>
    </el-scrollbar>
    <el-scrollbar v-else style="width: 100%; height: 360px">
      <div style="width: 100%; padding: 10px;">
        <template v-for="item in customData">
          <div v-if="item.val instanceof Array" :key="item.key" class="text item">
            {{ `${item.key}: `}}
            <el-link :underline="false" v-for="(i, s) in item.val" :key="i.id" style="font-size: 12px;" :href="$imgServer + i.url" target="_blank">{{ i.field_name }}{{ (s === item.val.length - 1) ? '' : '、' }}</el-link>
          </div>
          <div v-else :key="item.key" class="text item">
            {{ `${item.key}: ${item.val}` }}
          </div>
        </template>
      </div>
    </el-scrollbar>
  </el-card>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    latlng: {
      type: Array,
      default: () => []
    },
    dataChart: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      originData: [],
      customData: [],
      current: 1
    }
  },
  created () {
    const { origin, custom } = this.data
    this.originData = Object.keys(origin).map(item => {
      return {
        key: item,
        val: origin[item]
      }
    })
    this.customData = Object.keys(custom).map(item => {
      return {
        key: item,
        val: custom[item]
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .pop-card {
    width: 300px;
    height: 400px;
    ::v-deep .el-card__header{
      padding: 10px;
    }
    ::v-deep .el-card__body{
      width: 100%;
      padding: 0;
    }
    .card-head {
      text-align: center;
      span {
        margin: 0 30px;
        font-size: 14px;
        cursor: pointer;
        &.active {
          color: #27ABFF; 
        }
      }
    }
  }
</style>
