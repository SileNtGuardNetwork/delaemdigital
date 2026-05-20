import type { LeadSubmitResponse } from "@/lib/types/lead-api";
import type { LeadFormClientValues } from "@/lib/validation/lead-form-client";

export class LeadSubmitError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly fields?: Record<string, string>,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "LeadSubmitError";
  }
}

type ErrorBody = {
  ok?: false;
  error?: string;
  fields?: Record<string, string>;
};

export async function submitLead(payload: LeadFormClientValues): Promise<LeadSubmitResponse> {
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  let data: LeadSubmitResponse | ErrorBody;
  try {
    data = (await response.json()) as LeadSubmitResponse | ErrorBody;
  } catch {
    throw new LeadSubmitError("invalid_response", "invalid_response", undefined, response.status);
  }

  if (response.ok && "ok" in data && data.ok) {
    return data;
  }

  const errorBody = data as ErrorBody;
  throw new LeadSubmitError(
    errorBody.error ?? "submit_failed",
    errorBody.error ?? "submit_failed",
    errorBody.fields,
    response.status,
  );
}
