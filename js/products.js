const ORDER_ASC_BY_COST = "+";
const ORDER_DESC_BY_COST = "-";
const ORDER_BY_PROD_SOLD = "Rel.";
const PRODUCT_LIST_URL = PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE;
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCost = undefined;
let maxCost = undefined;

// function busqueda() {
//     let busqueda = document.getElementById('buscar').value;
     

//     let currentProductsArray = products.filter( (productos) => {
//         return productos.products.name.toLowerCase().indexOf(busqueda.toLowerCase()) > -1;
//     })
//     mostrarProductos(currentProductsArray);
// };



function mostrarProductos(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let products = currentProductsArray[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(products.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(products.cost) <= maxCost))){

            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + products.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ products.name +` - `+ products.currency + ' ' + products.cost +`</h4>
                        <p> `+ products.description +`</p> 
                        </div>
                        <small class="text-muted">` + products.soldCount + ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort((a, b) => a.cost - b.cost)

    }else if (criteria === ORDER_DESC_BY_COST){

        result = array.sort((a, b) => b.cost - a.cost)

    }else if (criteria === ORDER_BY_PROD_SOLD){

        result = array.sort((a, b) => b.soldCount - a.soldCount)
    }

    return result;
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    mostrarProductos();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_LIST_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductsArray = resultObj.data.products;           
            mostrarProductos(currentProductsArray);
        }
        document.getElementById('catName').innerHTML = resultObj.data.catName;
        })

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortBySold").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_SOLD);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        mostrarProductos();
    });

    document.getElementById("rangeFilter").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }

        mostrarProductos();
    });
    // document.getElementById('buscar').addEventListener('keyup', ()=>{
    //     busqueda();
        
    // });
});