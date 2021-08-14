const sleep = (n) => new Promise((resolve) => setTimeout(resolve, n));

const posts = [
  {
    id: 1,
    title: "learing redux",
    body: "redux for easy to management for states",
  },
  {
    id: 2,
    title: "using redux-thunk",
    body: "redux-thunk is useful for async works",
  },
  {
    id: 3,
    title: "using redux-saga",
    body: "wow redux-saga",
  },
];

export const getPosts = async () => {
  await sleep(500);
  return posts;
};

export const getPostById = async (id) => {
  await sleep(500);
  return posts.find((post) => post.id === id);
};
