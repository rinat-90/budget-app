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
          bill: 100,
          name
        })
      }catch (error) {
        console.log(error);
        commit('SET_ERROR', error);
        throw error
      }

    },

    async logout(){
      await firebase.auth().signOut()
    },

    getUid(){
      const user = firebase.auth().currentUser;
      return user ? user.uid : null
    }

  }
}
