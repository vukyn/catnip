import { useState } from "react";
import { Logo } from "../../../../types/logo";
import Appicon from "../../../assets/appicon.png";

export const CompaniesDropdown = () => {
	const [logo, setLogo] = useState<Logo>({
		name: "Catnip",
		img: <img style={{ width: 50, height: 50, borderRadius: 10 }} src={Appicon} />,
	});
	return (
		<div className="flex items-center gap-2">
			{logo.img}
			<div className="flex flex-col gap-4">
				<h3 className="text-xl font-medium m-0 text-default-900 -mb-4 whitespace-nowrap">{logo.name}</h3>
			</div>
		</div>
	);
};
