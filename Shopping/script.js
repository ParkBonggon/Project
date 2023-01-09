
//Fetch the clothes from the JSON file
function loadClothes(){
    return fetch('data.json')
    .then(response=> response.json())
    .then(json => json.items);
}

//main
loadClothes()
.then(clothes => {
    // displayClothes(clothes);
    // setEventLsiteners(clothes)
})
.catch(console.log);