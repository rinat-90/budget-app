import firebase from 'firebase/app';
export default {
  state:{
    info: {},
  },
  mutations:{
    SET_INFO(state, info){
      state.info = info
    },
    CLEAR_INFO(state){
      state.info = {};
    }
  },
  actions:{
    async fetchInfo({ commit, dispatch }){
      try {
        const uid = await dispatch('getUid');
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val();
        commit('SET_INFO', info)
      }catch (error) {
        commit('SET_ERROR', error)
      }


    }
  },
  getters:{
    info(state){
      return state.info
    }
  }
}
