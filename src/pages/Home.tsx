import { Play } from 'phosphor-react'
import {
	HomeContainer,
	FormContainer,
	CountdownContainer,
	StartButton,
	TaskInput,
	TimeInput,
} from './Home.style'
import { useState } from 'react'

export function Home() {
	const [task, setTask] = useState('')
	const [duration, setDuration] = useState(5)

	return (
		<HomeContainer>
			<form action=''>
				<FormContainer>
					<label htmlFor='task'>Vou trabalhar em</label>
					<TaskInput
						id='task'
						type='text'
						placeholder='Dê um nome para sua tarefa'
						list='task-suggestions'
						onChange={(event) => setTask(event.target.value)}
						value={task}
					/>
					<datalist id='task-suggestions'>
						<option value='Tarefa 1' />
						<option value='Tarefa 2' />
						<option value='Tarefa 3' />
						<option value='Outra sujestão' />
					</datalist>
					<label htmlFor='minutes'>Durante</label>
					<TimeInput
						id='minutes'
						type='number'
						step={5}
						min={5}
						max={60}
						placeholder='00'
						onChange={(event) => setDuration(Number(event.target.value))}
						value={duration}
					/>
					<span>minutos.</span>
				</FormContainer>
				<CountdownContainer>
					<span>0</span>
					<span>0</span>
					<div>:</div>
					<span>0</span>
					<span>0</span>
				</CountdownContainer>
				<StartButton type='submit' disabled={task.length < 3}>
					Começar
					<Play size={24} />
				</StartButton>
			</form>
		</HomeContainer>
	)
}
