import styled from 'styled-components'

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
