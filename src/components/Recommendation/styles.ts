import styled from "styled-components";

const StyledWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
`;

const StyledLoadingText = styled.div`
	font-size: 2rem;
`;

const StyledRecommendation = styled.main`
	padding: 0 15px;
`;

const StyledLinkWrapper = styled.div`
	position: absolute;
	top: 10px;
	left: 10px;
`;

const StyledTitle = styled.h1`
	margin: 0 0 10px;
	font-size: 1.5rem;
	font-weight: 500;
`;

const StyledSubTitle = styled.div`
	margin-bottom: 10px;
	font-size: 1rem;
`;

const StyledOption = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
	border: 1px solid ${({ theme }) => theme.colors.grey};
	padding: 15px 20px;
	&:last-child {
		margin-bottom: 0;
	}
`;

const StyledErrorText = styled.div`
	text-align: center;
	color: ${({ theme }) => theme.colors.red};
	font-size: 1.2rem;
`;

export {
	StyledWrapper,
	StyledLoadingText,
	StyledRecommendation,
	StyledLinkWrapper,
	StyledTitle,
	StyledSubTitle,
	StyledOption,
	StyledErrorText,
};
