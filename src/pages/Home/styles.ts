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

export const FormContainer = styled.main`
	width: 100%;

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	flex-wrap: wrap;

	color: ${(props) => props.theme['gray-100']};
	font-size: 1.125rem;
	font-weight: bold;
`

const BaseInput = styled.input`
	height: 2.5rem;
	padding: 0 0.5rem;

	background: transparent;
	border: 0;
	border-bottom: 2px solid ${(props) => props.theme['gray-500']};

	font-size: inherit;
	font-weight: inherit;
	color: inherit;

	&::placeholder {
		color: ${(props) => props.theme['gray-500']};
	}

	&:focus {
		box-shadow: none;
		border-color: ${(props) => props.theme['green-500']};
	}
`

export const TaskInput = styled(BaseInput)`
	flex: 1;

	&::-webkit-calendar-picker-indicator {
		display: none !important;
	}
`

export const TimeInput = styled(BaseInput)`
	width: 4rem;
`

export const CountdownContainer = styled.main`
	display: flex;
	gap: 1rem;

	font-family: 'Roboto Mono';
	font-size: 10rem;
	line-height: 8rem;

	color: ${(props) => props.theme['gray-100']};

	& span {
		padding: 2rem 1rem;
		border-radius: 8px;
		background: ${(props) => props.theme['gray-700']};
	}

	& div {
		width: 4rem;
		padding: 2rem 0;

		display: flex;
		align-items: end;
		justify-content: center;

		color: ${(props) => props.theme['green-500']};
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
