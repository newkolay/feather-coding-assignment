import { capitalizeFirstLetter } from "./stringUtils";

export function beautifyType(recommendationType: string): string {
	return capitalizeFirstLetter(recommendationType.toLowerCase().replace("_", " "));
}

export function generateSubscriptionPrice(price: number, periodicity: string) {
	return `€${price} per ${periodicity.toLowerCase()}`;
}
