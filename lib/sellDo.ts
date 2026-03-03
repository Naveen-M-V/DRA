export type LeadInput = {
  name: string;
  email: string;
  phone: string;
  srd: string;
  campaignName?: string;
  subSource?: string;
  project?: string;
  source?: string;
  note?: string;
};

const SELL_DO_ENDPOINT = "https://app.sell.do/api/leads/create";
const SELL_DO_API_KEY = "c998c9770ebcee52128b80c62c144476";

export async function createSellDoLead(input: LeadInput) {
  const params = new URLSearchParams();
  params.set("api_key", SELL_DO_API_KEY);
  params.set("sell_do[form][lead][name]", input.name);
  params.set("sell_do[form][lead][email]", input.email);
  params.set("sell_do[form][lead][phone]", input.phone);
  params.set("sell_do[campaign][srd]", input.srd);

  if (input.campaignName) {
    params.set("sell_do[campaign][name]", input.campaignName);
  }
  if (input.subSource) {
    params.set("sell_do[campaign][sub_source]", input.subSource);
  }
  if (input.project) {
    params.set("sell_do[campaign][project]", input.project);
  }
  if (input.source) {
    params.set("sell_do[campaign][source]", input.source);
  }
  if (input.note) {
    params.set("sell_do[form][note][content]", input.note);
  }

  const response = await fetch(`${SELL_DO_ENDPOINT}?${params.toString()}`, {
    method: "POST",
    cache: "no-store",
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    throw new Error(
      `Sell.do lead API failed (${response.status}): ${
        typeof data === "string" ? data : JSON.stringify(data)
      }`,
    );
  }

  return data;
}
