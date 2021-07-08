//Notes:

//global variables


//Fetch Data


//User Search End Point based on form submit [2]
function fetchSearchUser(searchInput) {
    fetch(`https://api.github.com/search/users?q=${searchInput}`)
    .then(res => res.json())
    .then(json => json.items.forEach(renderUserCards))

}

//User Repos Endpoint function

function fetchUserRepos(username){
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(res => res.json())
    .then(json => json.forEach(repoRender))
}


//DOM Manipulations
//render user cards for each user that comes up from search [3]
//include username, avatar, and link to their profile

function renderUserCards(data){
    //create elements
    let li = document.createElement('li')
    let h2Title = document.createElement('h2')
    let img = document.createElement('img')
    let a = document.createElement('a')
    let pUrl = document.createElement('p')

    //populate with content
    li.className = 'userCard'
    h2Title.textContent = data.login
    img.src = data.avatar_url
    pUrl = data.url
    //a.href = data.url


    //append to DOM
    //pUrl.append(a)
    li.append(img, h2Title, pUrl)
    document.querySelector('#user-list').append(li)

//Click event listener on card 

   li.addEventListener('click', () => {
       //clear content
       document.querySelector('#user-list').innerHTML = ''
        document.querySelector('#repos-list').innerHTML = ''
        //call function to pull and generate repo page
       fetchUserRepos(data.login)
   })

}

function repoRender(data) {
    //create elements
    let li = document.createElement('li')
    let h2Title = document.createElement('h2')

    //populate with content
    li.className = 'repoCard'
    h2Title.textContent = data.name


    //append to DOM
    li.append(h2Title)
    document.querySelector('#repos-list').append(li)
}



//Event Listeners / Handlers
//User search form on SUBMIT returns a search term that is passed in the fetch data function [1]

//Search Event
document.querySelector('#github-form').addEventListener('submit', (e) => {
    e.preventDefault() 
    //console.log(e.target.search.value)
    //clear Ul
    document.querySelector('#user-list').innerHTML = ''
    document.querySelector('#repos-list').innerHTML = ''

   let searchInput = e.target.search.value
   searchInput = searchInput.split(" ").join('+')
   //console.log(searchInput)
//renderUserCards(fetchSearchUser(searchInput));
   fetchSearchUser(searchInput);
}) 


