import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
/* import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod' */

import {
	HomeContainer,
	FormContainer,
	CountdownContainer,
	StartButton,
	TaskInput,
	TimeInput,
} from './Home.style'

/* const validationSchema = zod.object({
	task: zod.string().min(3, 'Informe a tarefa.'),
	duration: zod
		.string()
		.min(5, 'Ciclo menor que 5.')
		.max(60, 'Ciclo maior que 60.'),
}) */

export function Home() {
	const { register, handleSubmit, watch /* formState */ } =
		useForm(/* {
		resolver: zodResolver(validationSchema),
	} */)
	/* console.log('formState.errors: ', formState.errors) */

	const task = watch('task')
	const isSubimitDisabled = !task

	function handleSubmitForm(data: object) {
		console.log('data->', data)
	}

	return (
		<HomeContainer>
			<form onSubmit={handleSubmit(handleSubmitForm)} action=''>
				<FormContainer>
					<label htmlFor='task'>Vou trabalhar em</label>
					<TaskInput
						id='task'
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
						id='duration'
						type='number'
						step={5}
						min={5}
						max={60}
						defaultValue={5}
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
