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
				case "textnospace":
					fieldSchema = z.string().regex(/^\S+$/, {
						message: `Field ${field.label} may only contain letters, numbers, and symbols '/', '.', '-'`,
					});
					break;
				case "date":
					fieldSchema = z
						.any()
						.transform((val) => {
							if (
								val &&
								typeof val === "object" &&
								typeof val.toDate === "function"
							) {
								return val.toDate().toISOString();
							}
							return "";
						})
						.pipe(
							z
								.string()
								.refine((val) => val === "" || !isNaN(Date.parse(val)), {
									message: "Format tanggal tidak valid",
								})
						);
					break;
				case "phone":
					fieldSchema = z
						.string()
						.trim()
						.min(10, { message: "Phone number is too short (min 10 digits)" })
						.max(12, { message: "Phone number is too long (max 12 digits)" })
						.regex(/^8[0-9]{9,11}$/, {
							message:
								"Phone number must start with 8 and be 10 to 12 digits long",
						});
					break;
				case "otp":
					fieldSchema = z.string().regex(/^\d{6}$/, {
						message: "OTP must be exactly 6 digits number",
					});
					break;
				case "select":
					fieldSchema = z
						.string()
						.nullable()
						.refine((val) => val !== null, {
							message: `Field ${field.label} is required to select`,
						});
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
