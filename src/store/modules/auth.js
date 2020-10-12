import axios from 'axios'

export default {
    state: () => ({
        token: localStorage.getItem('VD_token'),
        lastChange: localStorage.getItem('VD_last_change'),
        user: "",
    }),
    mutations: {
        token(state, data) {
            state.token = data;
        },
        lastChange(state, data) {
            state.lastChange = data;
        },
        user(state, data) {
            state.user = data;
        }
    },
    getters:{
        token: state => {
            return state.token;
        },
        lastChange: state => {
            return state.lastChange;
        },
        user: state => {
            return state.user;
        },
    },
    actions: {
        account(context){
            axios.get(process.env.API_URL+'/user/').then(response => {
                if(response.data.status){
                    context.commit('user', response.data.data.email);
                } else {
                    context.dispatch('logout');
                }
            });
        },
        auth(context, user) {
            axios.post(process.env.API_URL+'/auth/'+user.auth_type, user).then(response => {
                let token = response.data.data.token;
                if(response.data.status){
                    context.commit('token', token);
                    localStorage.setItem('VD_token', token);
                    axios.defaults.headers.common['Authorization'] = "Bearer "+token;
                    context.dispatch('account');
                }
            });
        },
        logout(context){
            localStorage.removeItem('VD_token')
            context.commit('user', "");
            context.commit('token', "");
            delete axios.defaults.headers.common['Authorization']
        },
    },
}
