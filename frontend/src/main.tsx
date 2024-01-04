import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import { NextUIProvider } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Index from ".";
import PlaylistPage from "src/pages/playlist";
import IndexPage from "./pages";
import { useTheme } from "./hooks/useTheme";

export const App = () => {
	const { isDarkMode, themeClass } = useTheme();
	const navigate = useNavigate();
	return (
		<NextUIProvider navigate={navigate}>
			<main className={themeClass}>
				<ToastContainer autoClose={2000} newestOnTop theme={isDarkMode ? "dark" : "light"} />
				<Index />
			</main>
		</NextUIProvider>
	);
};

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <IndexPage />,
			},
			{
				path: "/playlist/:id",
				element: <PlaylistPage />,
			},
		],
	},
]);

const root = createRoot(document.querySelector("#root")!);
root.render(<RouterProvider router={router} />);
