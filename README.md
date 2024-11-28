Objectif :

1. Chaque membre du groupe sera responsable d'un appel fetch et devra travailler sur une branche Git distincte dans un repository GitHub. Ensuite, chaque membre fusionnera sa branche dans la branche principale (main) après avoir terminé son travail.

2. Créer une page qui fait trois appels fetch différents à des API publiques.

API à utiliser :

    Liste d'utilisateurs : https://jsonplaceholder.typicode.com/users
    Liste de posts : https://jsonplaceholder.typicode.com/posts
    Liste de commentaires : https://jsonplaceholder.typicode.com/comments

3. Membre 1 - Récupérer et afficher les utilisateurs (5 utilisateurs avec pagination) :

   Utilisez l'API https://jsonplaceholder.typicode.com/users.
   Affichez les 5 premiers utilisateurs sur la page.
   Ajoutez des boutons de pagination pour charger les utilisateurs suivants (affichage de 5 utilisateurs par page). Lorsqu'on clique sur le bouton "Suivant", les 5 utilisateurs suivants doivent être chargés.

4. Membre 2 - Récupérer et afficher les posts (10 posts avec pagination) :
   Utilisez l'API https://jsonplaceholder.typicode.com/posts.
   Affichez les 5 premiers posts sur la page.
   Implémentez la pagination pour afficher 5 posts à la fois, avec des boutons pour naviguer entre les pages.

5. Membre 3 - Récupérer et afficher les commentaires (10 commentaires avec pagination) :

   Utilisez l'API https://jsonplaceholder.typicode.com/comments.
   Affichez les 20 premiers commentaires sur la page.
   Implémentez la pagination pour afficher 20 commentaires à la fois.

- Ajoutez des messages d'erreur si les données ne sont pas récupérées correctement.
  Pour générer une erreur dans le chargement des données, le plus simple est sans doute de faire une faute de frappe dans l'url

- Améliorez la pagination en affichant le numéro de la page actuelle.

- Ajoutez un bouton "Charger toutes les données" pour charger tout le contenu d'un coup sans pagination.

Aide pour Github : 1. Préparation du repository GitHub :

    - Créez un repository GitHub pour ce projet.
    - Ajoutez tous les membres de votre groupe en tant que collaborateurs.
    - Chaque membre doit créer sa propre branche à partir de la branche main (par exemple, feature/users, feature/posts, feature/comments).
    Une fois les modifications effectuées sur la branche, chaque membre devra créer une pull request pour fusionner sa branche dans la branche main.
