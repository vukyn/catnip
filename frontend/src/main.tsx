import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import { NextUIProvider } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useDarkMode from "use-dark-mode";
import Index from ".";
import PlaylistPage from "./components/V2/pages/playlist";
import IndexPage from "./pages";

export const App = () => {
	const darkMode = useDarkMode(false);
	const navigate = useNavigate();
	return (
		<NextUIProvider navigate={navigate}>
			<main className={`${darkMode.value ? "dark" : "light"} text-foreground bg-background`}>
				<ToastContainer autoClose={2000} newestOnTop theme={darkMode.value ? "dark" : "light"} />
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
