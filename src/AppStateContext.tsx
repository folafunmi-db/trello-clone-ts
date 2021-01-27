import { createContext, useReducer, useContext } from "react";
import findItemIndexById from "./utils/findItemIndexById";
import { v4 as uuidv4 } from "uuid";
import {DragItem} from "./DragItem"

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
	draggedItem?: DragItem;
}

interface AppStateContextProps {
	state: AppState;
	dispatch: any;
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

/** using the 'discriminated union' method. Now 'Action' can
 * resolve to one of the forms passed
 *  */
type Action =
	| {
			type: "ADD_LIST";
			payload: string;
	  }
	| {
			type: "ADD_TASK";
			payload: { text: string; taskId: string };
	  }
	| {
			type: "MOVE_LIST";
			payload: {
				dragIndex: number;
				hoverIndex: number;
			};
	  }
	| {
			type: "SET_DRAGGED_ITEM";
			payload: DragItem | undefined;
	  };

const appStateReducer = (state: AppState, action: Action): AppState => {
	switch (action.type) {
		case "ADD_LIST": {
			// reducer logic here
			return {
				...state,
				lists: [
					...state.lists,
					{ id: uuidv4(), text: action.payload, tasks: [] },
				],
			};
		}

		case "ADD_TASK": {
			// reducer logic here
			const targetLaneIndex = findItemIndexById(
				state.lists,
				action.payload.taskId
			);

			state.lists[targetLaneIndex].tasks.push({
				id: uuidv4(),
				text: action.payload.text,
			});
			return { ...state };
		}

		case "MOVE_LIST": {
			// reducer logic here
			const { dragIndex, hoverIndex } = action.payload;
			state.lists = moveItem(state.lists, dragIndex, hoverIndex);
			return { ...state };
		}

		case "SET_DRAGGED_ITEM": {
			return { ...state, draggedItem: action.payload };
		}
		default: {
			return state;
		}
	}
};

export const moveItem = (array: Array<any>, from: number, to: number) => {
	const startIndex = to < 0 ? array.length + to : to;
	const item = array.splice(from, 1)[0];
	array.splice(startIndex, 0, item);
	return array;
};

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
	const [state, dispatch] = useReducer(appStateReducer, appData);

	return (
		<AppStateContext.Provider value={{ state, dispatch }}>
			{children}
		</AppStateContext.Provider>
	);
};

export const useAppState = () => {
	return useContext(AppStateContext);
};
