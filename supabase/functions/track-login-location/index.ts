import { withSupabase } from "npm:@supabase/server@1";

export default {
  fetch: withSupabase({ auth: "user" }, async (req, ctx) => {
    try {
      const userId = ctx.userClaims?.id;

      if (!userId) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }

      const country = (req.headers.get("cf-ipcountry") || "").toUpperCase();

      if (!/^[A-Z]{2}$/.test(country) || country === "XX" || country === "T1") {
        return Response.json(
          { error: "Country could not be determined" },
          { status: 503 }
        );
      }

      const db = ctx.supabaseAdmin;

      const { data: known, error: lookupError } = await db
        .from("login_history")
        .select("country_code")
        .eq("user_id", userId);

      if (lookupError) throw lookupError;

      const alreadyVisited = known?.some(
        (item) => item.country_code === country
      ) ?? false;

      const suspicious = (known?.length ?? 0) > 0 && !alreadyVisited;

      const { error } = await db.from("login_history").insert({
        user_id: userId,
        country_code: country,
        is_suspicious: suspicious
      });

      if (error) throw error;

      return Response.json({
        success: true,
        country_code: country,
        suspicious
      });
    } catch (error) {
      console.error(error);
      return Response.json(
        { error: "Login location check failed" },
        { status: 500 }
      );
    }
  })
};
