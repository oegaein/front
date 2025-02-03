import React from 'react';
import './App.css';
import {
	BrowserRouter as Router,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from 'routes/AppRoutes';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

function App() {
	return (
		<div className="App">
			<QueryClientProvider client={queryClient}>
				{/* <React.StrictMode> */}
				<Router>
					<AppRoutes/>
				</Router>
				{/* </React.StrictMode> */}
			</QueryClientProvider>
		</div>
	);
}


export default App;
