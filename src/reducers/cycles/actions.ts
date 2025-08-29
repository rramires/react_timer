import type { Action, CyclesState } from './reducer'

export const ActionTypes = {
	CREATE_ACTION: 'CREATE_ACTION',
	FINISH_ACTION: 'FINISH_ACTION',
	INTERRUPT_ACTION: 'INTERRUPT_ACTION',
} as const

export function createCycleAction(state: CyclesState, action: Action) {
	return {
		...state,
		cycles: [...state.cycles, action.payload.newCycle],
		activeCycle: action.payload.newCycle,
	}
}

export function finishCycleAction(state: CyclesState, action: Action) {
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
}

export function interruptCycleAction(state: CyclesState, action: Action) {
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
}
