const generateList = (entities: { [key in string]: string }[]) => {
    return `<div id = "list"><ul>
    ${entities.map((entity) => `<li id = "main-list" onclick ="entityDetails('${entity.link}')">${entity.displayName}</li>`).join('')}
    </ul></div>`
} //generates list of people names,film titles etc.

async function fetchData(input: string, key: string, page: number) {
    let iconsList = document.getElementsByClassName('icons');
    for (let i = 0; i < iconsList.length; i++) {
        iconsList[i].classList.remove('setActive'); //remove the active style from type in a page
    }
    let id = input;
    let activePageID = document.getElementById(id);
    let activeClassName = "setActive";
    if (activePageID != null) {
        let arr = activePageID.className.split(" ");
        if (arr.indexOf(activeClassName) == -1) {
            activePageID.className += " " + activeClassName; // make the current type as active
        }
    }
    let elementID = document.getElementById('main-content-area');
    if (elementID != null) {
        elementID.innerHTML = `
        <div class='wrapper'>
            <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
        `; //to display loading till the fetch recieves a response
    }
    let url = 'https://swapi.dev/api/' + input + '/?page=' + page;
    let response = await fetch(url);
    let data = await response.json(); // recieves data from the API and converted to JSON format
    let totalCount = data.count;
    let getResults = data.results;
    let entityArray = getResults.map((element: { [key in string]: string }) => {
        let output = {
            displayName: element[key],  // key is variable and hence square brackets
            link: element.url
        }
        return output; // returns the url and name/title from the data
    });

    const checkPageCount = () => {
        let displayButtonCount = Math.ceil(totalCount / 10); //gets the number of pages for each entity (actors,films...)
        let buttonArr: any[] = [];
        if (displayButtonCount > 1) {
            for (let i = 1; i <= displayButtonCount; i++) {
                buttonArr.push(
                    i != page ?
                        `<div class = "pages" onclick="fetchData('${input}','${key}',${i})">${i}</div>` :
                        `<div class = "pages active" onclick="fetchData('${input}','${key}',${i})">${i}</div>`);
                //created buttons and onclick of buttons returns the corresponding data and sets the page active
            }
            return `<div id ="pagesList">${buttonArr.join('')}</div>`;
        }
        else {
            return buttonArr;
        }
    }

    setTimeout(() => { //setting timeout
        if (elementID != null) {
            elementID.innerHTML = generateList(entityArray) + checkPageCount(); //displayed the list of entity names amd buttons
        }
        setCookie(input, key, page);
    }, 1000)
}

const entityDetails = async (url: string) => { //displays the content for onclick of each item in the pop-up
    let x = document.getElementById('overlay');
    let y = document.getElementById('pop-up-content');
    if (x != null && y != null) {
        x.style.display = 'block'
        y.innerHTML = `
    <div class='wrapper'>
        <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
    `;
    }
    setTimeout(async () => {
        let urlArr = url.split('/');
        urlArr[0] = urlArr[0].replace('http:', 'https:');
        let securedUrl = urlArr.join('/');
        let response = await fetch(securedUrl);
        let data = await response.json();
        let details = Object.entries(data);
        if (y != null) {
            y.innerHTML = `<table id='details-table'>
        <tr>
        <th class = "col-1">Features</th>
        <th class = "col-2">Details</th>
        </tr>
        ${details.map((element) => {
                if (typeof (element[1]) !== 'object' && element[0] !== 'url' && element[0] !== 'homeworld') {
                    element[0] = element[0].charAt(0).toUpperCase() + element[0].substring(1);
                    let correctedElement = element[0].split('_').join(' ');
                    return `<tr>
                <td class = "col-1">${correctedElement}</td>
                <td class = "col-2">${element[1]}</td>
                </tr>`
                }
            }).join('')}    
        </table>`
        }
    }, 1000)
}

const closeButton = () => { //for closing the pop-up on click of close button
    let x = document.getElementById('overlay')
    if (x != null && (x.style.display = 'block')) {
        x.style.display = 'none';
    }
}

window.onkeydown = function escClose(event: any) { //close the pop-up on clicking the esc key
    let x = document.getElementById('overlay')
    if (event.keyCode === 27 && x != null) {
        x.style.display = 'none';
    }
} //The onKeyDown and onKeyUp events represent keys being pressed or released, while the onKeyPress event represents a character being typed.
const setCookie = (pageType: string, pageKey: string, pageNumber: number) => {
    let d = new Date();
    d.setHours(d.getHours() + 1); //cookie expiry for 1 hour
    let expiryDate = "expires =" + d.toUTCString();
    document.cookie = "Type =" + pageType + ";" + expiryDate + ";path=/";
    document.cookie = "Value =" + pageKey + ";" + expiryDate + ";path=/";
    document.cookie = "Number =" + pageNumber + ";" + expiryDate + ";path=/";
}
const getCookie = (cookieName: string) => {
    let name = cookieName + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
const checkCookie = () => {
    let pType = getCookie('Type');
    let pKey = getCookie('Value');
    let pNumber = parseInt(getCookie('Number'));
    let x = document.getElementById('main-content-area');
    if ((pType != "") && (pKey != "") && (pNumber != 0) && (x != null)) {
        fetchData(pType, pKey, pNumber);
    }
}

const onClickOverlay = (e: Event) => {
    e.stopPropagation();
    let x = document.getElementById('overlay');
    if (x !== null) {
        x.style.display = 'none';
    }
}
const onClickPopUp = (e: Event) => {
    e.stopPropagation();
}


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

