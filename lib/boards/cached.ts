import { cacheLife, cacheTag, revalidateTag } from "next/cache";
import { createServiceClient } from "@/lib/supabase/service";
import { loadBoardData, type BoardData } from "./load";

/** Everything cached from the board data carries this tag, so one call can refresh it all. */
export const BOARD_CACHE_TAG = "boards";

/**
 * The leaderboard data, shared by every visitor and cached for a minute, so a crowd costs the
 * database the same few queries as one person. Only public board data is read, through the
 * server's own key. Anything that changes it should call `refreshBoardData()`.
 */
export async function getBoardData(): Promise<BoardData> {
  "use cache";
  cacheTag(BOARD_CACHE_TAG);
  // stale: 0 so a visitor's browser never holds an old copy after the server has a new one.
  cacheLife({ stale: 0, revalidate: 60, expire: 600 });
  return loadBoardData(createServiceClient(), new Date());
}

/**
 * Throw away the cached board data now. The next page view rebuilds it, so someone who has just
 * registered, edited or deleted their record sees the change straight away. Route handlers only.
 */
export function refreshBoardData(): void {
  revalidateTag(BOARD_CACHE_TAG, { expire: 0 });
}
