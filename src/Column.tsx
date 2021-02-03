import { PropsWithChildren } from "react";
import { useRef } from "react";
import { ColumnContainer, ColumnTitle } from "./styles";
import { useDrop } from "react-dnd";
import { useAppState } from "./AppStateContext";
import { DragItem } from "./DragItem";
import { isHidden } from "./utils/isHidden";
import AddNewItem from "./AddNewItem";
import Card from "./Card";
import useItemDrag from "./useItemDrag";

interface ColumnProps {
	text: string;
	index: number;
	id: string;
	isPreview?: boolean;
}

const Column = ({
	text,
	index,
	id,
	isPreview,
}: PropsWithChildren<ColumnProps>) => {
	const { state, dispatch } = useAppState();
	const ref = useRef<HTMLDivElement>(null);
	const [, drop] = useDrop({
		accept: "COLUMN",
		hover(item: DragItem) {
			const dragIndex = item.index;
			const hoverIndex = index;

			if (dragIndex === hoverIndex) {
				return;
			}

			dispatch({ type: "MOVE_LIST", payload: { dragIndex, hoverIndex } });
			item.index = hoverIndex;
		},
	});

	const { drag } = useItemDrag({ type: "COLUMN", id, index, text });

	drag(drop(ref));

	return (
		<ColumnContainer
			ref={ref}
			isPreview={isPreview}
			isHidden={isHidden(isPreview, state.draggedItem, "COLUMN", id)}
		>
			<ColumnTitle>{text}</ColumnTitle>
			{state.lists[index].tasks.map((task, i) => (
				<Card text={task.text} key={task.id} index={i} />
			))}
			<AddNewItem
				toggleButtonText="+ Add another list"
				onAdd={(text) =>
					dispatch({
						type: "ADD_TASK",
						payload: { text, taskId: id },
					})
				}
				dark
			/>
		</ColumnContainer>
	);
};

export default Column;
