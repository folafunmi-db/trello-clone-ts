import { CardContainer } from "./styles";

interface CardProps {
	text: string;
	index: number;
}

const Card = ({ text, index }: CardProps) => {
	return <CardContainer key={index}>{text}</CardContainer>;
};

export default Card;
