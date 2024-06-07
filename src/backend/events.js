import wixForum from 'wix-forum.v2';
import { checkPost, removePost } from 'backend/checkPosts';
import { predict } from "backend/toxicity"
import { notifications } from 'wix-notifications.v2';

export function wixChat_onMessage(event) {
  predict(event.payload.text,event.channelId)
}

export function wixForum_onPostCreated(event) {
  console.log("onPostCreated");
  const postId = event.postId;
  const userId = event.post._ownerId;
  const categoryId = event.post.categoryId;
  const repeat = checkPost(userId, categoryId);
  if (repeat) {
    event.stopPropagation();
    removePost(postId);
    notify('You can already posted for this meal!', "Browser", {});
  }
}

export async function wixEvents_onEventCreated(event) {
  console.log("onPostLiked");
  notify('You can already posted for this meal!', "Browser", {});
}
  
async function notify(body, channels, options) {
  try {
    const result = await notifications.notify(body, channels, options);
    return result;
  } catch (error) {
    console.error(error);
  }
}

// events/chat.jsw
import { handleChatMessage } from 'backend/chat';

export function wixChat_onMessageReceived(event) {
  handleChatMessage(event);
}

  
/*  Full post object:
  *  {
  *    "_id": "5f88058be9b6b100175b154c",
  *    "categoryId":"5f88058be9b6b100175b154a",
  *    "_ownerId":"32cf071a-ck2f-450f-ad74-5a25db0b1b6g",
  *    "title": "What topics should we discuss?",
  *    "plainContent": "Let us know what you think in the comments below.",
  *    "pinned": "false",
  *    "commentingDisabled": "false",
  *    "commentCount": 0,
  *    "likeCount": 0,
  *    "viewCount": 0,
  *    "_createdDate": "2020-10-26T07:18:20.297Z",
  *    "_editedDate": null,
  *    "_lastActivityDate": "2020-10-26T07:18:20.297Z",
  *    "slug": "what-topics-should-we-discus",
  *    "pageUrl": "/forum/category-name/what-topics-should-we-discuss",
  *    "postType": "QUESTION"
  *  }
  */

// // import wixData from 'wix-data';

// // export async function deleteOldPosts() {
// //     const twentyFourHoursAgo = new Date();
// //     twentyFourHoursAgo.setDate(twentyFourHoursAgo.getDate() - 1);

// //     const results = await wixData.query('Forum/Posts')
// //         .lt('_createdDate', twentyFourHoursAgo)
// //         .find();

// //     for (let post of results.items) {
// //         await wixData.remove('Forum/Posts', post.categoryId);
// //     }

// //     return {status: "Completed"};
// // }


// import wixData from 'wix-data';

// export function deleteOldPosts() {
//     // Calculate the date and time 24 hours ago
//     const twentyFourHoursAgo = new Date();
//     twentyFourHoursAgo.setDate(twentyFourHoursAgo.getDate() - 1);

//     // Query the forum posts collection for posts older than 24 hours
//     wixData.query('Forum/Posts')
//         .lt('_createdDate', twentyFourHoursAgo) // Filter posts created more than 24 hours ago
//         .find()
//         .then((results) => {
//             // Check if there are any old posts to delete
//             if (results.items.length === 0) {
//                 console.log('No posts older than 24 hours found.');
//                 return;
//             }

//             // Iterate over the old posts and delete them
//             results.items.forEach((post) => {
//                 // Delete the old post from the database
//                 wixData.remove('Forum/Posts', post.categoryId)
//                     .then(() => {
//                         console.log(`Post deleted successfully.`);
//                     })
//                     .catch((err) => {
//                         console.error(`Error deleting post ${post._id}:`, err);
//                     });
//             });
//         })
//         .catch((err) => {
//             console.error('Error querying old posts:', err);
//         });
//     console.log('Delete operation completed.');
// }

// export function checkPost() {
//     console.log('[*] checking previous posts...');
//     wixData.query('Forum/Posts')
//         .eq('_ownerId', "/forum/_evgr/breakfast-at-evgr	bbf3cb1b-c3d1-4fa1-a1fa-245ab4782587")
//         .find()
//         .then((results) => {
//             console.log("result:", results);
//             if (results.items.length === 0) {
//                 console.log('PASS');
//                 return;
//             }
//         })
//         .catch((err) => {
//             console.error('Error querying user posts:', err);
//         });
// }

// /*  Full post object:
//  *  {
//  *    "_id": "5f88058be9b6b100175b154c",
//  *    "categoryId":"5f88058be9b6b100175b154a",
//  *    "_ownerId":"32cf071a-ck2f-450f-ad74-5a25db0b1b6g",
//  *    "title": "What topics should we discuss?",
//  *    "plainContent": "Let us know what you think in the comments below.",
//  *    "pinned": "false",
//  *    "commentingDisabled": "false",
//  *    "commentCount": 0,
//  *    "likeCount": 0,
//  *    "viewCount": 0,
//  *    "_createdDate": "2020-10-26T07:18:20.297Z",
//  *    "_editedDate": null,
//  *    "_lastActivityDate": "2020-10-26T07:18:20.297Z",
//  *    "slug": "what-topics-should-we-discus",
//  *    "pageUrl": "/forum/category-name/what-topics-should-we-discuss",
//  *    "postType": "QUESTION"
//  *  }
//  */