<template>
    <div>
        <md-list>
            
            <md-subheader style="display: flex">
                <md-field>
                    <label>List name</label>
                    <md-textarea :value="column" @change="column = $event.target.value" md-autogrow></md-textarea>
                </md-field>
                <md-button class="md-icon-button md-accent" @click="deleteList"><md-icon>delete</md-icon></md-button>
            </md-subheader>
            
            <draggable v-model="tasks" draggable=".drag-task-item" group="tasks">
                <div class="md-layout-item drag-task-item" v-for="task in tasks" :key="task.id">
                    <task :taskID="task.id"></task>
                </div>
                <md-list-item slot="header">
                    <md-field>
                        <label>New Task</label>
                        <md-input v-model="newTaskName"></md-input>
                    </md-field>
                    <md-button v-if="newTaskName" class="md-icon-button md-primary" @click="addTask()"><md-icon>add</md-icon></md-button>
                </md-list-item>
            </draggable>
            
        </md-list>
    </div>
</template>
<script>
import Task from './Task.vue'
import draggable from 'vuedraggable'

export default {
    name: "tasks-list",
    props: ["columnName"],
    components: {
        Task,
		draggable,
    },
    data: function(){
        return {
            newTaskName: "",
        }
    },
    computed: {
		tasks: {
			get() {
                let tasks = this.$store.getters.column(this.columnName).tasks 
                return tasks.filter(task => task.name !== "");
			},
			set(tasks) {
				this.$store.commit('column', { name: this.columnName, tasks: tasks} );
			}
        },
        column: {
            get() {
                return this.$store.getters.column(this.columnName).name;
			},
			set(column) {
                if(column !== ""){
                    this.$store.commit('column', { name: this.columnName, column: column });
                }
			}
        }
	},
    methods: {
        addTask(){
            this.$store.commit('column', { name: this.columnName, task: { name: this.newTaskName } });
            this.newTaskName = "";
        },
        deleteList(){
            this.$store.commit('column', { name: this.columnName, delete: true});
        },
    }
}

</script>
<style lang="less">
    .list-name{
        border: 0;
        :active{
            outline: none;
        }
    }
</style>