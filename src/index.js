import "dotenv/config";
import fs from "fs/promises";
import { matches } from "./filters.js";
import { sendDiscord } from "./discord.js";

const API_URL =
  "https://tuition-seba-backend-1.onrender.com/api/tuition/available";

const notifiedPath = "./data/notified.json";

async function main() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`API Error ${response.status}`);
  }

  const tuitions = await response.json();

  console.log(`Total tuitions fetched: ${tuitions.length}`);

  const notified = JSON.parse(
    await fs.readFile(notifiedPath, "utf8")
  );

  const newNotified = [...notified];

  let notificationsSent = 0;

  for (const tuition of tuitions) {
    if (!matches(tuition)) continue;

    console.log(`Matched: ${tuition.tuitionCode}`);

    if (notified.includes(tuition._id)) {
      console.log(
        `Already notified: ${tuition.tuitionCode}`
      );
      continue;
    }

    const message = `
🎯 NEW TUITION

Code: #${tuition.tuitionCode}

Class: ${tuition.class}
Subject: ${tuition.subject}

Salary: ৳${tuition.salary}
Days: ${tuition.day}

Teacher: ${tuition.wantedTeacher}

Area: ${tuition.area}
City: ${tuition.city}

Created: ${tuition.createdAt}

https://tution-sheba-forum.vercel.app
`;

    await sendDiscord(message);

    if (!newNotified.includes(tuition._id)) {
      newNotified.push(tuition._id);
    }

    notificationsSent++;

    console.log(
      `Notification sent for ${tuition.tuitionCode}`
    );
  }

  await fs.writeFile(
    notifiedPath,
    JSON.stringify(newNotified, null, 2)
  );

  console.log(
    `Finished. Notifications sent: ${notificationsSent}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});