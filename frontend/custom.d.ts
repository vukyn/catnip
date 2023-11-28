declare module '*.svg' {
	const content: any;
	export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
	export default content;
}

declare module '*.png' {
	const content: any;
	export const ReactComponent: React.FC<React.ImgHTMLAttributes<ImageData>>;
	export default content;
}
