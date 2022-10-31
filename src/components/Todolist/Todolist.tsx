import { ITodo } from '../../interfaces';
import './Todolist.scss';

export interface TodosListProps {
	todos: ITodo[];
	setTodos: (a: ITodo[]) => void;
	status: string;
};

const Todolist: React.FC<TodosListProps> = ({ todos, setTodos, status }) => {

	const deleteTodo = (id: number) => {
		const newTodo = [...todos].filter(item => (item.id !== id))
		setTodos(newTodo);
	};

	const statusTodo = (id: number) => {
		let newTodo = [...todos].filter(item => {
			if (item.id === id) {
				item.status = !item.status
			}
			return item;
		})
		setTodos(newTodo);
	};

	return (
		<section className="main">
			<ul className="todo-list">
				{todos.map(item => {
					if (status !== 'all') {
						if (status !== 'active' && !item.status) {
							return null
						}
						if (status !== 'completed' && item.status) {
							return null
						}
					}
					return (
						<li
							key={item.id}
							className={item.status ? 'completed' : ''}>
							<div className="view">
								<input
									className="toggle"
									id={item.title}
									type="checkbox"
									onChange={() => statusTodo(item.id)}
									checked={item.status} />
								<label htmlFor={item.title}>{item.title}</label>
								<button
									type="button"
									className="closed"
									onClick={() => deleteTodo(item.id)}>
								</button>
							</div>
						</li>
					)
				})}
			</ul>
		</section>
	)
};

export { Todolist };