export function getFallbackModel(): string {
	// Randomly choose between versatile models
	return Math.random() < 0.5
		? "mistral-large-latest"
		: "mistral-large-2407";
}

export const PRIMARY_MODEL = "mistral-large-2407";
export const VANILLA_MODEL = "mistral-large-latest";

export const PRIMARY_VISION_MODEL = "llama-3.2-90b-vision-preview";
export const FALLBACK_VISION_MODEL = "llama-3.2-11b-vision-preview";
