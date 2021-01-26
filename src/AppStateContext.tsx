import { createContext } from "react";

interface Task {
	id: string;
	text: string;
}

interface List {
	id: string;
	text: string;
	tasks: Task[];
}

interface AppState {
	lists: List[];
}

interface AppStateContextProps {
	state: AppState;
}

/** normally there's meant to be a default value for the context
 * This value will only be used if 'AppStateProvider' isn't used
 * to wrap an app. Thus, it can be omitted.
 *
 * However, we do need to pass in something. So we pass in an
 * empty object that's casted to "AppStateContextProps" using the
 * 'as' operator.
 *
 * Typescript will think that the empty object has the types of
 * "AppStateContextProps"
 *  */
const AppStateContext = createContext<AppStateContextProps>(
	{} as AppStateContextProps
);

const appData: AppState = {
	lists: [
		{
			id: "0",
			text: "To Do",
			tasks: [{ id: "c0", text: "Generate app scaffold" }],
		},
		{
			id: "1",
			text: "In Progress",
			tasks: [{ id: "c2", text: "Learn Typescript" }],
		},
		{
			id: "2",
			text: "Done",
			tasks: [{ id: "c3", text: "Begin to use static typing" }],
		},
	],
};

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
	return (
		<AppStateContext.Provider value={{ state: appData }}>
			{children}
		</AppStateContext.Provider>
	);
};
