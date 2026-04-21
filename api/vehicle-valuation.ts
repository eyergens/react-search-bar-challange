export const config = {runtime: "edge"};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders
  });
}

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url);

  const make = searchParams.get("make");
  const model = searchParams.get("model");
  const year = searchParams.get("year");

  if (!make || !model || !year) {
    return new Response(
      JSON.stringify({error: "Missing parameters"}),
      {status: 400, headers: corsHeaders}
    );
  }

  const url = new URL("https://api.carapi.dev/v1/vehicle-valuation");
  url.searchParams.set("token", process.env.CAR_API_KEY!);
  url.searchParams.set("make", make);
  url.searchParams.set("model", model);
  url.searchParams.set("year", year);
  url.searchParams.set("country", "US");

  const res = await fetch(url.toString());
  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json"
    }
  });
}
