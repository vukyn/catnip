import { NextUIProvider } from '@nextui-org/react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import IndexPage from './pages';
import './styles/global.css';
import PlaylistPage from './components/V2/pages/playlist';
import App from './app';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/home',
				element: <IndexPage />,
			},
			{
				path: '/playlist/:id',
				element: <PlaylistPage />,
			},
		],
	},
]);


const root = createRoot(document.querySelector('#root')!);
root.render(
	<NextUIProvider>
		<RouterProvider router={router} />
	</NextUIProvider>
);
