const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear text field
    searchField.value = '';
    // if search text empty and someone press search button
    if (searchText == '') {
        // show some error data
        const errorDiv = document.getElementById('error');
        errorDiv.classList.add('text-danger');
        errorDiv.innerText = 'Please write something!';
    } else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        fetch(url)
            .then(response => response.json())
            .then(data => displaySearchResult(data.meals));
    }

}
// Display search result
const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result');
    // remove the previous search result
    searchResult.textContent = '';
    // if meals are not found by serach keyword
    if (meals.length > 0) {
        // show no result found
        const errorDiv = document.getElementById('error');
        errorDiv.classList.add('text-danger');
        errorDiv.innerText = 'Nothing Found!';
    } else {
        // creating for each loop (for(const meal of meals){})
        meals.forEach(meal => {
            //console.log(meal);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
    <div onclick="loadMealDetail(${meal.idMeal})" class="card">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 100)}..</p>
        </div>
    </div>
    `;
            searchResult.appendChild(div);

        })
    }

}

// Load meal Details
const loadMealDetail = mealId => {
    console.log(mealId);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(response => response.json())
        //.then(data => console.log(data.meals[0]))
        .then(data => displayMealDetail(data.meals[0]))
}

// Display meal detail
const displayMealDetail = meal => {
    console.log(meal);
    const mealDetails = document.getElementById('meal-details');
    // remove previus meal details
    mealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0, 100)}</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div>      
    `;
    mealDetails.appendChild(div);
}


