import { NextUIProvider } from '@nextui-org/react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import IndexPage from './pages';
import './styles/global.css';
import { StrictMode } from 'react';

const router = createBrowserRouter([
	{
		path: '/',
		element: <IndexPage />,
	},
]);

const App = () => {
	return (
		<StrictMode>
			<NextUIProvider>
				<RouterProvider router={router} />
			</NextUIProvider>
		</StrictMode>
	);
};

createRoot(document.querySelector('#root')!).render(<App />);
