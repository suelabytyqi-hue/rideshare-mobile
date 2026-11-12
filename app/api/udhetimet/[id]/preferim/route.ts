import { profiliIm } from "@/lib/lejet";
import { getFavoriteSummary, saveFavorite } from "@/lib/favorites";
import { getTrip } from "@/lib/trips";

export const dynamic = "force-dynamic";

function noStoreHeaders() {
  return { "Cache-Control": "no-store" };
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const profile = await profiliIm();

    if (!profile) {
      return Response.json(
        { error: "Hyr në llogari për t'i parë preferimet." },
        { status: 401, headers: noStoreHeaders() },
      );
    }

    const { id } = await params;
    const trip = await getTrip(id);

    if (!trip) {
      return Response.json(
        { error: "Udhëtimi nuk u gjet." },
        { status: 404, headers: noStoreHeaders() },
      );
    }

    const favorite = await getFavoriteSummary(profile.id, id);
    return Response.json({ favorite }, { headers: noStoreHeaders() });
  } catch (error) {
    console.error("Preferimet nuk mund të lexoheshin.", error);
    return Response.json(
      { error: "Preferimet nuk mund të lexohen tani." },
      { status: 503, headers: noStoreHeaders() },
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (
    process.env.NODE_ENV === "development" &&
    request.headers.get("x-test-failure") === "true"
  ) {
    return Response.json(
      { error: "Udhëtimi nuk u ruajt. Provo përsëri." },
      { status: 503, headers: noStoreHeaders() },
    );
  }

  try {
    const profile = await profiliIm();

    if (!profile) {
      return Response.json(
        { error: "Hyr në llogari për ta ruajtur udhëtimin." },
        { status: 401, headers: noStoreHeaders() },
      );
    }

    const { id } = await params;
    const trip = await getTrip(id);

    if (!trip) {
      return Response.json(
        { error: "Udhëtimi nuk u gjet." },
        { status: 404, headers: noStoreHeaders() },
      );
    }

    await saveFavorite(profile.id, id);
    const favorite = await getFavoriteSummary(profile.id, id);

    return Response.json({ favorite }, { headers: noStoreHeaders() });
  } catch (error) {
    console.error("Preferimi i udhëtimit nuk mund të ruhej.", error);
    return Response.json(
      { error: "Udhëtimi nuk u ruajt. Provo përsëri." },
      { status: 503, headers: noStoreHeaders() },
    );
  }
}
