import { Input, Link, Navbar, NavbarContent } from "@nextui-org/react";
import React from "react";
import { GithubIcon } from "../icons/github-icon";
import { SearchIcon } from "../icons/search-icon";
import { NotificationsDropdown } from "./components/notifications-dropdown";
import { UserDropdown } from "./components/user-dropdown";
import { SupportIcon } from "../icons/support-icon";
import { BurgerButton } from "./components/burger-button";
import { ThemeSwitcher } from "./components/theme-switcher";

interface Props {
	children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
	const [searchText, setSearchText] = React.useState("");

	return (
		<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
			<Navbar
				isBordered
				className="w-full"
				classNames={{
					wrapper: "w-full max-w-full",
				}}
			>
				<NavbarContent className="md:hidden">
					<BurgerButton />
				</NavbarContent>
				<NavbarContent className="w-full max-md:hidden">
					<Input
						disabled
						startContent={<SearchIcon />}
						isClearable
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
						onClear={() => setSearchText("")}
						className="w-full"
						placeholder="Search..."
					/>
				</NavbarContent>
				<NavbarContent justify="end" className="w-fit data-[justify=end]:flex-grow-0">
					<Link href="https://github.com/vukyn" target={"_blank"}>
						<GithubIcon />
					</Link>
					<div className="flex items-center gap-2">
						<ThemeSwitcher />
					</div>

					{/* <NotificationsDropdown /> */}

					{/* <div className="max-md:hidden">
						<SupportIcon />
					</div> */}
					{/* <NavbarContent>
						<UserDropdown />
					</NavbarContent> */}
				</NavbarContent>
			</Navbar>
			{children}
		</div>
	);
};
