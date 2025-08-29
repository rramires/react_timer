import { createContext, useState, useReducer, type ReactNode } from 'react'
import {
	ActionTypes,
	cyclesReducer,
	type Action,
	type Cycle,
	type CyclesState,
} from '../reducers/cycles'

interface CreateCycleData {
	task: string
	duration: number
}

interface CyclesContextTypes {
	cycles: Cycle[]
	activeCycle: Cycle | undefined
	secondsPassed: number
	setSecondsPassed: (seconds: number) => void
	createNewCycle: (data: CreateCycleData) => void
	setCycleFinished: () => void
	interruptCycle: () => void
}
export const CyclesContext = createContext({} as CyclesContextTypes)

interface CyclesContextProviderProps {
	children: ReactNode
}

export function CyclesContextProvider({
	children,
}: CyclesContextProviderProps) {
	// States
	const [secondsPassed, setSecondsPassed] = useState(0)

	// Reducers
	const [cyclesState, dispatch] = useReducer(
		(state: CyclesState, action: Action) => {
			// switch reducer actions
			return cyclesReducer(state, action)
		},
		{ cycles: [], activeCycle: null },
	)

	// new cycle
	function createNewCycle(data: CreateCycleData) {
		const startDate: Date = new Date()

		const newCycle: Cycle = {
			id: startDate.getTime().toString(),
			task: data.task,
			duration: data.duration,
			startDate,
		}

		dispatch({
			type: ActionTypes.CREATE_ACTION,
			payload: { newCycle },
		})

		setSecondsPassed(0)
	}

	function setCycleFinished() {
		// finish cycle
		dispatch({
			type: ActionTypes.FINISH_ACTION,
		})
	}

	function interruptCycle() {
		// interrupt cycle
		dispatch({
			type: ActionTypes.INTERRUPT_ACTION,
		})
	}

	return (
		<CyclesContext.Provider
			value={{
				cycles: cyclesState.cycles,
				activeCycle: cyclesState.activeCycle,
				secondsPassed,
				setSecondsPassed,
				createNewCycle,
				setCycleFinished,
				interruptCycle,
			}}
		>
			{children}
		</CyclesContext.Provider>
	)
}
