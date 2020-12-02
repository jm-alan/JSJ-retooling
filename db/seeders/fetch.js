const fetch = require('node-fetch');
const fs = require('fs');
const fsprom = fs.promises;
const threadStrings = fs.readFileSync(__dirname + '/bulkData/threads.txt', 'utf-8').split(',\n');
const questionid = [];
threadStrings.forEach((threadJSON, index) => {
    if (threadJSON) {
    const {question_id} = JSON.parse(threadJSON);
    questionid.push(question_id);
}})
(async() => {
const idString = questionid.join(';')
const responseObj = await fetch(`https://api.stackexchange.com/2.2/questions/${idString}?order=desc&sort=activity&site=stackoverflow&filter=!9_bDDxJY5`);
const questionObj = await responseObj.json();
await fsprom.appendFile(__dirname + "/bulkData/posts.txt", JSON.stringify({threadId: index+1, body: questionObj.items[0].body, userId: 1}) + '\n');
})()
