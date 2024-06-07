// Filename: public/helper.js

import wixData from 'wix-data';
import wixUsers from 'wix-users';

const breakfasts = [
  "663ea4db85257c0010ce82b0", 
  "66542928d67715001025606e", 
  "6654cc0eafbac10010e5baa9", 
  "6654cc6d1e06ee0010877491", 
  "665429a0d67715001025606f", 
  "665429f0d677150010256070"
]

const lunchs = [
  "663ea4db85257c0010ce82b1", 
  "665428bbd67715001025606d", 
  "6654cbef1e06ee0010877479", 
  "6654cc867b2fa600101f7ecf",
  "665429cb5b0e3a0010589ad7", 
  "6654286cced3d500109a86bf"
]

const dinners = [
  "663ea4db85257c0010ce82b2", 
  "66542951ced3d500109a86c0", 
  "665429e3698f3d0010c64aea", 
  "6654cbed1e06ee0010877478", 
  "6654cc781e06ee0010877492", 
  "665429b99ca60c0010e0dcdf"
]

const snacks = [
  "663ea65085257c0010ce82cf", 
  "6654ca713a435f00103d098f"
]

export const sortPosts = ( (checked) => {
  console.log('checked:', checked);
  if ( checked === false ) {
    $w("#dataset1").onReady( () => {
      $w("#dataset1").setFilter( wixData.filter() )
      .then( () => {
        console.log("filtering reset");
      } )
      .catch( (err) => {
        console.log('error in filtering', err.message, err.code);
      }
      );
      $w("#dataset1").setSort( wixData.sort() )
      .then( () => {
        console.log("sorting reset");
      } )
      .catch( (err) => {
        console.log('error in sorting', err.message, err.code);
      });
    } );
    return;
  }

  let userId = wixUsers.currentUser.id;
  console.log('user:', userId);
  // let old_indices = [];
  const totalPost = $w("#dataset1").getTotalCount();
  console.log('Before sort');
  $w("#dataset1").getItems(0, totalPost).then( (result) => {
    console.log('items', result.items);
    // for (let post of result.items) {
    //   console.log('post:', post);
    //   old_indices.push(post._id);
    // }
  } )
  .catch( (err) => {
    let errMsg = err.message;
    let errCode = err.code;
  } );

  // Query the forum posts collection posted by the current user
  let breakfast = 0;
  let lunch = 0;
  let dinner = 0;
  let snack = 0;

  // Check if the user has posted in any of the categories
  for ( let i = 0; i < breakfasts.length; i++ ) {
    wixData.query("Forum/Posts")
      .eq('_ownerId', userId)
      .eq('categoryId', breakfasts[i])
      .find()
      .then((results) => {
        if(results.items.length > 0) {
          console.log('breakfast:', results.items.length);
          breakfast += results.items.length;
        }
      } )
      .catch((err) => {
          console.log("error in querying breakfasts", err);
      });
  }
  for ( let i = 0; i < lunchs.length; i++ ) {
    wixData.query("Forum/Posts")
    .eq('_ownerId', userId)
    .eq('categoryId', lunchs[i])
    .find()
    .then((results) => {
        if(results.items.length > 0) {
            lunch += results.items.length;
        }
    }
    )
    .catch((err) => {
        console.log(err);
    });
  }
  for ( let i = 0; i < dinners.length; i++ ) {
    wixData.query("Forum/Posts")
    .eq('_ownerId', userId)
    .eq('categoryId', dinners[0])
    .find()
    .then((results) => {
        if(results.items.length > 0) {
            dinner += results.items.length;
        }
    }
    )
    .catch((err) => {
        console.log(err);
    });
  }
  
  for ( let i = 0; i < snacks.length; i++ ) {
    wixData.query("Forum/Posts")
    .eq('_ownerId', userId)
    .eq('categoryId', snacks[i])
    .find()
    .then((results) => {
        if(results.items.length > 0) {
            snack += results.items.length;
        }
    }
    )
    .catch((err) => {
        console.log(err);
    });
  }
  // Check the time of day
  const now = new Date();
  const hours = now.getHours();

  // Filter the posts based on the user's previous posts
  let filter = wixData.filter();
  if ( breakfast > 0 ) {
    filter = filter.hasSome("categoryId", [...lunchs, ...dinners, ...snacks]);
  }
  if ( lunch > 0 ) {
    filter = filter.hasSome("categoryId", [...breakfasts, ...dinners, ...snacks]);
  }
  if ( dinner > 0 ) {
    filter = filter.hasSome("categoryId", [...breakfasts, ...lunchs, ...snacks]);
  }
  if ( snack > 0 ) {
    filter = filter.hasSome("categoryId", [...breakfasts, ...lunchs, ...dinners]);
  }

  // filter based on the time of day
  if ( hours >= 12 ) {
    filter = filter.hasSome("categoryId", [...lunchs, ...dinners, ...snacks]);
  } else if ( hours >= 18 ) {
    filter = filter.hasSome("categoryId", [...breakfasts, ...lunchs, ...snacks]);
  } 

  $w("#dataset1").onReady( () => {
    $w("#dataset1").setFilter(filter)
    .then( () => {
      console.log("Dataset is now filtered");
    } )
    .catch( (err) => {
      console.log('error in filtering', err.message, err.code);
    });
    console.log('After sort');
    $w("#dataset1").setSort( sort )
    .then( () => {
        console.log("Dataset is now sorted");
        $w("#dataset1").getItems(0, totalPost).then( (result) => {
          console.log('items', result.items);
        } )
      $w("#dataset1").onReady( () => {
        $w("#dataset1").refresh()
          .then( () => {
            $w("#dataset1").getItems(0, totalPost).then( (result) => {
              console.log('items', result.items);
            } )
          } );
      } );
    } )
    .catch( (err) => {
      console.log('error in sorting', err.message, err.code);
    } );
  } );
})

   
      // Update the Forum/Posts with the new item
    //   for (let id of old_indices) {
    //     wixData.remove("Forum/Posts", id)
    //     .then((results) => {
    //         console.log(results); //see item below
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    //   }
    //   $w("#dataset1").getItems(0, totalPost).then( (result) => {
    //     console.log('items', result.items);
    //     for (let post of result.items) {
    //         let toUpdate = Object.keys(post).filter(objKey =>
    //             objKey !== '_id').reduce((newObj, key) =>
    //             {
    //                 newObj[key] = post[key];
    //                 return newObj;
    //             }, {}
    //         );
    //         wixData.insert("Forum/Posts", toUpdate)
    //             .then((results) => {
    //             console.log(results); //see item below
    //         })
    //         .catch((err) => {
    //             let errorMsg = err;
    //             console.log(errorMsg);
    //         });
    //     }
    //   } )
    //   .catch( (err) => {
    //     let errMsg = err.message;
    //     let errCode = err.code;
    //   } );
    // } )