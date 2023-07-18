document.addEventListener('DOMContentLoaded', () => {
  const userList = document.getElementById('user-list');
  const userModal = document.getElementById('user-modal');
  const userModalContent = document.getElementById('user-modal-content');

  // Fonction pour récupérer les données de l'API
  async function fetchUsers() {
    try {
      const response = await fetch('https://reqres.in/api/users?per_page=12'); // Charger les données à partir du fichier api.json
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur de récupération des utilisateurs:', error);
      return [];
    }
  }

  // Fonction pour afficher les informations détaillées d'un utilisateur dans la div modale
  function showUserDetails(user) {
    userModalContent.innerHTML = `
      <img src="${user.avatar}" alt="Avatar de ${user.first_name}">
      <h2>${user.first_name} ${user.last_name}</h2>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>ID:</strong> ${user.id}</p>
      <!-- Ajoutez d'autres propriétés ici si nécessaire -->
    `;

    userModal.style.display = 'flex';
  }

  // Fonction pour masquer la div modale
  function hideUserModal() {
    userModal.style.display = 'none';
  }

  // Fonction pour afficher les utilisateurs sur la page
  async function displayUsers() {
    const users = await fetchUsers();
    console.log(users.data);
    if (users.length === 0) {
      userList.innerHTML = '<li>Aucun utilisateur trouvé.</li>';
      return;
    }

    users.data.forEach(element => {
      // console.log(element);
      userList.innerHTML += `<li data-id="${element.id}">
        <span>Nom:</span>${element.first_name} ${element.last_name}<br>
          <span>Email:</span>${element.email}<br>
            <img src="${element.avatar}" alt="Avatar de ${element.first_name}">
            </li>`;
    });

    let lis = document.querySelectorAll("li");
    console.log(lis);
    lis.forEach((element, index) => {
      element.addEventListener("click", () => {
        userModal.classList.add("active");
        users.data.forEach(() => {
          const idpers = users.data[index];
          userModalContent.innerHTML = `
          <div>
          <button id= "back">
          Back
          </button>
          </div>
          <li data-id="${idpers.id}">
          <span>Nom:</span>${idpers.first_name} ${idpers.last_name}<br>
            <span>Email:</span>${idpers.email}<br>
              <img src="${idpers.avatar}" alt="Avatar de ${idpers.first_name}">
              </li>`;
        })
        let back = document.getElementById("back");
        back.addEventListener("click", () => {
          userModal.classList.remove("active");
        })
      })
    });

    // Ajouter un gestionnaire d'événements pour afficher les détails de l'utilisateur au clic
    // userList.addEventListener('click', (event) => {
    //   const targetUser = event.target.closest('li');
    //   if (targetUser) {
    //     const userId = targetUser.getAttribute('data-id');
    //     const user = users.find(u => u.id === parseInt(userId));
    //     if (user) {
    //       showUserDetails(user);
    //     }
    //   }
    // });

    // // Ajouter un gestionnaire d'événements pour masquer la div modale au clic en dehors de celle-ci
    // userModal.addEventListener('click', (event) => {
    //   if (event.target === userModal) {
    //     hideUserModal();
    //   }
    // });
  }

  displayUsers();
});
