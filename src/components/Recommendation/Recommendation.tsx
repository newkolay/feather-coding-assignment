import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/rootReducer";
import { fetchRecommendationRequest } from "../../slices/recommendationSlice";
import ButtonLink from "../common/ButtonLink";
import {
	StyledWrapper,
	StyledLoadingText,
	StyledRecommendation,
	StyledLinkWrapper,
	StyledTitle,
	StyledSubTitle,
	StyledOption,
	StyledErrorText,
} from "./styles";
import { beautifyType, generateSubscriptionPrice } from "../../utils/recommendationUtils";
import { removeToken } from "../../slices/authSlice";

interface RecommendationProps {
	token: string;
}

export default function Recommendation({ token }: RecommendationProps) {
	const dispatch = useDispatch();
	const { recommendation, isLoading, error } = useSelector(
		(state: RootState) => ({
			recommendation: state.recommendation.recommendation,
			isLoading: state.recommendation.isLoading,
			error: state.recommendation.error,
		}),
		shallowEqual
	);

	useEffect(() => {
		dispatch(fetchRecommendationRequest(token));
	}, [token, dispatch]);

	const questionnaireAgain = () => {
		dispatch(removeToken());
	};

	return (
		<StyledWrapper>
			{isLoading ? (
				<StyledLoadingText>Loading recommendations...</StyledLoadingText>
			) : (
				<StyledRecommendation role="main">
					<StyledLinkWrapper>
						<ButtonLink onClick={questionnaireAgain}>
							Take the questionnaire again
						</ButtonLink>
					</StyledLinkWrapper>
					<StyledTitle>We got your recommendation</StyledTitle>
					<StyledSubTitle>
						Based on your answers, this is what make sense for you and what you should
						pay.
					</StyledSubTitle>
					{!error ? (
						recommendation.map((item) => (
							<StyledOption key={item.type}>
								<div>{beautifyType(item.type)}</div>
								<div>
									{generateSubscriptionPrice(
										item.price.amount,
										item.price.periodicity
									)}
								</div>
							</StyledOption>
						))
					) : (
						<StyledErrorText>{error}</StyledErrorText>
					)}
				</StyledRecommendation>
			)}
		</StyledWrapper>
	);
}
