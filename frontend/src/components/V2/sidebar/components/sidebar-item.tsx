import React from "react";
import { useSidebarContext } from "../../layout/layout-context";
import clsx from "clsx";
import { Link } from "@nextui-org/react";

interface Props {
	title: string;
	icon: React.ReactNode;
	isActive?: boolean;
	href?: string;
	onClick?: () => void;
}

export const SidebarItem = ({ icon, title, isActive, href = "", onClick }: Props) => {
	const { collapsed, setCollapsed } = useSidebarContext();

	const handleClick = () => {
		if (window.innerWidth < 768) {
			setCollapsed();
		}
	};
	return href !== "" ? (
		<Link href={href} onClick={onClick} className="text-default-900 active:bg-none max-w-full">
			<div
				className={clsx(
					isActive ? "bg-primary-100 [&_svg_path]:fill-primary-500" : "hover:bg-default-100",
					"flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]"
				)}
				onClick={handleClick}
			>
				{icon}
				<span className="text-default-900">{title}</span>
			</div>
		</Link>
	) : (
		<div
			className={clsx(
				isActive ? "bg-primary-100 [&_svg_path]:fill-primary-500" : "hover:bg-default-100",
				"flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]"
			)}
			onClick={onClick}
		>
			{icon}
			<span className="text-default-900">{title}</span>
		</div>
	);
};
