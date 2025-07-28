import styled, { css } from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonContainerProps {
	variant: ButtonVariant
}

const buttonVariants = {
	primary: 'purple',
	secondary: 'orange',
	danger: 'red',
	success: 'green',
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
	width: 10rem;
	height: 3rem;
	font-weight: bold;

	${(props) => {
		return css`
			background-color: ${buttonVariants[props.variant]};
		`
	}}
`
