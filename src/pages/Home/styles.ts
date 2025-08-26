import styled from 'styled-components'

export const HomeContainer = styled.main`
	flex: 1;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	& form {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3.5rem;
	}
`

export const BaseButton = styled.button`
	width: 100%;
	border: none;
	border-radius: 8px;

	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1rem;
	gap: 0.5rem;

	font-weight: bold;
	color: ${(props) => props.theme['gray-100']};

	cursor: pointer;

	&:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}
`

export const StartButton = styled(BaseButton)`
	background: ${(props) => props.theme['green-500']};

	&:not(:disabled):hover {
		background: ${(props) => props.theme['green-700']};
	}
`

export const StopButton = styled(BaseButton)`
	background: ${(props) => props.theme['red-500']};

	&:not(:disabled):hover {
		background: ${(props) => props.theme['red-700']};
	}
`
