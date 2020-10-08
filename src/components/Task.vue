<template>
    <div>
        
        <md-list-item>
            <md-toolbar>
                <p @click="showDialog = true" class="md-subtitle" style="flex: 1; white-space:normal; word-break: break-all;">{{name}}</p>




                <md-dialog :md-active.sync="showDialog">
                    <md-dialog-title>
                        <md-field>
                            <label>Name</label>
                            <md-input v-model="name"></md-input>
                        </md-field>

                        <md-field>
                            <label>Description</label>
                            <md-textarea v-model="description" md-counter="80"></md-textarea>
                        </md-field>
                    </md-dialog-title>
                </md-dialog>



                <md-button class="md-icon-button md-accent" @click="deleteTask"><md-icon>delete</md-icon></md-button>

            </md-toolbar>
        </md-list-item>

    </div>
</template>
<script>
export default {
    name: "task",
    props: ['taskID'],
    data: function(){
        return {
            showDialog: false,
        }
    },
    computed: {
		name: {
            get(){
                return this.$store.getters.task(this.taskID).name;
            },
            set(data){
                this.$store.commit('task', { task: this.taskID, update: { field: "name", value: data }, delete: false } );
            }
        },
        description: {
            get(){
                return this.$store.getters.task(this.taskID).description;
            },
            set(data){
                this.$store.commit('task', { task: this.taskID, update: { field: "description", value: data }, delete: false } );
            }
        },
        
    },
    methods: {
        deleteTask(){
            this.$store.commit('task', { task: this.taskID, update: false, delete: true});
        },
    }
}
</script>
<style lang="less">
  .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
</style>