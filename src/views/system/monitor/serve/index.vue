<template>
  <PageWrapper :content-background="false">
    <div class="sys-server-stat-container">
      <el-card class="stat-card" style="max-width: '50%'">
        <template #header>
          <div class="font-semibold text-xl">运行环境 </div>
        </template>
        <el-descriptions :column="1" border>
          <el-descriptions-item label="操作系统" align="center">{{
            runtime.os
          }}</el-descriptions-item>
          <el-descriptions-item label="系统架构" align="center">{{
            runtime.arch
          }}</el-descriptions-item>
          <el-descriptions-item label="Node版本" align="center"
            ><el-tag size="small">v{{ runtime.nodeVersion }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item
            label="NPM版本
"
            align="center"
            ><el-tag size="small">v{{ runtime.npmVersion }}</el-tag>
          </el-descriptions-item>
        </el-descriptions></el-card
      >

      <Card class="stat-card" title="CPU">
        <template #default>
          <ul>
            <li>
              <span>详细：</span>
              <span> {{ parseCpuInfo }}</span>
            </li>
            <li>
              <span>负载</span>
              <el-progress
                :text-inside="true"
                :stroke-width="20"
                :percentage="
                  formarPercentage(cpu.rawCurrentLoad, cpu.rawCurrentLoadIdle + cpu.rawCurrentLoad)
                "
                :color="customProgressColor"
              />
            </li>
            <template v-for="(item, index) in cpu.coresLoad" :key="index">
              <li>
                <span>{{ `核心${index + 1} 负载` }} </span>
                <el-progress
                  :text-inside="true"
                  :stroke-width="20"
                  :percentage="formarPercentage(item.rawLoad, item.rawLoad + item.rawLoadIdle)"
                  :color="customProgressColor"
                />
              </li>
            </template>
          </ul>
        </template>
      </Card>

      <Card class="stat-card" title="磁盘">
        <template #default>
          <div class="disk-info">
            <div class="left">
              <el-descriptions :column="1">
                <el-descriptions-item label="总空间">{{
                  formatDiskUnit.size
                }}</el-descriptions-item>
                <el-descriptions-item label="已用空间">{{
                  formatDiskUnit.used
                }}</el-descriptions-item>
                <el-descriptions-item label="可用空间"
                  >{{ formatDiskUnit.available }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
            <div class="right">
              <el-progress
                type="circle"
                :percentage="parseDiskPercentage"
                :color="customProgressColor"
              />
            </div>
          </div>
        </template>
      </Card>

      <Card class="stat-card" title="内存">
        <template #default>
          <div class="disk-info">
            <div class="left">
              <el-descriptions :column="1">
                <el-descriptions-item label="总内存">{{
                  formatMemoryUnit.total
                }}</el-descriptions-item>
                <el-descriptions-item label="已用内存">{{
                  formatMemoryUnit.used
                }}</el-descriptions-item>
                <el-descriptions-item label="可用内存"
                  >{{ formatMemoryUnit.free }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
            <div class="right">
              <el-progress
                type="circle"
                :percentage="parseMemoryPercentage"
                :color="customProgressColor"
              />
            </div>
          </div>
        </template>
      </Card>
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup name="服务监控">
import { PageWrapper } from '/@/components/Page'
import Card from '/@/components/Card/index.vue'
import { onMounted, reactive, toRefs, computed, onBeforeUnmount } from 'vue'
import { getServeListRequest } from '/@/api/system/serve'
import { IServeStat } from './type'

const sysInfo = reactive({
  runtime: {
    os: '',
    arch: '',
    nodeVersion: '',
    npmVersion: '',
  },
  disk: {
    size: 0,
    used: 0,
    available: 0,
  },
  memory: {
    total: 0,
    available: 0,
  },
  cpu: {
    manufacturer: '',
    brand: '',
    physicalCores: 0,
    model: '',
    speed: 0,
    rawCurrentLoad: 0,
    rawCurrentLoadIdle: 0,
    coresLoad: [],
  },
})

const { runtime, disk, memory, cpu } = toRefs<IServeStat>(sysInfo)
let intervalId: NodeJS.Timer

/**
 *
 * byte to size
 * formatBytes(1024);       // 1 KB
 * formatBytes('1024');     // 1 KB
 * formatBytes(1234);       // 1.21 KB
 * formatBytes(1234, 3);    // 1.205 KB
 * @param {number} bytes file size
 */
function formatSizeUnits(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

const formatDiskUnit = computed(() => {
  return {
    size: formatSizeUnits(disk.value.size),
    used: formatSizeUnits(disk.value.used),
    available: formatSizeUnits(disk.value.available),
  }
})
const formatMemoryUnit = computed(() => {
  return {
    total: formatSizeUnits(memory.value.total),
    free: formatSizeUnits(memory.value.available),
    used: formatSizeUnits(memory.value.total - memory.value.available),
  }
})
const parseDiskPercentage = computed(() => {
  if (disk.value.size <= 0) {
    return 0
  }
  return Math.floor((disk.value.used / disk.value.size) * 100)
})
const parseMemoryPercentage = computed(() => {
  if (memory.value.total <= 0) {
    return 0
  }
  return Math.floor(((memory.value.total - memory.value.available) / memory.value.total) * 100)
})
const parseCpuInfo = computed(() => {
  return `${cpu.value.manufacturer} ${cpu.value.brand} @ ${cpu.value.speed}GHz`
})

const refresh = async () => {
  const data = await getServeListRequest()
  console.log(data)

  runtime.value = data.runtime
  disk.value = data.disk
  memory.value = data.memory
  cpu.value = data.cpu
}
refresh()
const customProgressColor = (percentage) => {
  if (percentage < 30) {
    return '#5cb87a'
  } else if (percentage < 70) {
    return '#e6a23c'
  } else {
    return '#f53f3f'
  }
}
const formarPercentage = (used, total) => {
  if (total <= 0) {
    return 0
  }
  return Math.floor((used / total) * 100)
}

onMounted(() => {
  intervalId = setInterval(refresh, 10000)
})
onBeforeUnmount(() => {
  clearInterval(intervalId)
})
</script>

<style lang="scss" scoped>
:deep(.my-label) {
  background: var(--el-color-danger-light-9);
}
.sys-server-stat-container {
  column-gap: 10px;
  column-count: 2;

  .stat-card {
    margin-bottom: 10px;
    break-inside: avoid;
    transform: translateZ(0);
    ul li {
      width: 100%;
      display: flex;
      justify-content: space-between;
      height: 40px;
      align-items: center;
      .el-progress {
        width: 60%;
      }
    }
    .disk-info {
      display: flex;
      flex-direction: row;
      width: 100%;
      .left {
        width: 50%;
      }
      &--item {
        width: 50%;
      }
    }
  }
}
</style>
