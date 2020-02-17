import firebase from "firebase/app";
export default {
  actions:{
    async createRecord({ commit, dispatch }, record){
      try {
        const uid = await dispatch('getUid');
        return await firebase.database().ref(`/users/${uid}/records`).push(record)
      }catch (error) {
        commit('SET_ERROR', error)
        throw error
      }
    }
  }
}
