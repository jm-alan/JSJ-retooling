export default async function (postArr, pageNumber) {
  const responseObj = await fetch(`/api/threads?list=${(postArr.slice(10 * (pageNumber - 1), 10 * pageNumber)).join(',')}`);
  const { threadObjects: threads } = responseObj.ok ? await responseObj.json() : { threadObjects: [] };
  threads.forEach(({ Posts }) => Posts.sort(({ isQuestion: a }, { isQuestion: b }) => b - a));
  const returnArr = threads.map((thread) => {
    const timeStamp = `asked ${new Date(thread.createdAt).toLocaleString({}, { timeStyle: 'short', dateStyle: 'short' }).split(',').join(' |')} by `;
    return {
      id: thread.id,
      numberOfAnswers: thread.Posts.length - 1,
      score: thread.Posts[0].score,
      title: thread.title,
      userId: thread.userId,
      userName: thread.User.userName,
      timeStamp
    };
  });
  return returnArr;
}
