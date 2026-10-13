import type { ZodType } from "zod";

/** An error with an HTTP status. 4xx messages are shown to the client. */
export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

/** Validate input with a zod schema, or throw a 400 with a readable message. */
export function parseInput<T>(schema: ZodType<T>, input: unknown): T {
  const result = schema.safeParse(input);
  if (!result.success) {
    const issue = result.error.issues[0];
    const where = issue?.path?.length ? `${issue.path.join(".")}: ` : "";
    throw new HttpError(400, `Invalid input — ${where}${issue?.message ?? "check the form fields"}`);
  }
  return result.data;
}
