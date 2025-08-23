import { HandPalm, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect } from 'react'
import * as zod from 'zod'
import { differenceInSeconds } from 'date-fns'

import {
	HomeContainer,
	FormContainer,
	CountdownContainer,
	StartButton,
	StopButton,
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
	startDate: Date
	interruptDate?: Date
	finishDate?: Date
}

export function Home() {
	// States
	const [cycles, setCycles] = useState<Cycle[]>([])
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
	const [secondsPassed, setSecondsPassed] = useState(0)

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

	// Actual/active cycle
	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

	// get total
	const totalSeconds = activeCycle ? activeCycle.duration * 60 : 0

	// countdown
	useEffect(() => {
		let interval: number
		if (activeCycle) {
			interval = setInterval(() => {
				// calc and set the difference
				const diffInSeconds = differenceInSeconds(
					new Date(),
					activeCycle.startDate,
				)
				// check if it's finished
				if (diffInSeconds >= totalSeconds) {
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
					setSecondsPassed(totalSeconds)
					clearInterval(interval)
				} else {
					// or set difference
					setSecondsPassed(diffInSeconds)
				}
			}, 1000)
		}
		// clear interval if exists
		return () => {
			clearInterval(interval)
		}
	}, [activeCycle])

	// calc
	const currentSeconds = activeCycle ? totalSeconds - secondsPassed : 0
	const minutesAmount = Math.floor(currentSeconds / 60) // 24.59 => 24
	const secondsAmount = currentSeconds % 60 // 24.59 => 59
	// show
	const minutesStr = String(minutesAmount).padStart(2, '0')
	const secondsStr = String(secondsAmount).padStart(2, '0')

	// change title
	useEffect(() => {
		if (activeCycle) {
			const titleTask =
				activeCycle.task.length < 20
					? activeCycle.task
					: activeCycle.task.slice(0, 20) + '...'
			document.title = `${minutesStr}:${secondsStr} - ${titleTask}`
		}
	}, [activeCycle, minutesStr, secondsStr])

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
		// interrupt
		setActiveCycleId(null)
		// console.log('cycles: ', cycles)
	}

	return (
		<HomeContainer>
			<form onSubmit={handleSubmit(handleSubmitForm)}>
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
				<CountdownContainer>
					<span>{minutesStr[0]}</span>
					<span>{minutesStr[1]}</span>
					<div>:</div>
					<span>{secondsStr[0]}</span>
					<span>{secondsStr[1]}</span>
				</CountdownContainer>
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
