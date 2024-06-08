/*
 *
 * Code below directly obtained from this tutorial:
 * https://dev.to/amandamartindev/chat-moderation-in-wix-with-tensorflowjs-and-velo-4dd2
 *
 */

import * as toxicity from '@tensorflow-models/toxicity';
import wixChatBackend from 'wix-chat-backend';

let model;


export async function predict(input, channelId) {
    const predictions = await classify(input, channelId);
    return predictions

}


const classify = async (inputs, channelId) => {
    model = await toxicity.load()
    const results = await model.classify(inputs);
    const toxicityResult = results[6].results[0].match
    if (toxicityResult === true) {
        sendWarning(channelId)
    }

};


function sendWarning(channelId) {
    wixChatBackend.sendMessage({
            "messageText": "We don't do that here. Be nice and try again.",
            "channelId": channelId,

        })
        .then(() => {
            console.log("Chat message sent");
        })
        .catch((error) => {
            console.error(error);
        });
}