// set/get info from localstorage
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
      groups: [],
    },
    {
      groups: [],
    },
    {
      groups: [],
    },
    {
      groups: [],
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

var drag = false;

// right mouse button constext menu
document
  .querySelector(".main-section-bookmarks")
  .addEventListener("contextmenu", (element) => {
    element.preventDefault();
    if (document.querySelector(".rmb-popup") !== null) {
      if (document.querySelector(".rmb-popup").parentNode) {
        document
          .querySelector(".rmb-popup")
          .parentNode.removeChild(document.querySelector(".rmb-popup"));
      }
    }
    const popUp = document.createElement("div");
    document.querySelector(".main").appendChild(popUp);
    popUp.classList.add("rmb-popup");
    popUp.style = `top:${element.pageY}px;left:${element.pageX}px`;

    const text = document.elementFromPoint(element.pageX, element.pageY);
    // title name
    if (text.text !== undefined) {
      const p = document.createElement("p");
      p.textContent = text.text;
      popUp.appendChild(p);
      const line = document.createElement("div");
      line.classList.add("line");
      popUp.appendChild(line);
    } else if (text.tagName === "H2") {
      const p = document.createElement("p");
      p.textContent = text.textContent;
      popUp.appendChild(p);
      const line = document.createElement("div");
      line.classList.add("line");
      popUp.appendChild(line);
    }
    //edit / delete btn
    if (text.text !== undefined) {
      const editBtn = document.createElement("a");
      editBtn.classList.add("contextBtn", "edit-btn");
      editBtn.textContent = "Edit Link";
      popUp.appendChild(editBtn);
      const deleteBtn = document.createElement("a");
      deleteBtn.classList.add("contextBtn", "delete-btn");
      deleteBtn.textContent = "Delete Link";
      popUp.appendChild(deleteBtn);
      const line = document.createElement("div");
      line.classList.add("line");
      popUp.appendChild(line);
    } else if (text.tagName === "H2") {
      const editBtn = document.createElement("a");
      editBtn.classList.add("contextBtn", "edit-btn");
      editBtn.textContent = "Edit Group";
      popUp.appendChild(editBtn);
      const deleteBtn = document.createElement("a");
      deleteBtn.classList.add("contextBtn", "delete-btn");
      deleteBtn.textContent = "Delete Group";
      popUp.appendChild(deleteBtn);
      const line = document.createElement("div");
      line.classList.add("line");
      popUp.appendChild(line);
    }
    if (document.querySelector(".delete-btn") !== null) {
      deleteBtnLogic(text);
      editBtnLogic(text);
    }
    // move btn
    if (text.text !== undefined) {
      const moveDiv = document.createElement("div");
      popUp.appendChild(moveDiv);
      moveDiv.classList.add("moveDiv");
      const moveBtn1 = document.createElement("a");
      moveBtn1.classList.add("moveBtn", "contextBtn");
      moveBtn1.textContent = "Move to Group";
      moveDiv.appendChild(moveBtn1);
      const listDiv = document.createElement("div");
      listDiv.classList.add("listDiv");
      moveDiv.appendChild(listDiv);
      const line = document.createElement("div");
      line.classList.add("line");
      popUp.appendChild(line);
    } else if (text.tagName === "H2") {
      const moveDiv = document.createElement("div");
      popUp.appendChild(moveDiv);
      moveDiv.classList.add("moveDiv");
      const moveBtn1 = document.createElement("a");
      moveBtn1.classList.add("moveBtn", "contextBtn");
      moveBtn1.textContent = "Move to Column";
      moveDiv.appendChild(moveBtn1);
      const listDiv = document.createElement("div");
      listDiv.classList.add("listDiv");
      moveDiv.appendChild(listDiv);
      const positionDiv = document.createElement("div");
      positionDiv.classList.add("positionDiv", "contextBtn");
      popUp.appendChild(positionDiv);
      const name = document.createElement("a");
      name.textContent = "Position";
      positionDiv.appendChild(name);
      const div = document.createElement("div");
      positionDiv.appendChild(div);

      const btnUp = document.createElement("a");
      btnUp.innerHTML = "<i class='fa-solid fa-chevron-up'></i>";
      const btnDown = document.createElement("a");
      btnDown.innerHTML = "<i class='fa-solid fa-chevron-down'></i>";
      const number = document.createElement("p");
      // number.textContent = "1";
      div.appendChild(btnUp);
      div.appendChild(number);
      div.appendChild(btnDown);

      const line = document.createElement("div");
      line.classList.add("line");
      popUp.appendChild(line);
    }
    if (document.querySelector(".moveDiv") !== null) {
      moveElement(text);
      changeIndex(text);
    }

    // add bookmark
    const addBookmakrBtn = document.createElement("a");
    addBookmakrBtn.classList.add("contextBtn", "addBookmark-btn");
    addBookmakrBtn.textContent = "Add New Bookmark";
    // addBookmakrBtn.setAttribute("type", "button");
    popUp.appendChild(addBookmakrBtn);
    addBookmakrBtnFuntion();

    // settings btn
    const settingsBtn = document.createElement("a");
    settingsBtn.classList.add("contextBtn", "settings-btn");
    settingsBtn.textContent = "Settings";
    // settingsBtn.setAttribute("type", "button");
    popUp.appendChild(settingsBtn);
    showSettingsUI();

    //enable draggable elements
    if (drag === true) {
      const line = document.createElement("div");
      line.classList.add("line");
      popUp.appendChild(line);
      const draggableBtn = document.createElement("a");
      draggableBtn.classList.add("contextBtn", "dragging-btn");
      if (draggable !== true) {
        draggableBtn.textContent = "Enable Link Dragging";
      } else {
        draggableBtn.textContent = "Disable Link Dragging";
      }
      draggableBtn.setAttribute("type", "button");
      popUp.appendChild(draggableBtn);
      document.querySelector(".dragging-btn").addEventListener("click", () => {
        if (draggable !== true) {
          draggable = true;
        } else {
          draggable = false;
        }
        if (document.querySelector(".rmb-popup").parentNode) {
          document
            .querySelector(".rmb-popup")
            .parentNode.removeChild(document.querySelector(".rmb-popup"));
        }
      });
    }

    document.querySelector(".main-section").addEventListener(
      "mouseup",
      function (e) {
        if (e.button === 0) {
          if (document.querySelector(".rmb-popup") !== null) {
            if (document.querySelector(".rmb-popup").parentNode) {
              document
                .querySelector(".rmb-popup")
                .parentNode.removeChild(document.querySelector(".rmb-popup"));
            }
          }
        }
      },
      false
    );
  });



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
    createBookmarkGroup(bookmarks);
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
    const section = document.querySelector(".main-section");
    if (document.querySelector(".rmb-popup") !== null) {
      if (document.querySelector(".rmb-popup").parentNode) {
        document
          .querySelector(".rmb-popup")
          .parentNode.removeChild(document.querySelector(".rmb-popup"));
      }
    }
  }
});


// SELECT EXISTING NODES

const body = document.querySelector("body");

const editBookmarksBtn = document.querySelector(".editBookmarks-btn");
const addBookmark = document.querySelector(".addBookmark");
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

//Draw bookmarks from localstorage to body
const createBookmarkGroup = (array, name, url, newGroup) => {
  console.log(array)
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
        // divFirst.setAttribute("draggable", "true");
        divColumn.appendChild(divFirst);
        const divSecond = document.createElement("div");
        divFirst.append(divSecond);
        divSecond.classList.add("main-section-bookmarks-group-div");
        const h2 = document.createElement("h2");
        h2.textContent = element.groupName;
        h2.classList.add("main-section-bookmarks-group-title");
        divSecond.appendChild(h2);

        const ul = document.createElement("ul");
        ul.classList.add("main-section-bookmarks-ul");
        ul.setAttribute("data-collapsed", element.collapsed);
        divFirst.appendChild(ul);
        createBookmarkLink(element, ul);
 
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
    divSecond.classList.add("main-section-bookmarks-group-div");
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
  }
};

createBookmarkGroup(bookmarks);

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

// collapse expand bookmark group logic

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
const addBookmakrBtnFuntion = () => {
  const addShowBookmark = document.querySelectorAll(".addBookmark-btn");

  addShowBookmark.forEach((element) => {
    if (element.getAttribute("listener") !== "true") {
      element.setAttribute("listener", "true");
      element.addEventListener("click", function () {
        dataActiveSwitcher(element, 1);
        dataVisibleSwitcher(addBookmark, 1);
        const selectGroup = document.querySelector(
          ".addBookmark-form-chooseGroup"
        );
        if (selectGroup.childNodes.length === 0) {
          newGroupCheckBox.click();
          newGroupCheckBox.setAttribute("disabled", "true");
        } else {
          newGroupCheckBox.removeAttribute("disabled", "true");
        }

        addBookmarkBtnAdd.setAttribute("disabled", "true");
        addBookmarkBtnAdd.classList.add("btnIsDisabled");
      });
    }
  });
};
addBookmakrBtnFuntion();
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
        .classList.add("btnIsDisabled");
    } else {
      document
        .querySelector(".addBookmark-form-btn-add")
        .removeAttribute("disabled", "true");
      document
        .querySelector(".addBookmark-form-btn-add")
        .classList.remove("btnIsDisabled");
    }
  } else {
    if (name === "" || url === "" || newGroup == "") {
      document
        .querySelector(".addBookmark-form-btn-add")
        .setAttribute("disabled", "true");
      document
        .querySelector(".addBookmark-form-btn-add")
        .classList.add("btnIsDisabled");
    } else {
      document
        .querySelector(".addBookmark-form-btn-add")
        .removeAttribute("disabled", "true");
      document
        .querySelector(".addBookmark-form-btn-add")
        .classList.remove("btnIsDisabled");
    }
  }
});

// close addBookmarks card
const addBookmakrBtnCloseFuntion = () => {
  const addShowBookmark = document.querySelectorAll(".addBookmark-btn");

  addBookmarksBtnCancel.addEventListener("click", function () {
    addShowBookmark.forEach((element) => {
      dataActiveSwitcher(element, 1);
    });
    dataVisibleSwitcher(addBookmark, 1);
    const selectGroup = document.querySelector(".addBookmark-form-chooseGroup");
    if (selectGroup.childNodes.length !== 0) {
      checkToAddNewGroup[0].setAttribute("data-visible", "true");
      checkToAddNewGroup[1].setAttribute("data-visible", "false");
      document.querySelector(".addBookmark-form").reset();
    }
  });
};
addBookmakrBtnCloseFuntion();

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
  collExpBookmarksFunc();
  groupSelect();
  const addShowBookmark = document.querySelectorAll(".addBookmark-btn");

  addShowBookmark.forEach((element) => {
    dataActiveSwitcher(element, 1);
  });
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

// delete Button Logic

const deleteBtnLogic = (domElement) => {
  const element = domElement;
  const deleteBtn = document.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    if (element.tagName === "A") {
      // delete link
      const indexOfElement = Array.from(
        element.parentNode.parentNode.childNodes
      ).indexOf(element.parentNode);
      const indexOfGroup = Array.from(
        element.parentNode.parentNode.parentNode.parentNode.childNodes
      ).indexOf(element.parentNode.parentNode.parentNode);

      const indexOfColumn = Array.from(
        element.parentNode.parentNode.parentNode.parentNode.parentNode
          .childNodes
      ).indexOf(element.parentNode.parentNode.parentNode.parentNode);

      if (element.parentNode.parentNode) {
        element.parentNode.parentNode.removeChild(element.parentNode);
      }

      if (indexOfElement > -1) {
        bookmarks[indexOfColumn].groups[indexOfGroup].bookmark.splice(
          indexOfElement,
          1
        );
      }
      let bookmarksString = JSON.stringify(bookmarks);
      localStorage.setItem("Bookmarks", bookmarksString);
    } else {
      // delete group

      const indexOfGroup = Array.from(
        element.parentNode.parentNode.parentNode.childNodes
      ).indexOf(element.parentNode.parentNode);

      const indexOfColumn = Array.from(
        element.parentNode.parentNode.parentNode.parentNode.childNodes
      ).indexOf(element.parentNode.parentNode.parentNode);

      const div1 = document.createElement("div");
      document.querySelector(".main-section").appendChild(div1);
      div1.classList.add("confirmDiv");
      const form = document.createElement("form");
      div1.appendChild(form);
      const h2 = document.createElement("h2");
      h2.textContent = "Are you sure you want to delete the whole group?";
      form.appendChild(h2);
      const div2 = document.createElement("div");
      form.appendChild(div2);
      const inputYes = document.createElement("input");
      inputYes.setAttribute("value", "Confirm");
      inputYes.setAttribute("type", "button");
      inputYes.classList.add("button", "confirmBtn");
      const inputNo = document.createElement("input");
      inputNo.setAttribute("value", "Cancel");
      inputNo.setAttribute("type", "button");
      inputNo.classList.add("button", "cancelBtn");
      div2.appendChild(inputYes);
      div2.appendChild(inputNo);
      document.querySelector(".confirmBtn").addEventListener("click", () => {
        console.info("Group has been deleted");
        if (element.parentNode.parentNode.parentNode) {
          element.parentNode.parentNode.parentNode.removeChild(
            element.parentNode.parentNode
          );
        }
        if (indexOfGroup > -1) {
          bookmarks[indexOfColumn].groups.splice(indexOfGroup, 1);
        }
        let bookmarksString = JSON.stringify(bookmarks);
        localStorage.setItem("Bookmarks", bookmarksString);
        if (document.querySelector(".confirmDiv").parentNode) {
          document
            .querySelector(".confirmDiv")
            .parentNode.removeChild(document.querySelector(".confirmDiv"));
        }
      });

      document.querySelector(".cancelBtn").addEventListener("click", () => {
        if (document.querySelector(".confirmDiv").parentNode) {
          document
            .querySelector(".confirmDiv")
            .parentNode.removeChild(document.querySelector(".confirmDiv"));
        }
      });
    }
    if (document.querySelector(".rmb-popup").parentNode) {
      document
        .querySelector(".rmb-popup")
        .parentNode.removeChild(document.querySelector(".rmb-popup"));
    }
  });
};

// edit bookmark logic

const editBtnLogic = (domElement) => {
  const element = domElement;
  const editBtn = document.querySelector(".edit-btn");

  const editDiv = (element) => {
    const div1 = document.createElement("div");
    document.querySelector(".main-section").appendChild(div1);
    div1.classList.add("editDiv");
    const form = document.createElement("form");
    div1.appendChild(form);
    const nameLabel = document.createElement("label");
    nameLabel.textContent = "New Name";
    form.appendChild(nameLabel);
    const nameInp = document.createElement("input");
    nameInp.classList.add("input", "editInpName");
    nameInp.setAttribute("value", element.name);
    nameLabel.appendChild(nameInp);

    if (element.url !== null) {
      const urlLabel = document.createElement("label");
      urlLabel.textContent = "New Url";
      form.appendChild(urlLabel);
      const urlInp = document.createElement("input");
      urlInp.classList.add("input", "editInpUrl");
      urlInp.setAttribute("value", element.url);
      urlLabel.appendChild(urlInp);
    }

    const btnDiv = document.createElement("div");
    form.appendChild(btnDiv);
    const inputYes = document.createElement("input");
    inputYes.setAttribute("value", "Confirm");
    inputYes.setAttribute("type", "button");
    inputYes.classList.add("button", "confirmBtn");
    const inputNo = document.createElement("input");
    inputNo.setAttribute("value", "Cancel");
    inputNo.setAttribute("type", "button");
    inputNo.classList.add("button", "cancelBtn");
    btnDiv.appendChild(inputYes);
    btnDiv.appendChild(inputNo);
  };
  editBtn.addEventListener("click", () => {
    if (element.tagName === "A") {
      // edit link
      const indexOfElement = Array.from(
        element.parentNode.parentNode.childNodes
      ).indexOf(element.parentNode);
      const indexOfGroup = Array.from(
        element.parentNode.parentNode.parentNode.parentNode.childNodes
      ).indexOf(element.parentNode.parentNode.parentNode);

      const indexOfColumn = Array.from(
        element.parentNode.parentNode.parentNode.parentNode.parentNode
          .childNodes
      ).indexOf(element.parentNode.parentNode.parentNode.parentNode);

      const arrayPosition = {
        column: indexOfColumn,
        group: indexOfGroup,
        element: indexOfElement,
      };

      const name = element.innerHTML;
      const url = element.href;
      editDiv({ name: name, url: url });

      document.querySelector(".confirmBtn").addEventListener("click", () => {
        element.innerHTML = document.querySelector(".editInpName").value;
        element.href = document.querySelector(".editInpUrl").value;

        bookmarks[indexOfColumn].groups[indexOfGroup].bookmark[
          indexOfElement
        ].name = document.querySelector(".editInpName").value;
        bookmarks[indexOfColumn].groups[indexOfGroup].bookmark[
          indexOfElement
        ].url = document.querySelector(".editInpUrl").value;

        let bookmarksString = JSON.stringify(bookmarks);
        localStorage.setItem("Bookmarks", bookmarksString);
        if (document.querySelector(".editDiv").parentNode) {
          document
            .querySelector(".editDiv")
            .parentNode.removeChild(document.querySelector(".editDiv"));
        }
      });

      document.querySelector(".cancelBtn").addEventListener("click", () => {
        if (document.querySelector(".editDiv").parentNode) {
          document
            .querySelector(".editDiv")
            .parentNode.removeChild(document.querySelector(".editDiv"));
        }
      });
    } else {
      //edit group
      const indexOfGroup = Array.from(
        element.parentNode.parentNode.parentNode.childNodes
      ).indexOf(element.parentNode.parentNode);

      const indexOfColumn = Array.from(
        element.parentNode.parentNode.parentNode.parentNode.childNodes
      ).indexOf(element.parentNode.parentNode.parentNode);

      const arrayPosition = {
        column: indexOfColumn,
        group: indexOfGroup,
      };
      const name = element.innerHTML;
      editDiv({ name: name, url: null });
      document.querySelector(".confirmBtn").addEventListener("click", () => {
        element.innerHTML = document.querySelector(".editInpName").value;
        bookmarks[indexOfColumn].groups[indexOfGroup].groupName =
          document.querySelector(".editInpName").value;
        let bookmarksString = JSON.stringify(bookmarks);
        localStorage.setItem("Bookmarks", bookmarksString);
        if (document.querySelector(".editDiv").parentNode) {
          document
            .querySelector(".editDiv")
            .parentNode.removeChild(document.querySelector(".editDiv"));
        }
      });
      document.querySelector(".cancelBtn").addEventListener("click", () => {
        if (document.querySelector(".editDiv").parentNode) {
          document
            .querySelector(".editDiv")
            .parentNode.removeChild(document.querySelector(".editDiv"));
        }
      });
    }
    if (document.querySelector(".rmb-popup").parentNode) {
      document
        .querySelector(".rmb-popup")
        .parentNode.removeChild(document.querySelector(".rmb-popup"));
    }
  });
};

// moveElement to diffrent group logic

const moveElement = (domElement) => {
  if (domElement.tagName === "A") {
    for (let i = 0; i < bookmarks.length; i++) {
      for (let j = 0; j < bookmarks[i].groups.length; j++) {
        const linkBtn = document.createElement("a");
        linkBtn.classList.add("contextBtn", "linkBtn");
        linkBtn.textContent = bookmarks[i].groups[j].groupName;
        document.querySelector(".listDiv").appendChild(linkBtn);
      }
    }
    document.querySelectorAll(".linkBtn").forEach((element) => {
      element.addEventListener("click", () => {
        console.log(domElement.parentNode);
      });
    });
  } else {
    for (const index of bookmarks.keys()) {
      const linkBtn = document.createElement("a");
      linkBtn.classList.add("contextBtn", "linkBtn");
      linkBtn.textContent = `Column ${index + 1}`;
      document.querySelector(".listDiv").appendChild(linkBtn);
    }
    document.querySelectorAll(".linkBtn").forEach((element) => {
      element.addEventListener("click", () => {
        const columnToMove =
          domElement.parentNode.parentNode.parentNode.parentNode.childNodes;
        const groupToMove = domElement.parentNode.parentNode;
        const indexOfSourceGroup = Array.from(
          domElement.parentNode.parentNode.parentNode.childNodes
        ).indexOf(groupToMove);
        const indexOfSourceColumn = Array.from(
          domElement.parentNode.parentNode.parentNode.parentNode.childNodes
        ).indexOf(domElement.parentNode.parentNode.parentNode);
        columnToMove[element.text.split(" ")[1] - 1].appendChild(
          domElement.parentNode.parentNode
        );
        bookmarks[element.text.split(" ")[1] - 1].groups.push(
          bookmarks[indexOfSourceColumn].groups[indexOfSourceGroup]
        );
        bookmarks[indexOfSourceColumn].groups.splice(indexOfSourceGroup, 1);
        let bookmarksString = JSON.stringify(bookmarks);
        localStorage.setItem("Bookmarks", bookmarksString);
        if (document.querySelector(".rmb-popup").parentNode) {
          document
            .querySelector(".rmb-popup")
            .parentNode.removeChild(document.querySelector(".rmb-popup"));
        }
      });
    });
  }
};

// change index in array logic

const changeIndex = (domElement) => {
  if (domElement.tagName === "A") {
  } else {
    const max = domElement.parentNode.parentNode.parentNode.childNodes.length;
    const indexOfGroup = Array.from(
      domElement.parentNode.parentNode.parentNode.childNodes
    ).indexOf(domElement.parentNode.parentNode);

    let numberToDraw = indexOfGroup + 1;
    document.querySelector(".positionDiv div p").textContent = numberToDraw;

    document.querySelector(".fa-chevron-up").addEventListener("click", () => {
      console.log("up");
      if (numberToDraw >= 2 && numberToDraw <= max) {
        const indexOfColumn = Array.from(
          domElement.parentNode.parentNode.parentNode.parentNode.childNodes
        ).indexOf(domElement.parentNode.parentNode.parentNode);

        numberToDraw = numberToDraw - 1;
        document.querySelector(".positionDiv div p").textContent = numberToDraw;

        const array = domElement.parentNode.parentNode.parentNode.childNodes;
        const element = domElement.parentNode.parentNode;

        const fromIndex = Array.from(array).indexOf(element);
        const toIndex = numberToDraw - 1;

        domElement.parentNode.parentNode.parentNode.insertBefore(
          domElement.parentNode.parentNode.parentNode.childNodes[fromIndex],
          domElement.parentNode.parentNode.parentNode.childNodes[toIndex]
        );

        const elem = bookmarks[indexOfColumn].groups.splice(fromIndex, 1)[0];
        bookmarks[indexOfColumn].groups.splice(toIndex, 0, elem);
        let bookmarksString = JSON.stringify(bookmarks);
        localStorage.setItem("Bookmarks", bookmarksString);
      }
    });
    document.querySelector(".fa-chevron-down").addEventListener("click", () => {
      console.log("down");
      if (numberToDraw >= 1 && numberToDraw <= max - 1) {
        const indexOfColumn = Array.from(
          domElement.parentNode.parentNode.parentNode.parentNode.childNodes
        ).indexOf(domElement.parentNode.parentNode.parentNode);
        numberToDraw = numberToDraw + 1;
        document.querySelector(".positionDiv div p").textContent = numberToDraw;
        document.querySelector(".positionDiv div p").textContent = numberToDraw;

        const array = domElement.parentNode.parentNode.parentNode.childNodes;
        const element = domElement.parentNode.parentNode;

        const fromIndex = Array.from(array).indexOf(element);
        const toIndex = numberToDraw;

        domElement.parentNode.parentNode.parentNode.insertBefore(
          domElement.parentNode.parentNode.parentNode.childNodes[fromIndex],
          domElement.parentNode.parentNode.parentNode.childNodes[toIndex]
        );
        const elem = bookmarks[indexOfColumn].groups.splice(fromIndex, 1)[0];
        bookmarks[indexOfColumn].groups.splice(toIndex, 0, elem);
        let bookmarksString = JSON.stringify(bookmarks);
        localStorage.setItem("Bookmarks", bookmarksString);
      }
    });
  }
};

//
// settings logic
//

const showSettingsUI = () => {
  const settingDiv = document.querySelector(".settings");
  const settingBtn = document.querySelectorAll(".settings-btn");

  settingBtn.forEach((element) => {
    if (element.getAttribute("listener") !== "true") {
      element.setAttribute("listener", "true");
      element.addEventListener("click", () => {
        dataActiveSwitcher(element, 1);
        dataVisibleSwitcher(settingDiv, 1);
        document.querySelector(".settings-menu-textarea").value = "";
      });
    }
  });
};

const hideNavMenuBtn = () => {
  document
    .querySelector(".hideAddBookamrkBtn")
    .addEventListener("change", () => {
      if (document.querySelector(".hideAddBookamrkBtn").checked === true) {
        document.querySelector(".addBookmark-btn").classList.add("hide");
      } else {
        document.querySelector(".addBookmark-btn").classList.remove("hide");
      }
    });
  document.querySelector(".hideSettingBtn").addEventListener("change", () => {
    if (document.querySelector(".hideSettingBtn").checked === true) {
      document.querySelector(".settings-btn").classList.add("hide");
    } else {
      document.querySelector(".settings-btn").classList.remove("hide");
    }
  });
};
hideNavMenuBtn();

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
        localStorage.setItem("Bookmarks", textarea.value);

        while (bookmarksSection.firstChild) {
          bookmarksSection.removeChild(bookmarksSection.firstChild);
        }
        bookmarksString = localStorage.getItem("Bookmarks");
        bookmarks = JSON.parse(bookmarksString);

        createBookmarkGroup(bookmarks);
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
  urlNewtab.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(urlNewtab.value);
});

// drag and drop

var draggable = false;
const linkElementToDrag = document.querySelectorAll(
  ".main-section-bookmarks-ul-li"
);
const groupElementToDrag = document.querySelectorAll(
  ".main-section-bookmarks-group"
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
          elemToMove.classList.remove("dragging");
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
          destynationArray =
            bookmarks[indexOfColumn].groups[indexOfGroup].bookmark;

          const newIndexOfBookmark = Array.from(parent.childNodes).indexOf(
            elemToMoveBefore
          );
          destynationArray.splice(newIndexOfBookmark, 0, startArrayElement);
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
          elemToMove.classList.add("dragging");
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

          const indexOfBookmakr = getPositionName(
            linkName,
            bookmarks[indexOfColumn].groups[indexOfGroup].bookmark
          );

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
};

dragAndDropFunction();

showSettingsUI();
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