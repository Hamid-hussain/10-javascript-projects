const meals = document.getElementById('mealsCol');
const favMeals = document.getElementById('fav-meals')

getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
  const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const respData = await resp.json();
  const randomMeal = respData.meals[0]

  addMeal(randomMeal)

}

async function getMealById(id) { 
  const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);
  
  const respData = await resp.json();
  const meal = respData.meals[0];

  return meal;
}

async function getMealBySearch(term) { 
  const meals = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata'+term)
}



function addMeal(mealData) {
  const meal = document.createElement('div');
  meal.classList.add('meal');

  meal.innerHTML = `
  <div class="meal-header rounded-lg">
    <img src="${mealData.strMealThumb}" class="w-60 h-48 object-fill" alt="${mealData.strMeal}" />
  </div>
  <div class="meal-body flex justify-between items-center p-2 bg-red-500 w-60">
    <h4 class="font-bold">${mealData.strMeal}</h4>
    <button class="fav-btn active:text-red-400 ">
      <i class="fas fa-heart"></i>
    </button>
  </div> `;

  const btn = meal.querySelector('.meal-body .fav-btn');

  btn.addEventListener("click", () => {
    if(btn.classList.contains('active')){
      removeMealLS(mealData.idMeal)
      btn.classList.remove('active')
    }else{
      addMealLS(mealData.idMeal)
      btn.classList.add('active')
    }
    
  });

meals.appendChild(meal);
}

function addMealLS(mealId){
  const mealIds = getMealLS();

  localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
}

function removeMealLS(mealId){
  const mealIds = getMealLS();

  localStorage.setItem(
    "mealIds", JSON.stringify(mealIds.filter((id) => id !== mealId))
    );
}

function getMealLS(){
  const mealIds = JSON.parse(localStorage.getItem('mealIds'));

  return mealIds === null ? [] : mealIds;

}

async function fetchFavMeals() {
  const mealIds = getMealLS();

  for(let i=0; i<mealIds.length; i++) {
    const mealId = mealIds[i];

   meal = await getMealById(mealId)
   
   
  addMealFav(meal)
  }
}

function addMealFav(mealData) {
  const favMeal = document.createElement('li');;

  favMeal.innerHTML = `
  <li class="flex-row text-center w-14 h-14 rounded-full mb-20">
      <img src="${mealData.strMealThumb}" class="rounded-full object-contain" alt="${mealData.strMeal}" />
      <span>${mealData.strMeal}</span>
  </li>`;

  favMeals.appendChild(favMeal)

}