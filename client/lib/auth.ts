import { client } from "@/app/utils/axiosClient";
import ENDPOINTS from "@/app/utils/endpoints";
import { cookies } from "next/headers";

export async function getSessionMe() {
  try {
    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("void_access_token")?.value;
    const refreshToken = cookiesStore.get("void_refresh_token")?.value;
    const hasTokens = !!(accessToken && refreshToken);

    if (!hasTokens) return null;

    const response = await client.get(ENDPOINTS.USER.ME.URL, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `void_access_token=${accessToken}; void_refresh_token=${refreshToken}`,
      },
    });

    return response.data;
  } catch (error) {
    return null;
  }
}
