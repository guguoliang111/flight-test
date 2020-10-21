import request from '@/utils/request'

export const regist = (data) => // 注册
  request({
    url: '/user/register',
    method: 'post',
    data
  })

export const login = (data) => // 登录
  request({
    url: '/user/login',
    method: 'post',
    data
  })

export const info = () => // 获取用户信息
  request({
    url: '/user/info',
    method: 'get'
  })

export function getEarlyWarning (data) { // 获取预警
  return request({
    url: '/weather/station',
    method: 'post',
    data
  })
}

export function getWeather (data) { // 获取7日天气
  return request({
    url: '/weather/getWeather',
    method: 'post',
    data
  })
}

export function getShp (data) { // 获取shp(模拟)
  return request({
    url: 'weather/getShp',
    method: 'post',
    data
  })
}

export function getUserList (data) { // 获取用户管理列表(Tr)
  return request({
    url: '/user/getUserList',
    method: 'post',
    data
  })
}

export function auditUser (data) { // 审核通过用户接口(Tr)
  return request({
    url: '/user/audit',
    method: 'post',
    data
  })
}

export function removeUser (data) { // 删除用户接口(Tr)
  return request({
    url: '/user/delUser',
    method: 'post',
    data
  })
}

export function changePassword (data) { // 修改密码 (Tr)
  return request({
    url: '/user/updatePwd',
    method: 'post',
    data
  })
}

export function fileUpload (data) { // 上传文件
  const { url, file } = data
  return request({
    url: url,
    method: 'post',
    data: file
  })
}

export function changePwd (data) { // 修改用户密码
  return request({
    url: '/user/updatePassword',
    method: 'post',
    data
  })
}

export function dataAdd (data) { // 添加数据
  return request({
    url: '/upload/uploadData',
    method: 'post',
    data
  })
}

export function getGeoJson (data) {
  return request({
    baseURL: 'http://web.atlasinfo.com.cn:8032',
    url: `/geoserver/tr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=tr%3A${data}&outputFormat=application%2Fjson`,
    method: 'get'
  })
}

export function getShuiba (data) {
  return request({
    baseURL: '/shuiba',
    url: `/tr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=tr%3A${data}&outputFormat=application%2Fjson`,
    method: 'get'
  })
}

export function getWeatherList (data) { // 添加数据
  return request({
    url: '/weather/list',
    method: 'post',
    data
  })
}

export function uploadLandImg (data) { // 地块图片上传
  return request({
    url: '/upload/updateDK',
    method: 'post',
    data
  })
}

export function updateLandInfo (data) { // 编辑地块
  return request({
    url: '/weather/updateDK',
    method: 'post',
    data
  })
}

export function addLand (data) { // 添加地块
  return request({
    url: '/weather/addDK',
    method: 'post',
    data
  })
}

/**
 * 添加田间操作记录
 * @param { String name, String type, String img, String content }
 */
export function addLandRecord (data) {
  return request({
    url: '/weather/addOperationRecord',
    method: 'post',
    data
  })
}

/**
 * 修改田间操作记录
 * @param { String name, String type, String img, String content }
 */
export function updateLandRecord (data) {
  return request({
    url: '/weather/updateOperationRecord',
    method: 'post',
    data
  })
}

/**
 * 田间操作记录图片上传
 */
export function landRecordUpload (data) {
  return request({
    url: '/upload/updateOperationRecord',
    method: 'post',
    data
  })
}

/**
 * 数据提取
 */
export function dataDown (data) {
  return request({
    url: '/download/DataEachDownload',
    method: 'post',
    data
  })
}

/**
 * excel数据提取
 */
export function downExcelData (data) {
  return request({
    url: '/download/DataExcelDownload',
    method: 'post',
    responseType: 'blob',
    data
  })
}

/**
 * 删除地块
 * @param { Integer id }
 */
export function delLand (data) {
  return request({
    url: '/weather/delDK',
    method: 'post',
    data
  })
}

/**
 * 测面积
 * @param { latlons }
 */
export function getArea (data) {
  return request({
    url: '/region/CalculationArea',
    method: 'post',
    data
  })
}

/**
 * 上传shp数据
 */
export function uploadShp (data) {
  return request({
    url: '/upload/uploadShp',
    method: 'post',
    data
  })
}

/**
 * 获取级联地区
 */
export function getCitys (data) {
  return request({
    url: '/region/getProvince',
    method: 'post',
    data
  })
}

/**
 * 获取地区经纬度
 */
export function getCityPosition (data) {
  return request({
    url: '/region/getgemoById',
    method: 'post',
    data
  })
}

/**
 * 获取上传表格数据模板
 */
export function getXlsxTemplate (data) {
  return request({
    url: '/download/getTemplate',
    method: 'post',
    responseType: 'blob',
    data
  })
}
