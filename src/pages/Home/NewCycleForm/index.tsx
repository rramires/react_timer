import { FormContainer, TaskInput, TimeInput } from './styles'
import { useContext } from 'react'
import { CyclesContext } from '../../../contexts/CyclesContext'
import { useFormContext } from 'react-hook-form'

export function NewCycleForm() {
	// context
	const { activeCycle } = useContext(CyclesContext)
	const { register } = useFormContext()

	return (
		<FormContainer>
			<label htmlFor='task'>Vou trabalhar em</label>
			<TaskInput
				id='task'
				type='text'
				placeholder='Dê um nome para sua tarefa'
				list='task-suggestions'
				disabled={!!activeCycle}
				{...register('task')}
			/>
			<datalist id='task-suggestions'>
				<option value='Tarefa 1' />
				<option value='Tarefa 2' />
				<option value='Tarefa 3' />
				<option value='Outra sujestão' />
			</datalist>
			<label htmlFor='duration'>Durante</label>
			<TimeInput
				id='duration'
				type='number'
				step={5}
				min={5}
				max={60}
				placeholder='00'
				disabled={!!activeCycle}
				{...register('duration', { valueAsNumber: true })}
			/>
			<span>minutos.</span>
		</FormContainer>
	)
}
