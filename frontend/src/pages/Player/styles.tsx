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
			width: 25rem;
		}

		h3 {
			color: white;
			font-weight: 500;
		}
	}

	.items {
		width: 98%;
		display: flex;
		flex-direction: column;
		overflow: auto;
		align-self: center;
		margin-top: 1.5rem;
	}

	.playlistsToAdd {
		display: flex;
		gap: 2rem;
		justify-content: center;
		align-items: center;
		margin-top: -0.75rem;
		flex-wrap: wrap;
		width: 100%;
		z-index: 0;
		margin-top: 1rem;

		.artist {
			width: 144px;
			height: 144px;
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			font-weight: 500;
			font-size: 14pt;
			cursor: pointer;
			flex-direction: column;
			position: relative;

			.background {
				transition: all ease 500ms;
				background-repeat: no-repeat;
				background-position: center;
				background-size: 100%;
				width: 100%;
				height: 100%;
				border-radius: 100%;
				position: absolute;
			}
		}
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
