import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { sql } from "./config/db.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleId = profile.id;
        const email = profile.emails[0].value;
        const name = profile.displayName;

        // Check if user exists
        let users = await sql`SELECT * FROM users WHERE google_id=${googleId} OR email=${email}`;
        let user = users[0];

        if (!user) {
          // Create new user
          const result = await sql`
            INSERT INTO users (google_id, email, name)
            VALUES (${googleId}, ${email}, ${name})
            RETURNING *`;
          user = result[0];
        }

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const users = await sql`SELECT * FROM users WHERE id=${id}`;
    done(null, users[0]);
  } catch (error) {
    done(error, null);
  }
});
