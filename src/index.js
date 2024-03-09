const usersServise = new UserService('https://jsonplaceholder.typicode.com/users');

async function usersApp() {
    const users = await usersServise.requestAllUsers();
    usersServise.renderAllUsers(users);
}

usersApp(); 