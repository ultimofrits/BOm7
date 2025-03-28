const feed = document.getElementById("feed");
let postIndex = 0;
let posts = [];

function createPost(post) {
  const postElement = document.createElement("div");
  postElement.classList.add("post");
  postElement.innerHTML = `
    <div class="post-header">
      <img src="${post.avatar}" alt="${post.username}" />
      <div class="username">${post.username}</div>
    </div>
    <div class="post-content">
      ${post.contentType === "image"
        ? `<img src="${post.contentUrl}" alt="post content" />`
        : `<video controls src="${post.contentUrl}"></video>`}
      <p>${post.caption}</p>
    </div>
    <div class="post-footer">${post.date}</div>
  `;
  return postElement;
}

function loadPosts() {
  const slice = posts.slice(postIndex, postIndex + 5);
  slice.forEach(post => {
    const postEl = createPost(post);
    feed.appendChild(postEl);
  });
  postIndex += 5;
}

const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadPosts();
  }
});

const sentinel = document.createElement("div");
feed.appendChild(sentinel);
observer.observe(sentinel);

fetch("posts.json")
  .then(response => response.json())
  .then(data => {
    posts = data;
    loadPosts();
  });
