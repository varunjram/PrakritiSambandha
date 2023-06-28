export const postFilterBy = (sortBy, posts) => {
  if (sortBy === "LATEST")
    return posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};
