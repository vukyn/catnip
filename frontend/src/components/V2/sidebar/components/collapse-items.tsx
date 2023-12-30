import React from "react";
import { ChevronUpIcon } from "../../icons/chevron-icon";
import { Accordion, AccordionItem, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { ViewIcon } from "../../icons/view-icon";
import { EditIcon } from "../../icons/edit-icon";
import { DeleteIcon } from "../../icons/delete-icon";
import { useCustomTheme } from "../../hooks/useCustomTheme";

interface Props {
	icon: React.ReactNode;
	title: string;
	items: ItemProps[];
}

export interface ItemProps {
	id: string;
	title: string;
	isDefault: boolean;
	onClick: () => void;
	canDelete?: boolean;
	onDelete: (key: string) => void;
}

export const CollapseItems = ({ icon, items, title }: Props) => {
	const { themeClass } = useCustomTheme();
	return (
		<div className="flex gap-2 h-full items-center cursor-pointer">
			<Accordion className="px-0">
				<AccordionItem
					indicator={<ChevronUpIcon />}
					classNames={{
						indicator: "data-[open=true]:-rotate-180",
						trigger: "py-0 min-h-[44px] hover:bg-default-100 rounded-xl active:scale-[0.98] transition-transform px-3.5",

						title: "px-0 flex text-base gap-2 h-full items-center cursor-pointer",
					}}
					aria-label="Accordion 1"
					title={
						<div className="flex flex-row gap-2">
							<span>{icon}</span>
							<span>{title}</span>
						</div>
					}
				>
					<div className="pl-8">
						{items.map((item, index) =>
							item.isDefault ? (
								<Button
									key={index}
									className="w-full flex flex-row gap-2 justify-start text-left"
									variant="light"
									onClick={item.onClick}
								>
									{item.title}
								</Button>
							) : (
								<Dropdown key={index} className={themeClass} placement="right-start">
									<DropdownTrigger>
										<Button key={index} className="w-full flex flex-row gap-2 justify-start text-left" variant="light">
											{item.title}
										</Button>
									</DropdownTrigger>
									<DropdownMenu disabledKeys={item.canDelete ? undefined : ["remove"]}>
										<DropdownItem key="view" startContent={<ViewIcon width={16} height={16} />} onClick={item.onClick}>
											Go to
										</DropdownItem>
										<DropdownItem key="edit" startContent={<EditIcon width={16} height={16} />}>
											Edit
										</DropdownItem>
										<DropdownItem
											key="remove"
											className="text-danger"
											color="danger"
											startContent={<DeleteIcon width={16} height={16} />}
											onClick={item.onDelete && (() => item.onDelete(item.id ?? ""))}
										>
											Remove
										</DropdownItem>
									</DropdownMenu>
								</Dropdown>
							)
						)}
					</div>
				</AccordionItem>
			</Accordion>
		</div>
	);
};
