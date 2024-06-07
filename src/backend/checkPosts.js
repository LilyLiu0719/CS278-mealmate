import wixData from 'wix-data';
import wixChatBackend from 'wix-chat-backend';

export async function checkPost(userId, categoryId) {
    if (userId.length === 0 ){
        console.log("currerent user not found!");
        return;
    } 
    const results = await getUserPosts(userId, categoryId);
    console.log("result:", results);
    return true;
    if (results._totalCount === 0) {
        return false;
    } else {
        return true;
    }
}

export async function removePost(postId) {
    wixData.remove('Forum/Posts', postId).then(() => {
        console.log(`Post deleted.`);
    })
    .catch((err) => {
        console.error(`Error deleting post ${postId}:`, err);
    });
}

function getUserPosts(userId, categoryId) {
    wixData.query('Forum/Posts')
        .eq('_ownerId', userId)
        // .eq('categoryId', categoryId)
        .find()
        .then((results) => {
            return results;
        })
        .catch((err) => {
            console.error('Error querying user posts:', err);
            return [];
        });
    return [];
}
