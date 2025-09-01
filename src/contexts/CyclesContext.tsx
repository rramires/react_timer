import {
	createContext,
	useState,
	useReducer,
	useEffect,
	type ReactNode,
} from 'react'
import {
	cyclesReducer,
	type Action,
	type Cycle,
	type CyclesState,
} from '../reducers/cycles/reducer'
import { ActionTypes } from '../reducers/cycles/actions'

const localStorageName = 'com.flexbr@react_timer-v0.0.1'

function dateReviver(_key: string, value: unknown) {
	// to test ISO date format, ex: "2025-09-01T00:58:28.303Z"
	const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/
	if (typeof value === 'string' && isoDateRegex.test(value)) {
		return new Date(value)
	}
	return value
}

interface CreateCycleData {
	task: string
	duration: number
}

interface CyclesContextTypes {
	cycles: Cycle[]
	activeCycle: Cycle | null
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
		// triggered when the reducer is created. Ideal for calls to retrieve persisted data.
		(initialState) => {
			// get JSON data
			const storeStateJSON = localStorage.getItem(localStorageName)
			if (storeStateJSON) {
				// set to state (dateReviver parse string ISO date to JS date)
				return JSON.parse(storeStateJSON, dateReviver)
			}
			// if no return persisted data, set initial state
			return initialState
		},
	)

	// Effect to save to local storage on each cyclesState change
	useEffect(() => {
		const stateJSON = JSON.stringify(cyclesState)
		// save JSON data
		localStorage.setItem(localStorageName, stateJSON)
	}, [cyclesState])

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
