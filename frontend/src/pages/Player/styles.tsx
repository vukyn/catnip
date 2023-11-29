import styled from "styled-components";

export const Container = styled.div`
	padding-bottom: 5.5rem;
	display: flex;
	flex-direction: column;

	.items {
		width: 98%;
		display: flex;
		flex-direction: column;
		overflow: auto;
		align-self: center;
		margin-top: 1.5rem;
	}

	.playlistsToAdd {
		margin-top: 1rem;
	}

	.items {
		width: 98%;
		display: flex;
		flex-direction: column;
		overflow: auto;
		align-self: center;
		margin-top: 1.5rem;
	}

	.queue {
		width: 92.5%;
		display: flex;
		flex-direction: column;
		position: relative;
		align-self: flex-end;
		margin-right: 1rem;
		margin-top: -0.5rem;

		#first {
			background: #111;
			margin-bottom: 0.75rem;
			cursor: auto;

			.title p:first-child {
				font-weight: 600;
			}

			.thumbnail {
				width: 96px;
				height: 96px;
				background-size: 192px;
			}
		}
	}

	@media (max-width: 1200px) {
		.queue {
			width: 90%;
		}
	}
`;
