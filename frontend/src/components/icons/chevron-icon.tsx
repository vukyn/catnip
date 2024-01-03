import React from "react";

interface Props extends React.SVGAttributes<SVGElement> {}

export const ChevronUpIcon = ({ ...props }: Props) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
			<path className="fill-default-400" d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"></path>
		</svg>
	);
};

export const ChevronRightIcon = ({ ...props }: Props) => {
	return (
		<svg width="24" height="24" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				d="M8 16a.999.999 0 01-.707-1.707L11.586 10 7.293 5.707a.999.999 0 111.414-1.414l5 5a.999.999 0 010 1.414l-5 5A.997.997 0 018 16z"
				fill="#5C5F62"
			/>
		</svg>
	);
};

export const ChevronLeftIcon = ({ ...props }: Props) => {
	return (
		<svg width="24" height="24" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				d="M12 16a.997.997 0 01-.707-.293l-5-5a.999.999 0 010-1.414l5-5a.999.999 0 111.414 1.414L8.414 10l4.293 4.293A.999.999 0 0112 16z"
				fill="#5C5F62"
			/>
		</svg>
	);
};
