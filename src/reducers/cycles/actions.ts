import { produce } from 'immer'
import type { Action, CyclesState } from './reducer'

export const ActionTypes = {
	CREATE_ACTION: 'CREATE_ACTION',
	FINISH_ACTION: 'FINISH_ACTION',
	INTERRUPT_ACTION: 'INTERRUPT_ACTION',
} as const

export function createCycleAction(state: CyclesState, action: Action) {
	/* immutable code format required
	return {
		...state,
		cycles: [...state.cycles, action.payload.newCycle],
		activeCycle: action.payload.newCycle,
	} */
	// using dimmer it is possible to work without worrying about immutability
	return produce(state, (draft) => {
		// note that you do not need to copy the previous state
		draft.cycles.push(action.payload.newCycle)
		draft.activeCycle = action.payload.newCycle
	})
}

export function finishCycleAction(state: CyclesState) {
	/* return {
		...state,
		cycles: state.cycles.map((cycle) => {
			if (cycle.id === state.activeCycle?.id) {
				return { ...cycle, finishDate: new Date() }
			} else {
				return cycle
			}
		}),
		activeCycle: null,
	} */
	// find index using normal js/ts
	const cycleIndex = state.cycles.findIndex(
		(cycle) => cycle.id === state.activeCycle?.id,
	)
	// exit if not found
	if (cycleIndex === -1) {
		return state
	}
	// using immer to set
	return produce(state, (draft) => {
		draft.cycles[cycleIndex].finishDate = new Date()
		draft.activeCycle = null
	})
}

export function interruptCycleAction(state: CyclesState) {
	/* return {
		...state,
		cycles: state.cycles.map((cycle) => {
			if (cycle.id === state.activeCycle?.id) {
				return { ...cycle, interruptDate: new Date() }
			} else {
				return cycle
			}
		}),
		activeCycle: null,
	} */
	const cycleIndex = state.cycles.findIndex(
		(cycle) => cycle.id === state.activeCycle?.id,
	)
	if (cycleIndex === -1) {
		return state
	}

	return produce(state, (draft) => {
		draft.cycles[cycleIndex].interruptDate = new Date()
		draft.activeCycle = null
	})
}
