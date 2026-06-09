export async function sendDiscord(message) {
  const response = await fetch(process.env.DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      content: message
    })
  });

  if (!response.ok) {
    throw new Error(
      `Discord webhook failed: ${response.status}`
    );
  }
}