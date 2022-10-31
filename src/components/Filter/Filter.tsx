import { useState, useEffect } from "react";
import { ITodo } from "../../interfaces";
import './Filter.scss';

interface FilterProps {
	todos: ITodo[];
	setTodos: (a: ITodo[]) => void;
	status: string;
	setStatus: (text: string) => void;
};

const Filter: React.FC<FilterProps> = ({ todos, setTodos, status, setStatus }) => {

	const [todosCounter, setTodosCounter] = useState<number>(0);
	const [isItemCompleted, setIsItemCompleted] = useState<boolean>(true);

	useEffect(() => {
		setTodosCounter(todos.filter(item => !item.status).length);
		setIsItemCompleted(todos.some(item => item.status))
	}, [todos]);


	const deleteCompletedTodo = () => {
		const newTodo = todos.filter(item => !item.status)
		setTodos(newTodo)
	};

	return (
		<footer className="footer">
			<span className="todo-count">
				<strong>
					{todosCounter} items left
				</strong>
			</span>
			<ul className="filters">
				<li>
					<button
						onClick={() => { setStatus('all') }}
						className={status === 'all' ? 'selected' : ''}>All</button>
				</li>
				<li>
					<button
						className={status === 'active' ? 'selected' : ''}
						onClick={() => { setStatus('active') }}>Active</button>
				</li>
				<li>
					<button
						className={status === 'completed' ? 'selected' : ''}
						onClick={() => { setStatus('completed') }}>Completed</button>
				</li>
			</ul>
			<button
				onClick={() => { deleteCompletedTodo() }}
				className={isItemCompleted ? 'clear-completed' : 'clear-completed-none'}>
				Clear completed
			</button>
		</footer>
	);
};

export { Filter };