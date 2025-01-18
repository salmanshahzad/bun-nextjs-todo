import { type ZodType, z } from "zod";

export type FormState<T extends ZodType> = {
    data?: Record<string, FormDataEntryValue>;
    errors?: Partial<Record<keyof z.infer<T>, string[]>>;
    message?: string;
};
