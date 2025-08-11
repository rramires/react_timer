import { HistoryContainer, HistoryList, StatusRender } from './History.style'

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
							<td>
								<StatusRender statusColor='yellow'>Em andamento</StatusRender>
							</td>
						</tr>
						<tr>
							<td>Minha tarefa 1</td>
							<td>20 minutos</td>
							<td>Há duas horas</td>
							<td>
								<StatusRender statusColor='red'>Interrompido</StatusRender>
							</td>
						</tr>
						<tr>
							<td>Minha tarefa 1</td>
							<td>20 minutos</td>
							<td>Há duas horas</td>
							<td>
								<StatusRender statusColor='green'>Concluído</StatusRender>
							</td>
						</tr>
						<tr>
							<td>Minha tarefa 1</td>
							<td>20 minutos</td>
							<td>Há duas horas</td>
							<td>
								<StatusRender statusColor='green'>Concluído</StatusRender>
							</td>
						</tr>
						<tr>
							<td>Minha tarefa 1</td>
							<td>20 minutos</td>
							<td>Há duas horas</td>
							<td>
								<StatusRender statusColor='green'>Concluído</StatusRender>
							</td>
						</tr>
						<tr>
							<td>Minha tarefa 1</td>
							<td>20 minutos</td>
							<td>Há duas horas</td>
							<td>
								<StatusRender statusColor='green'>Concluído</StatusRender>
							</td>
						</tr>
						<tr>
							<td>Minha tarefa 1</td>
							<td>20 minutos</td>
							<td>Há duas horas</td>
							<td>
								<StatusRender statusColor='green'>Concluído</StatusRender>
							</td>
						</tr>
					</tbody>
				</table>
			</HistoryList>
		</HistoryContainer>
	)
}
