const MIN_INDEX = 1,
  MAX_INDEX = 20;

async function getPosts(start, end) {
  //
  try {
    // if fetch only certain number, forced to fetch with for loop (1 to number)
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);

    if (!response.ok) {
      throw new Error("response not fine");
    }

    let json = await response.json();
    console.log(json);
    return json.slice(start, end);
  } catch (error) {
    console.log("unexpected error : \n" + error);
  }
}

async function getPostsPerPage(pageNumber) {
  let postElements = [];
  const postsData = await getPosts((pageNumber - 1) * 5, 5 * pageNumber);
  postsData.forEach((element) => {
    let div = document.createElement("div");
    let title = div.appendChild(document.createElement("h2"));
    let text = div.appendChild(document.createElement("p"));
    let userId = div.appendChild(document.createElement("p"));
    title.textContent = element.title;
    text.textContent = element.body;
    userId.textContent = element.userId;
    divPosts.appendChild(div);
    postElements.push(div);
  });
  return postElements;
}

const body = document.querySelector("body");
const main =
  document.querySelector("main") ||
  body.appendChild(document.createElement("main"));

const divPostsSection = main.appendChild(document.createElement("div"));
const titleSectionPosts = divPostsSection.appendChild(
  document.createElement("h2")
);
const divPostsButtons = divPostsSection.appendChild(
  document.createElement("div")
);
const divPosts = divPostsSection.appendChild(document.createElement("div"));

const btnPrevPosts = divPostsButtons.appendChild(
  document.createElement("button")
);
const btnNextPosts = divPostsButtons.appendChild(
  document.createElement("button")
);

// in case current posts are needed I store them
let posts = [];
let indexPostPage = 1;

titleSectionPosts.textContent = "Posts Section";
btnPrevPosts.textContent = "show previous";
btnNextPosts.textContent = "show next";
posts = getPostsPerPage(indexPostPage);

btnPrevPosts.addEventListener("click", () => {
  // remove current posts
  divPosts.textContent = "";
  // index <= 0 makes not sense so i added a limit
  indexPostPage > MIN_INDEX && indexPostPage--;
  posts = getPostsPerPage(indexPostPage);
});

btnNextPosts.addEventListener("click", () => {
  // remove current posts
  divPosts.textContent = "";
  // index >= max number of pages impossible so limit
  indexPostPage < MAX_INDEX && indexPostPage++;
  posts = getPostsPerPage(indexPostPage);
});
