import { createContext, useState, useReducer, type ReactNode } from 'react'

interface Cycle {
	id: string
	task: string
	duration: number
	startDate: Date
	interruptDate?: Date
	finishDate?: Date
}

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

// actions
const CREATE_ACTION = 'CREATE_ACTION'
const FINISH_ACTION = 'FINISH_ACTION'
const INTERRUPT_ACTION = 'INTERRUPT_ACTION'

interface Action {
	type: typeof CREATE_ACTION | typeof FINISH_ACTION | typeof INTERRUPT_ACTION
	payload?: any
}

export function CyclesContextProvider({
	children,
}: CyclesContextProviderProps) {
	// States
	const [secondsPassed, setSecondsPassed] = useState(0)

	interface CyclesState {
		cycles: Cycle[]
		activeCycle: Cycle | null
	}

	// Reducers
	const [cyclesState, dispatch] = useReducer(
		(state: CyclesState, action: Action) => {
			// switch actions
			switch (action.type) {
				case CREATE_ACTION:
					return {
						...state,
						cycles: [...state.cycles, action.payload.newCycle],
						activeCycle: action.payload.newCycle,
					}

				case FINISH_ACTION:
					return {
						...state,
						cycles: state.cycles.map((cycle) => {
							if (cycle.id === state.activeCycle?.id) {
								return { ...cycle, finishDate: new Date() }
							} else {
								return cycle
							}
						}),
						activeCycle: null,
					}

				case INTERRUPT_ACTION:
					return {
						...state,
						cycles: state.cycles.map((cycle) => {
							if (cycle.id === state.activeCycle?.id) {
								return { ...cycle, interruptDate: new Date() }
							} else {
								return cycle
							}
						}),
						activeCycle: null,
					}

				default:
					return state
			}
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
			type: CREATE_ACTION,
			payload: { newCycle },
		})

		setSecondsPassed(0)
	}

	function setCycleFinished() {
		// finish cycle
		dispatch({
			type: FINISH_ACTION,
		})
	}

	function interruptCycle() {
		// interrupt cycle
		dispatch({
			type: INTERRUPT_ACTION,
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
