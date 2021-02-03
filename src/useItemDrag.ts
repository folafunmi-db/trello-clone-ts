import { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useAppState } from "./AppStateContext";
import { DragItem } from "./DragItem";

const useItemDrag = (item: DragItem) => {
	const { dispatch } = useAppState();
	const [, drag, preview] = useDrag({
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

	useEffect(() => {
		preview(getEmptyImage(), { captureDraggingState: true });
	}, [preview]);
	return { drag };
};

export default useItemDrag;
