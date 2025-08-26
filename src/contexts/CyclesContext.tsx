import { createContext, useState, type ReactNode } from 'react'

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

export function CyclesContextProvider({
	children,
}: CyclesContextProviderProps) {
	// States
	const [cycles, setCycles] = useState<Cycle[]>([])
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
	const [secondsPassed, setSecondsPassed] = useState(0)

	// Actual/active cycle
	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

	// new cycle
	function createNewCycle(data: CreateCycleData) {
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

		// FIXME: reset()
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
	function interruptCycle() {
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
