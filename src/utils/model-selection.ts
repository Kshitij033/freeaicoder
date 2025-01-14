export function getFallbackModel(): string {
	// Randomly choose between versatile models
	return Math.random() < 0.5
		? "codestral-latest"
		: "codestral-latest";
}

export const PRIMARY_MODEL = "codestral-latest";
export const VANILLA_MODEL = "codestral-latest";

export const PRIMARY_VISION_MODEL = "llama-3.2-90b-vision-preview";
export const FALLBACK_VISION_MODEL = "llama-3.2-11b-vision-preview";
