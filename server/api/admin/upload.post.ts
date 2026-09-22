import { getServiceClient, requireAdmin } from "~~/server/utils/admin";

export default defineEventHandler(async (event) => {
  await requireAdmin(event);

  const parts = await readMultipartFormData(event);
  const file = parts?.find((p) => p.name === "file" && p.data?.length);
  if (!file) {
    throw createError({ statusCode: 400, statusMessage: "No file uploaded." });
  }

  const ext = file.filename?.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const client = getServiceClient();
  const { error } = await client.storage
    .from("business-images")
    .upload(path, file.data, { contentType: file.type || "image/jpeg" });

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  const { data } = client.storage.from("business-images").getPublicUrl(path);
  return { url: data.publicUrl };
});
