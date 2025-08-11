import { HistoryContainer, HistoryList } from './History.style'

export function History() {
	return (
		<HistoryContainer>
			<h1>Meu histórico</h1>
			<HistoryList>
				<table>
					<thead>
						<tr>
							<th>Tarefa</th>
							<th>Duração</th>
							<th>Início</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Minha tarefa 1</td>
							<td>20 minutos</td>
							<td>Há duas horas</td>
							<td>Em andamento</td>
						</tr>
						<tr>
							<td>Minha tarefa 1</td>
							<td>20 minutos</td>
							<td>Há duas horas</td>
							<td>Interrompido</td>
						</tr>
						<tr>
							<td>Minha tarefa 1</td>
							<td>20 minutos</td>
							<td>Há duas horas</td>
							<td>Concluído</td>
						</tr>
						<tr>
							<td>Minha tarefa 1</td>
							<td>20 minutos</td>
							<td>Há duas horas</td>
							<td>Concluído</td>
						</tr>
						<tr>
							<td>Minha tarefa 1</td>
							<td>20 minutos</td>
							<td>Há duas horas</td>
							<td>Concluído</td>
						</tr>
						<tr>
							<td>Minha tarefa 1</td>
							<td>20 minutos</td>
							<td>Há duas horas</td>
							<td>Concluído</td>
						</tr>
						<tr>
							<td>Minha tarefa 1</td>
							<td>20 minutos</td>
							<td>Há duas horas</td>
							<td>Concluído</td>
						</tr>
					</tbody>
				</table>
			</HistoryList>
		</HistoryContainer>
	)
}
