import styled from 'styled-components';

export const Container = styled.div`
	padding-bottom: 5.5rem;
	display: flex;
	flex-direction: column;

	.empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		position: absolute;
		top: 50%;
		left: 50%;
		right: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		height: 100%;
		margin-top: 2.5rem;

		img {
			padding-top: 25px;
			width: 30rem;
		}

		h3 {
			color: black;
			font-weight: 500;
		}
	}
`;
