import axios from 'axios'

export default {
	state: () => ({
		tasksData: JSON.parse(localStorage.getItem('VD_tasks')),
		loading: false,
	}),
	mutations: {
		loading(state, data){
			state.loading = data;
		},
		column(state, data){
			let column = state.tasksData.find((column, i) => {
				if (column.name === data.name) {
					if(data.tasks && data.tasks.length > 0)
						state.tasksData[i]['tasks'] = data.tasks;
					else if(data.task)
						state.tasksData[i]['tasks'].unshift(data.task);
					else if(data.delete)
						state.tasksData.splice(i, 1);
					else if(data.column)
						state.tasksData[i]['name'] = data.column;
					return true;
				}
			});
			if(!column){
				state.tasksData.push({name: data.name, tasks: data.tasks});
			}
			localStorage.setItem('VD_tasks', JSON.stringify(state.tasksData));
		},
		task(state, data){
			let taskUpdated = false; 
			state.tasksData.forEach((column, columnIndex) => {
				column.tasks.forEach((task, taskIndex) => {
					if (task.id == data.task) {
						if(data.update){
							state.tasksData[columnIndex].tasks[taskIndex][data.update.field] = data.update.value;
						} else if (data.delete) {
							state.tasksData[columnIndex].tasks.splice(taskIndex, 1);
						}
						taskUpdated = true;
						return;
					}
				});
				if(taskUpdated) return;
			});
			localStorage.setItem('VD_tasks', JSON.stringify(state.tasksData));
		},
		columns(state, data){
			state.tasksData = data;
			localStorage.setItem('VD_tasks', JSON.stringify(state.tasksData));
		},
		formatingColumns(state, data){
			let formatedData = []; 
			data.forEach((task) => {
				let findColumn = formatedData.find((column, i) => {
					if (column.name === task.status) {
						formatedData[i]['tasks'].push(task);
						return true;
					}
				});
				if(!findColumn){
					formatedData.push({ name: task.status, tasks: [task]});
				}
			});
			state.tasksData = formatedData;
			localStorage.setItem('VD_tasks', JSON.stringify(state.tasksData));
		},
	},
	getters: {
		loading: state => {
			return state.loading;
		},
		columns: state => {
			return state.tasksData;
		},
		column: state => columnName => {
			return state.tasksData.find((column) => column.name == columnName)
		},
		task: state => taskID => {
			let returnTask = false; 
			state.tasksData.forEach((column, columnIndex) => {
				column.tasks.forEach((task, taskIndex) => {
					if (task.id == taskID) {
						returnTask = state.tasksData[columnIndex]['tasks'][taskIndex];
						return;
					}
				});
				if(returnTask) return;
			});
			return returnTask;
		}
	},
	actions: {
		export(context){
			axios.post(process.env.VUE_APP_API_URL+'/task/sync', {columns: context.getters.columns}).then(response => {
				if(response.data.status) {
					context.commit('formatingColumns', response.data.data);
				}
			});
		},
		import(context){
			axios.get(process.env.VUE_APP_API_URL+'/task/get').then(response => {
				if(response.data.status) {
					context.commit('formatingColumns', response.data.data);
				}
			});
		},
	},
}
