import {
	ActionTypes,
	createCycleAction,
	finishCycleAction,
	interruptCycleAction,
} from './actions'

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

export interface Action {
	type: (typeof ActionTypes)[keyof typeof ActionTypes]
	payload?: any
}

export function cyclesReducer(state: CyclesState, action: Action) {
	// switch actions
	switch (action.type) {
		case ActionTypes.CREATE_ACTION:
			return createCycleAction(state, action)

		case ActionTypes.FINISH_ACTION:
			return finishCycleAction(state, action)

		case ActionTypes.INTERRUPT_ACTION:
			return interruptCycleAction(state, action)

		default:
			return state
	}
}
