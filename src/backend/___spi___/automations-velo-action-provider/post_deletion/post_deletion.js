/**
 * Autocomplete function declaration, do not delete
 * import wixData from 'wix-data';
 * @param {import('./__schema__.js').Payload} options
 */
import wixData from 'wix-data';

export function deleteOldPosts() {
    // Calculate the date and time 24 hours ago
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setDate(twentyFourHoursAgo.getDate() - 1);

    // Query the forum posts collection for posts older than 24 hours
    wixData.query('Forum/Posts')
        .lt('_createdDate', twentyFourHoursAgo) // Filter posts created more than 24 hours ago
        .find()
        .then((results) => {
            // Check if there are any old posts to delete
            if (results.items.length === 0) {
                console.log('No posts older than 24 hours found.');
                return;
            }

            // Iterate over the old posts and delete them
            results.items.forEach((post) => {
                // Delete the old post from the database
                let options = {
                    "suppressAuth": true,
                    "suppressHooks": true
                };
                wixData.remove("CMS/Posts", post._id, options)
                    .then(() => {
                        console.log(`Post deleted successfully.`);
                    })
                    .catch((err) => {
                        console.error(`Error deleting post`, err);
                    });
            });
        })
        .catch((err) => {
            console.error('Error querying old posts:', err);
        });
    console.log('Delete operation completed.');
}

export const invoke = async ({payload}) => {
    await deleteOldPosts();
    return {}; // The function must return an empty object
};
