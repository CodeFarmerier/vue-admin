import { defHttp } from '/@/utils/http/axios'
import { IServeStat } from '/@/views/system/monitor/serve/type'

export const Api = {
  list: '/sys/serve/list',
  // add: '/sys/dept/add',
  // update: '/sys/dept/update',
  // delete: '/sys/dept/delete',
}

export async function getServeListRequest(): Promise<IServeStat> {
  return await defHttp.get({ url: Api.list })
}
