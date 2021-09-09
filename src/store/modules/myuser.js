const myuser = {
  state: {
    userMessage:{}
  },

  mutations: {
    SET_USER_MESSAGE(state, data){
        state.userMessage = data;
    }
  },

  actions: {
    setUser({ commit }, data) {
      commit("SET_USER_MESSAGE", data)
    },

    // logout({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     logout().then(() => {
    //       removeToken() // must remove  token  first
    //       resetRouter()
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // // remove token
    // resetToken({ commit }) {
    //   return new Promise(resolve => {
    //     removeToken() // must remove  token  first
    //     commit('RESET_STATE')
    //     resolve()
    //   })
    // }
  }
}

export default myuser
