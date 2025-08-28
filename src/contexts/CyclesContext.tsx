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
	activeCycleId: string | null
	secondsPassed: number
	createNewCycle: (data: CreateCycleData) => void
	interruptCycle: () => void
	setSecondsPassed: (seconds: number) => void
	setCycleFinished: () => void
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
	payload: any
}

export function CyclesContextProvider({
	children,
}: CyclesContextProviderProps) {
	// States
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
	const [secondsPassed, setSecondsPassed] = useState(0)

	// Reducers
	const [cycles, dispatch] = useReducer((state: Cycle[], action: Action) => {
		// create
		if (action.type === CREATE_ACTION) {
			return [...state, action.payload.newCycle]
		}

		// finish
		if (action.type === FINISH_ACTION) {
			return state.map((cycle) => {
				if (cycle.id === action.payload.activeCycleId) {
					return { ...cycle, finishDate: new Date() }
				} else {
					return cycle
				}
			})
		}

		// interrupt
		if (action.type === INTERRUPT_ACTION) {
			return state.map((cycle) => {
				if (cycle.id === action.payload.activeCycleId) {
					return { ...cycle, interruptDate: new Date() }
				} else {
					return cycle
				}
			})
		}

		return state
	}, [])

	// Actual/active cycle
	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

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

		setActiveCycleId(newCycle.id)
		setSecondsPassed(0)
	}

	function setCycleFinished() {
		// finish cycle
		dispatch({
			type: FINISH_ACTION,
			payload: { activeCycleId },
		})
		// stop
		setActiveCycleId(null)
	}

	function interruptCycle() {
		// interrupt cycle
		dispatch({
			type: INTERRUPT_ACTION,
			payload: { activeCycleId },
		})
		// stop
		setActiveCycleId(null)
	}

	return (
		<CyclesContext.Provider
			value={{
				cycles,
				activeCycle,
				activeCycleId,
				secondsPassed,
				setSecondsPassed,
				setCycleFinished,
				createNewCycle,
				interruptCycle,
			}}
		>
			{children}
		</CyclesContext.Provider>
	)
}
