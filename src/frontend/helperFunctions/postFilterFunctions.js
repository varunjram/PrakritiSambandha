export const postFilterBy = (sortBy, posts, userName = null) => {
  const postToFilter = userName ? posts.filter((post) => post?.username === userName) : posts;

  if (sortBy === "LATEST") {
    return postToFilter.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt));
  } else if ("TRENDING") {
    return postToFilter.sort((a, b) => b.likes?.likeCount - a.likes?.likeCount);
  }
};
