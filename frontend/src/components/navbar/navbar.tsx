import { Input, Link, Navbar, NavbarContent, Autocomplete, AutocompleteItem, Avatar, Button } from "@nextui-org/react";
import React, { useEffect } from "react";
import { GithubIcon } from "src/components/icons/github-icon";
import { SearchIcon } from "src/components/icons/search-icon";
import { BurgerButton } from "./components/burger-button";
import { ThemeSwitcher } from "./components/theme-switcher";
import SearchInput from "./components/search-input";

interface Props {
	children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
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
					<SearchInput />
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
