import { useState } from 'react';
import { AcmeIcon } from '../icons/acme-icon';

export const CompaniesDropdown = () => {
	const [logo, setLogo] = useState<Logo>({
		name: 'Acme Co.',
		img: <AcmeIcon />,
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
