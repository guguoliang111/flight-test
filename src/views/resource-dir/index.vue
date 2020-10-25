<template>
  <div class="data-manege-page">
    <el-card>
      <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">目录管理</el-menu-item>
      </el-menu>
      <div class="inner-wrap" v-if="dir.length > 0">
        <div class="dir-level">
          <div class="title">
            一级目录
            <i class="el-icon-circle-plus-outline" @click="handleAddDir(1, 0)"></i>
          </div>
          <el-scrollbar style="height: 650px;">
            <div class="list">
              <div :class="['item', index === currentLevelIndex ? 'active' : '']" v-for="({ id, name }, index) in dir" :key="id" @click="currentLevelIndex = index">
                {{ name }}
                <i class="el-icon-remove-outline" @click="delDir(id)"></i>
              </div>
            </div>
          </el-scrollbar>
        </div>
        <div class="dir-level">
          <div class="title">
            二级目录
            <i class="el-icon-circle-plus-outline" @click="handleAddDir(2, dir[currentLevelIndex].id)"></i>
          </div>
          <el-scrollbar style="height: 650px;">
            <div class="list">
              <template v-if="dir[currentLevelIndex].children.length === 0">
                <div class="item">
                  暂无数据
                </div>
              </template>
              <template v-else>
                <div class="item" v-for="{ id, name } in dir[currentLevelIndex].children" :key="id">
                  {{ name }}
                  <i class="el-icon-remove-outline" @click="delDir(id)"></i>
                </div>
              </template>
            </div>
          </el-scrollbar>
        </div>
        <i class="arrow el-icon-d-arrow-right"></i>
      </div>
    </el-card>
    <el-dialog
      class="edit-dir"
      title="编辑目录"
      :visible.sync="dialog"
      width="380px"
      center>
      <div>
        <label>目录名称</label>
        <el-input v-model="dirname"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="addDir">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { dirAdd, dirDelete } from '@/api/api'
import { mapGetters } from 'vuex'

export default {
  name: 'DataManage',
  data () {
    return {
      dialog: false,
      dirname: '',
      currentLevel2: null,
      currentLevel: 1,
      parentId: null,
      currentLevelIndex: 0
    }
  },
  methods: {
    addDir (level) { // 添加目录
      // if (this.dirname) {
      //   await dirAdd({
      //     level: this.currentLevel,
      //     parent_id: this.parentId,
      //     name: this.dirname
      //   })
      //   this.$store.dispatch('dir/getDir')
      //   this.dialog = false
      // } else {
      //   this.$message({ type: 'warning', message: '请输入目录名称' })
      // }
    },
    delDir (id) { // 删除目录
      // this.$confirm('此操作将永久删除该目录, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(async () => {
      //   await dirDelete({ id })
      //   this.$store.dispatch('dir/getDir')
      //   this.$forceUpdate()
      //   this.$message({
      //     type: 'success',
      //     message: '删除成功!'
      //   })
      // })
    },
    handleAddDir (level, parentId) {
      // this.dirname = ''
      // this.currentLevel = level
      // this.parentId = parentId
      // this.dialog = true
    }
  },
  created () {
    this.currentLevel1 = this.dir.length > 0 ? this.dir[0].id : null
  },
  computed: {
    ...mapGetters(['dir'])
  }
}
</script>

<style lang="scss">
  .data-manege-page {
    height: 100%;
    border-radius: 6px;
    .el-card {
      height: 100%;
      .el-card__body {
        height: 100%;
        padding: 0;
        .el-menu {
          .el-menu-item{
            border-bottom-width: 0;
          }
        }
      }
      .inner-wrap {
        padding: 20px;
        height: calc(100% - 61px);
        position: relative;
        clear: both;
        overflow: hidden;
        .dir-level {
          float: left;
          width: 280px;
          margin-right: 50px;
          border-radius: 4px;
          overflow: hidden;
          .title {
            height: 45px;
            line-height: 45px;
            padding: 0 20px;
            background-color: #41EC8E;
            color: #fff;
            text-align: center;
            position: relative;
            font-weight: 700;
            i {
              position: absolute;
              right: 20px;
              top: 50%;
              transform: translateY(-50%);
              font-size: 16px;
              cursor: pointer;
              font-weight: 700;
            }
          }
          .list {
            background-color: #F1F1F1;
            padding: 10px;
            .item {
              background-color: #fff;
              height: 40px;
              line-height: 40px;
              margin-bottom: 10px;
              padding: 0 15px;
              position: relative;
              cursor: pointer;
              &.active {
                color: #3CAFFB;
              }
              i {
                position: absolute;
                right: 15px;
                top: 50%;
                transform: translateY(-50%);
                font-size: 16px;
                cursor: pointer;
              }
            }
          }
        }
        .arrow {
          position: absolute;
          top: 35px;
          left: 313px;
          font-size: 24px;
          color: #36AFFB;
        }
      }
    }
    .edit-dir {
      .el-dialog {
        height: 240px;
        min-height: 240px;
        label {
          width: 60px;
          display: inline-block;
        }
        .el-input {
          width: 270px;
          display: inline-block;
        }
      }
    }
  }
</style>
