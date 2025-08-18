import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import * as zod from 'zod'

import {
	HomeContainer,
	FormContainer,
	CountdownContainer,
	StartButton,
	TaskInput,
	TimeInput,
} from './Home.style'

const validationSchema = zod.object({
	task: zod.string().min(3, 'Informe a tarefa.'),
	duration: zod
		.number()
		.min(5, 'Ciclo menor que 5.')
		.max(60, 'Ciclo maior que 60.'),
})

// get types from schema
type FormData = zod.infer<typeof validationSchema>

interface Cycle {
	id: string
	task: string
	duration: number
}

export function Home() {
	// States
	const [cycles, setCycles] = useState<Cycle[]>([])
	const [activeCycleId, SetActiveCycleId] = useState<string | null>(null)

	// Validation
	const { register, handleSubmit, watch, reset } = useForm<FormData>({
		defaultValues: {
			task: '',
			duration: 5,
		},
		resolver: zodResolver(validationSchema),
	})

	const task = watch('task')
	const isSubimitDisabled = task.length < 3

	// Submit
	function handleSubmitForm(data: FormData) {
		const newId: string = new Date().getTime().toString()

		const newCycle: Cycle = {
			id: newId,
			task: data.task,
			duration: data.duration,
		}

		setCycles(() => [...cycles, newCycle])
		SetActiveCycleId(newId)

		reset()
	}

	// Actual/active cycle
	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

	console.log('activeCycle: ', activeCycle)

	return (
		<HomeContainer>
			<form onSubmit={handleSubmit(handleSubmitForm)}>
				<FormContainer>
					<label htmlFor='task'>Vou trabalhar em</label>
					<TaskInput
						type='text'
						placeholder='Dê um nome para sua tarefa'
						list='task-suggestions'
						{...register('task')}
					/>
					<datalist id='task-suggestions'>
						<option value='Tarefa 1' />
						<option value='Tarefa 2' />
						<option value='Tarefa 3' />
						<option value='Outra sujestão' />
					</datalist>
					<label htmlFor='minutes'>Durante</label>
					<TimeInput
						type='number'
						step={5}
						min={5}
						max={60}
						placeholder='00'
						{...register('duration', { valueAsNumber: true })}
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
				<StartButton type='submit' disabled={isSubimitDisabled}>
					Começar
					<Play size={24} />
				</StartButton>
			</form>
		</HomeContainer>
	)
}
