type Props = {
	className?: string;
	width?: number;
	height?: number;
};

export const EditIcon = ({ width, height = 24, className }: Props) => {
	return (
		<svg width={width} height={height} className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M20.9888 4.28491L19.6405 2.93089C18.4045 1.6897 16.4944 1.6897 15.2584 2.93089L13.0112 5.30042L18.7416 11.055L21.1011 8.68547C21.6629 8.1213 22 7.33145 22 6.54161C22 5.75176 21.5506 4.84908 20.9888 4.28491Z"
				fill="#60626a"
			/>
			<path
				d="M16.2697 10.9422L11.7753 6.42877L2.89888 15.3427C2.33708 15.9069 2 16.6968 2 17.5994V21.0973C2 21.5487 2.33708 22 2.89888 22H6.49438C7.2809 22 8.06742 21.6615 8.74157 21.0973L17.618 12.1834L16.2697 10.9422Z"
				fill="#60626a"
			/>
		</svg>
	);
};