async function fetchComments() {
  const listComments = document.getElementById("listComments");

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    );
    const comments = await response.json();
    console.log(comments);
    let result = [];
    let count = 0;

    for (let comment of comments) {
      if (count < 20) {
        result.push(comment);
        count++;
      } else {
        break;
      }
    }
    console.log(result);

    result.forEach((comment) => {
      const li = document.createElement("li");
      li.textContent = comment.body;
      listComments.appendChild(li);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des commentaires:", error);
  }
}

fetchComments();
