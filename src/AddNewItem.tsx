import { useState } from "react";
import NewItemForm from "./NewItemForm";
import { AddItemButton } from "./styles";

interface AddNewItemProps {
	onAdd(text: string): void; // callback function to create item
	toggleButtonText: string; // text that'd be rendered when the component is a button
	dark?: boolean;
}

const AddNewItem = (props: AddNewItemProps) => {
	const [showForm, setShowForm] = useState(false);
	const { onAdd, toggleButtonText, dark } = props;

	if (showForm) {
		return (
			<NewItemForm
				onAdd={(text) => {
					text.length > 0 && onAdd(text);
					setShowForm(false);
				}}
			/>
		);
	}

	return (
		<AddItemButton dark={dark} onClick={() => setShowForm(true)}>
			{toggleButtonText}
		</AddItemButton>
	);
};

export default AddNewItem;
