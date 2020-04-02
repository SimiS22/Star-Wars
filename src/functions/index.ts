const generateList = (entities: { [key in string]: string }[]) => {
    return `<div id = "list"><ul>
    ${entities.map((entity) => `<li id = "main-list" onclick ="entityDetails('${entity.link}')">${entity.displayName}</li>`).join('')}
    </ul></div>`
} //generates list of people names,film titles etc..

async function fetchData(input: string, key: string, page: number) {
    let elementID = document.getElementById('main-content-area');
    if (elementID != null) {
        elementID.innerHTML = `<img src = "../images/loading.gif">`;
    }
    let url = 'https://swapi.co/api/' + input + '/?page=' + page;
    let response = await fetch(url);
    let data = await response.json();
    let totalCount = data.count;
    let getResults = data.results;
    let entityArray = getResults.map((element: { [key in string]: string }) => {
        let output = {
            displayName: element[key],  // key is variable and hence square brackets
            link: element.url
        }
        return output;
    })
    const checkPageCount = () => {
        let displayButtonCount = Math.ceil(totalCount / 10); //gets the number of pages for each entity (actors,films...)
        let buttonArr: any[] = [];
        if (displayButtonCount > 1) {
            for (let i = 1; i <= displayButtonCount; i++) {
                buttonArr.push(
                    i != page ?
                        `<div class = "pages" onclick="fetchData('${input}','${key}',${i})">${i}</div>` :
                        `<div class = "pages active" onclick="fetchData('${input}','${key}',${i})">${i}</div>`);
                //created buttons 
            }

            return `<div id ="pagesList">${buttonArr.join('')}</div>`;
        }
        else {
            return buttonArr;
        }
    }
    setTimeout(() => {
        if (elementID != null) {
            elementID.innerHTML = generateList(entityArray) + checkPageCount(); //displayed the list of entity names amd buttons
        }
    }, 1000)
}

const entityDetails = async (url: string) => {
    let x = document.getElementById('overlay');
    let y = document.getElementById('pop-up-content');
    if (x != null && y != null) {
        x.style.display = 'block'
        y.innerHTML = `<img src = "../images/pop-up loading.gif">`;
    }

    let response = await fetch(url);
    let data = await response.json();
    let details = Object.entries(data);

    if (y != null) {
        y.innerHTML = `<table id='details-table'>
        <tr>
        <th>Features</th>
        <th>Details</th>
        </tr>
        ${details.map((element) => {
            return `<tr>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
                </tr>`
        }).join('')}    
        </table>`
    }
}

const closeButton = () => {
    let x = document.getElementById('overlay')
    if (x != null && (x.style.display = 'block')) {
        x.style.display = 'none';
    }
}

window.onkeydown = function escClose(event: any) {
    let x = document.getElementById('overlay')
    if (event.keyCode === 27 && x != null) {
        x.style.display = 'none';
    }
}

//The onKeyDown and onKeyUp events represent keys being pressed or released, while the onKeyPress event represents a character being typed.





// async function fetchFilms() {
//     let response = await fetch('https://swapi.co/api/films');
//     let data = await response.json();
//     console.log(data)
//     return data;
// }

// const displayItem = (displayValue: any) => {
//     let elementID = document.getElementById('main-content-area')
//     if (elementID != null) {
//         elementID.innerHTML = `< h1 > ${ displayValue } </h1>`;
//     }
// }

