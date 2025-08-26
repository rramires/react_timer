import { HandPalm, Play } from 'phosphor-react'

import { HomeContainer, StartButton, StopButton } from './styles'
import { NewCycleForm } from './NewCycleForm'
import { Countdown } from './Countdown'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CyclesContext } from '../../contexts/CyclesContext'
import { useContext } from 'react'

export function Home() {
	// get context
	const { activeCycle, createNewCycle, interruptCycle } =
		useContext(CyclesContext)

	// validation
	const validationSchema = zod.object({
		task: zod.string().min(3, 'Informe a tarefa.'),
		duration: zod
			.number()
			.min(1, 'Ciclo menor que 5.')
			.max(60, 'Ciclo maior que 60.'),
	})

	// get types from schema
	type FormData = zod.infer<typeof validationSchema>

	// Validation
	const newCycleForm = useForm<FormData>({
		defaultValues: {
			task: '',
			duration: 5,
		},
		resolver: zodResolver(validationSchema),
	})
	const { handleSubmit, watch, reset } = newCycleForm

	const task = watch('task')
	const isSubimitDisabled = task.length < 3

	function handleCreateNewCycle(data: FormData) {
		createNewCycle(data)
		reset()
	}

	return (
		<HomeContainer>
			<form onSubmit={handleSubmit(handleCreateNewCycle)}>
				<FormProvider {...newCycleForm}>
					<NewCycleForm />
				</FormProvider>
				<Countdown />
				{activeCycle ? (
					<StopButton type='button' onClick={interruptCycle}>
						Interromper
						<HandPalm size={24} />
					</StopButton>
				) : (
					<StartButton type='submit' disabled={isSubimitDisabled}>
						Começar
						<Play size={24} />
					</StartButton>
				)}
			</form>
		</HomeContainer>
	)
}
