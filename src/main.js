// set/get info from localstorage
if (localStorage.getItem("Bookmarks") !== null) {
  var bookmarksString = localStorage.getItem("Bookmarks");
  var bookmarks = JSON.parse(bookmarksString);
} else {
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
if (localStorage.getItem("Settings") !== null) {
  var settingsString = localStorage.getItem("Settings");
  var settings = JSON.parse(settingsString);
} else {
  var settings = [
    {
      menuIcons: false,
      linkIcons: false,
    },
  ];
  let settingsString = JSON.stringify(settings);
  localStorage.setItem("Settings", settingsString);
}
const styleSheet = document.styleSheets[1];

//on fully load website

onload = () => {
  const windowHeight = document.body.clientHeight;
  // console.log(windowHeight);
  const sectionHeight = (windowHeight * 87) / 100;
  document
    .querySelector(".main-section-bookmarks")
    .setAttribute("style", `height:${sectionHeight}px;`);

  if (settings[0].linkIcons !== true) {
    appendIcons();
  }
};
//on resize window

onresize = () => {
  const windowHeight = document.body.clientHeight;
  const sectionHeight = (windowHeight * 88) / 100;
  document
    .querySelector(".main-section-bookmarks")
    .setAttribute("style", `height:${sectionHeight}px;`);
};

var dragLink = false;
var dragGroup = false;

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
    const topBtnDiv = document.createElement("div");
    topBtnDiv.classList.add("contextTopBtnDiv");
    popUp.appendChild(topBtnDiv);

    // add bookmark
    const addBookmakrBtn = document.createElement("a");
    addBookmakrBtn.classList.add(
      "fa-solid",
      "fa-plus",
      "contextBtn",
      "addBookmark-btn"
    );
    // addBookmakrBtn.textContent = "Add New Bookmark";
    // addBookmakrBtn.setAttribute("type", "button");
    topBtnDiv.appendChild(addBookmakrBtn);
    addBookmakrBtnFuntion();

    // settings btn
    const settingsBtn = document.createElement("a");
    settingsBtn.classList.add(
      "fa-solid",
      "fa-gear",
      "contextBtn",
      "settings-btn"
    );
    // settingsBtn.textContent = "Settings";
    // settingsBtn.setAttribute("type", "button");
    topBtnDiv.appendChild(settingsBtn);
    showSettingsUI();
    // refresh btn
    const refreshBtn = document.createElement("a");
    refreshBtn.classList.add(
      "fa-solid",
      "fa-rotate-right",
      "contextBtn",
      "settings-btn"
    );
    // settingsBtn.textContent = "Settings";
    // settingsBtn.setAttribute("type", "button");
    topBtnDiv.appendChild(refreshBtn);
    refreshBtn.addEventListener("click", (e) => {
      window.location.reload();
    });
    const line = document.createElement("div");
    line.classList.add("line");
    popUp.appendChild(line);

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

    //enable draggable elements

    const draggableLinkBtn = document.createElement("a");
    const draggableGroupBtn = document.createElement("a");
    draggableLinkBtn.classList.add(
      "contextBtn",
      "dragging-btn",
      "dragging-link"
    );
    draggableGroupBtn.classList.add(
      "contextBtn",
      "dragging-btn",
      "dragging-group"
    );
    if (dragLink !== true) {
      draggableLinkBtn.textContent = "Enable Link Dragging";
    } else {
      draggableLinkBtn.textContent = "Disable Link Dragging";
    }
    if (draggableLinkBtn.textContent === "Disable Link Dragging") {
      draggableGroupBtn.classList.add("disable");
    }
    if (dragGroup !== true) {
      draggableGroupBtn.textContent = "Enable Group Dragging";
    } else {
      draggableGroupBtn.textContent = "Disable Group Dragging";
    }
    if (draggableGroupBtn.textContent === "Disable Group Dragging") {
      draggableLinkBtn.classList.add("disable");
    }
    popUp.appendChild(draggableLinkBtn);
    popUp.appendChild(draggableGroupBtn);

    draggableLinkBtn.addEventListener("click", (e) => {
      const elemToDrag = document.querySelectorAll(
        ".main-section-bookmarks-ul-li"
      );
      const elemToDragAppend = document.querySelectorAll(
        ".main-section-bookmarks-ul-li"
      );

      const elemToDragOver = document.querySelectorAll(
        ".main-section-bookmarks-ul"
      );

      let elementToMove,
        positionToMove,
        arrayElementToMove,
        indexOfElementToMove,
        groupOfElementToMove,
        positionY,
        parentToInsert,
        position;

      function dragover(e) {
        e.preventDefault();

        if (e.target.nodeName === "A") {
          positionY = e.layerY;
        }
        if (e.target.parentNode.nodeName === "LI") {
          position = e.target.parentNode;
        }
        if (e.target.parentNode.parentNode.nodeName === "UL") {
          parentToInsert = e.target.parentNode.parentNode;
        }

        if (e.target.hasChildNodes()) {
          if (positionY <= 14) {
            if (position !== undefined) {
              parentToInsert.insertBefore(elementToMove, position);
            }
          } else {
            if (position !== undefined) {
              parentToInsert.insertBefore(elementToMove, position.nextSibling);
            }
          }
        } else {
          e.target.appendChild(elementToMove);
        }
      }
      function drop(e) {
        e.preventDefault();

        elementToMove.classList.remove("dragging");

        const indexOfElement = Array.from(
          elementToMove.parentNode.childNodes
        ).indexOf(elementToMove);

        const indexOfGroup = Array.from(
          elementToMove.parentNode.parentNode.parentNode.childNodes
        ).indexOf(elementToMove.parentNode.parentNode);

        const indexOfColumn = Array.from(
          elementToMove.parentNode.parentNode.parentNode.parentNode.childNodes
        ).indexOf(elementToMove.parentNode.parentNode.parentNode);

        if (indexOfElementToMove > -1) {
          groupOfElementToMove.bookmark.splice(indexOfElementToMove, 1);
        }
        bookmarks[indexOfColumn].groups[indexOfGroup].bookmark.splice(
          indexOfElement,
          0,
          arrayElementToMove
        );
        let bookmarksString = JSON.stringify(bookmarks);
        localStorage.setItem("Bookmarks", bookmarksString);
      }

      function dragstart(e) {
        e.dataTransfer.setDragImage(
          e.target,
          window.outerWidth,
          window.outerHeight
        );

        elementToMove = e.target;
        elementToMove.classList.add("dragging");

        const indexOfElement = Array.from(
          e.target.parentNode.childNodes
        ).indexOf(e.target);
        const indexOfGroup = Array.from(
          e.target.parentNode.parentNode.parentNode.childNodes
        ).indexOf(e.target.parentNode.parentNode);
        const indexOfColumn = Array.from(
          e.target.parentNode.parentNode.parentNode.parentNode.childNodes
        ).indexOf(e.target.parentNode.parentNode.parentNode);

        arrayElementToMove =
          bookmarks[indexOfColumn].groups[indexOfGroup].bookmark[
            indexOfElement
          ];

        indexOfElementToMove = indexOfElement;
        groupOfElementToMove = bookmarks[indexOfColumn].groups[indexOfGroup];
      }

      if (dragLink !== true) {
        dragLink = true;
        elemToDrag.forEach((elemToDrag) => {
          elemToDrag.addEventListener("dragstart", dragstart, true);
          elemToDrag.setAttribute("draggable", "true");
          elemToDrag.classList.add("move");
          elemToDrag.childNodes[0].removeAttribute("href");
        });

        elemToDragOver.forEach((elemToDragOver) => {
          elemToDragOver.addEventListener("dragover", dragover, true);
          elemToDragOver.addEventListener("drop", drop, true);
          // elemToDragOver.addEventListener("dragenter", dragenter, true);
          elemToDragOver.classList.add("dragOverList");
        });
        function closeOnESC() {
          dragLink = false;
          elemToDrag.forEach((elemToDrag) => {
            elemToDrag.removeEventListener("dragstart", dragstart, true);
          });
          elemToDragOver.forEach((elemToDragOver) => {
            elemToDragOver.removeEventListener("dragover", dragover, true);
            elemToDragOver.removeEventListener("drop", drop, true);
            // elemToDragOver.removeEventListener("dragenter", dragenter, true);
            elemToDragOver.classList.remove("dragOverList");
          });
          while (document.querySelector(".main-section-bookmarks").firstChild) {
            document
              .querySelector(".main-section-bookmarks")
              .removeChild(
                document.querySelector(".main-section-bookmarks").firstChild
              );
          }
          createBookmarkGroup(bookmarks);
          document.body.removeEventListener("dragover", dragover, true);
          document.body.removeEventListener("keyup", closeOnESC);
        }
        document.body.addEventListener("keyup", closeOnESC);
      } else {
        dragLink = false;
        elemToDrag.forEach((elemToDrag) => {
          elemToDrag.removeEventListener("dragstart", dragstart, true);
        });
        elemToDragOver.forEach((elemToDragOver) => {
          elemToDragOver.removeEventListener("dragover", dragover, true);
          elemToDragOver.removeEventListener("drop", drop, true);
          // elemToDragOver.removeEventListener("dragenter", dragenter, true);
          elemToDragOver.classList.remove("dragOverList");
        });
        while (document.querySelector(".main-section-bookmarks").firstChild) {
          document
            .querySelector(".main-section-bookmarks")
            .removeChild(
              document.querySelector(".main-section-bookmarks").firstChild
            );
        }
        createBookmarkGroup(bookmarks);
      }

      if (document.querySelector(".rmb-popup") !== null) {
        if (document.querySelector(".rmb-popup").parentNode) {
          document
            .querySelector(".rmb-popup")
            .parentNode.removeChild(document.querySelector(".rmb-popup"));
        }
      }
    });

    draggableGroupBtn.addEventListener("click", (e) => {
      const elemToDrag = document.querySelectorAll(
        ".main-section-bookmarks-group-div"
      );
      const elemToDragOver = document.querySelectorAll(".main-section-column");

      let elementToMove,
        positionToMove,
        arrayElementToMove,
        indexOfElementToMove,
        groupOfElementToMove,
        positionY,
        clientH,
        parentToInsert,
        position;

      function dragover(e) {
        e.preventDefault();

        if (
          e.target.parentNode.className ===
          "main-section-bookmarks-group relative"
        ) {
          positionY = e.layerY;
          clientH = e.target.clientHeight;
        } else {
          positionY = undefined;
        }

        let y = (50 * clientH) / 100;
        if (e.target.parentNode.getAttribute("draggable") !== undefined) {
          if (
            e.target.parentNode.className ===
            "main-section-bookmarks-group relative"
          ) {
            position = e.target.parentNode;
          } else {
            position = e.target;
          }
        }

        if (
          e.target.parentNode.className ===
          "main-section-bookmarks-group relative"
        ) {
          parentToInsert = e.target.parentNode.parentNode;
        } else if (e.target.className === "main-section-column dragOverList") {
          parentToInsert = e.target;
        }
        if (parentToInsert !== undefined) {
          if (parentToInsert.hasChildNodes()) {
            if (positionY <= y) {
              if (position !== undefined) {
                parentToInsert.insertBefore(elementToMove, position);
              }
            } else {
              if (position !== undefined) {
                parentToInsert.insertBefore(
                  elementToMove,
                  position.nextSibling
                );
              }
            }
          } else {
            parentToInsert.appendChild(elementToMove);
          }
        }
      }
      function drop(e) {
        e.preventDefault();
        elementToMove.classList.remove("dragging");

        const indexOfGroup = Array.from(
          elementToMove.parentNode.childNodes
        ).indexOf(elementToMove);

        const indexOfColumn = Array.from(
          elementToMove.parentNode.parentNode.childNodes
        ).indexOf(elementToMove.parentNode);

        if (indexOfElementToMove > -1) {
          groupOfElementToMove.groups.splice(indexOfElementToMove, 1);
        }
        bookmarks[indexOfColumn].groups.splice(
          indexOfGroup,
          0,
          arrayElementToMove
        );

        let bookmarksString = JSON.stringify(bookmarks);
        localStorage.setItem("Bookmarks", bookmarksString);
      }

      function dragstart(e) {
        e.dataTransfer.setDragImage(
          e.target,
          window.outerWidth,
          window.outerHeight
        );

        elementToMove = e.target.parentNode;
        elementToMove.classList.add("dragging");

        const indexOfGroup = Array.from(
          elementToMove.parentNode.childNodes
        ).indexOf(elementToMove);

        const indexOfColumn = Array.from(
          elementToMove.parentNode.parentNode.childNodes
        ).indexOf(elementToMove.parentNode);

        arrayElementToMove = bookmarks[indexOfColumn].groups[indexOfGroup];
        indexOfElementToMove = indexOfGroup;
        groupOfElementToMove = bookmarks[indexOfColumn];
      }

      if (dragGroup !== true) {
        dragGroup = true;
        elemToDrag.forEach((elemToDrag) => {
          const div = document.createElement("div");
          elemToDrag.parentNode.classList.add("relative");
          div.classList.add("mask");
          elemToDrag.parentNode.appendChild(div);

          div.setAttribute("draggable", "true");
          div.classList.add("move");
          div.addEventListener("dragstart", dragstart, true);
        });
        elemToDragOver.forEach((elemToDragOver) => {
          elemToDragOver.addEventListener("dragover", dragover, true);
          elemToDragOver.addEventListener("drop", drop, true);
          elemToDragOver.classList.add("dragOverList");
        });
        function closeOnESC() {
          dragGroup = false;
          elemToDrag.forEach((elemToDrag) => {
            elemToDrag.removeEventListener("dragstart", dragstart, true);
          });
          elemToDragOver.forEach((elemToDragOver) => {
            elemToDragOver.removeEventListener("dragover", dragover, true);
            elemToDragOver.removeEventListener("drop", drop, true);
            // elemToDragOver.removeEventListener("dragenter", dragenter, true);
            elemToDragOver.classList.remove("dragOverList");
            while (
              document.querySelector(".main-section-bookmarks").firstChild
            ) {
              document
                .querySelector(".main-section-bookmarks")
                .removeChild(
                  document.querySelector(".main-section-bookmarks").firstChild
                );
            }
            createBookmarkGroup(bookmarks);
          });
          document.body.removeEventListener("dragover", dragover, true);
          document.body.removeEventListener("keyup", closeOnESC);
        }
        document.body.addEventListener("keyup", closeOnESC);
      } else {
        dragGroup = false;
        elemToDrag.forEach((elemToDrag) => {
          elemToDrag.removeEventListener("dragstart", dragstart, true);
        });
        elemToDragOver.forEach((elemToDragOver) => {
          elemToDragOver.removeEventListener("dragover", dragover, true);
          elemToDragOver.removeEventListener("drop", drop, true);
          // elemToDragOver.removeEventListener("dragenter", dragenter, true);
          elemToDragOver.classList.remove("dragOverList");
          while (document.querySelector(".main-section-bookmarks").firstChild) {
            document
              .querySelector(".main-section-bookmarks")
              .removeChild(
                document.querySelector(".main-section-bookmarks").firstChild
              );
          }
          createBookmarkGroup(bookmarks);
        });
      }

      if (document.querySelector(".rmb-popup") !== null) {
        if (document.querySelector(".rmb-popup").parentNode) {
          document
            .querySelector(".rmb-popup")
            .parentNode.removeChild(document.querySelector(".rmb-popup"));
        }
      }
    });

    // close contextmenu
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
    appendIcons();
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

//append websiteIcons to links
const appendIcons = () => {
  const link = document.querySelectorAll(".main-section-bookmarks-ul-li-link");
  link.forEach((link) => {
    const imgIcon = document.createElement("img");
    imgIcon.setAttribute("height", 16);
    imgIcon.setAttribute("width", 16);
    imgIcon.setAttribute(
      "src",
      `https://s2.googleusercontent.com/s2/favicons?domain_url=${link.href}`
    );
    link.appendChild(imgIcon);
  });
};

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
                  .textContent,
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
                  .textContent,
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

      const name = element.textContent;
      const url = element.href;
      editDiv({ name: name, url: url });

      document.querySelector(".confirmBtn").addEventListener("click", () => {
        element.textContent = document.querySelector(".editInpName").value;
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
      const name = element.textContent;
      editDiv({ name: name, url: null });
      document.querySelector(".confirmBtn").addEventListener("click", () => {
        element.textContent = document.querySelector(".editInpName").value;
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
        // document.querySelector(".settings-menu-textarea").value = "";
      });
    }
  });
};

// show/hide UI elements
const hideMenuIcons = () => {
  document
    .querySelector(".hideMenuBtnCheckBox")
    .addEventListener("input", (e) => {
      settings[0].menuIcons = e.target.checked;
      if (e.target.checked !== true) {
        document
          .querySelector(".main-nav-icon")
          .setAttribute("data-visible", "true");
      } else {
        document
          .querySelector(".main-nav-icon")
          .setAttribute("data-visible", "false");
      }
      let settingsString = JSON.stringify(settings);
      localStorage.setItem("Settings", settingsString);
    });
  if (settings[0].menuIcons === true) {
    document.querySelector(".hideMenuBtnCheckBox").click();
    if (document.querySelector(".hideMenuBtnCheckBox").checked !== true) {
      document
        .querySelector(".main-nav-icon")
        .setAttribute("data-active", "true");
    } else {
      document
        .querySelector(".main-nav-icon")
        .setAttribute("data-active", "false");
    }
  }
};
hideMenuIcons();

const hideLinkIcons = () => {
  document
    .querySelector(".hideLinkIconCheckbox")
    .addEventListener("input", (e) => {
      settings[0].linkIcons = e.target.checked;

      let settingsString = JSON.stringify(settings);
      localStorage.setItem("Settings", settingsString);
      while (document.querySelector(".main-section-bookmarks").firstChild) {
        document
          .querySelector(".main-section-bookmarks")
          .removeChild(
            document.querySelector(".main-section-bookmarks").firstChild
          );
      }
      // if (settings[0].linkIcons !== true) {
      //   appendIcons();
      // }
      createBookmarkGroup(bookmarks);
    });

  if (settings[0].linkIcons === true) {
    document.querySelector(".hideLinkIconCheckbox").click();
  }
};
hideLinkIcons();

//import export bookmarks logic

const importExportBookmarks = () => {
  const textarea = document.querySelector(".settings-menu-textarea");
  const textDiv = document.querySelector(".settings-menu-textDiv");
  const importBTN = document.querySelector(".settings-menu-import");
  const exportBTN = document.querySelector(".settings-menu-export");
  const settingDiv = document.querySelector(".settings");
  const settingBtn = document.querySelector(".settings-btn");
  const bookmarksSection = document.querySelector(".main-section-bookmarks");

  if (importBTN.getAttribute("listener") !== "true") {
    importBTN.setAttribute("listener", "true");
    importBTN.addEventListener("click", () => {
      while (textDiv.firstChild) {
        textDiv.removeChild(textDiv.firstChild);
      }
      const paragraph = document.createElement("p");
      paragraph.textContent =
        "If you have export code from another device or browser, you can paste it in the box below and click Import to load the new bookmarks. Warning: This will replace the current bookmarks. ";
      textDiv.appendChild(paragraph);
      const textarea = document.createElement("textarea");
      textarea.classList.add("settings-menu-textarea", "input");
      textDiv.appendChild(textarea);

      const btnDiv = document.createElement("div");
      textDiv.appendChild(btnDiv);

      const btn1 = document.createElement("input");
      btn1.classList.add("button");
      btn1.setAttribute("type", "button");
      btn1.value = "Import ";
      btnDiv.appendChild(btn1);
      const btn2 = document.createElement("input");
      btn2.classList.add("button");
      btn2.setAttribute("type", "button");

      btn2.value = "Close Import";
      btnDiv.appendChild(btn2);

      btn1.addEventListener("click", (e) => {
        let regex =
          /^\[\{"[A-Za-z]+":\[[\s\S]*]\},\{"[A-Za-z]+":\[[\s\S]*]\},\{"[A-Za-z]+":\[[\s\S]*]\},\{"[A-Za-z]+":\[[\s\S]*]\}\]$/i;

        if (regex.test(textarea.value)) {
          console.log(regex.test(textarea.value));
          localStorage.setItem("Bookmarks", textarea.value);
          while (bookmarksSection.firstChild) {
            bookmarksSection.removeChild(bookmarksSection.firstChild);
          }
          bookmarksString = localStorage.getItem("Bookmarks");
          bookmarks = JSON.parse(bookmarksString);

          createBookmarkGroup(bookmarks);
          collExpBookmarksFunc();
          dataVisibleSwitcher(settingDiv, 1);
          // if (settings[0].linkIcons !== true) {
          //   appendIcons();
          // }
        } else {
          return;
        }
        while (textDiv.firstChild) {
          textDiv.removeChild(textDiv.firstChild);
        }
      });
      btn2.addEventListener("click", (e) => {
        while (textDiv.firstChild) {
          textDiv.removeChild(textDiv.firstChild);
        }
      });
    });
  }
  if (exportBTN.getAttribute("listener") !== "true") {
    exportBTN.setAttribute("listener", "true");
    exportBTN.addEventListener("click", () => {
      while (textDiv.firstChild) {
        textDiv.removeChild(textDiv.firstChild);
      }
      const paragraph = document.createElement("p");
      paragraph.textContent =
        "The code below can be used to import your bookmarks on another device or web browser.";
      textDiv.appendChild(paragraph);
      const textarea = document.createElement("textarea");
      textarea.classList.add("settings-menu-textarea", "input");
      textarea.value = localStorage.getItem("Bookmarks");
      textDiv.appendChild(textarea);
      textDiv.appendChild(textarea);

      const btnDiv = document.createElement("div");
      textDiv.appendChild(btnDiv);

      const btn1 = document.createElement("input");
      btn1.classList.add("button");
      btn1.value = "Copy Code";
      btnDiv.appendChild(btn1);
      const btn2 = document.createElement("input");
      btn2.classList.add("button");
      btn2.value = "Close Export";
      btnDiv.appendChild(btn2);

      btn1.addEventListener("click", (e) => {
        // let urlNewtab = document.querySelector(".settings-menu-form-inp");
        textarea.select();
        textarea.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(textarea.value);
      });
      btn2.addEventListener("click", (e) => {
        while (textDiv.firstChild) {
          textDiv.removeChild(textDiv.firstChild);
        }
      });
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

showSettingsUI();
collExpBookmarksFunc();

//modify color theme

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
        styleSheet.deleteRule(mode, 0);
        styleSheet.insertRule(mode, 0);
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
      styleSheet.deleteRule(mode, 0);
      styleSheet.insertRule(mode, 0);
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
      styleSheet.deleteRule(mode, 0);
      styleSheet.insertRule(mode, 0);
      break;

    default:
      if (colorScheme[0].customeColors !== undefined) {
        colorScheme[0].mode = "custom";

        const mode = `:root { --first:${colorScheme[0].customeColors.first}; --second: ${colorScheme[0].customeColors.second}; --third: ${colorScheme[0].customeColors.third}; --accent-first: ${colorScheme[0].customeColors.accentFirst}; --text-color: ${colorScheme[0].customeColors.textColor}; }`;
        styleSheet.deleteRule(mode, 0);
        styleSheet.insertRule(mode, 0);
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
        styleSheet.deleteRule(mode, 0);
        styleSheet.insertRule(mode, 0);
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
            styleSheet.deleteRule(mode, 0);
            styleSheet.insertRule(mode, 0);
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
