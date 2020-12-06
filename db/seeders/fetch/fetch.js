const fetch = require('node-fetch');
const fs = require('fs');
const fsprom = fs.promises;

const fetcher = async () => {
  const fetchData = await fetch('https://api.stackexchange.com/2.2/questions?pagesize=100&order=desc&sort=votes&tagged=javascript&site=stackoverflow&filter=!td4SDmGtBjnw6xm9cNhTsfnlh2K.cxD');
  const questionObj = await fetchData.json();
  questionObj.items.forEach(async ({ body, title, answers, score}, idx) => {
    await fsprom.appendFile(__dirname + `/bulkData/question${idx+1}.txt`, JSON.stringify({ body, title, answers, score }));
  });
};

fetcher();
