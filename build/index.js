"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var generateList = function (entities) {
    console.log(entities);
    return "<div id = \"list\"><ul>\n    " + entities.map(function (entity) { return "<li id = \"main-list\" onclick =\"entityDetails('" + entity.link + "')\">" + entity.displayName + "</li>"; }).join('') + "\n    </ul></div>";
}; //generates list of people names,film titles etc..
function fetchData(input, key, page) {
    return __awaiter(this, void 0, void 0, function () {
        var iconsList, i, id, activePageID, activeClassName, arr, elementID, url, response, data, totalCount, getResults, entityArray, checkPageCount;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    iconsList = document.getElementsByClassName('icons');
                    console.log(iconsList);
                    for (i = 0; i < iconsList.length; i++) {
                        iconsList[i].classList.remove('setActive'); //remove the active style from type in a page
                    }
                    id = input;
                    activePageID = document.getElementById(id);
                    console.log(activePageID);
                    activeClassName = "setActive";
                    if (activePageID != null) {
                        arr = activePageID.className.split(" ");
                        console.log(arr);
                        if (arr.indexOf(activeClassName) == -1) {
                            activePageID.className += " " + activeClassName; // make the current type as active
                        }
                    }
                    elementID = document.getElementById('main-content-area');
                    if (elementID != null) {
                        elementID.innerHTML = "<img src = \"../images/loading.gif\">"; //to display loading till the fetch recieves a response
                    }
                    url = 'https://swapi.co/api/' + input + '/?page=' + page;
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    totalCount = data.count;
                    getResults = data.results;
                    entityArray = getResults.map(function (element) {
                        var output = {
                            displayName: element[key],
                            link: element.url
                        };
                        return output; // returns the url and name/title from the data
                    });
                    checkPageCount = function () {
                        var displayButtonCount = Math.ceil(totalCount / 10); //gets the number of pages for each entity (actors,films...)
                        var buttonArr = [];
                        if (displayButtonCount > 1) {
                            for (var i = 1; i <= displayButtonCount; i++) {
                                buttonArr.push(i != page ?
                                    "<div class = \"pages\" onclick=\"fetchData('" + input + "','" + key + "'," + i + ")\">" + i + "</div>" :
                                    "<div class = \"pages active\" onclick=\"fetchData('" + input + "','" + key + "'," + i + ")\">" + i + "</div>");
                                //created buttons and onclick of buttons returns the corresponding data and sets the page active
                            }
                            return "<div id =\"pagesList\">" + buttonArr.join('') + "</div>";
                        }
                        else {
                            return buttonArr;
                        }
                    };
                    setTimeout(function () {
                        if (elementID != null) {
                            elementID.innerHTML = generateList(entityArray) + checkPageCount(); //displayed the list of entity names amd buttons
                        }
                    }, 1000);
                    return [2 /*return*/];
            }
        });
    });
}
var entityDetails = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var x, y, response, data, details;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                x = document.getElementById('overlay');
                y = document.getElementById('pop-up-content');
                if (x != null && y != null) {
                    x.style.display = 'block';
                    y.innerHTML = "<img src = \"../images/pop-up loading.gif\">";
                }
                return [4 /*yield*/, fetch(url)];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                details = Object.entries(data);
                if (y != null) {
                    y.innerHTML = "<table id='details-table'>\n        <tr>\n        <th>Features</th>\n        <th>Details</th>\n        </tr>\n        " + details.map(function (element) {
                        return "<tr>\n                <td>" + element[0] + "</td>\n                <td>" + element[1] + "</td>\n                </tr>";
                    }).join('') + "    \n        </table>";
                }
                return [2 /*return*/];
        }
    });
}); };
var closeButton = function () {
    var x = document.getElementById('overlay');
    if (x != null && (x.style.display = 'block')) {
        x.style.display = 'none';
    }
};
window.onkeydown = function escClose(event) {
    var x = document.getElementById('overlay');
    if (event.keyCode === 27 && x != null) {
        x.style.display = 'none';
    }
};
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
