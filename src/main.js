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
  let colorSchemeString = localStorage.getItem("ColorSheme");
  var colorScheme = JSON.parse(colorSchemeString);
} else {
  var colorScheme = {
    mode: "auto",
  };
  let colorSchemeString = JSON.stringify(colorScheme);
  localStorage.setItem("ColorSheme", colorSchemeString);
}

if (localStorage.getItem("Setting") !== null) {
  var settingString = localStorage.getItem("Setting");
  var setting = JSON.parse(settingString);

  var hideMenuIconsString = localStorage.getItem("hideMenuIcons");
  var hideMenuIcons = JSON.parse(hideMenuIconsString);

  var hideLinkIconsString = localStorage.getItem("hideLinkIcons");
  var hideLinkIcons = JSON.parse(hideLinkIconsString);
} else {
  let setting = true;
  let settingString = JSON.stringify(setting);
  localStorage.setItem("Setting", settingString);

  let hideMenuIcons = false;
  let hideMenuIconsString = JSON.stringify(hideMenuIcons);
  localStorage.setItem("hideMenuIcons", hideMenuIconsString);

  let hideLinkIcons = false;
  let hideLinkIconsString = JSON.stringify(hideLinkIcons);
  localStorage.setItem("hideLinkIcons", hideLinkIconsString);
}

const styleSheet = document.styleSheets[1];

//on fully load website

onload = () => {
  const windowHeight = document.body.clientHeight;
  const sectionHeight = (windowHeight * 87) / 100;
  document
    .querySelector(".main-section-bookmarks")
    .setAttribute("style", `height:${sectionHeight}px;`);

  appendIcons();
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
if (
  document.querySelector(".main-section").getAttribute("listener") !== "true"
) {
  document.querySelector(".main-section").setAttribute("listener", "true");
  document
    .querySelector(".main-section")
    .addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });

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
}

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
    addBookmakrBtn.addEventListener("click", drawAddBookmark);
    topBtnDiv.appendChild(addBookmakrBtn);

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
    settingsBtn.addEventListener("click", drawSettings);

    topBtnDiv.appendChild(settingsBtn);
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
          appendIcons();
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
        appendIcons();
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
            appendIcons();
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
          appendIcons();
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
    // if (
    //   document.querySelector(".main-section").getAttribute("listenerClosePoP") !==
    //   "true"
    // ) {
    //   document.querySelector(".main-section").setAttribute("listener", "true");
    //   document.querySelector(".main-section").addEventListener(
    //     "mouseup",
    //     function (e) {
    //       if (e.button === 0) {
    //         if (document.querySelector(".rmb-popup") !== null) {
    //           if (document.querySelector(".rmb-popup").parentNode) {
    //             document
    //               .querySelector(".rmb-popup")
    //               .parentNode.removeChild(document.querySelector(".rmb-popup"));
    //           }
    //         }
    //       }
    //     },
    //     false
    //   );
    // }
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
    appendIcons();
    collExpBookmarksFunc();
  }
});
//press escepe to quickly quit manu functions

document.body.addEventListener("keyup", function (e) {
  if (e.key == "Escape") {
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

//append websiteIcons to links
const appendIcons = () => {
  if (hideLinkIcons !== true) {
    const link = document.querySelectorAll(
      ".main-section-bookmarks-ul-li-link"
    );
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
  }
};

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
//draw addBookmark Element
const drawAddBookmark = () => {
  const div = document.createElement("div");
  div.classList.add("addBookmark");
  document.querySelector(".main-section").appendChild(div);
  const form = document.createElement("form");
  form.classList.add("addBookmark-form");
  form.setAttribute("autocomplete", "off");
  div.appendChild(form);

  const labelName = document.createElement("label");
  labelName.setAttribute("for", "name");
  labelName.classList.add("addBookmark-form-label");
  labelName.textContent = "Name";
  form.appendChild(labelName);
  const inputName = document.createElement("input");
  inputName.classList.add(
    "addBookmark-form-name",
    "addBookmark-form-input",
    "input"
  );
  inputName.setAttribute("type", "text");
  inputName.setAttribute("autocomplete", "off");
  labelName.appendChild(inputName);

  const labelUrl = document.createElement("label");
  labelUrl.setAttribute("for", "url");
  labelUrl.classList.add("addBookmark-form-label");
  labelUrl.textContent = "Url";
  form.appendChild(labelUrl);
  const inputUrl = document.createElement("input");
  inputUrl.classList.add(
    "addBookmark-form-url",
    "addBookmark-form-input",
    "input"
  );
  inputUrl.setAttribute("type", "text");
  inputUrl.setAttribute("autocomplete", "off");

  labelUrl.appendChild(inputUrl);

  const labelToGroup = document.createElement("label");
  labelToGroup.setAttribute("for", "to group");
  labelToGroup.setAttribute("data-visible", "true");
  labelToGroup.classList.add("addBookmark-form-label", "addCreateNewGroup");
  labelToGroup.textContent = "Add to Group";
  form.appendChild(labelToGroup);
  const selectToGroup = document.createElement("select");
  selectToGroup.classList.add(
    "addBookmark-form-chooseGroup",
    "input",
    "addBookmark-form-input"
  );
  labelToGroup.appendChild(selectToGroup);

  const labelNewGroup = document.createElement("label");
  labelNewGroup.setAttribute("for", "new group");
  labelNewGroup.setAttribute("data-visible", "false");
  labelNewGroup.classList.add("addBookmark-form-label", "addCreateNewGroup");
  labelNewGroup.textContent = "New Group";
  form.appendChild(labelNewGroup);
  const inputNewGroup = document.createElement("input");
  inputNewGroup.classList.add(
    "addBookmark-form-newGroup",
    "addBookmark-form-input",
    "input"
  );
  inputNewGroup.setAttribute("type", "text");
  inputNewGroup.setAttribute("autocomplete", "off");

  labelNewGroup.appendChild(inputNewGroup);

  const labelCheckBox = document.createElement("label");
  labelCheckBox.setAttribute("for", "group checkbox");
  labelCheckBox.classList.add("addBookmark-form-label");
  labelCheckBox.textContent = "Add new group";
  form.appendChild(labelCheckBox);
  const inputCheckBox = document.createElement("input");
  inputCheckBox.setAttribute("type", "checkbox");
  inputCheckBox.classList.add("addBookmark-form-checkbox");
  labelCheckBox.appendChild(inputCheckBox);

  const btnDiv = document.createElement("div");
  btnDiv.classList.add("addBookmkar-form-btnContainer");
  form.appendChild(btnDiv);
  const addBtn = document.createElement("button");
  addBtn.classList.add(
    "addBookmark-form-btn-add",
    "button",
    "addBookmark-form-input",
    "addBookmark-form-btn"
  );
  addBtn.setAttribute("type", "button");
  addBtn.textContent = "Add";
  btnDiv.appendChild(addBtn);
  const cancelBtn = document.createElement("button");
  cancelBtn.classList.add(
    "addBookmark-form-btn-cancel",
    "button",
    "addBookmark-form-input",
    "addBookmark-form-btn"
  );
  cancelBtn.setAttribute("type", "button");
  cancelBtn.textContent = "Cancel";
  btnDiv.appendChild(cancelBtn);

  //append group to select
  bookmarks.forEach((element) => {
    element.groups.forEach((element) => {
      const option = document.createElement("option");
      option.textContent = element.groupName;
      option.setAttribute("value", element.groupName);
      selectToGroup.appendChild(option);
    });
  });
  //

  // form validation

  if (inputName.valu === "" || inputUrl.value === "") {
    addBtn.setAttribute("disabled", "true");
    addBtn.classList.add("btnIsDisabled");
  } else {
    addBtn.removeAttribute("disabled", "true");
    addBtn.classList.remove("btnIsDisabled");
  }

  form.addEventListener("input", (e) => {
    const name = inputName.value;
    const url = inputUrl.value;
    const newGroup = inputNewGroup.value;

    if (inputCheckBox.checked !== true) {
      if (name === "" || url === "") {
        addBtn.setAttribute("disabled", "true");
        addBtn.classList.add("btnIsDisabled");
      } else {
        addBtn.removeAttribute("disabled", "true");
        addBtn.classList.remove("btnIsDisabled");
      }
    } else {
      if (name === "" || url === "" || newGroup == "") {
        addBtn.setAttribute("disabled", "true");
        addBtn.classList.add("btnIsDisabled");
      } else {
        addBtn.removeAttribute("disabled", "true");
        addBtn.classList.remove("btnIsDisabled");
      }
    }
  });
  //

  //close window
  const closeWindow = () => {
    document.body.removeEventListener("keyup", closeWindowKey);

    document
      .querySelector(".main-section")
      .removeChild(document.querySelector(".addBookmark"));
  };
  const closeWindowKey = (e) => {
    if (e.key == "Escape") {
      document
        .querySelector(".main-section")
        .removeChild(document.querySelector(".addBookmark"));
      document.body.removeEventListener("keyup", closeWindowKey);
    }
  };
  cancelBtn.addEventListener("click", closeWindow);
  document.body.addEventListener("keyup", closeWindowKey);
  div.addEventListener(
    "mouseup",
    (e) => {
      if (e.target.className === "addBookmark") {
        document.body.removeEventListener("keyup", closeWindowKey);

        document
          .querySelector(".main-section")
          .removeChild(document.querySelector(".addBookmark"));
      }
    },
    true
  );
  //

  //checkbox logic
  inputCheckBox.addEventListener("change", () => {
    document.querySelectorAll(".addCreateNewGroup").forEach((element) => {
      if (inputCheckBox.checked) {
        dataVisibleSwitcher(element, 1);
      } else {
        dataVisibleSwitcher(element, 1);
      }
    });
  });
  //

  //add bookmark/ group function
  addBtn.addEventListener("click", function () {
    const name = inputName.value;
    const url = inputUrl.value;
    const groupName = selectToGroup.value;
    const newGroupName = inputNewGroup.value;

    if (!inputCheckBox.checked) {
      const newBookmark = {
        name: name,
        url: url,
      };
      const findElement = getElementsByText(groupName, "h2");
      const parentNodeToAppend =
        findElement[0].parentNode.parentNode.childNodes[1];

      bookmarks.forEach((column) => {
        column.groups.forEach((group) => {
          if (group.groupName === groupName) {
            group.bookmark.push(newBookmark);
            let bookmarksString = JSON.stringify(bookmarks);
            localStorage.setItem("Bookmarks", bookmarksString);
          }
        });
      });

      createBookmarkLink(null, parentNodeToAppend, name, url);
    } else {
      const newBookmark = {
        groupName: newGroupName,
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
      createBookmarkGroup(null, name, url, newGroupName);
      appendIcons();
      collExpBookmarksFunc();
    }
    closeWindow();
  });
};
//
document
  .querySelector(".addBookmark-btn ")
  .addEventListener("click", drawAddBookmark);
//

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

// delete Button Logic
const deleteBtnLogic = (domElement) => {
  const element = domElement;
  const deleteBtn = document.querySelector(".delete-btn");

  deleteBtn.addEventListener("click", () => {
    if (element.tagName === "A") {
      // delete link
      const domParent = element.parentNode.parentNode;
      const domElement = element.parentNode;
      if (domParent) {
        domParent.removeChild(domElement);
      }
      const name = element.textContent;
      const array = bookmarks;

      bookmarks.forEach((column) => {
        column.groups.forEach((group) => {
          group.bookmark.forEach((bookamrk) => {
            if (bookamrk.name === name) {
              const index = group.bookmark.indexOf(bookamrk);
              if (index > -1) {
                group.bookmark.splice(index, 1);
              }
              createUndoElement(
                "deletion",
                group.bookmark,
                index,
                bookamrk,
                domElement,
                domParent
              );

              let bookmarksString = JSON.stringify(bookmarks);
              localStorage.setItem("Bookmarks", bookmarksString);
            }
          });
        });
      });
    } else {
      // delete group

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
        const name = element.textContent;
        bookmarks.forEach((column) => {
          column.groups.forEach((group) => {
            if (group.groupName === name) {
              const index = column.groups.indexOf(group);
              if (index > -1) {
                column.groups.splice(index, 1);
              }
              let bookmarksString = JSON.stringify(bookmarks);
              localStorage.setItem("Bookmarks", bookmarksString);
            }
          });
        });

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
      //close window on "escape" and "mouse click"
      const closeWindowKey = (e) => {
        if (e.key == "Escape") {
          document.querySelector(".main-section").removeChild(div1);
          document.body.removeEventListener("keyup", closeWindowKey);
        }
      };
      document.body.addEventListener("keyup", closeWindowKey);
      div1.addEventListener(
        "mouseup",
        (e) => {
          if (e.target.className === "confirmDiv") {
            document.body.removeEventListener("keyup", closeWindowKey);

            document.querySelector(".main-section").removeChild(div1);
          }
        },
        true
      );
    }
    if (document.querySelector(".rmb-popup").parentNode) {
      document
        .querySelector(".rmb-popup")
        .parentNode.removeChild(document.querySelector(".rmb-popup"));
    }
  });
};
//

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
      const name = element.textContent;
      const url = element.href;
      editDiv({ name: name, url: url });

      document.querySelector(".confirmBtn").addEventListener("click", () => {
        element.textContent = document.querySelector(".editInpName").value;
        element.href = document.querySelector(".editInpUrl").value;

        bookmarks.forEach((column) => {
          column.groups.forEach((group) => {
            group.bookmark.forEach((bookamrk) => {
              if (bookamrk.name === name) {
                bookamrk.name = document.querySelector(".editInpName").value;
                bookamrk.url = document.querySelector(".editInpUrl").value;
                let bookmarksString = JSON.stringify(bookmarks);
                localStorage.setItem("Bookmarks", bookmarksString);
              }
            });
          });
        });

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
      //close window on "escape" and "mouse click"
      const closeWindowKey = (e) => {
        if (e.key == "Escape") {
          document
            .querySelector(".main-section")
            .removeChild(document.querySelector(".editDiv"));
          document.body.removeEventListener("keyup", closeWindowKey);
        }
      };
      document.body.addEventListener("keyup", closeWindowKey);
      document.querySelector(".editDiv").addEventListener(
        "mouseup",
        (e) => {
          if (e.target.className === "editDiv") {
            document.body.removeEventListener("keyup", closeWindowKey);

            document
              .querySelector(".main-section")
              .removeChild(document.querySelector(".editDiv"));
          }
        },
        true
      );
    } else {
      //edit group
      const name = element.textContent;
      editDiv({ name: name, url: null });
      document.querySelector(".confirmBtn").addEventListener("click", () => {
        element.textContent = document.querySelector(".editInpName").value;

        bookmarks.forEach((column) => {
          column.groups.forEach((group) => {
            if (group.groupName === name) {
              group.groupName = document.querySelector(".editInpName").value;

              let bookmarksString = JSON.stringify(bookmarks);
              localStorage.setItem("Bookmarks", bookmarksString);
            }
          });
        });

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
      //close window on "escape" and "mouse click"
      const closeWindowKey = (e) => {
        if (e.key == "Escape") {
          document
            .querySelector(".main-section")
            .removeChild(document.querySelector(".editDiv"));
          document.body.removeEventListener("keyup", closeWindowKey);
        }
      };
      document.body.addEventListener("keyup", closeWindowKey);
      document.querySelector(".editDiv").addEventListener(
        "mouseup",
        (e) => {
          if (e.target.className === "editDiv") {
            document.body.removeEventListener("keyup", closeWindowKey);

            document
              .querySelector(".main-section")
              .removeChild(document.querySelector(".editDiv"));
          }
        },
        true
      );
    }
    if (document.querySelector(".rmb-popup").parentNode) {
      document
        .querySelector(".rmb-popup")
        .parentNode.removeChild(document.querySelector(".rmb-popup"));
    }
  });
};
//

//
// settings logic
//

//draw settings element

const drawSettings = () => {
  const divMain = document.createElement("div");
  divMain.classList.add("settings");
  document.querySelector(".main-section").appendChild(divMain);

  const divMenu = document.createElement("div");
  divMenu.classList.add("settings-menu");
  divMain.appendChild(divMenu);
  const h1 = document.createElement("h1");
  h1.textContent = "Settings";
  divMenu.appendChild(h1);

  //apperance
  const divAppe = document.createElement("div");
  divAppe.classList.add("setting-menu-appearance");
  divMenu.appendChild(divAppe);
  const h2Appe = document.createElement("h2");
  h2Appe.textContent = "Apperance";
  divAppe.appendChild(h2Appe);
  const divTheme = document.createElement("div");
  divTheme.classList.add("setting-menu-appearance-theme");
  divAppe.appendChild(divTheme);
  const selectTheme = document.createElement("select");
  selectTheme.classList.add("etting-menu-appearance-selectColorTheme", "input");
  selectTheme.setAttribute("autocomplete", "off");
  divTheme.appendChild(selectTheme);
  const listOfOptions = [
    {
      value: "auto",
      name: "Auto (based on your system setting)",
    },
    {
      value: "light",
      name: "Light Mode",
    },
    {
      value: "dark",
      name: "Dark Mode",
    },
    {
      value: "creamy",
      name: "Creamy (Light)",
    },
    {
      value: "firefox",
      name: "Firefox Inspired (Dark)",
    },
    {
      value: "midnight",
      name: "Midnight (Dark)",
    },
    {
      value: "custom",
      name: "Custom",
    },
  ];
  listOfOptions.forEach((element) => {
    const option = document.createElement("option");
    option.setAttribute("value", element.value);
    option.textContent = element.name;
    selectTheme.appendChild(option);
  });
  const divColorPickers = document.createElement("div");
  divColorPickers.classList.add("setting-menu-appearance-colorPickers");
  divColorPickers.setAttribute("data-visible", "false");
  divTheme.appendChild(divColorPickers);
  const listOfColors = [
    {
      value: "background",
      name: "Background",
    },
    {
      value: "primary",
      name: "Primary",
    },
    {
      value: "secondary",
      name: "Secondary",
    },
    {
      value: "accent",
      name: "Accent",
    },
    {
      value: "text",
      name: "Text",
    },
  ];
  listOfColors.forEach((element) => {
    const div = document.createElement("div");
    divColorPickers.appendChild(div);
    const input = document.createElement("input");
    input.setAttribute("type", "color");
    input.setAttribute("name", element.value);
    input.setAttribute("autocomplete", "off");
    input.classList.add("input", `${element.value}Color-input`);
    div.appendChild(input);
    const p = document.createElement("p");
    p.classList.add("colorPickerName");
    p.textContent = element.name;
    div.appendChild(p);
  });
  const divAppeSett = document.createElement("div");
  divAppeSett.classList.add("setting-menu-appearance-settings");
  divAppe.appendChild(divAppeSett);
  const labelMenuIco = document.createElement("label");
  labelMenuIco.textContent = "Hide main button in right top corner";
  divAppeSett.appendChild(labelMenuIco);
  const inputMenuIco = document.createElement("input");
  inputMenuIco.setAttribute("type", "checkbox");
  inputMenuIco.setAttribute("autocomplete", "off");
  inputMenuIco.classList.add(".hideMenuBtnCheckBox");
  labelMenuIco.appendChild(inputMenuIco);

  const labelLinkIco = document.createElement("label");
  labelLinkIco.textContent = "Hide website icons next to links";
  divAppeSett.appendChild(labelLinkIco);
  const inputLinkIco = document.createElement("input");
  inputLinkIco.setAttribute("type", "checkbox");
  inputLinkIco.setAttribute("autocomplete", "off");
  inputLinkIco.classList.add(".hideLinkIconCheckbox");
  labelLinkIco.appendChild(inputLinkIco);

  //Import Export

  const divImpExp = document.createElement("div");
  divImpExp.classList.add("settings-menu-importExport");

  divMenu.appendChild(divImpExp);
  const h2ImpExp = document.createElement("h2");
  h2ImpExp.textContent = "Import/Export Bookmarks";
  divImpExp.appendChild(h2ImpExp);
  const divImpExpCont = document.createElement("div");
  divImpExpCont.classList.add("settings-menu-importExport-content");
  divImpExp.appendChild(divImpExpCont);
  const divImpExpBtnCon = document.createElement("div");
  divImpExpBtnCon.classList.add("settings-menu-btnContainer");
  divImpExpCont.appendChild(divImpExpBtnCon);
  const exportBtn = document.createElement("button");
  exportBtn.setAttribute("type", "button");
  exportBtn.classList.add(
    "settings-menu-export",
    "settings-menu-btn",
    "button"
  );
  exportBtn.textContent = "Export Bookmarks";
  divImpExpBtnCon.appendChild(exportBtn);

  const importBtn = document.createElement("button");
  importBtn.setAttribute("type", "button");
  importBtn.classList.add(
    "settings-menu-import",
    "settings-menu-btn",
    "button"
  );
  importBtn.textContent = "Import Bookmarks";
  divImpExpBtnCon.appendChild(importBtn);
  const divTextArea = document.createElement("div");
  divTextArea.classList.add("settings-menu-textDiv");
  divImpExpCont.appendChild(divTextArea);

  // Homepage Url
  const divTab = document.createElement("div");
  divTab.classList.add("settings-menu-newTab");
  divMenu.appendChild(divTab);

  const h2Tab = document.createElement("h2");
  h2Tab.textContent = "Setup your homepage URL";
  divTab.appendChild(h2Tab);

  const divTabCont = document.createElement("div");
  divTabCont.classList.add("settings-menu-newTab-content");
  divTab.appendChild(divTabCont);
  const pTabCont = document.createElement("div");
  pTabCont.textContent =
    "If you want this extension to be your homepage, set the homepage to the URL below.";
  divTabCont.appendChild(pTabCont);
  const labelTabCont = document.createElement("label");
  labelTabCont.classList.add("settings-menu-newTab-label");
  labelTabCont.textContent = "URL";
  divTabCont.appendChild(labelTabCont);
  const formTabCont = document.createElement("form");
  formTabCont.classList.add("settings-menu-form");
  formTabCont.setAttribute("for", "URL");
  labelTabCont.appendChild(formTabCont);

  const inputTabCont = document.createElement("input");
  inputTabCont.setAttribute("type", "text");
  inputTabCont.classList.add("input", "settings-menu-form-inp");
  inputTabCont.value = window.location.href;
  formTabCont.appendChild(inputTabCont);
  const btnTabCont = document.createElement("button");
  btnTabCont.setAttribute("type", "button");
  btnTabCont.classList.add("button", "settings-menu-form-btn");
  btnTabCont.textContent = "Copy";
  formTabCont.appendChild(btnTabCont);

  //bottom links

  const divLinks = document.createElement("div");
  divLinks.classList.add("settings-links");
  divMain.appendChild(divLinks);
  const a1 = document.createElement("a");
  a1.setAttribute("href", "https://github.com/Endward01");
  a1.setAttribute("target", "_blank");
  a1.textContent = "My Github";
  divLinks.appendChild(a1);
  const a2 = document.createElement("a");
  a2.setAttribute("href", "https://github.com/Endward01/a_new_home");
  a2.setAttribute("target", "_blank");
  a2.textContent = "Github Page of this Project";
  divLinks.appendChild(a2);
  const a3 = document.createElement("a");
  a3.setAttribute("href", "https://danielpretki.dev/");
  a3.setAttribute("target", "_blank");
  a3.textContent = "My Website";
  divLinks.appendChild(a3);

  //apperance settings
  if (hideMenuIcons === true) {
    inputMenuIco.click();
  }
  inputMenuIco.addEventListener("input", (e) => {
    hideMenuIcons = e.target.checked;
    if (e.target.checked !== true) {
      document
        .querySelector(".main-nav-icon")
        .setAttribute("data-visible", "true");
    } else {
      document
        .querySelector(".main-nav-icon")
        .setAttribute("data-visible", "false");
    }
    let hideMenuIconsString = JSON.stringify(hideMenuIcons);
    localStorage.setItem("hideMenuIcons", hideMenuIconsString);
  });
  if (hideLinkIcons === true) {
    inputLinkIco.click();
  }
  inputLinkIco.addEventListener("input", (e) => {
    hideLinkIcons = e.target.checked;

    let hideLinkIconsString = JSON.stringify(hideLinkIcons);
    localStorage.setItem("hideLinkIcons", hideLinkIconsString);
    while (document.querySelector(".main-section-bookmarks").firstChild) {
      document
        .querySelector(".main-section-bookmarks")
        .removeChild(
          document.querySelector(".main-section-bookmarks").firstChild
        );
    }
    createBookmarkGroup(bookmarks);
    appendIcons();
  });
  //

  //import export bookmarks logic
  if (importBtn.getAttribute("listener") !== "true") {
    importBtn.setAttribute("listener", "true");
    importBtn.addEventListener("click", () => {
      while (divTextArea.firstChild) {
        divTextArea.removeChild(divTextArea.firstChild);
      }
      const paragraph = document.createElement("p");
      paragraph.textContent =
        "If you have export code from another device or browser, you can paste it in the box below and click Import to load the new bookmarks. Warning: This will replace the current bookmarks. ";
      divTextArea.appendChild(paragraph);
      const textarea = document.createElement("textarea");
      textarea.classList.add("settings-menu-textarea", "input");
      divTextArea.appendChild(textarea);

      const btnDiv = document.createElement("div");
      divTextArea.appendChild(btnDiv);

      const btn1 = document.createElement("button");
      btn1.classList.add("button");
      btn1.setAttribute("type", "button");
      btn1.classList.add("importBtn", "btnIsDisabled", "importbtn");

      btn1.textContent = "Import";
      btnDiv.appendChild(btn1);
      const btn2 = document.createElement("button");
      btn2.classList.add("button");
      btn2.setAttribute("type", "button");

      btn2.textContent = "Close Import";
      btnDiv.appendChild(btn2);
      let regex =
        /^\[\{"[A-Za-z]+":\[[\s\S]*]\},\{"[A-Za-z]+":\[[\s\S]*]\},\{"[A-Za-z]+":\[[\s\S]*]\},\{"[A-Za-z]+":\[[\s\S]*]\}\]$/i;

      textarea.addEventListener("input", (e) => {
        if (
          regex.test(textarea.value) ||
          (textarea.value == "" && textarea.value == " ")
        ) {
          btn1.classList.remove("importBtn", "btnIsDisabled");
        } else {
          btn1.classList.add("importBtn", "btnIsDisabled");
        }
      });

      btn1.addEventListener("click", (e) => {
        if (regex.test(textarea.value)) {
          localStorage.setItem("Bookmarks", textarea.value);
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
        } else {
          return;
        }
      });
      btn2.addEventListener("click", (e) => {
        while (divTextArea.firstChild) {
          divTextArea.removeChild(divTextArea.firstChild);
        }
      });
    });
  }
  if (exportBtn.getAttribute("listener") !== "true") {
    exportBtn.setAttribute("listener", "true");
    exportBtn.addEventListener("click", () => {
      while (divTextArea.firstChild) {
        divTextArea.removeChild(divTextArea.firstChild);
      }
      const paragraph = document.createElement("p");
      paragraph.textContent =
        "The code below can be used to import your bookmarks on another device or web browser.";
      divTextArea.appendChild(paragraph);
      const textarea = document.createElement("textarea");
      textarea.classList.add("settings-menu-textarea", "input");
      textarea.value = localStorage.getItem("Bookmarks");
      divTextArea.appendChild(textarea);
      divTextArea.appendChild(textarea);

      const btnDiv = document.createElement("div");
      divTextArea.appendChild(btnDiv);

      const btn1 = document.createElement("input");
      btn1.classList.add("button", "cpybtn");
      btn1.value = "Copy Code";
      btnDiv.appendChild(btn1);
      const btn2 = document.createElement("input");
      btn2.classList.add("button");
      btn2.value = "Close Export";
      btnDiv.appendChild(btn2);

      btn1.addEventListener("click", (e) => {
        textarea.select();
        textarea.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(textarea.value);
      });
      btn2.addEventListener("click", (e) => {
        while (divTextArea.firstChild) {
          divTextArea.removeChild(divTextArea.firstChild);
        }
      });
    });
  }
  //

  // change color theme
  if (colorScheme.mode !== "custom") {
    divColorPickers.setAttribute("data-visible", "false");
  } else {
    divColorPickers.setAttribute("data-visible", "true");
    document.querySelector(".backgroundColor-input").value =
      colorScheme.customeColors.background;
    document.querySelector(".primaryColor-input").value =
      colorScheme.customeColors.primary;
    document.querySelector(".secondaryColor-input").value =
      colorScheme.customeColors.secondary;
    document.querySelector(".accentColor-input").value =
      colorScheme.customeColors.accent;
    document.querySelector(".textColor-input").value =
      colorScheme.customeColors.text;
    document;
  }
  selectTheme.value = colorScheme.mode;
  selectTheme.addEventListener("input", () => {
    changeTheme(selectTheme.value);
  });
  document
    .querySelectorAll(".setting-menu-appearance-colorPickers input")
    .forEach((element) => {
      element.addEventListener("input", changeCustomePalete);
    });
  changeCustomePalete;
  //

  // close window
  const closeWindow = () => {
    document.body.removeEventListener("keyup", closeWindowKey);

    document
      .querySelector(".main-section")
      .removeChild(document.querySelector(".settings"));
  };
  const closeWindowKey = (e) => {
    if (e.key == "Escape") {
      document
        .querySelector(".main-section")
        .removeChild(document.querySelector(".settings"));
      document.body.removeEventListener("keyup", closeWindowKey);
    }
  };
  document.body.addEventListener("keyup", closeWindowKey);
  divMain.addEventListener(
    "mouseup",
    (e) => {
      if (e.target.className === "settings") {
        document.body.removeEventListener("keyup", closeWindowKey);

        document
          .querySelector(".main-section")
          .removeChild(document.querySelector(".settings"));
      }
    },
    true
  );

  //
};
// drawSettings();

if (hideMenuIcons !== true) {
  document.body
    .querySelector(".main-nav-icon")
    .setAttribute("data-visible", "true");
} else {
  document.body
    .querySelector(".main-nav-icon")
    .setAttribute("data-visible", "false");
}

document.querySelector(".settings-btn").addEventListener("click", (e) => {
  drawSettings();
});

// showSettingsUI();
collExpBookmarksFunc();

//modify color theme

const changeTheme = (value) => {
  const colorPickersContainer = document.querySelector(
    ".setting-menu-appearance-colorPickers"
  );
  let mode;
  console.log(value);
  if (value !== "custom") {
    switch (value) {
      case "auto":
        colorPickersContainer.setAttribute("data-visible", "false");
        if (
          window.matchMedia("(prefers-color-scheme:light)").matches === true
        ) {
          colorScheme.mode = "auto";
          colorScheme.colors = {
            background: "#fafafa",
            primary: "#d2d3db",
            secondary: "#e4e5f1",
            accent: "#9394a5",
            text: "#162635",
          };
        } else {
          colorScheme.mode = "auto";
          colorScheme.colors = {
            background: "#181818",
            primary: "#3d3d3d",
            secondary: "#212121",
            accent: "#aaaaaa",
            text: "#eae6da",
          };
        }
        break;

      case "light":
        colorPickersContainer.setAttribute("data-visible", "false");
        colorScheme.mode = "light";
        colorScheme.colors = {
          background: "#fafafa",
          primary: "#d2d3db",
          secondary: "#e4e5f1",
          accent: "#9394a5",
          text: "#162635",
        };
        break;

      case "creamy":
        colorPickersContainer.setAttribute("data-visible", "false");
        colorScheme.mode = "creamy";
        colorScheme.colors = {
          background: "#eae6da",
          primary: "#56c2c2",
          secondary: "#fbfdfd",
          accent: "#005866",
          text: "#162635",
        };
        break;

      case "dark":
        colorPickersContainer.setAttribute("data-visible", "false");
        colorScheme.mode = "dark";
        colorScheme.colors = {
          background: "#181818",
          primary: "#3d3d3d",
          secondary: "#212121",
          accent: "#aaaaaa",
          text: "#eae6da",
        };
        break;

      case "firefox":
        colorPickersContainer.setAttribute("data-visible", "false");
        colorScheme.mode = "firefox";
        colorScheme.colors = {
          background: "#2b2a33",
          primary: "#6c689c",
          secondary: "#42414d",
          accent: "#808080",
          text: "#f2f1f9",
        };
        break;

      case "midnight":
        colorPickersContainer.setAttribute("data-visible", "false");
        colorScheme.mode = "midnight";
        colorScheme.colors = {
          background: "#162635",
          primary: "#1a4a9e",
          secondary: "#243d51",
          accent: "#00ddff",
          text: "#eae6da",
        };

        break;

      default:
        break;
    }
    colorSchemeString = JSON.stringify(colorScheme);
    localStorage.setItem("ColorSheme", colorSchemeString);

    mode = `:root { --background:${colorScheme.colors.background}; --primary: ${colorScheme.colors.primary}; --secondary: ${colorScheme.colors.secondary}; --accent: ${colorScheme.colors.accent}; --text: ${colorScheme.colors.text};}`;
    styleSheet.deleteRule(mode, 0);
    styleSheet.insertRule(mode, 0);
  } else {
    colorPickersContainer.setAttribute("data-visible", "true");
    if (colorScheme.customeColors === undefined) {
      colorScheme.mode = "custom";
      colorScheme.customeColors = {
        background: colorScheme.colors.background,
        primary: colorScheme.colors.primary,
        secondary: colorScheme.colors.secondary,
        accent: colorScheme.colors.accent,
        text: colorScheme.colors.text,
      };
      colorSchemeString = JSON.stringify(colorScheme);
      localStorage.setItem("ColorSheme", colorSchemeString);
    } else {
      colorScheme.mode = "custom";
      colorSchemeString = JSON.stringify(colorScheme);
      localStorage.setItem("ColorSheme", colorSchemeString);
    }

    mode = `:root { --background:${colorScheme.customeColors.background}; --primary: ${colorScheme.customeColors.primary}; --secondary: ${colorScheme.customeColors.secondary}; --accent: ${colorScheme.customeColors.accent}; --text: ${colorScheme.customeColors.text};}`;
    styleSheet.deleteRule(mode, 0);
    styleSheet.insertRule(mode, 0);
  }
};
function changeCustomePalete(e) {
  const colorName = e.target.name;
  console.log(colorName);
  const value = e.target.value;
  console.log(value);

  document.querySelector(".backgroundColor-input").value =
    colorScheme.customeColors.background;
  document.querySelector(".primaryColor-input").value =
    colorScheme.customeColors.primary;
  document.querySelector(".secondaryColor-input").value =
    colorScheme.customeColors.secondary;
  document.querySelector(".accentColor-input").value =
    colorScheme.customeColors.accent;
  document.querySelector(".textColor-input").value =
    colorScheme.customeColors.text;
  document;

  colorScheme.customeColors[colorName] = value;

  mode = `:root { --background:${colorScheme.customeColors.background}; --primary: ${colorScheme.customeColors.primary}; --secondary: ${colorScheme.customeColors.secondary}; --accent: ${colorScheme.customeColors.accent}; --text: ${colorScheme.customeColors.text};}`;
  styleSheet.deleteRule(mode, 0);
  styleSheet.insertRule(mode, 0);
  colorSchemeString = JSON.stringify(colorScheme);
  localStorage.setItem("ColorSheme", colorSchemeString);
}
if (colorScheme.mode === "custom") {
  mode = `:root { --background:${colorScheme.customeColors.background}; --primary: ${colorScheme.customeColors.primary}; --secondary: ${colorScheme.customeColors.secondary}; --accent: ${colorScheme.customeColors.accent}; --text: ${colorScheme.customeColors.text};}`;
  styleSheet.deleteRule(mode, 0);
  styleSheet.insertRule(mode, 0);
} else if (colorScheme.mode === "auto") {
  if (window.matchMedia("(prefers-color-scheme:light)").matches === true) {
    colorScheme.colors = {
      background: "#fafafa",
      primary: "#d2d3db",
      secondary: "#e4e5f1",
      accent: "#9394a5",
      text: "#162635",
    };
  } else {
    colorScheme.colors = {
      background: "#181818",
      primary: "#3d3d3d",
      secondary: "#212121",
      accent: "#aaaaaa",
      text: "#eae6da",
    };
  }
  mode = `:root { --background:${colorScheme.colors.background}; --primary: ${colorScheme.colors.primary}; --secondary: ${colorScheme.colors.secondary}; --accent: ${colorScheme.colors.accent}; --text: ${colorScheme.colors.text};}`;
  styleSheet.deleteRule(mode, 0);
  styleSheet.insertRule(mode, 0);
} else {
  mode = `:root { --background:${colorScheme.colors.background}; --primary: ${colorScheme.colors.primary}; --secondary: ${colorScheme.colors.secondary}; --accent: ${colorScheme.colors.accent}; --text: ${colorScheme.colors.text};}`;
  styleSheet.deleteRule(mode, 0);
  styleSheet.insertRule(mode, 0);
}

//undo div

const createUndoElement = (
  type,
  array,
  arrayIndex,
  arrayElem,
  domElem,
  domParent
) => {
  // edit, deletion
  let childElem;
  if (typeof element != "undefined" && element != null) {
    const undoDiv = document.createElement("div");
    document.querySelector(".undoContainer").appendChild(undoDiv);
    childElem = undoDiv;
    const span = document.createElement("span");
    span.textContent = `Undo ${type} of ${arrayElem.name}`;
    undoDiv.appendChild(span);

    const button = document.createElement("button");
    button.classList.add("button");
    button.setAttribute("type", "button");
    button.textContent = "Undo";
    undoDiv.appendChild(button);

    const divProgers = document.createElement("div");
    divProgers.classList.add("divProgers");

    undoDiv.appendChild(divProgers);
    button.addEventListener("click", (e) => {
      if (type === "deletion") {
        domParent.insertBefore(domElem, domParent.childNodes[arrayIndex]);
        array.splice(arrayIndex, 0, arrayElem);
        let bookmarksString = JSON.stringify(bookmarks);
        localStorage.setItem("Bookmarks", bookmarksString);
        document
          .querySelector(".undoContainer")
          .removeChild(e.target.parentNode);
      } else {
      }
    });
  } else {
    const div = document.createElement("div");
    div.classList.add("undoContainer");
    document.querySelector(".main-section").appendChild(div);
    const undoDiv = document.createElement("div");
    document.querySelector(".undoContainer").appendChild(undoDiv);
    childElem = undoDiv;
    const span = document.createElement("span");
    span.textContent = `Undo ${type} of ${arrayElem.name}`;
    undoDiv.appendChild(span);

    const button = document.createElement("button");
    button.classList.add("button");
    button.setAttribute("type", "button");
    button.textContent = "Undo";
    undoDiv.appendChild(button);

    const divProgers = document.createElement("div");
    divProgers.classList.add("divProgers");

    undoDiv.appendChild(divProgers);
    button.addEventListener("click", (e) => {
      if (type === "deletion") {
        domParent.insertBefore(domElem, domParent.childNodes[arrayIndex]);
        array.splice(arrayIndex, 0, arrayElem);
        let bookmarksString = JSON.stringify(bookmarks);
        localStorage.setItem("Bookmarks", bookmarksString);
        document
          .querySelector(".undoContainer")
          .removeChild(e.target.parentNode);
      } else {
      }
    });
  }

  setTimeout(() => {
    if (document.querySelector(".undoContainer").contains(childElem)) {
      document.querySelector(".undoContainer").removeChild(childElem);
    }

    if (document.querySelector(".undoContainer") !== null) {
      if (document.querySelector(".undoContainer").childNodes.length === 0) {
        document
          .querySelector(".main-section")
          .removeChild(document.querySelector(".undoContainer"));
      }
    }
  }, 5150);
};
// edit, deletion
// createUndoElement("deletion", "Reddit");
