import React from 'react';
import { Sidebar } from './sidebar.styles';
import { CompaniesDropdown } from './sidebar-logo';
import { HomeIcon } from '../icons/home-icon';
import { AccountIcon } from '../icons/account-icon';
import { SidebarItem } from './sidebar-item';
import { SidebarMenu } from './sidebar-menu';
import { useSidebarContext } from '../layout/layout-context';
import { useLocation } from 'react-router-dom';

export const SidebarWrapper = () => {
	const { pathname } = useLocation();
	const { collapsed, setCollapsed } = useSidebarContext();

	return (
		<aside className="h-screen z-[202] sticky top-0">
			{collapsed ? <div className={Sidebar.Overlay()} onClick={setCollapsed} /> : null}
			<div
				className={Sidebar({
					collapsed: collapsed,
				})}
			>
				<div className={Sidebar.Header()}>
					<CompaniesDropdown />
				</div>
				<div className="flex flex-col justify-between h-full">
					<div className={Sidebar.Body()}>
						<SidebarItem title="Home" icon={<HomeIcon />} isActive={pathname === '/'} href="/" />
						<SidebarMenu title="Main Menu">
							<SidebarItem isActive={pathname === '/accounts'} title="Accounts" icon={<AccountIcon />} href="accounts" />
						</SidebarMenu>
					</div>
				</div>
			</div>
		</aside>
	);
};
