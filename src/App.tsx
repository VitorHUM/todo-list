import { Header } from './components/Header';
import { TaskForm } from './components/TaskForm';

function App() {
	return (
		<>
			<Header />
			<main className="m-auto max-w-7xl p-5">
				<TaskForm />
			</main>
		</>
	);
}

export default App;
