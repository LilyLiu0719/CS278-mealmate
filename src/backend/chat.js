// backend/chat.js
import { sendMessage } from 'wix-chat-backend';

export function handleChatMessage(message) {
  const forbiddenWords = ["dumb"];
  const warningMessage = "Please be nice to everyone!";

  if (forbiddenWords.some(word => message.text.includes(word))) {
    // Send a warning message
    sendMessage({
      channelId: message.channelId,
      text: warningMessage
    });
  }
}
