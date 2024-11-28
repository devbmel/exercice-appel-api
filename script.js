let currentPage = 1;
const commentsPerPage = 20;
let comments = [];
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

async function fetchComments() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    );
    comments = await response.json();
    displayComments();
  } catch (error) {
    console.error("Erreur lors de la récupération des commentaires:", error);
  }
}

function displayComments() {
  const listComments = document.getElementById("listComments");
  listComments.innerHTML = "";

  const start = (currentPage - 1) * commentsPerPage;
  const end = start + commentsPerPage;
  const currentComments = comments.slice(start, end);

  currentComments.forEach((comment) => {
    const li = document.createElement("li");
    li.textContent = comment.body;
    listComments.appendChild(li);
  });
}

nextBtn.addEventListener("click", () => {
  if (currentPage * commentsPerPage < comments.length) {
    currentPage++;
    displayComments();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayComments();
  }
});

fetchComments();
