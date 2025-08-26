import { HandPalm, Play } from 'phosphor-react'
import { useState, createContext } from 'react'

import { HomeContainer, StartButton, StopButton } from './styles'
import { NewCycleForm } from './NewCycleForm'
import { Countdown } from './Countdown'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

interface Cycle {
	id: string
	task: string
	duration: number
	startDate: Date
	interruptDate?: Date
	finishDate?: Date
}

// context
interface CyclesContextTypes {
	activeCycle: Cycle | undefined
	activeCycleId: string | null
	secondsPassed: number
	setSecondsPassed: (seconds: number) => void
	setCycleFinished: () => void
}
export const CyclesContext = createContext({} as CyclesContextTypes)

export function Home() {
	// States
	const [cycles, setCycles] = useState<Cycle[]>([])
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
	const [secondsPassed, setSecondsPassed] = useState(0)

	// Actual/active cycle
	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

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

	// Submit
	function handleSubmitForm(data: FormData) {
		const startDate: Date = new Date()
		const newId = startDate.getTime().toString()

		const newCycle: Cycle = {
			id: newId,
			task: data.task,
			duration: data.duration,
			startDate,
		}

		setCycles(() => [...cycles, newCycle])
		setActiveCycleId(newId)
		setSecondsPassed(0)

		reset()
	}

	// finish cycle
	function setCycleFinished() {
		// end cycle
		setCycles((state) =>
			state.map((cycle) => {
				if (cycle.id === activeCycleId) {
					return { ...cycle, finishDate: new Date() }
				} else {
					return cycle
				}
			}),
		)
		// stop
		setActiveCycleId(null)
	}

	// interrupt cycle
	function handleInterruptCycle() {
		// find and set interruptDate
		setCycles((state) =>
			state.map((cycle) => {
				if (cycle.id === activeCycleId) {
					return { ...cycle, interruptDate: new Date() }
				} else {
					return cycle
				}
			}),
		)
		// stop
		setActiveCycleId(null)
	}

	return (
		<HomeContainer>
			<form onSubmit={handleSubmit(handleSubmitForm)}>
				<CyclesContext.Provider
					value={{
						activeCycle,
						activeCycleId,
						secondsPassed,
						setSecondsPassed,
						setCycleFinished,
					}}
				>
					<FormProvider {...newCycleForm}>
						<NewCycleForm />
					</FormProvider>
					<Countdown />
				</CyclesContext.Provider>
				{activeCycle ? (
					<StopButton type='button' onClick={handleInterruptCycle}>
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
