const getters = {
  token: state => state.user.token,
  user: state => state.user.user,
  access: state => state.user.access,
  loginInfo: state => state.user.loginInfo,
  dir: state => state.dir.list
}

export default getters
