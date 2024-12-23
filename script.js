async function fetchData(url) {
  // commune
  //URL->JSON
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

function displayCommentsData(idElementToInsertData, slice) {
  // displays séparés, format des json différents
  // affiche les données données en argument
  const ul = document.getElementById(idElementToInsertData);
  ul.innerHTML = "";

  for (let element of slice) {
    let li = document.createElement("li");
    li.textContent = element.body;
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
  // découpe le tableau avec toutes les données pour récupérer
  //     un tableau qui comprends juste les données à afficher.
  const start = (currentPage - 1) * dataPerPage;
  const end = start + dataPerPage;
  return data.slice(start, end);
}

function updatePagination(data, pageElementId, next = true, dataPerPage = 20) {
  // determine si on peut changer de page et effectue le changement si possible
  const currentPageElement = document.getElementById(pageElementId);
  let currentPage = currentPageElement.value;

  if (next && currentPage < Math.ceil(data.length / dataPerPage)) {
    currentPage++;
  } else if (!next && currentPage > 1) {
    currentPage--;
  }
  currentPageElement.value = currentPage;
  return currentPage;
}

function eventList(
  idElementToInsertData,
  displayFunc, // paramètre qui contient la fonction d'affichage à appeler
  data, // array de toute les données soit commentaire, soit posts
  pageElementId, // id de l'element contenant le numéro de la page  actuel
  next = true, // variable qui determine si on va a la page suivante(si next==true) ou précédente(next==false)
  dataPerPage = 20
) {
  // gère tout ce qui se passe quand un bouton est appuyé
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

//users

const cardsDiv = document.createElement("div");
cardsDiv.classList.add("cards-div");
document.body.appendChild(cardsDiv);
let userIndex = 0;
let allUsers;

const createCard = (data) => {
  const userCard = document.createElement("div");
  userCard.classList.add("user-card");
  const userInfo = document.createElement("ul");
  userCard.appendChild(userInfo);
  cardsDiv.appendChild(userCard);
  Object.entries(data).forEach(([key, valeur]) => {
    const li = document.createElement("li");
    li.innerText = `${key}: `;
    if (typeof valeur !== "object") {
      li.innerText += valeur;
    } else {
      const nestedList = createCard(valeur);
      li.appendChild(nestedList);
    }
    userInfo.appendChild(li);
  });
  return userCard;
};

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((data) => {
    allUsers = data;
    console.log(allUsers.length);
    for (let i = userIndex; i < userIndex + 5; i++) {
      createCard(allUsers[i]);
    }
    userIndex += 5;
  })
  .catch((error) => console.log(error.message));

const clearCards = () => {
  cardsDiv.innerText = "";
};

const chargePrecedentUsers = document.createElement("button");
document.body.appendChild(chargePrecedentUsers);
chargePrecedentUsers.innerText = "Charge 5 precedent users";

const chargeNextUsers = document.createElement("button");
document.body.appendChild(chargeNextUsers);
chargeNextUsers.innerText = "Charge 5 next users";

chargePrecedentUsers.addEventListener("click", () => {
  if (userIndex <= 5) {
    alert("No precedent users");
  } else {
    userIndex -= 5;
    clearCards();
    for (let i = userIndex - 5; i < userIndex; i++) {
      console.log(userIndex);
      createCard(allUsers[i]);
    }
  }
});

chargeNextUsers.addEventListener("click", () => {
  if (userIndex >= allUsers.length) {
    alert("All users already loaded");
  } else {
    clearCards();
    for (let i = userIndex; i < userIndex + 5; i++) {
      console.log(userIndex);
      createCard(allUsers[i]);
    }
    userIndex += 5;
  }
});
