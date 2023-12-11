import { useState } from 'react'

function Main() {
	const [task, setTask] = useState("");
	const [taskList, setTaskList] = useState([
		{ id: 1, text: 'Learn JavaScript', completed: true },
		{ id: 2, text: 'Learn React', completed: false },
		{ id: 3, text: 'Have a life!', completed: false },
	]);

	const [filterTasks, setFilterTasks] = useState('all');


	const onSubmit = (e) => {
		e.preventDefault();

		if (task === "") {
			return false;
		}

		setTaskList([...taskList, { id: taskList.length + 1, text: task, completed: false }]);
		setTask("");
	};

	const removeTask = (taskId) => {
		const updatedTask = taskList.filter(task => task.id !== taskId);
		setTaskList(updatedTask);
	};

	const handleTaskClick = (taskId) => {
		const newTaskList = taskList.map((task) =>
			task.id === taskId ? { ...task, completed: !task.completed } : task
		);
		setTaskList(newTaskList);
	};

	const handleFilterChange = (filter) => {
		setFilterTasks(filter);
	};

	const getFilteredTasks = () => {
		switch (filterTasks) {
			case 'active':
				return taskList.filter((task) => !task.completed);
			case 'completed':
				return taskList.filter((task) => task.completed);
			default:
				return taskList;
		}
	};

	const getTotalTaskCount = () => {
		return taskList.length;
	};

	const getActiveTaskCount = () => {
		return taskList.filter((task) => !task.completed).length;
	};

	const getCompletedTaskCount = () => {
		return taskList.filter((task) => task.completed).length;
	};

	const clearCompletedTasks = () => {
		const updatedTasks = taskList.filter((task) => !task.completed);
		setTaskList(updatedTasks);
	};


	return (
		<div>
			<section className="todoapp">
				<header className="header">
					<h1>todos</h1>
					<form onSubmit={onSubmit}>
						<input
							className="new-todo"
							placeholder="What needs to be done?"
							autoFocus
							name='text'
							value={task}
							onChange={(e) => setTask(e.target.value)}
						/>
					</form>

				</header>

				<section className="main">
					<input className="toggle-all" type="checkbox" />
					<label htmlFor="toggle-all">
						Mark all as complete
					</label>

					<ul className="todo-list">
						{getFilteredTasks().map((taskItem) => (
							<li key={taskItem.id}
								className={taskItem.completed ? "completed" : ""}
							>
								<div className="view">
									<input className="toggle" type="checkbox" onClick={() => handleTaskClick(taskItem.id)} />
									<label>{taskItem.text}</label>
									<button className="destroy" onClick={() => removeTask(taskItem.id)} ></button>
								</div>
							</li>
						))}
					</ul>
				</section>

				<footer className="footer">
					<span className="todo-count">
						<strong>
							{filterTasks === 'all'
								? getTotalTaskCount()
								: filterTasks === 'active'
									? getActiveTaskCount()
									: getCompletedTaskCount()}
						</strong>{' '}
						items left
					</span>

					<ul className="filters">
						<li>
							<a href="#/"
								className={filterTasks === 'all' ? 'selected' : ''}
								onClick={() => handleFilterChange('all')}
							>All</a>
						</li>
						<li>
							<a href="#/"
								className={filterTasks === 'active' ? 'selected' : ''}
								onClick={() => handleFilterChange('active')}
							>Active</a>
						</li>
						<li>
							<a href="#/"
								className={filterTasks === 'completed' ? 'selected' : ''}
								onClick={() => handleFilterChange('completed')}
							>Completed</a>
						</li>
					</ul>

					<button className="clear-completed"
						onClick={clearCompletedTasks}
					>
						Clear completed
					</button>
				</footer>
			</section>

			<footer className="info">
				<p>Click to edit a todo</p>
				<p>Created by <a href="https://d12n.me/">Dmitry Sharabin</a></p>
				<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
			</footer>

		</div>
	)
}

export default Main;