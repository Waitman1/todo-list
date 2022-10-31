import { AddTodo } from "../AddTodo";
import { TodoAddProps } from "../AddTodo";

import './Header.scss';


const Header: React.FC<TodoAddProps> = ({ todos, setTodos, status }) => {
	return (
		<div className="header">
			<h1 className="header__title">todos</h1>
			<AddTodo
				todos={todos}
				setTodos={setTodos}
				status={status}
			/>
		</div>
	)
};

export { Header };