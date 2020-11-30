const fetch = require('node-fetch');
const fs = require('fs').promises;

const getter = () => {
  let intervalCountr = 0;
  const interval = setInterval(async () => {
    if (++intervalCountr === 101) return clearInterval(interval);
    const respObj = await fetch(`https://api.stackexchange.com/2.2/questions?page=${intervalCountr}&pagesize=100&order=desc&sort=creation&tagged=JavaScript&site=stackoverflow&filter=withbody`);
    if (respObj.ok) {
      const quesJSON = await respObj.json();
      quesJSON.items.forEach(async ({ title, body, question_id }, idx) => {
        console.log('Now writing question', idx + 1, 'page', intervalCountr, 'to file.');
        const threadId = idx + intervalCountr * 10;
        const postObj = {
          body,
          userId: 1,
          threadId,
          question_id,
          isQuestion: true,
          score: 0
        };
        const threadObj = {
          title,
          userId: 1,
          question_id,
          threadId
        };
        await fs.appendFile(`./threads/page${intervalCountr}.txt`, JSON.stringify(threadObj) + ',\n', 'utf-8');
        await fs.appendFile(`./posts/page${intervalCountr}.txt`, JSON.stringify(postObj) + ',\n', 'utf-8');
      });
    } else {
      console.log('Response not OK?');
      console.log('Status:', respObj.status);
      console.log('Message:', respObj.message);
      console.log(respObj);
    }
  }, 3333);
};

getter();
