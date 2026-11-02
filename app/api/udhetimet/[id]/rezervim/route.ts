import { getTrip } from "@/lib/trips";

export const dynamic = "force-dynamic";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const trip = await getTrip(id);

    if (!trip) {
      return Response.json(
        { error: "Udhëtimi nuk u gjet." },
        { status: 404, headers: { "Cache-Control": "no-store" } },
      );
    }

    if (trip.vende <= 0) {
      return Response.json(
        { error: "Nuk ka vende të lira për këtë udhëtim." },
        { status: 409, headers: { "Cache-Control": "no-store" } },
      );
    }

    return Response.json(
      { available: true, simulation: true },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Disponueshmëria e vendit nuk mund të kontrollohej.", error);
    return Response.json(
      { error: "Disponueshmëria nuk mund të kontrollohet tani." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
