import { useState } from 'react';
import { useLockedBody } from '../hooks/useBodyLock';
import { SidebarContext } from './layout-context';
import { SidebarWrapper } from '../sidebar/sidebar';
import { NavbarWrapper } from '../navbar/navbar';

interface Props {
	children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [_, setLocked] = useLockedBody(false);
	const handleToggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
		setLocked(!sidebarOpen);
	};
	return (
		<SidebarContext.Provider
			value={{
				collapsed: sidebarOpen,
				setCollapsed: handleToggleSidebar,
			}}
		>
			<section className="flex">
				<SidebarWrapper />
				<NavbarWrapper>{children}</NavbarWrapper>
			</section>
		</SidebarContext.Provider>
	);
};
