import fs from "fs/promises";
import { matches } from "./filters.js";
import { sendDiscord } from "./discord.js";
import "dotenv/config";

const API_URL =
  "https://tuition-seba-backend-1.onrender.com/api/tuition/available";

const notifiedPath = "./data/notified.json";

async function main() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`API Error ${response.status}`);
  }

  const tuitions = await response.json();

  const notified = JSON.parse(
    await fs.readFile(notifiedPath, "utf8")
  );

  const newNotified = [...notified];

  for (const tuition of tuitions) {
    if (!matches(tuition)) continue;

    if (notified.includes(tuition._id)) continue;

    const message = `
🎯 NEW TUITION

Code: #${tuition.tuitionCode}

Class: ${tuition.class}
Subject: ${tuition.subject}

Salary: ৳${tuition.salary}
Days: ${tuition.day}

Area: ${tuition.area}
City: ${tuition.city}

Created: ${tuition.createdAt}
`;

    await sendDiscord(message);

    newNotified.push(tuition._id);

    console.log(
      `Sent notification for ${tuition.tuitionCode}`
    );
  }

  await fs.writeFile(
    notifiedPath,
    JSON.stringify(newNotified, null, 2)
  );
}

main().catch(console.error);