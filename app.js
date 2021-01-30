const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const mealsEl = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const single_mealEL = document.getElementById("single-meal");
const toggle = document.getElementById("toggle");


//const apiKey = "a9b8493813c64a31bca4da68c77cb990";


//Search meal and fetch from API
function searchMeal(e){
 e.preventDefault();

 //clear single Meal
 single_mealEL.innerHTML = " ";

 //get search term
 const term = search.value;
 console.log(term);

 //check for empty search term
 if(term.trim()){
   fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
   .then(res => res.json())
   .then(data => {
     console.log(data);
     resultHeading.innerHTML = `<h2>Search results for '${term}': </h2>`

     if(data.meals === null){
       resultHeading.innerHTML = `<p>There are no search result. Try again. </p>`
     } else {
       mealsEl.innerHTML = data.meals.map(meal => `
     <div class="meal">
       <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
       <div class="meal-info" data-mealId="${meal.idMeal}">
         <h3>${meal.strMeal}</h3>
       </div>
      </div>
      `)
       .join("");
      }
   });

   //clear search text
   search.value = " ";
 } else {
   alert("Please enter a search value");
 }
}

//2 get random meals by id
function getRandomMeal(){
  //clear meals and heading
  mealsEl.innerHTML = " ";
  resultHeading.innerHTML = " ";

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
  .then(res => res.json())
  .then(data => {
    const meal = data.meals[0];
    addMealToDom(meal);
  });
}

//4  featch meal by id function
function getMealById(mealID){
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
  .then(res => res.json())
  .then(data => {
   console.log(data);
  const meal = data.meals[0];
   
  addMealToDom(meal);
  })
}

//3 Add meal to DOM
function addMealToDom(meal){
  const ingredients = [];

  for(let i = 1; i <= 20; i++) {
    if(meal[`strIngredient${i}`]){
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    } else {
      break;
    }
  }

  single_mealEL.innerHTML = `
  <div class="single-meal">
  <h1>${meal.strMeal}</h1>
  <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
  <div class="single-meal-info">
  ${meal.strCategory ? `<p>${meal.strCategory}</p>` : " "}
  ${meal.strArea ?`<p>${meal.strArea}</p>`: " "}
  </div>
  <div class="main">
  <p>${meal.strInstructions}</p>
  <h2>Ingredients</h2>
  <ul>
  ${ingredients.map(ing => `<li>${ing}</li>`).join(" ")}
  </ul>
  </div>
  </div>`
}



//1 event listeners
submit.addEventListener("submit", searchMeal);
random.addEventListener("click", getRandomMeal);

toggle.addEventListener("click", () => 
document.body.classList.toggle("show-nav"));


mealsEl.addEventListener("click", e=> {
  const mealInfo = e.path.find(item => {
    console.log(item);
    if(item.classList){
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });
  if(mealInfo){
    const mealID = mealInfo.getAttribute("data-mealID");
    console.log(mealID);
    getMealById(mealID);
  }
});



