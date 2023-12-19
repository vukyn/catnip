import { NextUIProvider } from '@nextui-org/react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import IndexPage from './pages';
import './styles/global.css';
import PlaylistPage from './components/V2/pages/playlist';

const router = createBrowserRouter([
	{
		path: '/',
		element: <IndexPage />,
	},
	{
		path: '/playlist/:id',
		element: <PlaylistPage />,
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
