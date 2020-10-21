export const loginRules = { // 登录表单校验
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}

export const registRules = { // 注册表单校验
  roleId: [
    { required: true, message: '请选择角色', trigger: 'blur' }
  ],
  county: [
    { required: true, message: '请选择地区', trigger: 'blur' }
  ],
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  realName: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { pattern: /^(?:[\u4e00-\u9fa5]+)(?:●[\u4e00-\u9fa5]+)*$|^[a-zA-Z0-9]+\s?[\.·\-()a-zA-Z]*[a-zA-Z]+$/, message: '请输入正确的姓名', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/, message: '手机号不正确', trigger: 'blur' }
  ],
  workunit: [
    { required: true, message: '请输入工作单位', trigger: 'blur' }
  ],
  address: [
    { required: true, message: '请输入工作地址', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^(?![a-z]+$)(?![A-Z]+$)(?![0-9]+$)[0-9a-zA-Z\W]\S{7,20}$/, message: '密码长度不能小于八位且包含大小写、数字不少于两种', trigger: 'blur' }
  ]
}

/**
 * 添加数据表单校验
 */
export const dataAddRules = {
  name: [
    { required: true, message: '请输入数据名称', trigger: 'blur' }
  ],
  data_time: [
    { required: true, message: '请选择所属时间', trigger: 'blur' }
  ],
  file: [
    { required: true, message: '请上传数据文件', trigger: 'blur' }
  ]
}

/**
 * 添加田间操作记录表单校验
 */
export const recordRules = {
  name: [
    { required: true, message: '请输入地块名称', trigger: 'blur' }
  ],
  type: [
    { required: true, message: '请选择种植作物', trigger: 'blur' }
  ],
  content: [
    { required: true, message: '请输入操作内容', trigger: 'blur' }
  ],
  img: [
    { required: true, message: '请上传图片', trigger: 'blur' }
  ]
}

/**
 * 添加地块表单校验
 */
export const landRules = {
  dk_name: [
    { required: true, message: '请输入地块名称', trigger: 'blur' }
  ],
  dk_farmland: [
    { required: true, message: '请输入地块亩数', trigger: 'blur' }
  ],
  dk_perimeter: [
    { required: true, message: '请输入地块周长', trigger: 'blur' }
  ],
  type: [
    { required: true, message: '请输入地块类型', trigger: 'blur' }
  ],
  dk_type: [
    { required: true, message: '请输入土地类型', trigger: 'blur' }
  ],
  dk_altitude: [
    { required: true, message: '请输入海拔', trigger: 'blur' }
  ],
  dk_slope: [
    { required: true, message: '请输入坡度', trigger: 'blur' }
  ],
  dk_density: [
    { required: true, message: '请输入密度', trigger: 'blur' }
  ],
  dk_irrigation: [
    { required: true, message: '请输入灌溉方式', trigger: 'blur' }
  ],
  dk_address: [
    { required: true, message: '请输入地址', trigger: 'blur' }
  ],
  time: [
    { required: true, message: '请选择播种日期', trigger: 'blur' }
  ],
  dk_growers: [
    { required: true, message: '请输入种植户', trigger: 'blur' }
  ],
  dk_phone: [
    { required: true, message: '请输入联系方式', trigger: 'blur' }
  ],
  dk_person: [
    { required: true, message: '请输入负责人', trigger: 'blur' }
  ],
  dk_farm: [
    { required: true, message: '请输入所属农场', trigger: 'blur' }
  ],
  dk_fertilizer: [
    { required: true, message: '请输入施肥建议', trigger: 'blur' }
  ]
}
