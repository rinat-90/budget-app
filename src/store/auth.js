import firebase from 'firebase/app';
export default {
  actions: {

    async login({ commit, dispatch }, { email, password }){
      try{
        await firebase.auth().signInWithEmailAndPassword(email, password)
      }catch (error) {
        commit('SET_ERROR', error);
        throw error
      }
    },

    async register({ commit, dispatch }, { email, password, name }){
      try{
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid');
        await firebase.database().ref(`/users/${uid}/info`).set({
          balance: 10000,
          name
        })
      }catch (error) {
        console.log(error);
        commit('SET_ERROR', error);
        throw error
      }

    },

    async logout({ commit }){
      await firebase.auth().signOut();
      await commit('CLEAR_INFO');
    },

    getUid(){
      const user = firebase.auth().currentUser;
      return user ? user.uid : null
    }

  }
}
