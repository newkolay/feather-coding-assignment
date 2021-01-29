import styled from "styled-components";

const StyledOption = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 5px;
	&:last-child {
		margin-bottom: 0;
	}
`;

const StyledLabel = styled.label`
	margin-left: 5px;
	font-size: 1.1rem;
`;

export { StyledOption, StyledLabel };
