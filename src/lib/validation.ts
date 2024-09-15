import { z } from "zod";

export const requiredString = z.string().trim().min(1, "Required");
