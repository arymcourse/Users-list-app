function UserService(url) {
    this.url = url;
}

UserService.prototype.requestAllUsers = async function() {
    const users = await fetch(this.url);
    return users.json();
}

UserService.prototype.requestUserById = async function(id) {
    const users = await this.requestAllUsers();
    const selectedUser = users.find(user => { return user.id === id; });
    return selectedUser;
}

UserService.prototype.renderAllUsers = function(users) {
    const usersList = document.querySelector('.users-list');

    const baseImageUrl = new URL("https://api.lorem.space/image/face?w=150&h=150");

    users.forEach(user => {
        const userItem = document.createElement('li');
        userItem.classList.add('user-item');

        const baseImageUrl = new URL("https://api.lorem.space/image/face?w=150&h=150");
        baseImageUrl.searchParams.append('r', user.id);

        userItem.innerHTML = `
            <figure>
                <img src="${baseImageUrl}" alt=""></img>
                <figcaption>
                    <span>${user.name}</span>
                    <span>${user.company.name}</span>
                </figcaption>
            </figure>
        `;

        const showSelectedUser = async () => {
            const loader = document.querySelector('.loader');
            const selectedUserItem = document.querySelector('.selected-user-item');
            const moreInfoArea = document.querySelector('.more-info-area');

            loader.style.visibility = 'visible';
            const selectedUser = await this.requestUserById(user.id);
            loader.style.visibility = 'hidden';

            selectedUserItem.innerHTML = userItem.innerHTML;
            selectedUserItem.querySelector('span:last-of-type').innerText = `Username:  ${selectedUser.username}`;

            moreInfoArea.innerHTML = `
                <ul class="more-info">
                    <li>
                        <span>Company</span>
                        <span>${selectedUser.company.name}</span>
                    </li>
                    <li>
                        <span>Phone</span>
                        <span>${selectedUser.phone}</span>
                    </li>
                    <li>
                        <span>Email</span>
                        <span><a href='#'>${selectedUser.email}</a></span>
                    </li>
                    <li>
                        <span>Address</span>
                        <span>
                        ${selectedUser.address.suite},
                        ${selectedUser.address.street},
                        <br>
                        ${selectedUser.address.city} / ${selectedUser.address.zipcode}
                        </span>
                    </li>
                </ul>
            `;
        };
        
        userItem.addEventListener('click', showSelectedUser);
        console.log(user);
        usersList.append(userItem);
    });
}