import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve(
  "public/sites/codexa-framer-website-9c43da05/company-blog-555d6169/images",
);

const assets = [
  ["blog-automation-team.jpg", "https://framerusercontent.com/images/6r0vvVuGQv5a5xOQMwdN7Ed3SVY.jpg?width=3840&height=2160"],
  ["blog-automation-layer.jpg", "https://framerusercontent.com/images/p0xAFZ7B59J1xdZUBqt05MmNU9E.jpg?width=3840&height=2160"],
  ["blog-fragmented-systems.jpg", "https://framerusercontent.com/images/yD0U6zt6U4ibtiPWyr1twxpY7M.jpg?width=3840&height=2160"],
  ["blog-monitoring.jpg", "https://framerusercontent.com/images/G4oi3Z55fnNgtWz3hp0uJBeeJE.jpg?width=3840&height=2160"],
  ["blog-engine-upgrade.jpg", "https://framerusercontent.com/images/wwbsS5B2jq7ReaUidHboPOGp8.jpg?width=3840&height=2160"],
  ["blog-dashboards.jpg", "https://framerusercontent.com/images/a6LxTsU66GsiknCFBT8NMmpWbSk.jpg?width=3840&height=2160"],
  ["blog-collaboration.jpg", "https://framerusercontent.com/images/mvUk8uX2QSK0SpxvNjjhh5CWIww.jpg?width=3840&height=2160"],
  ["author-aiden.png", "https://framerusercontent.com/images/3JIAvpCqBv7Ee9FOi3jUDdMiyM.png?width=1200&height=1200"],
  ["author-maya.png", "https://framerusercontent.com/images/0k67Xy4DBWDsp2JSVVypJyz8Q.png?width=1200&height=1200"],
  ["author-chris.png", "https://framerusercontent.com/images/rMTwN2rk0lG5miPrJLisO8pbAw.png?width=1200&height=1200"],
  ["author-laura.png", "https://framerusercontent.com/images/v7DTdVAmOHbRO98DoqjWnzq9OX8.png?width=1200&height=1200"],
];

await mkdir(outputDirectory, { recursive: true });

for (let index = 0; index < assets.length; index += 4) {
  await Promise.all(
    assets.slice(index, index + 4).map(async ([filename, url]) => {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to download ${url}: ${response.status}`);
      }

      await writeFile(
        path.join(outputDirectory, filename),
        Buffer.from(await response.arrayBuffer()),
      );
    }),
  );
}

console.log(`Downloaded ${assets.length} Codexa blog assets.`);
