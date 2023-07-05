// get bookmarks from localstorage
let retString = localStorage.getItem("Bookmarks");
let bookmarks = JSON.parse(retString);
console.log(bookmarks);

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

const bookmarksGroups = bookmarks[0].groups;

// remove child from section

const removeAllChildNodes = (e) => {
  while (e.firstChild) {
    e.removeChild(e.firstChild);
  }
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
  bookmarksGroups.forEach((element) => {
    const ul = document.createElement("ul");
    const p = document.createElement("p");
    const nameDiv = document.createElement("div");
    const arrowDiv = document.createElement("div");
    const iUp = document.createElement("i");
    const iDown = document.createElement("i");
    p.textContent = element.groupName;
    nameDiv.setAttribute("class", "main-section-bookmarks-ul-title");
    arrowDiv.setAttribute("class", "main-section-bookmarks-ul-arrowDiv");
    iUp.setAttribute(
      "class",
      "bi bi-caret-up main-section-bookmarks-ul-arrowUp"
    );
    iUp.setAttribute("data-visible", "true");
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

const bookmarksEditDeleteBtn = document.querySelectorAll(
  ".main-section-bookmarks-ul-li-btnContainer"
);
const bookmarkDeleteBtn = document.querySelectorAll(
  ".main-section-bookmarks-ul-li-btnContainer-delete"
);
const bookmarkEditBtn = document.querySelectorAll(
  ".main-section-bookmarks-ul-li-btnContainer-edit"
);

//

// hide/show bookmarks in group
const hideArrowUp = document.querySelectorAll(
  ".main-section-bookmarks-ul-arrowUp"
);
const showArrowDown = document.querySelectorAll(
  ".main-section-bookmarks-ul-arrowDown"
);
hideArrowUp.forEach((element) => {
  element.addEventListener(
    "click",
    function () {
      const div = this.parentNode.parentNode.parentNode.childNodes;
      for (let index = 1; index < div.length; index++) {
        div[index].setAttribute("data-visible", "false");
      }
      this.parentNode.childNodes.forEach((element) => {
        dataVisibleSwitcher(element, 1);
      });
    },
    false
  );
});
showArrowDown.forEach((element) => {
  element.addEventListener(
    "click",
    function () {
      const div = this.parentNode.parentNode.parentNode.childNodes;
      for (let index = 1; index < div.length; index++) {
        div[index].setAttribute("data-visible", "");
      }
      this.parentNode.childNodes.forEach((element) => {
        dataVisibleSwitcher(element, 1);
      });
    },
    false
  );
});

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
  checkToAddNewGroup.forEach((element) => {
    dataVisibleSwitcher(element, 2);
  });

  document.querySelector(".addBookmark-form").reset();
});

//add new bookmark to group or create new group
addBookmarkBtnAdd.addEventListener("click", function getBalue() {
  const name = addBookmarkInpName.value;
  const url = addBookmarkInpUrl.value;
  const group = addBookmarkSelectGroup.value;
  const newGroup = addBookmarksNewGroup.value;

  if (newGroupCheckBox.checked === false) {
    const position = getPositionGroupName(group, bookmarksGroups);
    const newBookmark = {
      name: name,
      url: url,
    };
    const arrBookmark = bookmarks[0].groups[position].bookmark;
    arrBookmark.push(newBookmark);
    let bookmarksString = JSON.stringify(bookmarks);
    localStorage.setItem("Bookmarks", bookmarksString);
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
  }
  removeAllChildNodes(addBookmarkSelectGroup);
  appendBookmarks();
  groupSelect();
  dataActiveSwitcher(addShowBookmark, 1);
  dataVisibleSwitcher(addBookmark, 1);
  checkToAddNewGroup.forEach((element) => {
    dataVisibleSwitcher(element, 2);
  });

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
  bookmarksGroups.forEach((element) => {
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
const editBookmarksBtnFunction = () => {
  editBookmarksBtn.addEventListener("click", function showHide() {
    console.log("hi");
    dataActiveSwitcher(editBookmarksBtn, 1);
    bookmarksEditDeleteBtn.forEach((elem) => {
      if (editBookmarksBtn.attributes[1].value === "true") {
        elem.setAttribute("data-visible", "true");
      } else {
        elem.setAttribute("data-visible", "false");
      }
    });
  });
};

// delete bookmark logic
const bookmarkDeleteBtnFunction = () => {
  bookmarkDeleteBtn.forEach((element) => {
    element.addEventListener(
      "click",
      function () {
        console.log("predelete");
        const bookmarkGroupName =
          this.parentNode.parentNode.parentNode.childNodes[0].childNodes[0]
            .childNodes[0].data;
        const groupNamePosition = getPositionGroupName(
          bookmarkGroupName,
          bookmarksGroups
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
        console.log("delete");

        // let bookmarksString = JSON.stringify(bookmarks);
        // localStorage.setItem("Bookmarks", bookmarksString);

        // var content = bookmarksSection.innerHTML;
        // bookmarksSection.innerHTML= content;

        // removeAllChildNodes(addBookmarkSelectGroup);
        appendBookmarks();
        // console.log(bookmarkPosition)
      },
      false
    );
  });
};
