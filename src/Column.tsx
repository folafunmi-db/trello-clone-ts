import { PropsWithChildren } from "react";
import { ColumnContainer, ColumnTitle } from "./styles";
import AddNewItem from "./AddNewItem";

interface ColumnProps {
	text: string;
}

const Column = ({ text, children }: PropsWithChildren<ColumnProps>) => {
	return (
		<ColumnContainer>
			<ColumnTitle>{text}</ColumnTitle>
			{children}
			<AddNewItem
				toggleButtonText="+ Add another list"
        onAdd={console.log}
        dark
			/>
		</ColumnContainer>
	);
};

export default Column;
