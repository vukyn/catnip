import { useSidebarContext } from "src/components/layout/layout-context";
import { StyledBurgerButton } from "./navbar.styles";

export const BurgerButton = () => {
	const { setCollapsed } = useSidebarContext();

	return (
		<div className={StyledBurgerButton()} onClick={setCollapsed}>
			<div />
			<div />
		</div>
	);
};
