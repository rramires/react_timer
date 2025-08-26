import { CountdownContainer } from './styles'
import { useContext, useEffect } from 'react'
import { CyclesContext } from '..'
import { differenceInSeconds } from 'date-fns'

export function Countdown() {
	// context
	const { activeCycle, secondsPassed, setSecondsPassed, setCycleFinished } =
		useContext(CyclesContext)

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
					setCycleFinished()
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
	}, [activeCycle, totalSeconds])

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

	return (
		<CountdownContainer>
			<span>{minutesStr[0]}</span>
			<span>{minutesStr[1]}</span>
			<div>:</div>
			<span>{secondsStr[0]}</span>
			<span>{secondsStr[1]}</span>
		</CountdownContainer>
	)
}
