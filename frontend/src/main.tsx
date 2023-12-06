import { NextUIProvider } from '@nextui-org/react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import IndexPage from './pages';
import './styles/global.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <IndexPage />,
	},
]);

const App = () => {
	return (
		<NextUIProvider>
			<RouterProvider router={router} />
		</NextUIProvider>
	);
};

createRoot(document.querySelector('#root')!).render(<App />);
