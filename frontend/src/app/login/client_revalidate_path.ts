'use server'
import { revalidatePath } from "next/cache"
// resolves "Error: Invariant: static generation store missing in revalidatePath"
// resolves ""
export const client_revalidate_path = async (url) => {
  revalidatePath(url)
}