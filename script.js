const listComments = document.getElementById("comments");

// async function fetchComments() {
//   try {
//     const response = await fetch(
//       "https://jsonplaceholder.typicode.com/comments"
//     );
//     const comments = await response.json();
//     console.log(comments);
//     listComments.appendchild(comments);

//   } catch (error) {
//     console.error("Erreur lors de la récupération des commentaires:", error);
//   }
// }

async function fetchComments() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    );
    const comments = await response.json();
    console.log(comments);

    listComments.appendChild(comments);
  } catch (error) {
    console.error("Erreur lors de la récupération des commentaires:", error);
  }
}

fetchComments();
