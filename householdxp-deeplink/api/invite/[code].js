
export default function handler(req, res) {
  const { code } = req.query;

  // Your Android app
  const packageName = "com.prajwal.householdxp";

  // 1. Custom scheme (optional, if you define one in Android)
  const appSchemeUrl = `householdxp://invite?code=${encodeURIComponent(code)}`;

  // 2. Play Store fallback
  const playStoreUrl = `https://play.google.com/store/apps/details?id=${packageName}&referrer=${encodeURIComponent(
    `code=${code}`
  )}`;

  // Simple HTML that tries to open app, then falls back:
  const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Opening HouseholdXP...</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script>
      (function() {
        var appUrl = "${appSchemeUrl}";
        var fallbackUrl = "${playStoreUrl}";

        // Try opening the app
        var now = Date.now();
        var iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = appUrl;
        document.body.appendChild(iframe);

        // If app not opened in ~1.5 sec, go to Play Store
        setTimeout(function () {
          var elapsed = Date.now() - now;
          if (elapsed < 2000) {
            window.location.href = fallbackUrl;
          }
        }, 1500);
      })();
    </script>
  </head>
  <body>
    <p>Opening HouseholdXP...</p>
  </body>
</html>
  `;

  res.status(200).setHeader("Content-Type", "text/html").send(html);
}
