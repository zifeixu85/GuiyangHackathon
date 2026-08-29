export const dynamic = "force-static";

export async function GET() {
  return Response.json({
    status: "ok",
    mode: "public-showcase",
    mock: true,
    externalDependencies: 0,
  });
}
