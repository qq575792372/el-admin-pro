/**
 * 上传文件
 * @param {*} params
 */
export function uploadFile(params) {
  return request({
    url: "/api/file/saveFile",
    method: "post",
    data: params
  });
}
