import firebase from "firebase/app";
export default {
  actions:{
    async createCategory({ commit, dispatch }, { title, amount }){
      try {
        const uid = await dispatch('getUid');
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({ title, amount});
        return {
          title, amount, id: category.key
        }
      }catch (error) {
        commit('SET_ERROR', error);
        throw error
      }
    }
  }
}
