import request from '@/utils/request'

/**
 * 查询分页列表
 * @param {*} params 
 */
export function getList(params) {
  return request({
    url: '/api/getList',
    method: 'get',
    params: params
  })
}
/**
 * 查询详情
 * @param {*} params 
 */
export function getDetail(params) {
  return request({
    url: '/api/getDetail',
    method: 'get',
    params: params
  })
}

/**
 * 编辑
 * @param {*} params 
 */
export function updateTable(params) {
  return request({
    url: '/api/updateTable',
    method: 'post',
    data: params
  })
}
/**
 * 新增
 * @param {*} params 
 */
export function addTable(params) {
  return request({
    url: '/api/addTable',
    method: 'post',
    data: params
  })
}
/**
 * 删除
 * @param {*} params 
 */
export function deleteTable(params) {
  return request({
    url: '/api/deleteTable',
    method: 'post',
    data: params
  })
}
/**
 * 上传文件
 * @param {*} params 
 */
export function uploadFile(params) {
  return request({
    url: '/hltrip_shop/file/saveFile',
    method: 'post',
    data: params
  })
}