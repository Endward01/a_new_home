// get bookmarks from localstorage
if (localStorage.getItem("Bookmarks") !== null) {
  console.log(`Bookmarks address exists`);
  let retString = localStorage.getItem("Bookmarks");
  var bookmarks = JSON.parse(retString);
  console.log(bookmarks);
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
      const divFirst = document.createElement("div");
      divFirst.classList.add("main-section-bookmarks-group");
      divFirst.setAttribute("data-collapsed", "false");
      bookmarksSection.appendChild(divFirst);
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
    });
  } else {
    const bookmarksSection = document.querySelector(".main-section-bookmarks");
    const divFirst = document.createElement("div");
    divFirst.classList.add("main-section-bookmarks-group");
    divFirst.setAttribute("data-collapsed", "false");
    bookmarksSection.appendChild(divFirst);
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

createBookmarkGroup(bookmarks[0].groups);

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
                bookmarks[0].groups
              );
              bookmarks[0].groups[positionInArry].collapsed = "true";
            } else {
              this.parentNode.parentNode.childNodes[1].setAttribute(
                "data-collapsed",
                "false"
              );
              const positionInArry = getPositionGroupName(
                this.parentNode.parentNode.childNodes[0].childNodes[0]
                  .innerHTML,
                bookmarks[0].groups
              );
              bookmarks[0].groups[positionInArry].collapsed = "false";
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
addShowBookmark.addEventListener("click", function openWindow() {
  dataActiveSwitcher(addShowBookmark, 1);
  dataVisibleSwitcher(addBookmark, 1);
  const selectGroup = document.querySelector(".addBookmark-form-chooseGroup");
  if (selectGroup.childNodes.length === 0) {
    newGroupCheckBox.click();
    newGroupCheckBox.setAttribute("disabled", "true");
  } else {
    newGroupCheckBox.removeAttribute("disabled", "true");
  }
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

  if (newGroupCheckBox.checked !== true) {
    const position = getPositionGroupName(group, bookmarks[0].groups);
    const newBookmark = {
      name: name,
      url: url,
    };
    const arrBookmark = bookmarks[0].groups[position].bookmark;
    arrBookmark.push(newBookmark);
    let bookmarksString = JSON.stringify(bookmarks);
    localStorage.setItem("Bookmarks", bookmarksString);
    const findElement = getElementsByText(group, "h2");
    const parentNodeToAppend =
      findElement[0].parentNode.parentNode.childNodes[1];
    // createNewElement(parentNodeToAppend, name, url);
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
    collExpBookmarksFunc();
  }

  // appendBookmarks();
  // editBookmarksBtnFunc();
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
            const bookmarkGroupName =
              this.parentNode.parentNode.parentNode.parentNode.childNodes[0]
                .childNodes[0].innerHTML;
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
              if (groupNamePosition > -1) {
                bookmarks[0].groups.splice(groupNamePosition, 1);
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
            const groupNamePosition = getPositionGroupName(
              groupName,
              bookmarks[0].groups
            );

            const bookmarkToChange = bookmarks[0].groups[groupNamePosition];

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
// const mainGroupDiv = document.querySelectorAll(".main-section-bookmarks-group")
// mainGroupDiv.forEach((element) => {
//   const mainGroupDivUl = element.querySelector(".main-section-bookmarks-ul")
//   console.log(mainGroupDivUl)
// })

// settings btn logic
const showSettingsUI = () => {
  const settingDiv = document.querySelector(".settings");
  const settingBtn = document.querySelector(".settings-btn");
  if (settingBtn.getAttribute("listener") !== "true") {
    settingBtn.setAttribute("listener", "true");
    settingBtn.addEventListener("click", () => {
      console.log("show settings UI");
      console.log(settingBtn)
      dataActiveSwitcher(settingBtn, 1);
      dataVisibleSwitcher(settingDiv, 1);
    });
  }
};

// drag and drop
const elementToDrag = document.querySelectorAll(
  ".main-section-bookmarks-ul-li"
);
const dragAndDropFunction = () => {
  let elemToMove;
  let elemToMoveBefore;
  let parent;

  elementToDrag.forEach((elem) => {
    elem.addEventListener("dragend", (element) => {
      parent.insertBefore(elemToMove, elemToMoveBefore);
      elemToMove.classList.remove("elementToDrag");
    });
    elem.addEventListener("dragover", (element) => {
      elemToMoveBefore = element.target.parentNode;
      parent.insertBefore(elemToMove, elemToMoveBefore);
    });
    elem.addEventListener("dragenter", (element) => {
      elemToMoveBefore = element.target.parentNode;
      parent.insertBefore(elemToMove, elemToMoveBefore);
    });
    elem.addEventListener("dragleave", (element) => {});
    elem.addEventListener("dragstart", (element) => {
      parent = element.target.parentNode.parentNode;
      elemToMove = element.target.parentNode;
      elemToMove.classList.add("elementToDrag");
    });
  });
};
// dragAndDropFunction();

editBookmarksBtnFunc();
showSettingsUI();
addbookmarkDeleteBtnFunc();
addbookmarkEditbtnFunc();
collExpBookmarksFunc();

//
/// quick add bookmark toolbar
//
/* color: currentColor; */
