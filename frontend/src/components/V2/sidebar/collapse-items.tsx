import React from 'react';
import { ChevronUpIcon } from '../icons/chevron-up-icon';
import { Accordion, AccordionItem, Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

interface Props {
	icon: React.ReactNode;
	title: string;
	items: ItemProps[];
}

export interface ItemProps {
	id: string;
	title: string;
	onClick: () => void;
	canDelete?: boolean;
	onDelete: (key: string) => void;
}

export const CollapseItems = ({ icon, items, title }: Props) => {
	return (
		<div className="flex gap-2 h-full items-center cursor-pointer">
			<Accordion className="px-0">
				<AccordionItem
					indicator={<ChevronUpIcon />}
					classNames={{
						indicator: 'data-[open=true]:-rotate-180',
						trigger: 'py-0 min-h-[44px] hover:bg-default-100 rounded-xl active:scale-[0.98] transition-transform px-3.5',

						title: 'px-0 flex text-base gap-2 h-full items-center cursor-pointer',
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
							item.canDelete ? (
								<Popover key={index} placement="right">
									<PopoverTrigger>
										<Button
											key={index}
											className="w-full flex flex-row gap-2 justify-start text-left"
											variant="light"
											onClick={item.onClick}
										>
											{item.title}
										</Button>
									</PopoverTrigger>
									<PopoverContent>
										<Button
											key={index}
											size="sm"
											variant="light"
											// style={{ pointerEvents: 'none' }}
											onClick={item.onDelete && (() => item.onDelete(item.id ?? ''))}
										>
											Remove
										</Button>
									</PopoverContent>
								</Popover>
							) : (
								<Button
									key={index}
									className="w-full flex flex-row gap-2 justify-start text-left"
									variant="light"
									onClick={item.onClick}
								>
									{item.title}
								</Button>
							)
						)}
					</div>
				</AccordionItem>
			</Accordion>
		</div>
	);
};
