export default defineOAuthGoogleEventHandler({
  config: {
    scope: ["openid", "email", "profile"],
  },
  async onSuccess(event, { user }) {
    await setUserSession(event, {
      user: {
        id: user.sub as string,
        name: user.name as string,
        email: user.email as string,
        avatar: user.picture as string,
      },
    });
    return sendRedirect(event, "/");
  },
  onError(event, error) {
    console.error("Google OAuth error:", error);
    return sendRedirect(event, "/?error=auth");
  },
});
