// get bookmarks from localstorage
if (localStorage.getItem("Bookmarks") !== null) {
  console.log(`Bookmarks address exists`);
  let retString = localStorage.getItem("Bookmarks");
  var bookmarks = JSON.parse(retString);
} else {
  var bookmarks = [
    {
      groups: [
        {
          groupName: "Informations",
          bookmark: [
            {
              name: "My Github",
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
}
console.log(bookmarks);

// let retString = localStorage.getItem("Bookmarks");
// let bookmarks = JSON.parse(retString);
// console.log(bookmarks);

// SELECT EXISTING NODES

const body = document.querySelector("body");
const bookmarksSection = document.querySelector(".main-section-bookmarks");
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
const checkToAddNewGroup = document.querySelectorAll(".group");
const addBookmarkInpName = document.querySelector(".addBookmark-form-name");

//

// remove child from section

const removeAllChildNodes = (e) => {
  while (e.firstChild) {
    e.removeChild(e.firstChild);
  }
};
//find element by text in main-section-bookmarks
const getElementsByText = (string, tag) => {
  return Array.prototype.slice
    .call(bookmarksSection.getElementsByTagName(tag))
    .filter((el) => el.textContent.trim() === string.trim());
};
//create new bookmark
const createNewElement = (parent, name, url) => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  const btnDiv = document.createElement("div");
  const iconDelete = document.createElement("i");
  const iconEdit = document.createElement("i");
  a.textContent = name;
  a.setAttribute("href", url);
  a.setAttribute("class", "main-section-bookmarks-ul-li-a");
  a.setAttribute("target", "_blank");
  btnDiv.setAttribute("class", "main-section-bookmarks-ul-li-btnContainer");

  btnDiv.setAttribute("data-visible", "false");

  iconEdit.setAttribute(
    "class",
    "bi bi-pencil main-section-bookmarks-ul-li-btnContainer-edit"
  );
  iconDelete.setAttribute(
    "class",
    "bi bi-x-lg main-section-bookmarks-ul-li-btnContainer-delete"
  );
  li.setAttribute("class", "main-section-bookmarks-ul-li");
  parent.appendChild(li);
  li.appendChild(a);
  li.appendChild(btnDiv);
  btnDiv.appendChild(iconEdit);
  btnDiv.appendChild(iconDelete);
};
//create new group bookmark
const createNewGroupElement = (name, url, groupName) => {
  const ul = document.createElement("ul");
  const p = document.createElement("p");
  const nameDiv = document.createElement("div");
  const arrowDiv = document.createElement("div");
  const iUp = document.createElement("i");
  const iDown = document.createElement("i");
  p.textContent = groupName;
  nameDiv.setAttribute("class", "main-section-bookmarks-ul-title");
  arrowDiv.setAttribute("class", "main-section-bookmarks-ul-arrowDiv");
  iUp.setAttribute("class", "bi bi-caret-up main-section-bookmarks-ul-arrowUp");
  iUp.setAttribute("data-visible", "true");
  ul.setAttribute("data-collapsed", "false");
  iDown.setAttribute(
    "class",
    "bi bi-caret-down main-section-bookmarks-ul-arrowDown"
  );
  iDown.setAttribute("data-visible", "false");
  ul.setAttribute("class", "main-section-bookmarks-ul");
  bookmarksSection.appendChild(ul);
  ul.appendChild(nameDiv);
  nameDiv.appendChild(p);
  nameDiv.appendChild(arrowDiv);
  arrowDiv.appendChild(iUp);
  arrowDiv.appendChild(iDown);

  const li = document.createElement("li");
  const a = document.createElement("a");
  const btnDiv = document.createElement("div");
  const iconDelete = document.createElement("i");
  const iconEdit = document.createElement("i");
  a.textContent = name;
  a.setAttribute("href", url);
  a.setAttribute("class", "main-section-bookmarks-ul-li-a");
  a.setAttribute("target", "_blank");
  btnDiv.setAttribute("class", "main-section-bookmarks-ul-li-btnContainer");

  btnDiv.setAttribute("data-visible", "false");

  iconEdit.setAttribute(
    "class",
    "bi bi-pencil main-section-bookmarks-ul-li-btnContainer-edit"
  );
  iconDelete.setAttribute(
    "class",
    "bi bi-x-lg main-section-bookmarks-ul-li-btnContainer-delete"
  );
  li.setAttribute("class", "main-section-bookmarks-ul-li");
  ul.appendChild(li);
  li.appendChild(a);
  li.appendChild(btnDiv);
  btnDiv.appendChild(iconEdit);
  btnDiv.appendChild(iconDelete);
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

//add bookmarks to DOM
const appendBookmarks = () => {
  removeAllChildNodes(bookmarksSection);
  bookmarks[0].groups.forEach((element) => {
    const ul = document.createElement("ul");
    const p = document.createElement("p");
    const nameDiv = document.createElement("div");
    const arrowDiv = document.createElement("div");
    const iUp = document.createElement("i");
    const iDown = document.createElement("i");
    p.textContent = element.groupName;
    nameDiv.setAttribute("class", "main-section-bookmarks-ul-title");
    arrowDiv.setAttribute("class", "main-section-bookmarks-ul-arrowDiv");
    if (element.collapsed === "true") {
      iDown.setAttribute(
        "class",
        "bi bi-caret-down main-section-bookmarks-ul-arrowDown"
      );
      iDown.setAttribute("data-visible", "true");
      iUp.setAttribute(
        "class",
        "bi bi-caret-up main-section-bookmarks-ul-arrowUp"
      );
      iUp.setAttribute("data-visible", "false");
    } else {
      iDown.setAttribute(
        "class",
        "bi bi-caret-down main-section-bookmarks-ul-arrowDown"
      );
      iDown.setAttribute("data-visible", "false");
      iUp.setAttribute(
        "class",
        "bi bi-caret-up main-section-bookmarks-ul-arrowUp"
      );
      iUp.setAttribute("data-visible", "true");
    }
    ul.setAttribute("class", "main-section-bookmarks-ul");
    ul.setAttribute("data-collapsed", element.collapsed);
    // ul.setAttribute("draggable","true")
    bookmarksSection.appendChild(ul);
    ul.appendChild(nameDiv);
    nameDiv.appendChild(p);
    nameDiv.appendChild(arrowDiv);
    arrowDiv.appendChild(iUp);
    arrowDiv.appendChild(iDown);
    const groupName = element.bookmark;
    groupName.forEach((element) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      const btnDiv = document.createElement("div");
      const iconDelete = document.createElement("i");
      const iconEdit = document.createElement("i");
      a.textContent = element.name;
      a.setAttribute("href", element.url);
      a.setAttribute("class", "main-section-bookmarks-ul-li-a");
      a.setAttribute("target", "_blank");
      btnDiv.setAttribute("class", "main-section-bookmarks-ul-li-btnContainer");
      if (editBookmarksBtn.attributes[1].value === "true") {
        btnDiv.setAttribute("data-visible", "true");
      } else {
        btnDiv.setAttribute("data-visible", "false");
      }
      iconEdit.setAttribute(
        "class",
        "bi bi-pencil main-section-bookmarks-ul-li-btnContainer-edit"
      );
      iconDelete.setAttribute(
        "class",
        "bi bi-x-lg main-section-bookmarks-ul-li-btnContainer-delete"
      );
      li.setAttribute("class", "main-section-bookmarks-ul-li");
      ul.appendChild(li);
      li.appendChild(a);
      li.appendChild(btnDiv);
      btnDiv.appendChild(iconEdit);
      btnDiv.appendChild(iconDelete);
    });
  });
};
appendBookmarks();

// SELECT NODES

// const bookmarksEditDeleteBtn = document.querySelectorAll(
//   ".main-section-bookmarks-ul-li-btnContainer"
// );
// const bookmarkDeleteBtn = document.querySelectorAll(
//   ".main-section-bookmarks-ul-li-btnContainer-delete"
// );
const bookmarkEditBtn = document.querySelectorAll(
  ".main-section-bookmarks-ul-li-btnContainer-edit"
);

//

// collapse /expand bookmarks in group
const collExpBookmarksFunc = () => {
  const collapseArrowUp = document.querySelectorAll(
    ".main-section-bookmarks-ul-arrowUp"
  );
  const expandArrowDown = document.querySelectorAll(
    ".main-section-bookmarks-ul-arrowDown"
  );
  collapseArrowUp.forEach((element) => {
    if (element.getAttribute("listener") !== "true") {
      element.setAttribute("listener", "true");
      element.addEventListener(
        "click",
        function () {
          const div = this.parentNode.parentNode.parentNode.childNodes;
          // for (let index = 1; index < div.length; index++) {
          //   div[index].setAttribute("data-visible", "false");
          // }
          this.parentNode.childNodes.forEach((element) => {
            dataVisibleSwitcher(element, 1);
          });
          const positionInArry = getPositionGroupName(
            element.parentNode.parentNode.parentNode.childNodes[0].childNodes[0]
              .childNodes[0].data,
            bookmarks[0].groups
          );
          bookmarks[0].groups[positionInArry].collapsed = "true";
          element.parentNode.parentNode.parentNode.setAttribute(
            "data-collapsed",
            "true"
          );
          let bookmarksString = JSON.stringify(bookmarks);
          localStorage.setItem("Bookmarks", bookmarksString);
        },
        false
      );
    }
  });
  expandArrowDown.forEach((element) => {
    if (element.getAttribute("listener") !== "true") {
      element.setAttribute("listener", "true");
      element.addEventListener(
        "click",
        function () {
          const div = this.parentNode.parentNode.parentNode.childNodes;
          // for (let index = 1; index < div.length; index++) {
          //   div[index].setAttribute("data-visible", "");
          // }
          this.parentNode.childNodes.forEach((element) => {
            dataVisibleSwitcher(element, 1);
          });

          const positionInArry = getPositionGroupName(
            element.parentNode.parentNode.parentNode.childNodes[0].childNodes[0]
              .childNodes[0].data,
            bookmarks[0].groups
          );
          bookmarks[0].groups[positionInArry].collapsed = "false";
          element.parentNode.parentNode.parentNode.setAttribute(
            "data-collapsed",
            "false"
          );
          let bookmarksString = JSON.stringify(bookmarks);
          localStorage.setItem("Bookmarks", bookmarksString);
        },
        false
      );
    }
  });
};
//
/// addBookmark Container logic
//

// show/hide addBookmark card
addShowBookmark.addEventListener("click", function openWindow() {
  dataActiveSwitcher(addShowBookmark, 1);
  dataVisibleSwitcher(addBookmark, 1);
  // document.querySelector(".addBookmark-form").reset();
});

// close addBookmarks card
addBookmarksBtnCancel.addEventListener("click", function close() {
  dataActiveSwitcher(addShowBookmark, 1);
  dataVisibleSwitcher(addBookmark, 1);
  checkToAddNewGroup[0].setAttribute("data-visible", "true");
  checkToAddNewGroup[1].setAttribute("data-visible", "false");

  document.querySelector(".addBookmark-form").reset();
});

//add new bookmark to group or create new group
addBookmarkBtnAdd.addEventListener("click", function getBalue() {
  const name = addBookmarkInpName.value;
  const url = addBookmarkInpUrl.value;
  const group = addBookmarkSelectGroup.value;
  const newGroup = addBookmarksNewGroup.value;

  if (newGroupCheckBox.checked === false) {
    const position = getPositionGroupName(group, bookmarks[0].groups);
    const newBookmark = {
      name: name,
      url: url,
    };
    const arrBookmark = bookmarks[0].groups[position].bookmark;
    arrBookmark.push(newBookmark);
    let bookmarksString = JSON.stringify(bookmarks);
    localStorage.setItem("Bookmarks", bookmarksString);
    const findElement = getElementsByText(group, "p");
    const parentNodeToAppend = findElement[0].parentNode.parentNode;
    createNewElement(parentNodeToAppend, name, url);
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
    createNewGroupElement(name, url, newGroup);
    // createNewElement(parentNodeToAppend, name, url);
    collExpBookmarksFunc();
  }
  removeAllChildNodes(addBookmarkSelectGroup);
  // appendBookmarks();
  editBookmarksBtnFunc();
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
  bookmarks[0].groups.forEach((element) => {
    const option = document.createElement("option");
    option.textContent = element.groupName;
    option.setAttribute("value", element.groupName);
    addBookmarkSelectGroup.appendChild(option);
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

  if (editBookmarksBtn.getAttribute("listener") !== "true") {
    editBookmarksBtn.setAttribute("listener", "true");
    editBookmarksBtn.addEventListener("click", function showHide() {
      const bookmarksEditDeleteBtn = document.querySelectorAll(
        ".main-section-bookmarks-ul-li-btnContainer"
      );
      const bookmarkLink = document.querySelectorAll(
        ".main-section-bookmarks-ul-li-a"
      );
      dataActiveSwitcher(editBookmarksBtn, 1);
      bookmarksEditDeleteBtn.forEach((elem) => {
        if (editBookmarksBtn.attributes[1].value === "true") {
          elem.setAttribute("data-visible", "true");
          bookmarkLink.forEach((elem) => {
            elem.setAttribute(
              "class",
              "main-section-bookmarks-ul-li-a linkDisabled"
            );
          });
        } else {
          elem.setAttribute("data-visible", "false");
          bookmarkLink.forEach((elem) => {
            elem.setAttribute("class", "main-section-bookmarks-ul-li-a ");
          });
        }
      });
    });
  }
};
// delete bookmark logic
const addbookmarkDeleteBtnFunc = () => {
  const bookmarkDeleteBtn = document.querySelectorAll(
    ".main-section-bookmarks-ul-li-btnContainer-delete"
  );
  bookmarkDeleteBtn.forEach((element) => {
    if (element.getAttribute("listener") !== "true") {
      element.setAttribute("listener", "true");
      element.addEventListener(
        "click",
        function () {
          const bookmarkGroupName =
            this.parentNode.parentNode.parentNode.childNodes[0].childNodes[0]
              .childNodes[0].data;
          const groupNamePosition = getPositionGroupName(
            bookmarkGroupName,
            bookmarks[0].groups
          );

          const bookmarkName =
            this.parentNode.parentNode.childNodes[0].childNodes[0].data;
          const namePosition = getPositionName(
            bookmarkName,
            bookmarks[0].groups[groupNamePosition].bookmark
          );

          const array = bookmarks[0].groups[groupNamePosition].bookmark;
          const indexToDelete = namePosition;

          if (indexToDelete > -1) {
            array.splice(indexToDelete, 1);
          } else {
            return;
          }

          const kickTheBaby = this.parentNode.parentNode;

          if (kickTheBaby.parentNode) {
            kickTheBaby.parentNode.removeChild(kickTheBaby);
          }
          let bookmarksString = JSON.stringify(bookmarks);
          localStorage.setItem("Bookmarks", bookmarksString);
        },
        false
      );
    }
  });
};
//edit bookmark logic
const addbookmarkEditbtnFunc = () => {
  const bookmarkEditBtn = document.querySelectorAll(
    ".main-section-bookmarks-ul-li-btnContainer-edit"
  );

  bookmarkEditBtn.forEach((element) => {
    if (element.getAttribute("listener") !== "true") {
      element.setAttribute("listener", "true");

      element.addEventListener(
        "click",
        function () {
          const linkName =
            element.parentNode.parentNode.childNodes[0].firstChild.data;
          const linkGroupName =
            element.parentNode.parentNode.parentNode.childNodes[0].childNodes[0]
              .childNodes[0].data;
          const groupNamePosition = getPositionGroupName(
            linkGroupName,
            bookmarks[0].groups
          );

          const namePosition = getPositionName(
            linkName,
            bookmarks[0].groups[groupNamePosition].bookmark
          );
          const bookmarkToChange =
            bookmarks[0].groups[groupNamePosition].bookmark[namePosition];

          const linkBookmarkElement = element.parentNode.parentNode;
          if (
            linkBookmarkElement.getAttribute("class") !==
            "main-section-bookmarks-ul-li isDisabled"
          ) {
            linkBookmarkElement.setAttribute(
              "class",
              "main-section-bookmarks-ul-li isDisabled"
            );
            const div1 = document.createElement("div");
            const div2 = document.createElement("div");
            const div3 = document.createElement("div");
            const inpName = document.createElement("input");
            const inpUrl = document.createElement("input");
            const btnConfirm = document.createElement("input");
            const btnCancel = document.createElement("input");
            linkBookmarkElement.appendChild(div1);
            div1.style.height = "80px";
            div1.style.width = "100%";
            inpName.setAttribute("class", "input");
            inpUrl.setAttribute("class", "input");
            div2.appendChild(inpName);
            div2.appendChild(inpUrl);
            inpName.setAttribute(
              "value",
              element.parentNode.parentNode.childNodes[0].firstChild.data
            );
            inpUrl.setAttribute(
              "value",
              element.parentNode.parentNode.childNodes[0].attributes[0]
                .nodeValue
            );
            btnConfirm.setAttribute("value", "Confirm");
            btnCancel.setAttribute("value", "Cancel");
            btnConfirm.setAttribute(
              "class",
              "editBookmarks-btn-confirm button"
            );
            btnConfirm.setAttribute("type", "button");
            btnCancel.setAttribute("class", "editBookmarks-btn-cancel button");
            btnCancel.setAttribute("type", "button");
            div1.appendChild(div2);
            div1.appendChild(div3);
            div3.appendChild(btnConfirm);
            div3.appendChild(btnCancel);

            //confirm edit
            const editBookmarksBtnConfirm = document.querySelector(
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

            const editBookmarksBtnCancel = document.querySelector(
              ".editBookmarks-btn-cancel"
            );
            editBookmarksBtnCancel.addEventListener("click", () => {
              const removeElement =
                editBookmarksBtnCancel.parentNode.parentNode;
              const parentOfRemoveToElement =
                editBookmarksBtnCancel.parentNode.parentNode.parentNode;
              parentOfRemoveToElement.setAttribute(
                "class",
                "main-section-bookmarks-ul-li"
              );

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
};

// drag and drop
const elementToDrag = document.querySelectorAll(".main-section-bookmarks-ul");
elementToDrag.forEach((elem) => {
  elem.addEventListener(
    "dragenter",
    () => {
      console.log("dragenter");
    },
    false
  );
  elem.addEventListener(
    "drag",
    () => {
      console.log("drag");
    },
    false
  );
  elem.addEventListener(
    "dragleave",
    () => {
      console.log("dragleave");
    },
    false
  );
  elem.addEventListener(
    "dragover",
    () => {
      console.log("dragover");
    },
    false
  );
  elem.addEventListener(
    "dragstart",
    () => {
      console.log("dragstart");
    },
    false
  );
});

editBookmarksBtnFunc();
addbookmarkDeleteBtnFunc();
addbookmarkEditbtnFunc();
collExpBookmarksFunc();

//
/// quick add bookmark toolbar
//
/* color: currentColor; */
