<template>
  <div>
    <PageWrapper>
      <div class="container">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="项目名">
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
          <el-button type="primary" @click="onSubmit">新建项目</el-button>
          <el-button type="danger" @click="onSubmit">批量删除</el-button>
        </div>
      </div>
      <div class="container">
        <el-table
          ref="multipleTableRef"
          :data="tableData"
          style="width: 100%; cursor: pointer"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" />
          <el-table-column prop="ID" v-if="false" label="id" />
          <el-table-column prop="name" label="项目名称" />
          <el-table-column prop="leader" label="项目创建者" />
          <el-table-column prop="createdAt" label="创建时间" />
          <el-table-column prop="description" label="项目描述" v-if="false" />
          <el-table-column label="操作">
            <template #default="{ row }">
              <div style="display: flex">
                <!-- 编辑按钮 -->
                <el-button type="" text @click="editProject(row)">详情</el-button>
                <el-button type="text" @click="editProject(row)">修改</el-button>

                <!-- 删除按钮 -->
                <el-button type="danger" text @click="deleteProject(row)">删除</el-button>
              </div>
            </template>
          </el-table-column>
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
  name: string
  leader: string
  createdAt: string
  description: string
}

const tableData: User[] = [
  {
    ID: 1,
    name: '项目A',
    leader: '张三',
    createdAt: '2024-05-12',
    description: '这是项目A的描述',
  },
  {
    ID: 2,
    name: '项目B',
    leader: '李四',
    createdAt: '2024-05-13',
    description: '这是项目B的描述',
  },
  {
    ID: 3,
    name: '项目C',
    leader: '王五',
    createdAt: '2024-05-14',
    description: '这是项目C的描述',
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
const editProject = (project) => {
  // 编辑项目的逻辑
  console.log('编辑项目', project)
}

const deleteProject = (project) => {
  // 删除项目的逻辑
  console.log('删除项目', project)
}
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
