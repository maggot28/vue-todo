<template>
	<div id="app">
		<nav-menu></nav-menu>
		<template v-if="loading">
			<loading :align="'center'" :size="100"></loading>
		</template>
		<template v-else>
			<div class="tasks-lists">
				<draggable v-model="tasksColumns" v-bind="dragOptions" draggable=".drag-list-item">
					<tasks-list class="task-list drag-list-item" v-for="taskColumn in tasksColumns" :key="taskColumn.name" :columnName="taskColumn.name"></tasks-list>
					<div class="task-list">
						<md-list slot="header">
							<md-list-item>
								<md-field>
									<label>New List</label>
									<md-input v-model="newListName" @keyup.enter="addList()"></md-input>
								</md-field>
								<md-button v-if="newListName" class="md-icon-button md-primary" @click="addList()"><md-icon>add</md-icon></md-button>
							</md-list-item>
						</md-list>
					</div>
				</draggable>
			</div>
		</template>
	</div>
</template>

<script>
import draggable from 'vuedraggable'

import NavMenu from './components/NavMenu.vue'
import TasksList from './components/TasksList.vue'
import Loading from './components/LoadSpinner.vue'

export default {
	name: 'App',
	components:{
		NavMenu,
		TasksList,
		Loading,
		draggable,
	},
	data: function(){
		return { 
			loading: this.$store.getters.loading,
            newListName: "",
		}
	},
	computed: {
		tasksColumns: {
			get() {
				return this.$store.getters.columns;
			},
			set(columns) {
				this.$store.commit('columns', columns);
			}
		},
		dragOptions() {
            return {
                animation: 200,
                ghostClass: "ghost-list"
            };
        }
	},
	created(){
		this.$store.subscribe((mutation) => {
			if (mutation.type == "loading"){
				this.loading = this.$store.getters.loading;
			}
		});
	},
	methods: {
        addList(){
			this.$store.commit('column', { name: this.newListName, tasks:[] });
			this.newListName = "";
		},
    }
}
</script>
<style lang="less">
	#app{
		padding: 0 40px;
	}
	.task-list{
		width: 320px;
		height: 100%;
		margin-right: 20px;
		border: 1px solid rgba(#000, .12);
		box-sizing: border-box;
		display: inline-block;
		vertical-align: top;
		white-space: nowrap;
		max-height: calc(100vh - 123px);
		overflow-y: overlay;
		overflow-x: hidden;

		&::-webkit-scrollbar-track{
			border-radius: 8px;
			background-color: #f1f1f1;
		}
		&::-webkit-scrollbar {
			width: 5px;
			background-color: #f1f1f1;
		}
		&::-webkit-scrollbar-thumb {
			border-radius: 10px;
			background-color: #bebebe;
		}


	}
	.tasks-lists{
		user-select: none;
		white-space: nowrap;
		overflow-x: auto;
		overflow-y: hidden;
		padding-bottom: 60px;
		min-height: calc(100vh - 48px);

		&::-webkit-scrollbar-track{
			border-radius: 8px;
			background-color: #f1f1f1;
		}
		&::-webkit-scrollbar {
			width: 5px;
			background-color: #f1f1f1;
		}
		&::-webkit-scrollbar-thumb {
			border-radius: 10px;
			background-color: #bebebe;
		}
	}

	.ghost-list {
        opacity: 0.5;
    }
</style>