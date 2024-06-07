import wixForum from 'wix-forum.v2';
import { checkPost, removePost } from 'backend/checkPosts';

export async function wixForum_onPostLiked(event) {
  console.log("onPostLiked");
}

export async function wixForum_onPostCreated(event) {
  console.log("onPostCreated");
  const postId = event.postId;
  const userId = event.post._ownerId;
  const categoryId = event.post.categoryId;
  const repeat = checkPost(userId, categoryId);
  if (repeat) {
    event.stopPropagation();
    removePost(postId);
    // notify('You can already posted for this meal!', "Browser", {})
  }
}

import {predict} from "backend/toxicity"

export function wixChat_onMessage(event) {
  predict(event.payload.text,event.channelId)
}