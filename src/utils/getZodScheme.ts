import { z } from "zod";

export type FieldConfig = {
	name: string;
	label: string;
	type: string;
	required: boolean;
	allowed?: string[];
};

export const generateZodSchema = (fields: FieldConfig[]) => {
	return z.object(
		fields.reduce((schema, field) => {
			let fieldSchema;
			switch (field.type) {
				case "text":
				case "textarea":
				case "email":
					fieldSchema = z.string();
					break;
				case "phone":
					fieldSchema = z
						.string()
						.trim()
						.min(9, { message: "Phone number is too short (min 9 digits)" })
						.max(15, { message: "Phone number is too long (max 15 digits)" })
						.regex(/^8[1-9][0-9]{7,11}$/, {
							message: "Phone number must start with 8 and be valid",
						});
					break;
				case "otp":
					fieldSchema = z.string().regex(/^\d[0-9]{6}$/, {
						message: "OTP must be exactly 6 digits number",
					});
					break;
				case "select":
					fieldSchema = z.string();
					break;
				default:
					fieldSchema = z.any();
			}
			if (field.required) {
				if (fieldSchema instanceof z.ZodString) {
					fieldSchema = fieldSchema.min(1, `Field ${field.label} is required`);
				} else {
					fieldSchema = fieldSchema.refine(
						(val) => typeof val !== "undefined",
						`Field ${field.label} is required`
					);
				}
			}
			return { ...schema, [field.name]: fieldSchema };
		}, {} as Record<string, z.ZodTypeAny>)
	);
};
