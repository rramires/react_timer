import { HistoryContainer, HistoryList, StatusRender } from './styles'
import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'

export function History() {
	const { cycles } = useContext(CyclesContext)

	return (
		<HistoryContainer>
			<h1>Meu histórico</h1>
			<pre>{JSON.stringify(cycles, null, 2)}</pre>
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
								<StatusRender statusColor='yellow'>
									Em andamento
								</StatusRender>
							</td>
						</tr>
						<tr>
							<td>Minha tarefa 1</td>
							<td>20 minutos</td>
							<td>Há duas horas</td>
							<td>
								<StatusRender statusColor='red'>
									Interrompido
								</StatusRender>
							</td>
						</tr>
						<tr>
							<td>Minha tarefa 1</td>
							<td>20 minutos</td>
							<td>Há duas horas</td>
							<td>
								<StatusRender statusColor='green'>
									Concluído
								</StatusRender>
							</td>
						</tr>
						<tr>
							<td>Minha tarefa 1</td>
							<td>20 minutos</td>
							<td>Há duas horas</td>
							<td>
								<StatusRender statusColor='green'>
									Concluído
								</StatusRender>
							</td>
						</tr>
						<tr>
							<td>Minha tarefa 1</td>
							<td>20 minutos</td>
							<td>Há duas horas</td>
							<td>
								<StatusRender statusColor='green'>
									Concluído
								</StatusRender>
							</td>
						</tr>
						<tr>
							<td>Minha tarefa 1</td>
							<td>20 minutos</td>
							<td>Há duas horas</td>
							<td>
								<StatusRender statusColor='green'>
									Concluído
								</StatusRender>
							</td>
						</tr>
						<tr>
							<td>Minha tarefa 1</td>
							<td>20 minutos</td>
							<td>Há duas horas</td>
							<td>
								<StatusRender statusColor='green'>
									Concluído
								</StatusRender>
							</td>
						</tr>
					</tbody>
				</table>
			</HistoryList>
		</HistoryContainer>
	)
}
