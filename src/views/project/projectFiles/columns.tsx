import { formatToDateTime } from '/@/utils/date'

export function Columns() {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 60,
      ifShow: false,
    },
    {
      title: '文件名',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: '预览图',
      dataIndex: 'path',
      width: 150,
    },
    {
      title: '文件后缀',
      dataIndex: 'extName',
      width: 80,
    },
    {
      title: '类别',
      dataIndex: 'type',
      width: 80,
    },
    {
      title: '大小',
      dataIndex: 'size',
      width: 80,
    },
    {
      title: '上传者',
      dataIndex: 'username',
      width: 120,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      width: 160,
      format: (text) => formatToDateTime(text),
    },
  ]
}
