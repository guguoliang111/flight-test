import request from '@/utils/requestApi'

/**
 * 数据管理列表
 * @param {*} data
 */
export const dataManageList = (data = {}) =>
  request({
    url: 'data.search',
    data
  })

/**
 * 数据查看
 * @param { Integer id }
 */
export const dataView = (data = {}) =>
  request({
    url: 'data.getEach',
    data
  })

export const dataEditField = (data = {}) => // 数据编辑字段
  request({
    url: 'data.edit',
    data
  })

export const dataEditFieldSave = (data = {}) => // 数据编辑字段保存
  request({
    url: 'data.addFeatureForShp',
    data
  })

export const dirList = (data = {}) => // 目录列表
  request({
    url: 'directory.searchAll',
    data
  })

export const dirAdd = (data = {}) => // 添加目录
  request({
    url: 'directory.add',
    data
  })

export const dirDelete = (data = {}) => // 删除目录
  request({
    url: 'directory.delDirectories',
    data
  })

export const searchName = (data = {}) => // 详情数据中市场信息name迷糊查询
  request({
    url: 'search.name',
    data
  })

export const getDirMsg = (data = {}) => // 首页查看日历信息
  request({
    url: 'data.searchCalendar',
    data
  })

export const getTkStatistics = (name = {}) => // 获取首页田块统计信息
  request({
    url: 'data.searchTkByType',
    method: 'get',
    data: name
  })
export const getDkDetail = (name = {}) => // 获取首页地块详情信息
  request({
    url: 'data.getTkCenterAndJson',
    method: 'get',
    data: name
  })
export const getTkAllCenter = (name = {}) => // 获取首页所有地块信息
  request({
    url: 'data.getTkAllCenter',
    method: 'get',
    data: name
  })
export const getHnwjByNamer = (name = {}) => // 获取首页市场 =>>>作物价格
  request({
    url: 'search.hnwjByName',
    method: 'get',
    data: name
  })
export const getHnwfljgByName = (name = {}) => // 获取首页市场 =>>>肥料价格
  request({
    url: 'search.hnwfljgByName',
    method: 'get',
    data: name
  })

export const getTkRemoteData = (name = {}) => // 获取首页市场 =>>>肥料价格
  request({
    url: 'data.getTkRemoteData',
    method: 'get',
    data: name
  })

export const getAcdAndErod = (name = {}) => // 详情页面 =>>> 积温积雨
  request({
    url: 'data.searchAccumulatedAndEroded',
    method: 'get',
    data: name
  })


export const getHnwnyjgByName = (name = {}) => // 获取首页市场 =>>>农药价格
  request({
    url: 'search.hnwnyjgByName',
    method: 'get',
    data: name
  })

/**
 * 田间操作记录列表
 * @param { Integer pageNum, Integer pageSize, String name, String type, String username, List<String> time }
 */
export const getOperationRecord = (data = {}) =>
  request({
    url: 'operationRecord.search',
    data
  })

/**
 * 田间操作记录删除
 * @param { id[] }
 */
export const operationRecordDel = (data = {}) =>
  request({
    url: 'operationRecord.del',
    data
  })

/**
 * 数据编辑
 * @param { id[] }
 */
export const changeDataDir = (data = {}) =>
  request({
    url: 'directory.updateDataDirectory',
    data
  })

export const getChemical = (name = {}) => // 获取首页作物管理 施肥量
  request({
    url: 'search.chemical',
    method: 'get',
    data: name
  })

export const getCamera = (name = {}) => // 获取详情页面摄像头
  request({
    url: 'search.camera',
    method: 'get',
    data: name
  })

export const getLastData = (name = {}) => // 获取作物的矢量数据
  request({
    url: 'data.getLastData',
    method: 'get',
    data: name
  })

export const getHnwj = (name = {}) => // 地块详情 市场信息
  request({
    url: 'search.hnwj',
    method: 'get',
    data: name
  })

export const getDiseases = (name = {}) => // 地块详情 病虫害预警
  request({
    url: 'search.diseases',
    method: 'get',
    data: name
  })

export const searchJwAndJy = (name = {}) => // 地块详情 ji积温积雨
  request({
    url: 'data.searchJwAndJy',
    method: 'get',
    data: name
  })

export const getYears = (name = {}) => // 地块详情 筛选年份
  request({
    url: 'data.getYears',
    method: 'get',
    data: name
  })

export const getSoilAttribute = (name = {}) => // 地块详情 获取土壤详情
  request({
    url: 'data.searchSoilAttribute',
    method: 'get',
    data: name
  })

/**
 * 获取excel数据
 * @param {"id":38,"pageNum":1,"pageSize":10,"name":"名称","address":"地址","times":[]}
 */
export const getExcelData = (name = {}) => // 首页作物品种公用
  request({
    url: 'data.getExcelDate',
    data: name
  })

/**
 * 获取产品/品种
 * @param {"id":38}
 */
export const getProductCategory = (data = {}) =>
  request({
    url: 'data.getExcelDateNames',
    data
  })

/**
 * 地块管理 无人机影像
 * @param {}
 */
export const searchUav = (data = {}) =>
  request({
    url: 'search.uav',
    data
  })

/**
 * excel数据删除
 * @param {"id":38,"ids":[]}
 */
export const deleteExcelData = (data = {}) =>
  request({
    url: 'data.deleteExcelDate',
    data
  })

/**
 * 数据查看图层删除
 * @param {"ids":[]}
 */
export const deleteDataLayer = (data = {}) =>
  request({
    url: 'data.deleteEachDate',
    data
  })

/**
 * 数据查询点查询
 * @param { Double longitude, Double latitude }
 */
export const searchByPoint = (data = {}) =>
  request({
    url: 'search.compoundQuery.spot',
    data
  })

/**
 * 数据查询面查询
 * @param { latlons }
 */
export const searchByArea = (data = {}) =>
  request({
    url: 'search.compoundQuery.noodles',
    data
  })

/**
 * 数据查询复合查询
 * @param { Integer countyId 县的id     ,Integer type 0 shp 1是tiff   ,String time }
 */
export const searchByCondition = (data = {}) =>
  request({
    url: 'search.compoundQuery',
    data
  })
