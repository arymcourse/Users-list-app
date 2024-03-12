function UserService(url) { 
    this.url = url; 

    /**
        Це ті node які не потрібно перревизначати щоразу, достатньо визначити один раз
        
        this.loader = document.querySelector('.loader');
        this.selectedUserItem = document.querySelector('.selected-user-item');
        this.moreInfoArea = document.querySelector('.more-info-area');
    */
} 

UserService.prototype.requestAllUsers = async function() {
    try {
        const users = await fetch(this.url);
        return users.json();
    } catch(error) {
        console.log(error);
        return {};
    }
}

UserService.prototype.requestUserById = async function(id) {
    try {
        const selectedUser = await fetch(`${this.url}/${id}`);
        console.log(`${this.url}/${id}`)
        return selectedUser.json();
    } catch(error) {
        console.log(error);
        return {};
    } 
    // or
    // try {
    //     const users = await this.requestAllUsers();
    //     const selectedUser = users.find(user => { return user.id === id; });
    //     return selectedUser;
    // } catch(error) {
    //     console.log(error);
    //     return {};
    // }
}


/**

Краще винести окренмим методом прототипа showSelectedUser і тоді перевикористати в addEventListener

UserService.prototype.showSelectedUser = async function(user, userItem) {
    const selectedUserBlock = document.querySelector('.selected-user-block');
    selectedUserBlock.style.display = 'block';
    const closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        selectedUserBlock.style.display = 'none';
    });

    this.loader.style.visibility = 'visible';
    const selectedUser = await this.requestUserById(user.id);
    setTimeout(() => {
        loader.style.visibility = 'hidden';
    }, 500);

    this.selectedUserItem.innerHTML = userItem.innerHTML;
    this.selectedUserItem.querySelector('span:last-of-type').innerText = `Username:  ${selectedUser.username}`;



    
    /// Як ще один підхід, тут також можна окремо визначити json вузлів для оновлення

        const jsonNodes = {
            company: moreInfoArea.querySelector('.company'),
            phone: moreInfoArea.querySelector('.name'),
            email: moreInfoArea.querySelector('.email'),
            address: moreInfoArea.querySelector('.address')
        };
        
        // Оновлюємо значення вузлів
        if (jsonNodes.company) {
            jsonNodes.company.textContent = selectedUser.company.name;
        }
        if (jsonNodes.phone) {
            jsonNodes.phone.textContent = selectedUser.phone;
        }
        if (jsonNodes.email) {
            jsonNodes.email.innerHTML = `<a href='#'>${selectedUser.email}</a>`;
        }
        if (jsonNodes.address) {
            jsonNodes.address.innerHTML = `
                ${selectedUser.address.suite},
                ${selectedUser.address.street},
                <br>
                ${selectedUser.address.city} / ${selectedUser.address.zipcode}
            `;
        }


        але тоді на рівні HTML визначити

        <ul>
            <li>
                <span>Company</span>
                <span class="companny"></span>
            </li>
            <li>
                <span>Phone</span>
                <span class="name"></span>
            </li>
            <li>
                <span>Email</span>
                <span class="email"><a href='#'></a></span>
            </li>
            <li>
                <span>Address</span>
                <span class="address"></span>
            </li>
        </ul>

        тоді не треба передодавати Node в DOM а просто оновлювати
        --------------

    moreInfoArea.innerHTML = `
        <ul>
            <li>
                <span>Company</span>
                <span class="company">${selectedUser.company.name}</span>
            </li>
            <li>
                <span>Phone</span>
                <span class="name">${selectedUser.phone}</span>
            </li>
            <li>
                <span>Email</span>
                <span class="email"><a href='#'>${selectedUser.email}</a></span>
            </li>
            <li>
                <span>Address</span>
                <span class="address">
                ${selectedUser.address.suite},
                ${selectedUser.address.street},
                <br>
                ${selectedUser.address.city} / ${selectedUser.address.zipcode}
                </span>
            </li>
        </ul>
    `;
};

const showSelectedUser = () => {
    this.showSelectedUser(user, userItem);
};

userItem.addEventListener('click', showSelectedUser);
usersList.append(userItem);
*/

UserService.prototype.renderAllUsers = function(users) {
    const usersList = document.querySelector('.users-list');

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
            const selectedUserBlock = document.querySelector('.selected-user-block');
            selectedUserBlock.style.display = 'block';
            const closeBtn = document.querySelector('.close-btn');
            closeBtn.addEventListener('click', () => {
                selectedUserBlock.style.display = 'none';
            })

            const loader = document.querySelector('.loader');
            const selectedUserItem = document.querySelector('.selected-user-item');
            const moreInfoArea = document.querySelector('.more-info-area');

            loader.style.visibility = 'visible';
            const selectedUser = await this.requestUserById(user.id);
            setTimeout(() => {
                loader.style.visibility = 'hidden';
            }, 500);

            selectedUserItem.innerHTML = userItem.innerHTML;
            selectedUserItem.querySelector('span:last-of-type').innerText = `Username:  ${selectedUser.username}`;

            moreInfoArea.innerHTML = `
                <ul>
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
        usersList.append(userItem);
    });
}
