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

function displayData(idElementToInsertData, data) {
  const ul = document.getElementById(idElementToInsertData);
  ul.innerHTML = "";

  for (let dt of data) {
    let li = document.createElement("li");
    li.textContent = dt.body;
    ul.appendChild(li);
  }
}

function paginate(data, currentPage = 1, dataPerPage = 20) {
  const start = (currentPage - 1) * dataPerPage;
  const end = start + dataPerPage;
  return data.slice(start, end);
}

function updatePagination(data, next = true, dataPerPage = 20) {
  const currentPageElement = document.getElementById("page");
  let currentPage = currentPageElement.value;

  if (next && currentPage * dataPerPage < data.length) {
    currentPage++;
  } else if (!next && currentPage > 1) {
    currentPage--;
  }
  currentPageElement.value = currentPage;
  return currentPage;
}

function eventList(idElementToInsertData, data, next = true) {
  let currentPage = updatePagination(data, next);
  displayData(idElementToInsertData, paginate(data, currentPage, 20));
}

// MAIN
fetchData("https://jsonplaceholder.typicode.com/comments").then((data) => {
  const nextBtn = document.getElementById("nextBtnComment");
  const prevBtn = document.getElementById("prevBtnComment");
  const idElementToInsertData = "listComments";

  displayData(idElementToInsertData, paginate(data));

  nextBtn.addEventListener("click", () => {
    eventList(idElementToInsertData, data);
  });
  prevBtn.addEventListener("click", () => {
    eventList(idElementToInsertData, data, false);
  });
});

//---------------------------------------------------------------------
