import { HistoryContainer, HistoryList, StatusRender } from './styles'
import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

function dateFormat(date: Date) {
	return formatDistanceToNow(date, {
		addSuffix: true,
		locale: ptBR,
	})
}

export function History() {
	const { cycles } = useContext(CyclesContext)

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
						{cycles
							.map((cycle) => {
								return (
									<tr key={cycle.id}>
										<td>{cycle.task}</td>
										<td>{cycle.duration}</td>
										<td>{dateFormat(cycle.startDate)}</td>
										<td>
											{cycle.finishDate && (
												<StatusRender statusColor='green'>
													Concluído
												</StatusRender>
											)}
											{cycle.interruptDate && (
												<StatusRender statusColor='red'>
													Interrompido
												</StatusRender>
											)}
											{!cycle.interruptDate &&
												!cycle.finishDate && (
													<StatusRender statusColor='yellow'>
														Em andamento
													</StatusRender>
												)}
										</td>
									</tr>
								)
							})
							.reverse()}
					</tbody>
				</table>
			</HistoryList>
		</HistoryContainer>
	)
}
