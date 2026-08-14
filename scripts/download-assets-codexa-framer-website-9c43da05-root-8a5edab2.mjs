import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const outputDir = path.resolve(
  "public/sites/codexa-framer-website-9c43da05/root-8a5edab2/images",
);

const assets = [
  ["codexa-mark.png", "https://framerusercontent.com/images/DPtnyR7nM22JZhvqPVNVCFtZqc.png?scale-down-to=512&width=975&height=975"],
  ["hero-code-window.png", "https://framerusercontent.com/images/3UNmigqHQ79kuEcATooSVP0Y.png?scale-down-to=2048&width=3090&height=1800"],
  ["trusted-logo-01.png", "https://framerusercontent.com/images/ATfoN74iE7WqEjs1x599iT2qFEk.png?width=96&height=96"],
  ["trusted-logo-02.png", "https://framerusercontent.com/images/y7XP19K4EPfkFhN8uGH09tAfks.png?width=96&height=96"],
  ["trusted-logo-03.png", "https://framerusercontent.com/images/g2Rzfvt4WyAu7k3DPLGEBpk5kA.png?width=96&height=96"],
  ["trusted-logo-04.png", "https://framerusercontent.com/images/KUU4EyOBBLPuo7DDNrW4y5lixMo.png?width=96&height=93"],
  ["trusted-logo-05.png", "https://framerusercontent.com/images/sPNLDILm4B8Dv3UwLGSyeo62To.png?width=68&height=96"],
  ["trusted-logo-06.png", "https://framerusercontent.com/images/S6kVOViEp3CiQQJ3tEjMtDVYOTo.png?width=92&height=96"],
  ["trusted-logo-07.png", "https://framerusercontent.com/images/ltxLb4rC18Kj6tcGmWqfu4QTFo.png?width=89&height=95"],
  ["testimonial-sarah.png", "https://framerusercontent.com/images/1fflCNxZTIE2llo9ctXyR4vgc.png?width=640&height=640"],
  ["testimonial-james.png", "https://framerusercontent.com/images/qzii2hiV2Xqfw5W03yXbrcL4s.png?width=640&height=640"],
  ["testimonial-anika.png", "https://framerusercontent.com/images/ulpaWIApxKcrudyhKJMn7WMWk.png?width=640&height=529"],
  ["testimonial-david.png", "https://framerusercontent.com/images/ugLvMpISL7m7PF7OpfK4y3598xU.png?width=640&height=640"],
  ["testimonial-laura.png", "https://framerusercontent.com/images/jzcOXpYvtFqkciwlTti1owmEd2I.png?width=640&height=640"],
  ["testimonial-omar.png", "https://framerusercontent.com/images/FWOjOEbzaqXL3wNRFrm2oruu32E.png?width=640&height=640"],
  ["testimonial-avatar-fallback.png", "https://framerusercontent.com/images/5AXsK3MyGYovv57LsfY0T3kRQU.png?width=79&height=79"],
];

async function download([filename, url]) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${url}`);
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  await writeFile(path.join(outputDir, filename), bytes);
  return `${filename} (${bytes.length} bytes)`;
}

await mkdir(outputDir, { recursive: true });

for (let index = 0; index < assets.length; index += 4) {
  const batch = assets.slice(index, index + 4);
  const completed = await Promise.all(batch.map(download));
  completed.forEach((entry) => console.log(entry));
}
