import { Header } from './components/Header';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';

function App() {
	return (
		<>
			<Header />
			<main className="m-auto flex max-w-7xl flex-col gap-8 p-5">
				<TaskForm />
				<TaskList />
			</main>
		</>
	);
}

export default App;
