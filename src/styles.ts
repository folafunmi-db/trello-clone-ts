import styled from "styled-components/macro";

export const AppContainer = styled.div`
	align-items: flex-start;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 1rem;
	height: max-content;
	padding: 20px;
	width: 100%;
	justify-content: center;
	flex: 1;
`;
interface DragPreviewContainerProps {
	isHidden?: boolean;
}

export const DragPreviewContainer = styled.div<DragPreviewContainerProps>`
	opacity: ${(props) => (props.isHidden ? 0.3 : 1)};
`;

export const ColumnContainer = styled(DragPreviewContainer)`
	background-color: #ebecf0;
	width: 300px;
	min-height: 40px;
	border-radius: 3px;
	padding: 8px 8px;
	flex-grow: 0;
`;

export const ColumnTitle = styled.div`
	padding: 6px 16px 12px;
	font-weight: 700;
	font-size: 1.5rem;
`;

export const CardContainer = styled.div`
	background-color: #fff;
	cursor: pointer;
	margin-bottom: 0.5rem;
	padding: 0.5rem 1rem;
	max-width: 300px;
	border-radius: 3px;
	box-shadow: #091e4240 0px 1px 0px 0px;
`;

interface AddItemButtonProps {
	dark?: boolean;
}

export const AddItemButton = styled.button<AddItemButtonProps>`
	background-color: #ffffff3d;
	border-radius: 3px;
	border: none;
	color: ${(props) => (props.dark ? "#000" : "#fff")};
	cursor: pointer;
	max-width: 300px;
	padding: 10px 12px;
	text-align: left;
	transition: background 85ms ease-in;
	width: 100%;
	font-family: inherit;

	&:hover {
		background-color: #ffffff52;
	}
`;

export const NewItemFormContainer = styled.div`
	max-width: 300px;
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: flex-start;
`;

export const NewItemButton = styled.button`
	background-color: #964ec2;
	border-radius: 3px;
	border: none;
	box-shadow: none;
	color: #fff;
	padding: 6px 12px;
	cursor: pointer;
	font-family: inherit;
	text-align: center;
`;

export const NewItemInput = styled.input`
	border-radius: 3px;
	border: none;
	box-shadow: #091e4240 0px 1px 0px 0px;
	margin-bottom: 0.5rem;
	padding: 0.5rem 1rem;
	width: 100%;
`;
