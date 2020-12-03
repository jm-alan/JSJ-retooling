const fetch = require('node-fetch');
const fs = require('fs');
const fsprom = fs.promises;

(async () => {
  const fetchData = await fetch('https://api.stackexchange.com/2.2/questions?pagesize=20&order=desc&sort=activity&site=stackoverflow&filter=!9_bDDxJY5');
  const questionObj = await fetchData.json();
  questionObj.items.forEach(async (question) => {
    await fsprom.appendFile(__dirname + '/bulkData/questions.txt', JSON.stringify({ question: question.body, title: question.title }) + '\n gfg');
  });
})();
