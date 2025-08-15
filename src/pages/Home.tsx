import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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

/* interface FormData {
	task: string
	duration: number
} 
use in: useForm<FormData>	
*/

// get types from schema
type FormData = zod.infer<typeof validationSchema>

export function Home() {
	//
	const { register, handleSubmit, watch, formState, reset } =
		useForm<FormData>({
			defaultValues: {
				task: '',
				duration: 5,
			},
			resolver: zodResolver(validationSchema),
		})
	console.log('formState.errors: ', formState.errors)

	/*
	 * Notes:
	 * Types come from defaultValues
	 * Watch triggers rendering on each change
	 */
	const task = watch('task')
	const duration = watch('duration')
	const isSubimitDisabled = task.length < 3
	console.log('task: ', task, ' - duration: ', duration)

	function handleSubmitForm(data: FormData) {
		console.log('data->', data)

		reset() //change to defaultValues again
	}

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
