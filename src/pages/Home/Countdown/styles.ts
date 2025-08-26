import styled from 'styled-components'

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
