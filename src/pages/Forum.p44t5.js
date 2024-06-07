import wixData from 'wix-data';
import wixUsers from 'wix-users';
import { posts } from 'wix-forum.v2';
import { sortPosts } from 'public/helper'
// import { wixForum_onPostCreated, wixForum_onPostLiked } from 'backend/events.web'; 
// // import { deleteOldPosts }  from 'backend/events.js'; // Adjust the path as necessary

$w.onReady(function () {
    console.log('Forum page loaded. Attempting to delete old posts...');
    $w("#switch1").onChange( async (e) => {
        let checked = $w("#switch1").checked;
        sortPosts(checked);
    })
    
    // deleteOldPosts(); // Call the deleteOldPosts function when the page loads
});




// async function checkPost() {
//     console.log('[*] checking previous posts...');
//     let user = wixUsers.currentUser;
//     let userId = user.id; 
//     if (userId.length === 0 ){
//         console.log("currerent user not found!");
//         return;
//     } 
//     wixData.query('Forum/Posts')
//         .eq('_ownerId', userId)
//         .find()
//         .then((results) => {
//             console.log("result:", results);
//             if (results.items.length === 0) {
//                 return;
//             }
//         })
//         .catch((err) => {
//             console.error('Error querying user posts:', err);
//         });
//     return "test";
// }
