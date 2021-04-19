// Accept: application/vnd.github.v3+json
const userHead = document.getElementById('user-header');
const repoList = document.getElementById('repo-list');
const repoHead = document.getElementById('repo-head');
const searchForm = document.getElementById('github-form');

function fetchGithubByValue(value){

    fetch (`https://api.github.com/search/users?q=${value}`, {
        method: "get",
        headers: {
            "Accept": "application/vnd.github.v3+json"
        },
        body: JSON.stringify()
    })
    .then (resp => resp.json())
    .then (results => {
        results.items.forEach(user => renderUser(user));
    })
    
    };

const userList = document.getElementById('user-list');
function renderUser (user){
    const li = document.createElement('li')
    li.innerHTML = `Login:${user.login} Github: ${user.url}`;
    const avatar = document.createElement('img')
    avatar.src = user.avatar_url
    avatar.style.width = "20px"
    li.innerHTML = `${user.login}: Github: ${user.url} `;
    li.addEventListener('click', () => fetchRepos(user.login));
    li.appendChild(avatar);
    userList.appendChild(li);
}

function fetchRepos(userRepo) {
    const URL = `https://api.github.com/users/${userRepo}/repos`;
    fetch(URL, {headers:{'Accept': 'application/vnd.github.v3+json'}})
        .then(resp => resp.json())
        .then(results => {
            results.forEach(repo => renderRepo(repo));
        })
        .catch(err => console.log(err));
}


function renderRepo(repo) {
    const li = document.createElement('li');
    const a = document.createElement('a')
    a.href = repo.html_url
    a.target = "_blank"
    a.innerText = "Link to Repository"
    li.innerText = repo.name + " - "
    li.appendChild(a)
    repoList.appendChild(li)
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (searchField.value !== "") fetchUsers(searchField.value);
})

const submitBtn = document.getElementById('submit-button')
const searchBox = document.getElementById('search')
submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    fetchGithubByValue(searchBox.value)
})

