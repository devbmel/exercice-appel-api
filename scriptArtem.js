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
  return userInfo;
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

const chargeUsers = document.createElement("button");
document.body.appendChild(chargeUsers);
chargeUsers.innerText = "Charge new 5 users";

chargeUsers.addEventListener("click", () => {
  if (userIndex >= allUsers.length) {
    alert("All users already loaded");
  } else {
    for (let i = userIndex; i < userIndex + 5; i++) {
      console.log(userIndex);
      createCard(allUsers[i]);
      userIndex += 1;
    }
  }
});

/*
const userCard = document.createElement("div");
      userCard.classList.add("userCard");
      const userInfo = document.createElement("ul");
      userCard.appendChild(userInfo);
      document.body.appendChild(userCard);
      Object.entries(data[i]).forEach(([key, valeur]) => {
        const li = document.createElement("li");
        li.innerText = `${key}: `;
        if (typeof valeur !== "object") {
          li.innerText += valeur;
        } else {
          const listSupl = document.createElement("ul");
          Object.entries(valeur).forEach(([key, value]) => {
            const liSupl = document.createElement("li");
            liSupl.innerText = `${key}: ${value}`;
            listSupl.appendChild(liSupl);
          });
          li.appendChild(listSupl);
        }
        userInfo.appendChild(li);
      });
*/
