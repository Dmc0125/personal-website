// import { defineAction } from "astro:actions";
//
// import { redis } from "./redis";

// export type ContributionSaved = {
//     title: string;
//     body: string;
//     description?: string;
// }
//
// export function contributionDataKey(issueNumber: string): string {
//     return `contrib-data:${issueNumber}`;
// }
//
// export function contributionDescriptionKey(issueNumber: string): string {
//     return `contrib-desc:${issueNumber}`;
// }
//
// export const generateDescriptionForContributions = defineAction({
//     handler: async () => {
//         const contributions = await redis.keys("contrib-*");
//
//         // find which descriptions are not yet saved
//
//         // sort in a way so contrib-data is first in the list
//         contributions.sort((a, b) => {
//             const [aKey] = a.split(":");
//             const [bKey] = b.split(":");
//             if (aKey === "contrib-data") {
//                 return -1;
//             } else if (bKey === "contrib-data") {
//                 return 1;
//             } else {
//                 return 0;
//             }
//         });
//
//         const dataIssueNumbers: number[] = [];
//         const missingDescriptions: number[] = [];
//
//         for (const contribution of contributions) {
//             const [key, issueNumber] = contribution.split(":");
//             const issueNumberInt = parseInt(issueNumber);
//
//             if (key === "contrib-data") {
//                 dataIssueNumbers.push(issueNumberInt);
//             } else {
//                 if (!dataIssueNumbers.includes(issueNumberInt)) {
//                     missingDescriptions.push(issueNumberInt);
//                 }
//             }
//         }
//
//
//     },
// })
