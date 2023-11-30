import { toast } from 'react-toastify';

export const notificate = (type: string, title: string, close?: number) => {
	toast(title, {
		// @ts-ignore
		type,
		draggable: true,
		theme: 'dark',
		closeOnClick: true,
		autoClose: close || 5000,
		position: 'top-right',
	});
};

export const confirm = (title: string, handler: Function) => {
	toast.warn(title, {
		draggable: false,
		theme: 'dark',
		closeOnClick: true,
		autoClose: 10000,
		position: 'top-right',
		onClick: () => handler(),
	});
};
