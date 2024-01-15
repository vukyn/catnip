import { Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react";
import { SearchIcon } from "src/components/icons/search-icon";
import { SAVED_SONGS } from "src/constants/local_storage";
import { useTheme } from "src/hooks/useTheme";
import { IItem } from "src/types";

const Index = () => {
	const { themeClass } = useTheme();
	const Items: IItem[] = JSON.parse(window.localStorage.getItem(SAVED_SONGS)!) ?? [];

	return (
		<Autocomplete
			className={"w-full"}
			defaultItems={Items}
			inputProps={{
				classNames: {
					input: "ml-1",
					inputWrapper: "h-[48px]",
				},
			}}
			listboxProps={{
				hideSelectedIcon: true,
				itemClasses: {
					base: [
						"rounded-medium",
						"text-default-500",
						"transition-opacity",
						"data-[hover=true]:text-foreground",
						"dark:data-[hover=true]:bg-default-50",
						"data-[pressed=true]:opacity-70",
						"data-[hover=true]:bg-default-200",
						"data-[selectable=true]:focus:bg-default-100",
						"data-[focus-visible=true]:ring-default-500",
					],
				},
			}}
			placeholder="Search..."
			popoverProps={{
				offset: 10,
				classNames: {
					base: "rounded-large",
					content: "p-1 border-small border-default-100 " + themeClass,
				},
			}}
			startContent={<SearchIcon />}
			radius="full"
			variant="bordered"
			onSelectionChange={(key) => {
				// TODO: play song here
			}}
		>
			{(item) => (
				<AutocompleteItem key={item.video_id} textValue={item.title}>
					<div className="flex justify-between items-center">
						<div className="flex gap-2 items-center">
							<Avatar alt={item.thumbnail} className="flex-shrink-0" size="sm" src={item.thumbnail} />
							<div className="flex flex-col">
								<span className="text-small">{item.title}</span>
								<span className="text-tiny text-default-400">{item.author}</span>
							</div>
						</div>
					</div>
				</AutocompleteItem>
			)}
		</Autocomplete>
	);
};

export default Index;
