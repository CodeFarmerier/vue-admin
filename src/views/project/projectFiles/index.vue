<template>
  <div>
    <PageWrapper>
      <div class="container">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="文件名">
            <el-input v-model="formInline.user" placeholder="请输入" clearable />
          </el-form-item>
          <el-form-item label="文件后缀">
            <el-input v-model="formInline.user" placeholder="请输入" clearable />
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="formInline.user" placeholder="请输入" clearable />
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
              v-model="formInline.date"
              type="daterange"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              :default-value="defaultDateRange"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="default" @click="onSubmit">重置</el-button>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </PageWrapper>

    <PageWrapper>
      <div class="container tableHeader">
        <h2>存储管理</h2>
        <div>
          <el-button type="primary" @click="onSubmit">上传</el-button>
          <el-button type="danger" @click="onSubmit">删除</el-button>
        </div>
      </div>
      <div class="container">
        <el-table
          ref="multipleTableRef"
          :data="tableData"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="ID" v-if="false" label="id" width="60" />
          <el-table-column prop="dataIndex" label="文件名" width="150" />
          <el-table-column prop="path" label="预览图" width="150" />
          <el-table-column prop="extName" label="文件后缀" width="150" />
          <el-table-column prop="type" label="类别" width="150" />
          <el-table-column prop="size" label="大小" width="150" />
          <el-table-column prop="username" label="上传者" width="150" />
          <el-table-column prop="createdAt" label="创建时间" width="150" />
        </el-table>
      </div>
    </PageWrapper>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { PageWrapper } from '/@/components/Page'
import { ElTable } from 'element-plus'
interface User {
  ID: number
  dataIndex: string
  path: string
  extName: string
  type: string
  size: string
  username: string
  createdAt: string
}

const tableData: User[] = [
  {
    ID: 1,
    dataIndex: 'File1',
    path: '/path/to/preview1.jpg',
    extName: 'jpg',
    type: 'image',
    size: '2 MB',
    username: 'User1',
    createdAt: '2024-05-12',
  },
  {
    ID: 2,
    dataIndex: 'File2',
    path: '/path/to/preview2.jpg',
    extName: 'jpg',
    type: 'image',
    size: '1.5 MB',
    username: 'User2',
    createdAt: '2024-05-13',
  },
  {
    ID: 3,
    dataIndex: 'File3',
    path: '/path/to/preview3.jpg',
    extName: 'jpg',
    type: 'image',
    size: '3 MB',
    username: 'User3',
    createdAt: '2024-05-14',
  },
]
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<User[]>([])

const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
}

const formInline = reactive({
  user: '',
  region: '',
  date: '',
})
const defaultDateRange = ref<[Date, Date]>([
  new Date(), // 当前日期
  new Date(), // 当前日期
])
const onSubmit = () => {
  console.log('submit!')
}
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
}
.tableHeader {
  display: flex;
  justify-content: space-between;
}
</style>
