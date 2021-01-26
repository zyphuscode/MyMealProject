const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const mealsEl = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const single_mealEL = document.getElementById("single-meal");

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
       .join(" ");
       }
   });

   //clear search text
   search.value = " ";
 } else {
   alert("Please enter a search value");
 }
}


















//1 event listeners
submit.addEventListener("submit", searchMeal);
//random.addEventListener("click", getRandomMeal);
