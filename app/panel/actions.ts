"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ndryshoOren } from "@/lib/lejet";

export async function ruajOren(formData: FormData) {
  let mesazh: string;
  try {
    mesazh = await ndryshoOren(String(formData.get("id") ?? ""), String(formData.get("ora") ?? ""));
  } catch {
    mesazh = "databaza";
  }
  if (mesazh === "ruajtur") {
    revalidatePath("/");
    revalidatePath("/udhetimi/2");
  }
  redirect("/panel?m=" + mesazh);
}