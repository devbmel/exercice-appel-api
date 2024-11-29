async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Erreur récupération data");
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des datas:", error);
  }
}

function displayCommentsData(idElementToInsertData, data) {
  const ul = document.getElementById(idElementToInsertData);
  ul.innerHTML = "";

  for (let dt of data) {
    let li = document.createElement("li");
    li.textContent = dt.body;
    ul.appendChild(li);
  }
}

function displayPostsData(idElementToInsertData, slice) {
  let ul = document.querySelector("#" + idElementToInsertData);
  ul.innerHTML = ``;
  slice.forEach((element) => {
    let li = ul.appendChild(document.createElement("li"));
    let div = li.appendChild(document.createElement("div"));
    let title = div.appendChild(document.createElement("h2"));
    let text = div.appendChild(document.createElement("p"));
    let userId = div.appendChild(document.createElement("p"));
    title.textContent = element.title;
    text.textContent = element.body;
    userId.textContent = element.userId;
  });
}

function paginate(data, currentPage = 1, dataPerPage = 20) {
  const start = (currentPage - 1) * dataPerPage;
  const end = start + dataPerPage;
  return data.slice(start, end);
}

function updatePagination(data, pageElementId, next = true, dataPerPage = 20) {
  const currentPageElement = document.getElementById(pageElementId);
  let currentPage = currentPageElement.value;

  if (next && currentPage * dataPerPage < data.length) {
    currentPage++;
  } else if (!next && currentPage > 1) {
    currentPage--;
  }
  currentPageElement.value = currentPage;
  return currentPage;
}

function eventList(
  idElementToInsertData,
  displayFunc,
  data,
  pageElementId,
  next = true,
  dataPerPage = 20
) {
  let currentPage = updatePagination(data, pageElementId, next, dataPerPage);
  displayFunc(idElementToInsertData, paginate(data, currentPage, dataPerPage));
}

// MAIN

fetchData("https://jsonplaceholder.typicode.com/comments").then((data) => {
  const nextBtn = document.getElementById("nextBtnComment");
  const prevBtn = document.getElementById("prevBtnComment");
  const idElementToInsertData = "listComments";

  displayCommentsData(idElementToInsertData, paginate(data));

  nextBtn.addEventListener("click", () => {
    eventList(idElementToInsertData, displayCommentsData, data, "page");
  });
  prevBtn.addEventListener("click", () => {
    eventList(idElementToInsertData, displayCommentsData, data, "page", false);
  });
});

fetchData("https://jsonplaceholder.typicode.com/posts").then((data) => {
  console.log(data);
  const nextBtn = document.getElementById("nextBtnPosts");
  const prevBtn = document.getElementById("prevBtnPosts");
  const idElementToInsertData = "listPosts";

  displayPostsData(idElementToInsertData, paginate(data, 1, 5));

  nextBtn.addEventListener("click", () => {
    eventList(
      idElementToInsertData,
      displayPostsData,
      data,
      "pagePosts",
      true,
      5
    );
  });
  prevBtn.addEventListener("click", () => {
    eventList(
      idElementToInsertData,
      displayPostsData,
      data,
      "pagePosts",
      false,
      5
    );
  });
});
