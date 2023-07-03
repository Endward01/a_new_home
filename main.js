// get bookmarks from localstorage
let retString = localStorage.getItem("Bookmarks");
let bookmarks = JSON.parse(retString);
console.log(bookmarks);

// SELECT EXISTING ELEMENTS

const body = document.querySelector("body");
const bookmarksSection = document.querySelector(".main-section-bookmarks");

// remove child from section

function removeAllChildNodes(e) {
  while (e.firstChild) {
    e.removeChild(e.firstChild);
  }
}

//
/// addBookmark Container logic
//

const addBookmark = document.querySelector(".addBookmark");
const addShowBookmark = document.querySelector(".addBookmark-btn");
const addBookmarkInpName = document.querySelector(".addBookmark-form-name");
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

// show/hide addBookmark card
const bookmarksGroups = bookmarks[0].groups;

let isAddBookmarkVisible = "false";
addShowBookmark.addEventListener("click", function openWindow() {
  isAddBookmarkVisible = !isAddBookmarkVisible;
  if (isAddBookmarkVisible) {
    addBookmark.setAttribute("data-visible", "false");
  } else {
    addBookmark.setAttribute("data-visible", "true");
  }
});

// close addBookmarks card
addBookmarksBtnCancel.addEventListener("click", function close() {
  isAddBookmarkVisible = true;
  addBookmark.setAttribute("data-visible", "false");
  checkToAddNewGroup[0].setAttribute("data-visible", "true");
  checkToAddNewGroup[1].setAttribute("data-visible", "false");
  document.querySelector(".addBookmark-form").reset();
});

//add bookmarks to DOM
const appendBookmarks = () => {
  removeAllChildNodes(bookmarksSection);
  bookmarksGroups.forEach((element) => {
    const ul = document.createElement("ul");
    ul.textContent = element.groupName;
    bookmarksSection.appendChild(ul);
    const groupName = element.bookmark;
    groupName.forEach((element) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.textContent = element.name;
      a.setAttribute("href", element.url);
      ul.appendChild(li);
      li.appendChild(a);
    });
  });
};
appendBookmarks();

//add new bookmark to group or create new group
addBookmarkBtnAdd.addEventListener("click", function getBalue() {
  const name = addBookmarkInpName.value;
  const url = addBookmarkInpUrl.value;
  const group = addBookmarkSelectGroup.value;
  const newGroup = addBookmarksNewGroup.value;

  if (newGroupCheckBox.checked === false) {
    const position = getPosition(group, bookmarksGroups);
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
  // newGroupCheckBox.checked = false;
  removeAllChildNodes(addBookmarkSelectGroup);
  appendBookmarks();
  groupSelect();
  isAddBookmarkVisible = true;
  addBookmark.setAttribute("data-visible", "false");
  checkToAddNewGroup[0].setAttribute("data-visible", "true");
  checkToAddNewGroup[1].setAttribute("data-visible", "false");
  document.querySelector(".addBookmark-form").reset();
});

// append new group input
newGroupCheckBox.addEventListener("change", () => {
  checkToAddNewGroup.forEach((element) => {
    if (newGroupCheckBox.checked === true) {
      if (element.attributes[2].value === "true") {
        element.setAttribute("data-visible", "false");
      } else {
        element.setAttribute("data-visible", "true");
      }
    } else {
      if (element.attributes[2].value === "false") {
        element.setAttribute("data-visible", "true");
      } else {
        element.setAttribute("data-visible", "false");
      }
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
function getPosition(elementToFind, arrayElements) {
  return arrayElements
    .map(function (e) {
      return e.groupName;
    })
    .indexOf(elementToFind);
}
