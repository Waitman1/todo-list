import { useState, useEffect } from 'react';
import { ITodo } from '../../interfaces';
import './AddTodo.scss';


export interface TodoAddProps {
	todos: ITodo[];
	setTodos: (a: ITodo[]) => void;
	status: string;
};

const AddTodo: React.FC<TodoAddProps> = ({ todos, setTodos, status }) => {

	const [value, setValue] = useState<string>('');
	const [defaultChecked, setDefaultChecked] = useState<boolean>(false);

	useEffect(() => {
		const checked = todos.every(item => item.status === false)
		setDefaultChecked(checked);
	}, []);

	const handleClick = (checked: any) => {
		const inversionStatusTodo = todos.map(item => {
			if (status !== 'all') {
				if (status === 'active' && item.status) {
					return {
						...item,
						status: checked
					}
				}
				if (status === 'completed' && !item.status) {
					return {
						...item,
						status: checked
					}
				}
			}
			return {
				...item,
				status: checked
			}
		});
		setTodos(inversionStatusTodo);
	};

	const saveTodo = () => {
		if (value) {
			setTodos(
				[...todos, {
					id: Date.now(),
					title: value,
					status: false
				}]
			)
			setValue('');
		}
	};

	const onKeyDown = (event: { keyCode: number; }) => {
		if (event.keyCode === 13) {
			saveTodo();
		}
	};

	return (
		<div className="addTodo">
			<input
				type='checkbox'
				className="toggle-all"
				defaultChecked={defaultChecked}
				onChange={(e) => handleClick(e.target.checked)}
			/>
			<input
				className="new-todo"
				placeholder="What needs to be done?"
				value={value}
				onKeyDown={onKeyDown}
				onChange={(e) => setValue(e.target.value)}
			/>
		</div>
	);
};

export { AddTodo };