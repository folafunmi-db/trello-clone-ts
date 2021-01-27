import { useDrag } from "react-dnd";
import { useAppState } from "./AppStateContext";
import { DragItem } from "./DragItem";

const useItemDrag = (item: DragItem) => {
	const { dispatch } = useAppState();
	const [, drag] = useDrag({
		// 'item' contains data about the dragged item
		item,
		// called when dragging start
		begin: () =>
			dispatch({
				type: "SET_DRAGGED_ITEM",
				payload: item,
			}),
		// called when dragging ends
		end: () =>
			dispatch({
				type: "SET_DRAGGED_ITEM",
				payload: undefined,
			}),
	});
	return { drag };
};

export default useItemDrag;
