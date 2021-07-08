//global variables


//Fetches

//User Search End Point fetch function, with search form input as parameter
function fetchSearchUser(searchInput) {
    fetch(`https://api.github.com/search/users?q=${searchInput}`) //url based on search input
    .then(res => res.json())
    .then(json => json.items.forEach(renderUserCards)) //json included a nested object (items), for each user in json.items, execute the renderUserCard function

}

//User Repos Endpoint fetch function, with username as parameter

function fetchUserRepos(username){
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(res => res.json())
    .then(json => json.forEach(repoRender)) //for each repo in json, execute the repoRender function
}


//DOM Manipulations
//render user cards for each user that comes up from search
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

    //append to DOM
    li.append(img, h2Title, pUrl)
    document.querySelector('#user-list').append(li)

    //add event listener on li

   li.addEventListener('click', () => { 
       //clear content
       document.querySelector('#user-list').innerHTML = ''
       document.querySelector('#repos-list').innerHTML = ''
       //call function to pull and generate repo page, passing username as parameter (as this is what goes into the API url)
       fetchUserRepos(data.login)
   })

}

function repoRender(data) {
    //create elements
    let li = document.createElement('li')
    let h2Title = document.createElement('h2')

    //populate with content
    li.className = 'repoCard'
    h2Title.textContent = data.name //pulls name of the repo


    //append to DOM
    li.append(h2Title)
    document.querySelector('#repos-list').append(li)

    //will stay on the DOM until a new search is submitted
}



//Event Listeners / Handlers
//User search form on SUBMIT returns a search term that is passed as argument in the fetchSearchUser function

//Search Event
document.querySelector('#github-form').addEventListener('submit', (e) => {
    //prevent auto-refresh
    e.preventDefault() 
    //console.log(e.target.search.value)

    //clear Ul
    document.querySelector('#user-list').innerHTML = ''
    document.querySelector('#repos-list').innerHTML = ''

    //set value of searchInput
   let searchInput = e.target.search.value
   //format the input to remove spaces and replace with "+" so the url will work
   searchInput = searchInput.split(" ").join('+')
   //console.log(searchInput)
   
   fetchSearchUser(searchInput);
}) 


