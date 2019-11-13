console.log('hola mundo!');
const noCambia = "Leonidas";

let cambia = "@LeonidasEsteban"

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre
}

const getUserAll = new Promise(function(todoBien, todoMal) {
  // llamar a un api
  setTimeout(function() {
    // luego de 3 segundos
    todoBien('se acabó el tiempo');
  }, 5000)
})

const getUser = new Promise(function(todoBien, todoMal) {
  // llamar a un api
  setTimeout(function() {
    // luego de 3 segundos
    todoBien('se acabó el tiempo 3');
  }, 3000)
})

// getUser
//   .then(function() {
//     console.log('todo está bien en la vida')
//   })
//   .catch(function(message) {
//     console.log(message)
//   })

Promise.race([
  getUser,
  getUserAll,
])
.then(function(message) {
  console.log(message);
})
.catch(function(message) {
  console.log(message)
})



$.ajax('https://randomuser.me/api/', {
  method: 'GET',
  success: function(data) {
    console.log(data)
  },
  error: function(error) {
    console.log(error)
  }
})

fetch('https://randomuser.me/api/')
  .then(function (response) {
    // console.log(response)
    return response.json()
  })
  .then(function (user) {
    console.log('user', user.results[0].name.first)
  })
  .catch(function() {
    console.log('algo falló')
  });

  
(async function load(){
  async function getData(url){
    const responsive=await fetch(url)
    const data =await responsive.json()
    return data;
    
  }
  
  const $featuringContainer=document.getElementById("featuring");
  const $home=document.getElementById("home");
  const $form=document.querySelector("#form");
  
  function setAttributes($element, attributes) {
    for (const attribute in attributes) {
      $element.setAttribute(attribute, attributes[attribute]);
    }
  }
  $form.addEventListener("submit",(event)=>{
    event.preventDefault();
    $home.classList.add("search-active");
    const $loader=document.createElement("img");
    setAttributes($loader,{
      src:"src/images/loader.gif",
      height:50,
      width:50,
    })
    $featuringContainer.append($loader);
  })
  
  const actionList=await getData("https://yts.lt/api/v2/list_movies.json?genre=action")
  const dramaList=await getData("https://yts.lt/api/v2/list_movies.json?genre=drama")
  const animationList=await getData("https://yts.lt/api/v2/list_movies.json?genre=animation")
  console.log(actionList,dramaList,animationList)
  console.log("Action list",actionList);
  // const $home=$(".home");
  const $actionContainer=document.querySelector("#action");
  const $dramaContainer=document.getElementById("drama");
  const $animationContainer=document.getElementById("animation");
  
  function videoItemTemplate(movie) {
    return (
      `<div class="primaryPlaylistItem">
        <div class="primaryPlaylistItem-image">
          <img src="${movie.medium_cover_image}">
        </div>
        <h4 class="primaryPlaylistItem-title">
          ${movie.title}
        </h4>
      </div>`
    )
  }
  function createTemplate(HTMLString){
    const html=document.implementation.createHTMLDocument();
    html.body.innerHTML=HTMLString;
    return html.body.children[0]
  }
  function addEventClick($element){
    $element.addEventListener("click",()=>{
      showModal()
    })
    // $("div").on("click", function(){})
  }
  function renderMovieList(list,$container){
    // actionList.data.movies
    $container.children[0].remove();
    list.forEach((movie)=>{
      const HTMLString=videoItemTemplate(movie);
      const movieElement=createTemplate(HTMLString);
      $container.append(movieElement);
      addEventClick(movieElement);
    })

  }
  
  renderMovieList(actionList.data.movies,$actionContainer)
  renderMovieList(dramaList.data.movies,$dramaContainer)
  renderMovieList(animationList.data.movies,$animationContainer)
  
  
  const $modal=document.getElementById("modal");
  const $overlay=document.getElementById("overlay");
  const $hideModal=document.getElementById("hide-modal");
  
  const $modalTitle=$modal.querySelector("h1");
  const $modalImage=$modal.querySelector("img");
  const $modalDrescription=$modal.querySelector("p");

  function showModal(){
    $overlay.classList.add("active");
    $modal.style.animation="modalIn .8s forwards"
  }
  $hideModal.addEventListener("click",hideModal);
  function hideModal(){
    $overlay.classList.remove("active");
    $modal.style.animation="modalout .8s forwards"
  }

})()