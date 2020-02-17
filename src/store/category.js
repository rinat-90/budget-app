import firebase from "firebase/app";
export default {
  actions:{
    async fetchCategories ({ commit, dispatch }){
      try {
        const uid = await dispatch('getUid');
        const categories = ( await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {};
        return Object.keys(categories).map(key => ({ ...categories[key], id: key }))
      }catch (error) {
        commit('SET_ERROR', error);
        throw error
      }
    },
    async fetchCategoryById ({ commit, dispatch }, id){
      try {
        const uid = await dispatch('getUid');
        const category = ( await firebase.database()
          .ref(`/users/${uid}/categories`)
          .child(id)
          .once('value'))
          .val() || {};
        return { ...category, id }
      }catch (error) {
        commit('SET_ERROR', error);
        throw error
      }
    },
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
    },
    async updateCategory ({ commit, dispatch }, { id, title, amount }){
      try {
        const uid = await dispatch('getUid');
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({ title, amount })
      }catch (error) {
        commit('SET_ERROR', error);
        throw error
      }
    },
  },
}
