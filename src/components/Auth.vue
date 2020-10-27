<template>
    <div>
        <template v-if="loading">
			<loading :align="'right'" :size="30"></loading>
		</template>
        <form v-else-if="!account" novalidate @submit.prevent="auth">
            <div class="auth-nav">
                <div>
                    <md-field>
                        <label>Email</label>
                        <md-input type="email" v-model="user.email"></md-input>
                    </md-field>
                </div>
                <div>
                    <md-field>
                        <label>Password</label>
                        <md-input type="password" v-model="user.password"></md-input>
                    </md-field>
                </div>
                <div>
                    <md-button type="submit" class="md-raised md-primary" @click="user.auth_type='login'">Login</md-button>
                </div>
                <div>
                    <md-button type="submit" class="md-raised md-primary" @click="user.auth_type='signup'">Register</md-button>
                </div>
            </div>
        </form>
        <div v-else>
            <div class="auth-nav">
                <div>
                    Login as: {{account}}
                </div>
                <div>
                    <md-button type="button" class="md-raised md-primary" @click="logout()">Logout</md-button>
                </div>
                <div>
                    <md-button type="button" class="md-raised md-primary" @click="syncOut()">Export</md-button>
                </div>
                <div>
                    <md-button type="button" class="md-raised md-primary" @click="syncIn()">Import</md-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Loading from './LoadSpinner.vue'

export default {
    name: "auth",
    components:{
		Loading,
    },
    data: function () {
        return {
            loading: false,
            user: {
                email: "",
                password: "",
                auth_type: "login",
            },
            account: "",
        }
    },
    created(){
        if(this.$store.getters.token){
            this.loading = true;
            this.$store.dispatch("account");
		}
        this.$store.subscribe((mutation) => {
			if (mutation.type == "user"){
                this.account = this.$store.getters.user;
				this.$toasted.show("Succes", {
					type: "success",
                });
                this.loading = false;
			}
		});
    },
    methods: {
        auth(){
            this.$store.dispatch("auth", this.user);
        },
        syncOut(){
            this.$store.dispatch("export");
        },
        syncIn(){
            this.$store.dispatch("import");
        },
        logout(){
            this.$store.dispatch("logout");
        }
    }
}
</script>
<style lang="less">
    .auth-nav{
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
</style>