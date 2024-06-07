/**
 * Autocomplete function declaration, do not delete
 * @param {import('./__schema__.js').Payload} options
 */
import wixUsers from 'wix-users';
import wixData from 'wix-data';
export const invoke = async ({payload}) => {
  // Your code here
  console.log('[*] checking previous posts...');
  let user = wixUsers.currentUser;
  let userId = user.id; 
  if (userId.length === 0 ){
      console.log("currerent user not found!");
      return;
  } 
  wixData.query('Forum/Posts')
      .eq('_ownerId', userId)
      .find()
      .then((results) => {
          console.log("result:", results);
          if (results.items.length === 0) {
              return;
          }
      })
      .catch((err) => {
          console.error('Error querying user posts:', err);
      });
return {} // The function must return an empty object, do not delete
};