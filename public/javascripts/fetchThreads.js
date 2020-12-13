export default async function (postArr, pageNumber, reverse = true) {
  const returnArr = ((await (await fetch(`/api/threads?list=${(postArr.slice(10 * (pageNumber - 1), 10 * pageNumber)).join(',')}`)).json()).threadObjects).map((thread) => {
    const timeStamp = `created at ${
        new Date(thread.createdAt)
          .toLocaleTimeString()}
        on ${
        new Date(thread.createdAt)
          .toLocaleDateString()} by `;
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
  return reverse ? returnArr.reverse() : returnArr;
}
