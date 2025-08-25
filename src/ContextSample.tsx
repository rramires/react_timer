import { createContext, useContext, useState } from 'react'

/* 
	1 - Create context in Main/Root Component level
*/
const MainContext = createContext({} as any)

// Main/Root Component
export function MainComponent() {
	/* 
		2 - Create commom props using states
	*/
	const [prop1, setProp1] = useState(1)
	const [prop2, setProp2] = useState(1)

	return (
		/* 
			3 - Inject properties into the context provider (including set functions) 
			* using object value={ 
				{ prop1, prop2, etc } 
			}
		*/
		<MainContext.Provider value={{ prop1, setProp1, prop2, setProp2 }}>
			<>
				<h1>Main Component: {prop1}</h1>
				<SubComponent1 />
				<SubComponent2 />
			</>
		</MainContext.Provider>
	)
}

// Sub Component 1
export function SubComponent1() {
	/* 
		4 - Get/Access properties 
	*/
	const { prop1 } = useContext(MainContext)

	return (
		<>
			<h2>Sub Component One: {prop1}</h2>
		</>
	)
}

// Sub Component 2
export function SubComponent2() {
	/* 
		4 - Get/Access properties 
	*/
	const { prop1, setProp1 } = useContext(MainContext)

	function clickHandler() {
		/* 
			5 - Modify values using useState set methods
		*/
		setProp1(prop1 + 1)
	}

	return (
		<>
			<h2>Sub Component Two: {prop1}</h2>
			<button onClick={clickHandler}>Change Value</button>
		</>
	)
}
