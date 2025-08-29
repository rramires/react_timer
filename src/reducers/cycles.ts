export interface Cycle {
	id: string
	task: string
	duration: number
	startDate: Date
	interruptDate?: Date
	finishDate?: Date
}

export interface CyclesState {
	cycles: Cycle[]
	activeCycle: Cycle | null
}

export const ActionTypes = {
	CREATE_ACTION: 'CREATE_ACTION',
	FINISH_ACTION: 'FINISH_ACTION',
	INTERRUPT_ACTION: 'INTERRUPT_ACTION',
} as const

export interface Action {
	type: (typeof ActionTypes)[keyof typeof ActionTypes]
	payload?: any
}

export function cyclesReducer(state: CyclesState, action: Action) {
	// switch actions
	switch (action.type) {
		case ActionTypes.CREATE_ACTION:
			return {
				...state,
				cycles: [...state.cycles, action.payload.newCycle],
				activeCycle: action.payload.newCycle,
			}

		case ActionTypes.FINISH_ACTION:
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

		case ActionTypes.INTERRUPT_ACTION:
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
}
