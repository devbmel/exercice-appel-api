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
}

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
    for (let i = userIndex-5; i < userIndex; i++) {
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