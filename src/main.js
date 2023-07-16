// get bookmarks from localstorage
if (localStorage.getItem("Bookmarks") !== null) {
  console.info(`Bookmarks address exists`);
  console.info(`Loading bookmarks from localstorage`);
  var bookmarksString = localStorage.getItem("Bookmarks");
  var bookmarks = JSON.parse(bookmarksString);
} else {
  console.warn(`Bookmarks address doesn't exists`);
  console.warn(`Making default templat`);

  var bookmarks = [
    {
      groups: [
        {
          groupName: "Informations",
          bookmark: [
            {
              name: "Read Me",
              url: "https://github.com/Endward01/a_new_home/blob/main/README.md",
            },
            {
              name: "My Github Page",
              url: "https://github.com/Endward01",
            },
            {
              name: "My Webpage",
              url: "https://danielpretki.dev/",
            },
          ],
        },
      ],
    },
  ];
  let bookmarksString = JSON.stringify(bookmarks);
  localStorage.setItem("Bookmarks", bookmarksString);
}
if (localStorage.getItem("ColorSheme") !== null) {
  var colorSchemeString = localStorage.getItem("ColorSheme");
  var colorScheme = JSON.parse(colorSchemeString);
} else {
  var colorScheme = [
    {
      mode: "auto",
    },
  ];
  let colorSchemeString = JSON.stringify(colorScheme);
  localStorage.setItem("ColorSheme", colorSchemeString);
}
var draggable = false;

// window.addEventListener("storage", function (e) {
//   if (e.key === "Bookmarks") {
//     alert("Woohoo, someone changed my localstorage!");
//   }
// });

window.addEventListener("storage", function (e) {
  if (e.key === "Bookmarks") {
    while (document.querySelector(".main-section-bookmarks").firstChild) {
      document
        .querySelector(".main-section-bookmarks")
        .removeChild(
          document.querySelector(".main-section-bookmarks").firstChild
        );
    }
    bookmarksString = localStorage.getItem("Bookmarks");
    bookmarks = JSON.parse(bookmarksString);
    createBookmarkGroup(bookmarks[0].groups);
    addbookmarkDeleteBtnFunc();
    addbookmarkEditbtnFunc();
    collExpBookmarksFunc();
  }
});
//press escepe to quickly quit manu functions

document.body.addEventListener("keyup", function (e) {
  const add = document.querySelector(".addBookmark");
  const addBtn = document.querySelector(".addBookmark-btn");
  const settings = document.querySelector(".settings");
  const settingsBtn = document.querySelector(".settings-btn");
  const editBtn = document.querySelector(".editBookmarks-btn");
  const bookmarkGroupIconContainer = document.querySelectorAll(
    ".main-section-bookmarks-group-icons"
  );
  const bookmarksEditDeleteBtn = document.querySelectorAll(
    ".main-section-bookmarks-ul-li-icons"
  );
  const bookmarkLink = document.querySelectorAll(
    ".main-section-bookmarks-ul-li-link"
  );
  if (e.key == "Escape") {
    add.setAttribute("data-visible", "false");
    settings.setAttribute("data-visible", "false");
    addBtn.setAttribute("data-active", "false");
    settingsBtn.setAttribute("data-active", "false");
    editBtn.setAttribute("data-active", "false");
    bookmarkGroupIconContainer.forEach((element) => {
      element.setAttribute("data-visible", "false");
    });
    bookmarksEditDeleteBtn.forEach((element) => {
      element.setAttribute("data-visible", "false");
    });
    bookmarkLink.forEach((element) => {
      element.classList.remove("linkDisabled");
    });
    draggable = false;
    document
      .querySelectorAll(".main-section-bookmarks-group-title")
      .forEach((element) => (element.style.pointerEvents = "all"));
  }
});

// SELECT EXISTING NODES

const body = document.querySelector("body");

const editBookmarksBtn = document.querySelector(".editBookmarks-btn");
const addBookmark = document.querySelector(".addBookmark");
const addShowBookmark = document.querySelector(".addBookmark-btn");
const addBookmarkInpUrl = document.querySelector(".addBookmark-form-url");
const addBookmarkBtnAdd = document.querySelector(".addBookmark-form-btn-add");
const addBookmarksBtnCancel = document.querySelector(
  ".addBookmark-form-btn-cancel"
);
const addBookmarkSelectGroup = document.querySelector(
  ".addBookmark-form-chooseGroup"
);
const newGroupCheckBox = document.querySelector(".addBookmark-form-checkbox");
const addBookmarksNewGroup = document.querySelector(
  ".addBookmark-form-newGroup"
);
const checkToAddNewGroup = document.querySelectorAll(".addCreateNewGroup");
const addBookmarkInpName = document.querySelector(".addBookmark-form-name");

//

const createBookmarkGroup = (array, name, url, newGroup) => {
  if (array !== null) {
    array.forEach((element) => {
      const bookmarksSection = document.querySelector(
        ".main-section-bookmarks"
      );
      const divColumn = document.createElement("div");
      divColumn.classList.add("main-section-column");
      bookmarksSection.appendChild(divColumn);
      element.groups.forEach((element) => {
        // element.forEach((element) => {
        const divFirst = document.createElement("div");
        divFirst.classList.add("main-section-bookmarks-group");
        divFirst.setAttribute("data-collapsed", "false");
        divColumn.appendChild(divFirst);
        const divSecond = document.createElement("div");
        divFirst.append(divSecond);
        const h2 = document.createElement("h2");
        h2.textContent = element.groupName;
        h2.classList.add("main-section-bookmarks-group-title");
        divSecond.appendChild(h2);
        const divThird = document.createElement("div");
        divThird.classList.add("main-section-bookmarks-group-icons");
        divThird.setAttribute("data-visible", "false");
        divSecond.appendChild(divThird);
        const iEdit = document.createElement("i");
        // const iUp = document.createElement("i");
        // const iDown = document.createElement("i");
        iEdit.classList.add("fa-solid", "fa-pencil");
        // iEdit.setAttribute("data-visible", "false");
        // if (element.collapsed === "true") {
        //   iDown.classList.add("fa-solid", "fa-angle-down");
        //   iDown.setAttribute("data-visible", "true");
        //   iUp.classList.add("fa-solid", "fa-angle-up");
        //   iUp.setAttribute("data-visible", "false");
        // } else {
        //   iDown.classList.add("fa-solid", "fa-angle-down");
        //   iDown.setAttribute("data-visible", "false");
        //   iUp.classList.add("fa-solid", "fa-angle-up");
        //   iUp.setAttribute("data-visible", "true");
        // }
        divThird.appendChild(iEdit);
        // divThird.appendChild(iUp);
        // divThird.appendChild(iDown);
        const ul = document.createElement("ul");
        ul.classList.add("main-section-bookmarks-ul");
        ul.setAttribute("data-collapsed", element.collapsed);
        divFirst.appendChild(ul);
        createBookmarkLink(element, ul);
        // });
      });
    });
  } else {
    const sectionCollumn = document.querySelectorAll(".main-section-column");
    const divFirst = document.createElement("div");
    divFirst.classList.add("main-section-bookmarks-group");
    divFirst.setAttribute("data-collapsed", "false");
    sectionCollumn[0].appendChild(divFirst);
    const divSecond = document.createElement("div");
    divFirst.append(divSecond);
    const h2 = document.createElement("h2");
    h2.textContent = newGroup;
    h2.classList.add("main-section-bookmarks-group-title");
    divSecond.appendChild(h2);
    const divThird = document.createElement("div");
    divThird.classList.add("main-section-bookmarks-group-icons");
    divThird.setAttribute("data-visible", "false");
    divSecond.appendChild(divThird);
    const iEdit = document.createElement("i");
    // const iUp = document.createElement("i");
    // const iDown = document.createElement("i");
    iEdit.classList.add("fa-solid", "fa-pencil");
    // iEdit.setAttribute("data-visible", "false");
    // iDown.classList.add("fa-solid", "fa-angle-down");
    // iDown.setAttribute("data-visible", "false");
    // iUp.classList.add("fa-solid", "fa-angle-up");
    // iUp.setAttribute("data-visible", "true");
    divThird.appendChild(iEdit);
    // divThird.appendChild(iUp);
    // divThird.appendChild(iDown);
    const ul = document.createElement("ul");
    ul.classList.add("main-section-bookmarks-ul");
    ul.setAttribute("data-collapsed", "false");
    divFirst.appendChild(ul);
    createBookmarkLink(null, ul, name, url);
  }
};
const createBookmarkLink = (array, parent, name, url) => {
  if (array !== null) {
    array.bookmark.forEach((element) => {
      const li = document.createElement("li");
      li.classList.add("main-section-bookmarks-ul-li");
      // li.setAttribute("draggable", "false");
      parent.appendChild(li);
      const a = document.createElement("a");
      a.textContent = element.name;
      a.setAttribute("href", element.url);
      a.classList.add("main-section-bookmarks-ul-li-link");
      a.setAttribute("target", "_blank");
      li.appendChild(a);
      const btnDiv = document.createElement("div");
      btnDiv.classList.add("main-section-bookmarks-ul-li-icons");
      li.appendChild(btnDiv);
      const iconDelete = document.createElement("i");
      const iconEdit = document.createElement("i");

      if (editBookmarksBtn.attributes[1].value === "true") {
        btnDiv.setAttribute("data-visible", "true");
      } else {
        btnDiv.setAttribute("data-visible", "false");
      }
      iconEdit.classList.add("fa-solid", "fa-pencil");
      iconDelete.classList.add("fa-solid", "fa-xmark");
      btnDiv.appendChild(iconEdit);
      btnDiv.appendChild(iconDelete);
    });
  } else {
    const li = document.createElement("li");
    li.classList.add("main-section-bookmarks-ul-li");
    parent.appendChild(li);
    const a = document.createElement("a");
    a.textContent = name;
    a.setAttribute("href", url);
    a.classList.add("main-section-bookmarks-ul-li-link");
    a.setAttribute("target", "_blank");
    li.appendChild(a);
    const btnDiv = document.createElement("div");
    btnDiv.classList.add("main-section-bookmarks-ul-li-icons");
    li.appendChild(btnDiv);
    const iconDelete = document.createElement("i");
    const iconEdit = document.createElement("i");
    if (editBookmarksBtn.attributes[1].value === "true") {
      btnDiv.setAttribute("data-visible", "true");
    } else {
      btnDiv.setAttribute("data-visible", "false");
    }
    iconEdit.classList.add("fa-solid", "fa-pencil");
    iconDelete.classList.add("fa-solid", "fa-xmark");
    btnDiv.appendChild(iconEdit);
    btnDiv.appendChild(iconDelete);
  }
};

//Draw bookmarks from localstorage to body

createBookmarkGroup(bookmarks);

// remove child from section

//find element by text in main-section-bookmarks
const getElementsByText = (string, tag) => {
  const bookmarksSection = document.querySelector(".main-section-bookmarks");
  return Array.prototype.slice
    .call(bookmarksSection.getElementsByTagName(tag))
    .filter((el) => el.textContent.trim() === string.trim());
};

const dataActiveSwitcher = (elem, position) => {
  if (elem.attributes[position].value === "true") {
    elem.setAttribute("data-active", "false");
  } else {
    elem.setAttribute("data-active", "true");
  }
};
const dataVisibleSwitcher = (elem, position) => {
  if (elem.attributes[position].value === "true") {
    elem.setAttribute("data-visible", "false");
  } else {
    elem.setAttribute("data-visible", "true");
  }
};

// SELECT NODES

const bookmarkEditBtn = document.querySelectorAll(
  ".main-section-bookmarks-ul-li-btnContainer-edit"
);

//

// collapse /expand bookmarks in group
// const collExpBookmarksFunc = () => {
//   const arrowDiv = document.querySelectorAll(
//     ".main-section-bookmarks-group-icons"
//   );
//   arrowDiv.forEach((element) => {
//     const arrowUp = element.querySelectorAll(".fa-angle-up");
//     arrowUp.forEach((element) => {
//       if (element.getAttribute("listener") !== "true") {
//         element.setAttribute("listener", "true");
//         element.addEventListener(
//           "click",
//           function () {
//             for (
//               let index = 1;
//               index < this.parentNode.childNodes.length;
//               index++
//             ) {
//               dataVisibleSwitcher(this.parentNode.childNodes[index], 1);
//             }
//             const positionInArry = getPositionGroupName(
//               element.parentNode.parentNode.parentNode.childNodes[0]
//                 .childNodes[0].childNodes[0].data,
//               bookmarks[0].groups
//             );
//             bookmarks[0].groups[positionInArry].collapsed = "true";
//             element.parentNode.parentNode.parentNode.childNodes[1].setAttribute(
//               "data-collapsed",
//               "true"
//             );
//             let bookmarksString = JSON.stringify(bookmarks);
//             localStorage.setItem("Bookmarks", bookmarksString);
//           },
//           false
//         );
//       }
//     });
//     const arrowDown = element.querySelectorAll(".fa-angle-down");
//     arrowDown.forEach((element) => {
//       if (element.getAttribute("listener") !== "true") {
//         element.setAttribute("listener", "true");
//         element.addEventListener(
//           "click",
//           function () {
//             for (
//               let index = 1;
//               index < this.parentNode.childNodes.length;
//               index++
//             ) {
//               dataVisibleSwitcher(this.parentNode.childNodes[index], 1);
//             }
//             const positionInArry = getPositionGroupName(
//               element.parentNode.parentNode.parentNode.childNodes[0]
//                 .childNodes[0].childNodes[0].data,
//               bookmarks[0].groups
//             );
//             bookmarks[0].groups[positionInArry].collapsed = "false";
//             element.parentNode.parentNode.parentNode.childNodes[1].setAttribute(
//               "data-collapsed",
//               "false"
//             );
//             let bookmarksString = JSON.stringify(bookmarks);
//             localStorage.setItem("Bookmarks", bookmarksString);
//           },
//           false
//         );
//       }
//     });
//   });
// };

const collExpBookmarksFunc = () => {
  const groupNameBtn = document.querySelectorAll(
    ".main-section-bookmarks-group"
  );
  groupNameBtn.forEach((element) => {
    const btn = element.querySelectorAll("div:first-child");
    btn.forEach((element) => {
      const h2 = element.querySelectorAll(
        ".main-section-bookmarks-group-title"
      );
      h2.forEach((element) => {
        if (element.getAttribute("listener") !== "true") {
          element.setAttribute("listener", "true");

          element.addEventListener("click", function () {
            const sectionMain =
              this.parentNode.parentNode.parentNode.parentNode.childNodes;
            const sectionColumn = this.parentNode.parentNode.parentNode;

            const indexOfColumn =
              Array.from(sectionMain).indexOf(sectionColumn);

            if (
              this.parentNode.parentNode.childNodes[1].attributes[1]
                .nodeValue !== "true"
            ) {
              this.parentNode.parentNode.childNodes[1].setAttribute(
                "data-collapsed",
                "true"
              );
              const positionInArry = getPositionGroupName(
                this.parentNode.parentNode.childNodes[0].childNodes[0]
                  .innerHTML,
                bookmarks[indexOfColumn].groups
              );
              bookmarks[indexOfColumn].groups[positionInArry].collapsed =
                "true";
            } else {
              this.parentNode.parentNode.childNodes[1].setAttribute(
                "data-collapsed",
                "false"
              );
              const positionInArry = getPositionGroupName(
                this.parentNode.parentNode.childNodes[0].childNodes[0]
                  .innerHTML,
                bookmarks[indexOfColumn].groups
              );
              bookmarks[indexOfColumn].groups[positionInArry].collapsed =
                "false";
            }

            let bookmarksString = JSON.stringify(bookmarks);
            localStorage.setItem("Bookmarks", bookmarksString);
          });
        }
      });
    });
  });
};

//
/// addBookmark Container logic
//

// show/hide addBookmark card
addShowBookmark.addEventListener("click", function () {
  dataActiveSwitcher(addShowBookmark, 1);
  dataVisibleSwitcher(addBookmark, 1);
  const selectGroup = document.querySelector(".addBookmark-form-chooseGroup");
  if (selectGroup.childNodes.length === 0) {
    newGroupCheckBox.click();
    newGroupCheckBox.setAttribute("disabled", "true");
  } else {
    newGroupCheckBox.removeAttribute("disabled", "true");
  }

  addBookmarkBtnAdd.setAttribute("disabled", "true");
  addBookmarkBtnAdd.classList.add("addBookmark-form-btnIsDisabled");
  // document.querySelector(".addBookmark-form").reset();
});

// validation for addBookmark form
const form = document.querySelector(".addBookmark-form");
form.addEventListener("input", () => {
  const name = addBookmarkInpName.value;
  const url = addBookmarkInpUrl.value;
  const newGroup = addBookmarksNewGroup.value;

  if (document.querySelector(".addBookmark-form-checkbox").checked !== true) {
    if (name === "" || url === "") {
      document
        .querySelector(".addBookmark-form-btn-add")
        .setAttribute("disabled", "true");
      document
        .querySelector(".addBookmark-form-btn-add")
        .classList.add("addBookmark-form-btnIsDisabled");
    } else {
      document
        .querySelector(".addBookmark-form-btn-add")
        .removeAttribute("disabled", "true");
      document
        .querySelector(".addBookmark-form-btn-add")
        .classList.remove("addBookmark-form-btnIsDisabled");
    }
  } else {
    if (name === "" || url === "" || newGroup == "") {
      document
        .querySelector(".addBookmark-form-btn-add")
        .setAttribute("disabled", "true");
      document
        .querySelector(".addBookmark-form-btn-add")
        .classList.add("addBookmark-form-btnIsDisabled");
    } else {
      document
        .querySelector(".addBookmark-form-btn-add")
        .removeAttribute("disabled", "true");
      document
        .querySelector(".addBookmark-form-btn-add")
        .classList.remove("addBookmark-form-btnIsDisabled");
    }
  }
});

// close addBookmarks card
addBookmarksBtnCancel.addEventListener("click", function () {
  dataActiveSwitcher(addShowBookmark, 1);
  dataVisibleSwitcher(addBookmark, 1);
  const selectGroup = document.querySelector(".addBookmark-form-chooseGroup");
  if (selectGroup.childNodes.length !== 0) {
    checkToAddNewGroup[0].setAttribute("data-visible", "true");
    checkToAddNewGroup[1].setAttribute("data-visible", "false");
    document.querySelector(".addBookmark-form").reset();
  }
});

//add new bookmark to group or create new group

addBookmarkBtnAdd.addEventListener("click", function () {
  const name = addBookmarkInpName.value;
  const url = addBookmarkInpUrl.value;
  const group = addBookmarkSelectGroup.value;
  const newGroup = addBookmarksNewGroup.value;

  if (newGroupCheckBox.checked !== true) {
    const findElement = getElementsByText(group, "h2");

    const sectionMain =
      findElement[0].parentNode.parentNode.parentNode.parentNode.childNodes;
    const sectionColumn = findElement[0].parentNode.parentNode.parentNode;

    const indexOfColumn = Array.from(sectionMain).indexOf(sectionColumn);

    const parentNodeToAppend =
      findElement[0].parentNode.parentNode.childNodes[1];
    const position = getPositionGroupName(
      group,
      bookmarks[indexOfColumn].groups
    );
    const newBookmark = {
      name: name,
      url: url,
    };
    const arrBookmark = bookmarks[indexOfColumn].groups[position].bookmark;
    arrBookmark.push(newBookmark);
    let bookmarksString = JSON.stringify(bookmarks);
    localStorage.setItem("Bookmarks", bookmarksString);
    createBookmarkLink(null, parentNodeToAppend, name, url);
  } else {
    const newBookmark = {
      groupName: newGroup,
      bookmark: [
        {
          name: name,
          url: url,
        },
      ],
    };

    const arrBookmark = bookmarks[0].groups;
    arrBookmark.push(newBookmark);
    let bookmarksString = JSON.stringify(bookmarks);
    localStorage.setItem("Bookmarks", bookmarksString);
    createBookmarkGroup(null, name, url, newGroup);
  }

  addbookmarkDeleteBtnFunc();
  addbookmarkEditbtnFunc();
  collExpBookmarksFunc();
  groupSelect();

  dataActiveSwitcher(addShowBookmark, 1);
  dataVisibleSwitcher(addBookmark, 1);
  checkToAddNewGroup[0].setAttribute("data-visible", "true");
  checkToAddNewGroup[1].setAttribute("data-visible", "false");

  document.querySelector(".addBookmark-form").reset();
});

// append new group input
newGroupCheckBox.addEventListener("change", () => {
  checkToAddNewGroup.forEach((element) => {
    if (newGroupCheckBox.checked === true) {
      dataVisibleSwitcher(element, 2);
    } else {
      dataVisibleSwitcher(element, 2);
    }
  });
});

// append groups to select
const groupSelect = () => {
  while (addBookmarkSelectGroup.firstChild) {
    addBookmarkSelectGroup.removeChild(addBookmarkSelectGroup.firstChild);
  }
  bookmarks.forEach((element) => {
    element.groups.forEach((element) => {
      const option = document.createElement("option");
      option.textContent = element.groupName;
      option.setAttribute("value", element.groupName);
      addBookmarkSelectGroup.appendChild(option);
    });
  });
};
groupSelect();

// find possition in array
function getPositionGroupName(elementToFind, arrayElements) {
  return arrayElements
    .map(function (e) {
      return e.groupName;
    })
    .indexOf(elementToFind);
}
function getPositionName(elementToFind, arrayElements) {
  return arrayElements
    .map(function (e) {
      return e.name;
    })
    .indexOf(elementToFind);
}

//
/// editBookmarks Button Logic
//

// show/ hide edit delete btn
const editBookmarksBtnFunc = () => {
  const editBookmarksBtn = document.querySelector(".editBookmarks-btn");
  const bookmarkLi = document.querySelectorAll(".main-section-bookmarks-ul-li");

  if (editBookmarksBtn.getAttribute("listener") !== "true") {
    editBookmarksBtn.setAttribute("listener", "true");
    editBookmarksBtn.addEventListener("click", function showHide() {
      dataActiveSwitcher(editBookmarksBtn, 1);
      //show edit group name btn
      const bookmarkGroupIconContainer = document.querySelectorAll(
        ".main-section-bookmarks-group-icons"
      );
      bookmarkGroupIconContainer.forEach((element) => {
        dataVisibleSwitcher(element, 1);
      });

      //show edit/delete bookmark btn and disable link
      const bookmarksEditDeleteBtn = document.querySelectorAll(
        ".main-section-bookmarks-ul-li-icons"
      );
      const bookmarkLink = document.querySelectorAll(
        ".main-section-bookmarks-ul-li-link"
      );
      bookmarksEditDeleteBtn.forEach((element) => {
        dataVisibleSwitcher(element, 1);
        if (editBookmarksBtn.attributes[1].value === "true") {
          bookmarkLink.forEach((element) => {
            element.classList.add("linkDisabled");
          });
        } else {
          bookmarkLink.forEach((element) => {
            element.classList.remove("linkDisabled");
          });
        }
      });

      if (draggable != true) {
        draggable = true;
        console.log(draggable);
        document
          .querySelectorAll(".main-section-bookmarks-group-title")
          .forEach((element) => (element.style.pointerEvents = "none"));
      } else {
        draggable = false;
        console.log(draggable);
        document
          .querySelectorAll(".main-section-bookmarks-group-title")
          .forEach((element) => (element.style.pointerEvents = "all"));
      }
    });
  }
};
// delete bookmark logic
const addbookmarkDeleteBtnFunc = () => {
  const bookmarkIconGroup = document.querySelectorAll(
    ".main-section-bookmarks-ul-li-icons"
  );
  bookmarkIconGroup.forEach((element) => {
    const bookmarkDeleteBtn = element.querySelectorAll(".fa-xmark");
    bookmarkDeleteBtn.forEach((element) => {
      if (element.getAttribute("listener") !== "true") {
        element.setAttribute("listener", "true");
        element.addEventListener(
          "click",
          function () {
            const sectionMain =
              this.parentNode.parentNode.parentNode.parentNode.parentNode
                .parentNode.childNodes;
            const sectionColumn =
              this.parentNode.parentNode.parentNode.parentNode.parentNode;

            const indexOfColumn =
              Array.from(sectionMain).indexOf(sectionColumn);

            const bookmarkGroupName =
              this.parentNode.parentNode.parentNode.parentNode.childNodes[0]
                .childNodes[0].innerHTML;

            const indexOfGroup = getPositionGroupName(
              bookmarkGroupName,
              bookmarks[indexOfColumn].groups
            );
            const array =
              bookmarks[indexOfColumn].groups[indexOfGroup].bookmark;

            const bookmarkName =
              this.parentNode.parentNode.childNodes[0].childNodes[0].data;
            const indexOfBookmakr = getPositionName(bookmarkName, array);

            if (indexOfBookmakr > -1) {
              array.splice(indexOfBookmakr, 1);
            } else {
              return;
            }

            const kickTheBaby = this.parentNode.parentNode;

            const childLeft =
              this.parentNode.parentNode.parentNode.childNodes.length;
            const parentNode = this.parentNode.parentNode.parentNode.parentNode;
            if (kickTheBaby.parentNode) {
              kickTheBaby.parentNode.removeChild(kickTheBaby);
            }

            // delete group if there is no bookmark in it
            if (childLeft === 1) {
              if (parentNode.parentNode) {
                parentNode.parentNode.removeChild(parentNode);
              }
              if (indexOfGroup > -1) {
                bookmarks[indexOfColumn].groups.splice(indexOfGroup, 1);
              } else {
                return;
              }
            }
            let bookmarksString = JSON.stringify(bookmarks);
            localStorage.setItem("Bookmarks", bookmarksString);
            groupSelect();
          },
          false
        );
      }
    });
  });
};
//edit bookmark logic (funtion to organanize they are messy)

const addbookmarkEditbtnFunc = () => {
  const bookmarkIconGroup = document.querySelectorAll(
    ".main-section-bookmarks-ul-li-icons"
  );
  bookmarkIconGroup.forEach((element) => {
    const bookmarkEditBtn = element.querySelectorAll(".fa-pencil");
    bookmarkEditBtn.forEach((element) => {
      if (element.getAttribute("listener") !== "true") {
        element.setAttribute("listener", "true");

        element.addEventListener(
          "click",
          function () {
            const sectionMain =
              this.parentNode.parentNode.parentNode.parentNode.parentNode
                .parentNode.childNodes;
            const sectionColumn =
              this.parentNode.parentNode.parentNode.parentNode.parentNode;

            const indexOfColumn =
              Array.from(sectionMain).indexOf(sectionColumn);
            const linkName =
              element.parentNode.parentNode.childNodes[0].firstChild.data;
            const linkUrl =
              element.parentNode.parentNode.childNodes[0].attributes[0]
                .nodeValue;

            const linkGroupName =
              element.parentNode.parentNode.parentNode.parentNode.childNodes[0]
                .childNodes[0].innerHTML;
            const groupNamePosition = getPositionGroupName(
              linkGroupName,
              bookmarks[indexOfColumn].groups
            );

            const namePosition = getPositionName(
              linkName,
              bookmarks[indexOfColumn].groups[groupNamePosition].bookmark
            );
            const bookmarkToChange =
              bookmarks[indexOfColumn].groups[groupNamePosition].bookmark[
                namePosition
              ];

            const linkBookmarkElement = element.parentNode.parentNode;

            if (
              linkBookmarkElement.getAttribute("class") !==
              "main-section-bookmarks-ul-li isEditingBookmark"
            ) {
              linkBookmarkElement.classList.add("isEditingBookmark");
              const div1 = document.createElement("div");
              linkBookmarkElement.appendChild(div1);
              const div2 = document.createElement("div");
              const div3 = document.createElement("div");
              const inpName = document.createElement("input");
              inpName.classList.add("input");
              div2.appendChild(inpName);
              inpName.setAttribute("value", linkName);
              const inpUrl = document.createElement("input");
              inpUrl.classList.add("input");
              div2.appendChild(inpUrl);
              inpUrl.setAttribute("value", linkUrl);
              const btnConfirm = document.createElement("input");
              const btnCancel = document.createElement("input");
              btnConfirm.setAttribute("value", "Confirm");
              btnCancel.setAttribute("value", "Cancel");
              btnConfirm.classList.add("editBookmarks-btn-confirm", "button");
              btnConfirm.setAttribute("type", "button");
              btnCancel.classList.add("editBookmarks-btn-cancel", "button");
              btnCancel.setAttribute("type", "button");
              div1.appendChild(div2);
              div1.appendChild(div3);
              div3.appendChild(btnConfirm);
              div3.appendChild(btnCancel);

              //confirm edit
              const editBookmarksBtnConfirm = linkBookmarkElement.querySelector(
                ".editBookmarks-btn-confirm"
              );
              editBookmarksBtnConfirm.addEventListener("click", () => {
                let newBookmarkName =
                  editBookmarksBtnConfirm.parentNode.parentNode.childNodes[0]
                    .childNodes[0].value;
                let newBookmarkUrl =
                  editBookmarksBtnConfirm.parentNode.parentNode.childNodes[0]
                    .childNodes[1].value;

                const elementToUpdate =
                  editBookmarksBtnConfirm.parentNode.parentNode.parentNode
                    .childNodes[0];

                elementToUpdate.textContent = newBookmarkName;
                elementToUpdate.setAttribute("href", newBookmarkUrl);
                const removeElement =
                  editBookmarksBtnConfirm.parentNode.parentNode;
                const parentOfElementToRemove =
                  editBookmarksBtnConfirm.parentNode.parentNode.parentNode;
                parentOfElementToRemove.setAttribute(
                  "class",
                  "main-section-bookmarks-ul-li"
                );

                bookmarkToChange.name = newBookmarkName;
                bookmarkToChange.url = newBookmarkUrl;
                let bookmarksString = JSON.stringify(bookmarks);
                localStorage.setItem("Bookmarks", bookmarksString);

                if (removeElement.parentNode) {
                  removeElement.parentNode.removeChild(removeElement);
                }
              });

              //cancel edit

              const editBookmarksBtnCancel = linkBookmarkElement.querySelector(
                ".editBookmarks-btn-cancel"
              );
              editBookmarksBtnCancel.addEventListener("click", () => {
                const removeElement =
                  editBookmarksBtnCancel.parentNode.parentNode;
                const parentOfRemoveToElement =
                  editBookmarksBtnCancel.parentNode.parentNode.parentNode;
                parentOfRemoveToElement.classList.remove("isEditingBookmark");

                if (removeElement.parentNode) {
                  removeElement.parentNode.removeChild(removeElement);
                }
              });
            } else {
              linkBookmarkElement.setAttribute(
                "class",
                "main-section-bookmarks-ul-li"
              );
            }
          },
          false
        );
      }
    });
  });

  const groupIconGroup = document.querySelectorAll(
    ".main-section-bookmarks-group-icons"
  );
  groupIconGroup.forEach((element) => {
    const groupEditBtn = element.querySelectorAll(".fa-pencil");
    groupEditBtn.forEach((element) => {
      if (element.getAttribute("listener") !== "true") {
        element.setAttribute("listener", "true");

        element.addEventListener("click", () => {
          const groupParent = element.parentElement.parentElement;
          const groupName =
            element.parentElement.parentElement.children[0].innerHTML;

          if (groupParent.getAttribute("class") !== " isEditing") {
            groupParent.classList.add("isEditingGroup");
            const div1 = document.createElement("div");
            groupParent.appendChild(div1);
            const div2 = document.createElement("div");
            const div3 = document.createElement("div");
            const inpName = document.createElement("input");
            inpName.classList.add("input");
            div2.appendChild(inpName);
            inpName.setAttribute("value", groupName);

            const btnConfirm = document.createElement("input");
            const btnCancel = document.createElement("input");
            btnConfirm.setAttribute("value", "Confirm");
            btnCancel.setAttribute("value", "Cancel");
            btnConfirm.classList.add("editBookmarks-btn-confirm", "button");
            btnConfirm.setAttribute("type", "button");
            btnCancel.classList.add("editBookmarks-btn-cancel", "button");
            btnCancel.setAttribute("type", "button");
            div1.appendChild(div2);
            div1.appendChild(div3);
            div3.appendChild(btnConfirm);
            div3.appendChild(btnCancel);

            //confirm edit

            const sectionMain =
              element.parentNode.parentNode.parentNode.parentNode.parentNode
                .childNodes;
            const sectionColumn =
              element.parentNode.parentNode.parentNode.parentNode;

            const indexOfColumn =
              Array.from(sectionMain).indexOf(sectionColumn);

            const indexOfGroup = getPositionGroupName(
              groupName,
              bookmarks[indexOfColumn].groups
            );

            const bookmarkToChange =
              bookmarks[indexOfColumn].groups[indexOfGroup];

            const editBookmarksBtnConfirm = groupParent.querySelector(
              ".editBookmarks-btn-confirm"
            );
            editBookmarksBtnConfirm.addEventListener("click", () => {
              let groupNewName =
                editBookmarksBtnConfirm.parentNode.parentNode.childNodes[0]
                  .childNodes[0].value;

              const elementToUpdate =
                editBookmarksBtnConfirm.parentNode.parentNode.parentNode
                  .childNodes[0];

              elementToUpdate.textContent = groupNewName;
              const removeElement =
                editBookmarksBtnConfirm.parentNode.parentNode;

              groupParent.classList.remove("isEditingGroup");

              bookmarkToChange.groupName = groupNewName;
              let bookmarksString = JSON.stringify(bookmarks);
              localStorage.setItem("Bookmarks", bookmarksString);

              if (removeElement.parentNode) {
                removeElement.parentNode.removeChild(removeElement);
              }
            });

            //cancel edit

            const editBookmarksBtnCancel = groupParent.querySelector(
              ".editBookmarks-btn-cancel"
            );
            editBookmarksBtnCancel.addEventListener("click", () => {
              const removeElement =
                editBookmarksBtnCancel.parentNode.parentNode;

              groupParent.classList.remove("isEditingGroup");

              if (removeElement.parentNode) {
                removeElement.parentNode.removeChild(removeElement);
              }
            });
          }
        });
      }
    });
  });
};

//
// settings logic
//

const showSettingsUI = () => {
  const settingDiv = document.querySelector(".settings");
  const settingBtn = document.querySelector(".settings-btn");
  if (settingBtn.getAttribute("listener") !== "true") {
    settingBtn.setAttribute("listener", "true");
    settingBtn.addEventListener("click", () => {
      dataActiveSwitcher(settingBtn, 1);
      dataVisibleSwitcher(settingDiv, 1);
      document.querySelector(".settings-menu-textarea").value = "";
    });
  }
};

//import export bookmarks logic

const importExportBookmarks = () => {
  const textarea = document.querySelector(".settings-menu-textarea");
  const importBTN = document.querySelector(".settings-menu-import");
  const exportBTN = document.querySelector(".settings-menu-export");
  const clearBTN = document.querySelector(".settings-menu-clear");
  const settingDiv = document.querySelector(".settings");
  const settingBtn = document.querySelector(".settings-btn");
  const bookmarksSection = document.querySelector(".main-section-bookmarks");

  if (importBTN.getAttribute("listener") !== "true") {
    importBTN.setAttribute("listener", "true");
    importBTN.addEventListener("click", () => {
      if (textarea.value !== "") {
        console.log;
        localStorage.setItem("Bookmarks", textarea.value);

        while (bookmarksSection.firstChild) {
          bookmarksSection.removeChild(bookmarksSection.firstChild);
        }

        bookmarksString = localStorage.getItem("Bookmarks");
        bookmarks = JSON.parse(bookmarksString);
        // dataActiveSwitcher(settingBtn, 1);
        // dataVisibleSwitcher(settingDiv, 1);
        createBookmarkGroup(bookmarks);
        addbookmarkDeleteBtnFunc();
        addbookmarkEditbtnFunc();
        collExpBookmarksFunc();
      }
    });
  }
  if (exportBTN.getAttribute("listener") !== "true") {
    exportBTN.setAttribute("listener", "true");
    exportBTN.addEventListener("click", () => {
      textarea.value = "";
      textarea.value = localStorage.getItem("Bookmarks");
    });
  }
  if (clearBTN.getAttribute("listener") !== "true") {
    clearBTN.setAttribute("listener", "true");
    clearBTN.addEventListener("click", () => {
      textarea.value = "";
    });
  }
};
importExportBookmarks();

document.querySelector(".settings-menu-form-inp").value = window.location.href;

const copyURLBtn = document.querySelector(".settings-menu-form-btn");

copyURLBtn.addEventListener("click", () => {
  let urlNewtab = document.querySelector(".settings-menu-form-inp");
  urlNewtab.select();
  urlNewtab.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(urlNewtab.value);
});

// drag and drop
const linkElementToDrag = document.querySelectorAll(
  ".main-section-bookmarks-ul-li"
);
const groupElementToDrag = document.querySelectorAll(
  ".main-section-bookmarks-group div:first-child"
);
const dragAndDropFunction = () => {
  let elemToMove;
  let destynationArray;
  let startArrayElement;

  linkElementToDrag.forEach((element) => {
    if (element.getAttribute("listenerDrag") !== "true") {
      element.setAttribute("listenerDrag", "true");
      element.addEventListener("dragend", (element) => {
        if (draggable) {
          let elemToMoveBefore = element.target.parentNode;
          let parent = element.target.parentNode.parentNode;
          if (elemToMoveBefore.localName === "li") {
            if (parent.localName === "ul") {
              parent.insertBefore(elemToMove, elemToMoveBefore.nextSibling);
            }
          }
          elemToMove.classList.remove("elementToDrag");
          const sectionMain =
            element.target.parentNode.parentNode.parentNode.parentNode
              .parentNode;
          const sectionColumn =
            element.target.parentNode.parentNode.parentNode.parentNode;

          const indexOfColumn = Array.from(sectionMain.childNodes).indexOf(
            sectionColumn
          );

          const groupName =
            element.target.parentNode.parentNode.parentNode.childNodes[0]
              .childNodes[0].innerHTML;

          const indexOfGroup = getPositionGroupName(
            groupName,
            bookmarks[indexOfColumn].groups
          );
          const linkName = element.target.parentNode.childNodes[0].innerHTML;
          console.log(bookmarks[indexOfColumn].groups[indexOfGroup].bookmark);
          destynationArray =
            bookmarks[indexOfColumn].groups[indexOfGroup].bookmark;

          const newIndexOfBookmark = Array.from(parent.childNodes).indexOf(
            elemToMoveBefore
          );
          destynationArray.splice(newIndexOfBookmark, 0, startArrayElement);
          console.log(destynationArray);
          let bookmarksString = JSON.stringify(bookmarks);
          localStorage.setItem("Bookmarks", bookmarksString);
        }
      });
      element.addEventListener("dragover", (element) => {
        if (draggable) {
          let elemToMoveBefore = element.target.parentNode;
          let parent = element.target.parentNode.parentNode;
          let parentChildNode = element.target.parentNode.parentNode.childNodes;
          if (elemToMoveBefore.localName === "li") {
            if (parent.localName == "ul") {
              if (
                Array.from(parentChildNode).indexOf(elemToMoveBefore) == "0"
              ) {
                parent.insertBefore(elemToMove, elemToMoveBefore);
              } else {
                parent.insertBefore(elemToMove, elemToMoveBefore.nextSibling);
              }
            }
          }
        }
      });
      element.addEventListener("dragstart", (element) => {
        if (draggable) {
          elemToMove = element.target.parentNode;
          // console.log(elemToMove)
          elemToMove.classList.add("elementToDrag");
          const sectionMain =
            element.target.parentNode.parentNode.parentNode.parentNode
              .parentNode;
          const sectionColumn =
            element.target.parentNode.parentNode.parentNode.parentNode;

          const indexOfColumn = Array.from(sectionMain.childNodes).indexOf(
            sectionColumn
          );
          // console.log(indexOfColumn);

          const groupName =
            element.target.parentNode.parentNode.parentNode.childNodes[0]
              .childNodes[0].innerHTML;
          // console.log(groupName);
          const indexOfGroup = getPositionGroupName(
            groupName,
            bookmarks[indexOfColumn].groups
          );
          // console.log(indexOfGroup);
          const linkName = element.target.parentNode.childNodes[0].innerHTML;
          // console.log(linkName);

          const indexOfBookmakr = getPositionName(
            linkName,
            bookmarks[indexOfColumn].groups[indexOfGroup].bookmark
          );
          // console.log(indexOfBookmakr);

          startArray = bookmarks[indexOfColumn].groups[indexOfGroup];
          startArrayElement =
            bookmarks[indexOfColumn].groups[indexOfGroup].bookmark[
              indexOfBookmakr
            ];

          if (indexOfBookmakr > -1) {
            bookmarks[indexOfColumn].groups[indexOfGroup].bookmark.splice(
              indexOfBookmakr,
              1
            );
          } else {
            return;
          }
        }
      });
    }
  });
  // groupElementToDrag.forEach((element) => {
  //   if (element.getAttribute("listenerDrag") !== "true") {
  //     element.setAttribute("listenerDrag", "true");
  //     element.addEventListener("dragend", (element) => {
  //       if (draggable) {
  //         let elemToMoveBefore = element.target.parentNode;
  //         let parent = element.target.parentNode.parentNode;
  //         if (elemToMoveBefore.localName === "li") {
  //           if (parent.localName === "ul") {
  //             parent.insertBefore(elemToMove, elemToMoveBefore.nextSibling);
  //           }
  //         }
  //         elemToMove.classList.remove("elementToDrag");
  //         const sectionMain =
  //           element.target.parentNode.parentNode.parentNode.parentNode
  //             .parentNode;
  //         const sectionColumn =
  //           element.target.parentNode.parentNode.parentNode.parentNode;

  //         const indexOfColumn = Array.from(sectionMain.childNodes).indexOf(
  //           sectionColumn
  //         );

  //         const groupName =
  //           element.target.parentNode.parentNode.parentNode.childNodes[0]
  //             .childNodes[0].innerHTML;

  //         const indexOfGroup = getPositionGroupName(
  //           groupName,
  //           bookmarks[indexOfColumn].groups
  //         );
  //         const linkName = element.target.parentNode.childNodes[0].innerHTML;
  //         console.log(bookmarks[indexOfColumn].groups[indexOfGroup].bookmark);
  //         destynationArray =
  //           bookmarks[indexOfColumn].groups[indexOfGroup].bookmark;

  //         const newIndexOfBookmark = Array.from(parent.childNodes).indexOf(
  //           elemToMoveBefore
  //         );
  //         destynationArray.splice(newIndexOfBookmark, 0, startArrayElement);
  //         console.log(destynationArray);
  //         // let bookmarksString = JSON.stringify(bookmarks);
  //         // localStorage.setItem("Bookmarks", bookmarksString);
  //       }
  //     });
  //     element.addEventListener("dragover", (element) => {
  //       if (draggable) {
  //         let elemToMoveBefore = element.target.parentNode;
  //         let parent = element.target.parentNode.parentNode;
  //         let parentChildNode = element.target.parentNode.parentNode.childNodes;
  //         if (elemToMoveBefore.localName === "li") {
  //           if (parent.localName == "ul") {
  //             if (
  //               Array.from(parentChildNode).indexOf(elemToMoveBefore) == "0"
  //             ) {
  //               parent.insertBefore(elemToMove, elemToMoveBefore);
  //             } else {
  //               parent.insertBefore(elemToMove, elemToMoveBefore.nextSibling);
  //             }
  //           }
  //         }
  //       }
  //     });
  //     element.addEventListener("dragstart", (element) => {
  //       if (draggable) {
  //         const elemToMove = element.target.parentNode.parentNode;
  //         console.log(elemToMove);
  //         elemToMove.classList.add("elementToDrag");
  //         // const sectionMain =
  //         //   element.target.parentNode.parentNode.parentNode.parentNode
  //         //     .parentNode;
  //         // const sectionColumn =
  //         //   element.target.parentNode.parentNode.parentNode.parentNode;

  //         // const indexOfColumn = Array.from(sectionMain.childNodes).indexOf(
  //         //   sectionColumn
  //         // );
  //         // console.log(indexOfColumn);

  //         // const groupName =
  //         //   element.target.parentNode.parentNode.parentNode.childNodes[0]
  //         //     .childNodes[0].innerHTML;
  //         // console.log(groupName);
  //         // const indexOfGroup = getPositionGroupName(
  //           groupName,
  //           bookmarks[indexOfColumn].groups
  //         // );
  //         // console.log(indexOfGroup);
  //         // const linkName = element.target.parentNode.childNodes[0].innerHTML;
  //         // console.log(linkName);

  //         // const indexOfBookmakr = getPositionName(
  //         //   linkName,
  //         //   bookmarks[indexOfColumn].groups[indexOfGroup].bookmark
  //         // );
  //         // console.log(indexOfBookmakr);

  //         // startArray = bookmarks[indexOfColumn].groups[indexOfGroup];
  //         // startArrayElement =
  //         //   bookmarks[indexOfColumn].groups[indexOfGroup].bookmark[
  //         //     indexOfBookmakr
  //         //   ];

  //         // if (indexOfBookmakr > -1) {
  //         //   bookmarks[indexOfColumn].groups[indexOfGroup].bookmark.splice(
  //         //     indexOfBookmakr,
  //         //     1
  //         //   );
  //         // } 
  //       }
  //     });
  //     element.addEventListener("click", () => {
  //       console.log("click");
  //     });
  //   }
  // });
};

// const dragAndDropFunction = () => {
//   elementToDrag.forEach((element) => {
//     let moving = false;

//     element.addEventListener("mousemove", () => {
//       if (moving) {
//         console.log("mousemove");
//       }
//     });
//     element.addEventListener("mousedown", () => {
//       console.log("mousedown");
//       moving = true;
//     });
//     element.addEventListener("mouseup", () => {
//       console.log("mouseup");
//       moving = false;
//     });
//   });
// };
dragAndDropFunction();

showSettingsUI();
editBookmarksBtnFunc();
addbookmarkDeleteBtnFunc();
addbookmarkEditbtnFunc();
collExpBookmarksFunc();

//modify color theme

var styleSheet = document.styleSheets[1];
const colorPickersContainer = document.querySelector(
  ".setting-menu-appearance-colorPickers"
);
var colorsCustome = [];
let mode;
const changeTheme = (value) => {
  switch (value) {
    case "auto":
      colorPickersContainer.setAttribute("data-visible", "false");
      if (window.matchMedia("(prefers-color-scheme:light)").matches === true) {
        colorScheme[0].mode = "auto";
        colorScheme[0].colors = {
          first: "#eae6da",
          second: "#f5eddc",
          third: "#fff7e9",
          accentFirst: "#d44b4b",
          textColor: "#19282f",
        };
        mode = `:root { --first:${colorScheme[0].colors.first}; --second: ${colorScheme[0].colors.second}; --third: ${colorScheme[0].colors.third}; --accent-first: ${colorScheme[0].colors.accentFirst}; --text-color: ${colorScheme[0].colors.textColor};}`;
        styleSheet.insertRule(mode);
      } else {
        colorScheme[0].mode = "auto";
        colorScheme[0].colors = {
          first: "#1c1b22",
          second: "#2b2a33",
          third: "#42414d",
          accentFirst: "#00ddff",
          textColor: "#f8fdff",
        };
        mode = `:root { --first:${colorScheme[0].colors.first}; --second: ${colorScheme[0].colors.second}; --third: ${colorScheme[0].colors.third}; --accent-first: ${colorScheme[0].colors.accentFirst}; --text-color: ${colorScheme[0].colors.textColor};}`;
        styleSheet.deleteRule(mode);
        styleSheet.insertRule(mode);
      }
      break;

    case "light":
      colorPickersContainer.setAttribute("data-visible", "false");
      colorScheme[0].mode = "light";
      colorScheme[0].colors = {
        first: "#eae6da",
        second: "#f5eddc",
        third: "#fff7e9",
        accentFirst: "#d44b4b",
        textColor: "#19282f",
      };
      mode = `:root { --first:${colorScheme[0].colors.first}; --second: ${colorScheme[0].colors.second}; --third: ${colorScheme[0].colors.third}; --accent-first: ${colorScheme[0].colors.accentFirst}; --text-color: ${colorScheme[0].colors.textColor};}`;
      styleSheet.deleteRule(mode);
      styleSheet.insertRule(mode);
      break;

    case "dark":
      colorPickersContainer.setAttribute("data-visible", "false");
      colorScheme[0].mode = "dark";
      colorScheme[0].colors = {
        first: "#1c1b22",
        second: "#2b2a33",
        third: "#42414d",
        accentFirst: "#00ddff",
        textColor: "#f8fdff",
      };
      mode = `:root { --first:${colorScheme[0].colors.first}; --second: ${colorScheme[0].colors.second}; --third: ${colorScheme[0].colors.third}; --accent-first: ${colorScheme[0].colors.accentFirst}; --text-color: ${colorScheme[0].colors.textColor};}`;
      styleSheet.deleteRule(mode);
      styleSheet.insertRule(mode);
      break;

    default:
      if (colorScheme[0].customeColors !== undefined) {
        colorScheme[0].mode = "custom";

        const mode = `:root { --first:${colorScheme[0].customeColors.first}; --second: ${colorScheme[0].customeColors.second}; --third: ${colorScheme[0].customeColors.third}; --accent-first: ${colorScheme[0].customeColors.accentFirst}; --text-color: ${colorScheme[0].customeColors.textColor}; }`;
        styleSheet.deleteRule(mode);
        styleSheet.insertRule(mode);
      } else {
        colorScheme[0].mode = "custom";
        let newArray = colorScheme[0];
        newArray["customeColors"] = {
          first: colorScheme[0].colors.first,
          second: colorScheme[0].colors.second,
          third: colorScheme[0].colors.third,
          accentFirst: colorScheme[0].colors.accentFirst,
          textColor: colorScheme[0].colors.textColor,
        };

        const mode = `:root { --first:${colorScheme[0].customeColors.first}; --second: ${colorScheme[0].customeColors.second}; --third: ${colorScheme[0].customeColors.third}; --accent-first: ${colorScheme[0].customeColors.accentFirst}; --text-color: ${colorScheme[0].customeColors.textColor}; }`;
        styleSheet.deleteRule(mode);
        styleSheet.insertRule(mode);
      }
      document.querySelector(".firstColor-input").value =
        colorScheme[0].customeColors.first;
      document.querySelector(".secondColor-input").value =
        colorScheme[0].customeColors.second;
      document.querySelector(".thirdColor-input").value =
        colorScheme[0].customeColors.third;
      document.querySelector(".accentColor-input").value =
        colorScheme[0].customeColors.accentFirst;
      document.querySelector(".textColor-input").value =
        colorScheme[0].customeColors.textColor;

      document
        .querySelectorAll(".setting-menu-appearance-colorPickers input")
        .forEach((element) => {
          const nameCol = element.name;
          const value = element.value;

          colorsCustome[nameCol] = value;
          element.addEventListener("input", () => {
            const colorName = element.name;
            const value = element.value;
            colorScheme[0].customeColors[colorName] = value;
            colorSchemeString = JSON.stringify(colorScheme);
            localStorage.setItem("ColorSheme", colorSchemeString);
            const mode = `:root { --first:${colorScheme[0].customeColors.first}; --second: ${colorScheme[0].customeColors.second}; --third: ${colorScheme[0].customeColors.third}; --accent-first: ${colorScheme[0].customeColors.accentFirst}; --text-color: ${colorScheme[0].customeColors.textColor}; }`;
            styleSheet.deleteRule(mode);
            styleSheet.insertRule(mode);
          });
        });
      colorPickersContainer.setAttribute("data-visible", "true");
      break;
  }

  colorSchemeString = JSON.stringify(colorScheme);
  localStorage.setItem("ColorSheme", colorSchemeString);
};
const selectTheme = document.querySelector(
  ".setting-menu-appearance-selectColorTheme"
);
selectTheme.value = colorScheme[0].mode;
changeTheme(colorScheme[0].mode);
selectTheme.addEventListener("input", () => {
  changeTheme(selectTheme.value);
});

//
/// quick add bookmark toolbar
//
/* color: currentColor; */
