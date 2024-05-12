export interface IServeStat {
  runtime: Runtime
  cpu: Cpu
  disk: Disk
  memory: Memory
}

export interface Runtime {
  npmVersion: string
  nodeVersion: string
  os: string
  arch: string
}

export interface Cpu {
  manufacturer: string
  brand: string
  physicalCores: number
  model: string
  speed: number
  rawCurrentLoad: number
  rawCurrentLoadIdle: number
  coresLoad: CoresLoad[]
}

export interface CoresLoad {
  rawLoad: number
  rawLoadIdle: number
}

export interface Disk {
  size: number
  available: number
  used: number
}

export interface Memory {
  total: number
  available: number
}
