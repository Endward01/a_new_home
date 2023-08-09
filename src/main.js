//Check if values in localstorage Exist
if (localStorage.getItem("Setting") === null) {
  //create bookmarks template
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
  const bookmarksString = JSON.stringify(bookmarks);
  localStorage.setItem("Bookmarks", bookmarksString);
  // make theme default
  var colorScheme = {
    mode: "auto",
  };
  const colorSchemeString = JSON.stringify(colorScheme);
  localStorage.setItem("ColorSheme", colorSchemeString);
  // default settings options
  var hideMenuIcons = false;
  const hideMenuIconsString = JSON.stringify(hideMenuIcons);
  localStorage.setItem("hideMenuIcons", hideMenuIconsString);

  var hideLinkIcons = false;
  const hideLinkIconsString = JSON.stringify(hideLinkIcons);
  localStorage.setItem("hideLinkIcons", hideLinkIconsString);
  var groupFolding = false;
  const groupFoldingString = JSON.stringify(groupFolding);
  localStorage.setItem("groupFolding", groupFoldingString);

  var hideTips = false;
  const hideTipsString = JSON.stringify(hideTips);
  localStorage.setItem("hideTips", hideTipsString);
  //drag funtion
  const dragFuntion = false;
  const dragFuntionString = JSON.stringify(dragFuntion);
  localStorage.setItem("dragFuntion", dragFuntionString);
  //
  const setting = true;
  const settingString = JSON.stringify(setting);
  localStorage.setItem("Setting", settingString);
} else {
  //load bookmarks
  const bookmarksString = localStorage.getItem("Bookmarks");
  var bookmarks = JSON.parse(bookmarksString);
  //load colorSheme
  const colorSchemeString = localStorage.getItem("ColorSheme");
  var colorScheme = JSON.parse(colorSchemeString);
  //load options
  const hideMenuIconsString = localStorage.getItem("hideMenuIcons");
  var hideMenuIcons = JSON.parse(hideMenuIconsString);
  //load tips
  const hideTipsString = localStorage.getItem("hideTips");
  var hideTips = JSON.parse(hideTipsString);

  const hideLinkIconsString = localStorage.getItem("hideLinkIcons");
  var hideLinkIcons = JSON.parse(hideLinkIconsString);

  const groupFoldingString = localStorage.getItem("groupFolding");
  var groupFolding = JSON.parse(groupFoldingString);
  //drag funtion
  const dragFuntion = false;
  const dragFuntionString = JSON.stringify(dragFuntion);
  localStorage.setItem("dragFuntion", dragFuntionString);
}

const styleSheet = document.styleSheets[0];
const changeCSSStyle = (selector, rule, value) => {
  for (const key in styleSheet.cssRules) {
    if (styleSheet.cssRules[key].selectorText === selector) {
      styleSheet.cssRules[key].style[rule] = value;
    }
  }
};
// window.onload = function(){

// };

//on fully load website
addEventListener("load", (e) => {
  changeTheme(colorScheme.mode);
  const windowHeight = document.body.clientHeight;
  const sectionHeight = (windowHeight * 88) / 100;
  changeCSSStyle(".main-section-bookmarks", "height", `${sectionHeight}px`);
  drawGroup(bookmarks);
  groupFoldingFunc();
  appendIcons();
});
// on resize window
addEventListener("resize", (e) => {
  const windowHeight = document.body.clientHeight;
  const sectionHeight = (windowHeight * 88) / 100;
  changeCSSStyle(".main-section-bookmarks", "height", `${sectionHeight}px`);
});

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
  .querySelector(".main-section")
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
    popUp.style = `top:${element.pageY}px;left:${element.pageX + 10}px`;

    const elementOnMouse = document.elementFromPoint(
      element.pageX,
      element.pageY
    );
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
    // drag btn
    const dragBtn = document.createElement("a");
    dragBtn.classList.add(
      "fa-solid",
      "fa-grip-vertical",
      "contextBtn",
      "drag-btn"
    );
    // settingsBtn.textContent = "Settings";
    // settingsBtn.setAttribute("type", "button");
    const dragFuntionString = localStorage.getItem("dragFuntion");
    let dragFuntion = JSON.parse(dragFuntionString);

    if (dragFuntion) {
      dragBtn.classList.add("btnIsDisabled");
    }
    // console.log(bookmarks);

    // console.log(arrayToChange);
    const arrayToChange = [...bookmarks];

    dragBtn.addEventListener("click", (e) => {
      const mainSection = document.querySelector(".main-section");
      if (!dragFuntion) {
        mainSection.addEventListener("drag", drag);
        mainSection.addEventListener("dragstart", dragstart);

        document
          .querySelectorAll(".main-section-bookmarks-ul-li-link")
          .forEach((elem) => {
            elem.removeAttribute("href");
            elem.setAttribute("draggable", "true");
          });

        document
          .querySelectorAll(".main-section-bookmarks-group-title")
          .forEach((elem) => {
            elem.setAttribute("draggable", "true");
          });
        // changeCSSStyle(".main-section", "outline", "1px dashed var(--accent)");
        changeCSSStyle(".main-section-bookmarks-ul-li-link", "cursor", "move");
        changeCSSStyle(".main-section-bookmarks-group-title", "cursor", "move");

        dragFuntion = true;
        const dragFuntionString = JSON.stringify(dragFuntion);
        localStorage.setItem("dragFuntion", dragFuntionString);
      }

      const confirmDiv = document.createElement("div");
      confirmDiv.classList.add("dragConfirmWindow");
      mainSection.appendChild(confirmDiv);

      const btn1 = document.createElement("a");
      btn1.classList.add("button");
      btn1.textContent = "Confirm";
      // confirmDiv.appendChild(btn1);
      const pConfirm = document.createElement("p");
      pConfirm.textContent = "Save Changes";
      confirmDiv.appendChild(btn1);
      btn1.appendChild(pConfirm);

      const btn2 = document.createElement("a");
      btn2.classList.add("button");
      btn2.textContent = "Cancel";
      const pCancel = document.createElement("p");
      pCancel.textContent = "Discard Changes";
      confirmDiv.appendChild(btn2);
      btn2.appendChild(pCancel);

      btn1.addEventListener("click", (e) => {
        const bookmarksString = JSON.stringify(arrayToChange);
        localStorage.setItem("Bookmarks", bookmarksString);

        mainSection.removeEventListener("drag", drag);
        mainSection.removeEventListener("dragstart", dragstart);

        // changeCSSStyle(".main-section", "outline", "");
        changeCSSStyle(".main-section-bookmarks-ul-li-link", "cursor", "");
        changeCSSStyle(".main-section-bookmarks-group-title", "cursor", "");

        dragFuntion = false;
        const dragFuntionString = JSON.stringify(dragFuntion);
        localStorage.setItem("dragFuntion", dragFuntionString);

        while (document.querySelector(".main-section-bookmarks").firstChild) {
          document
            .querySelector(".main-section-bookmarks")
            .removeChild(
              document.querySelector(".main-section-bookmarks").firstChild
            );
        }

        if (document.querySelector(".dragConfirmWindow") !== null) {
          document
            .querySelector(".main-section")
            .removeChild(document.querySelector(".dragConfirmWindow"));
        }
        drawGroup(bookmarks);
        groupFoldingFunc();
        appendIcons();
      });

      btn2.addEventListener("click", (e) => {
        mainSection.removeEventListener("drag", drag);
        mainSection.removeEventListener("dragstart", dragstart);

        // changeCSSStyle(".main-section", "outline", "");
        changeCSSStyle(".main-section-bookmarks-ul-li-link", "cursor", "");
        changeCSSStyle(".main-section-bookmarks-group-title", "cursor", "");

        dragFuntion = false;
        const dragFuntionString = JSON.stringify(dragFuntion);
        localStorage.setItem("dragFuntion", dragFuntionString);

        while (document.querySelector(".main-section-bookmarks").firstChild) {
          document
            .querySelector(".main-section-bookmarks")
            .removeChild(
              document.querySelector(".main-section-bookmarks").firstChild
            );
        }

        if (document.querySelector(".dragConfirmWindow") !== null) {
          document
            .querySelector(".main-section")
            .removeChild(document.querySelector(".dragConfirmWindow"));
        }
        const bookmarksString = localStorage.getItem("Bookmarks");
        const bookmarksArray = JSON.parse(bookmarksString);
        drawGroup(bookmarksArray);
        groupFoldingFunc();
        appendIcons();
      });

      document.body.addEventListener("keyup", function (e) {
        if (e.key == "Escape") {
          mainSection.removeEventListener("drag", drag);
          mainSection.removeEventListener("dragstart", dragstart);

          // changeCSSStyle(".main-section", "outline", "");
          changeCSSStyle(".main-section-bookmarks-ul-li-link", "cursor", "");
          changeCSSStyle(".main-section-bookmarks-group-title", "cursor", "");

          dragFuntion = false;
          const dragFuntionString = JSON.stringify(dragFuntion);
          localStorage.setItem("dragFuntion", dragFuntionString);

          while (document.querySelector(".main-section-bookmarks").firstChild) {
            document
              .querySelector(".main-section-bookmarks")
              .removeChild(
                document.querySelector(".main-section-bookmarks").firstChild
              );
          }

          if (document.querySelector(".dragConfirmWindow") !== null) {
            document
              .querySelector(".main-section")
              .removeChild(document.querySelector(".dragConfirmWindow"));
          }
          const bookmarksString = localStorage.getItem("Bookmarks");
          const bookmarksArray = JSON.parse(bookmarksString);
          drawGroup(bookmarksArray);
          appendIcons();
        }
      });
    });
    topBtnDiv.appendChild(dragBtn);

    // refresh btn
    const refreshBtn = document.createElement("a");
    refreshBtn.classList.add(
      "fa-solid",
      "fa-rotate-right",
      "contextBtn",
      "refresh-btn"
    );
    // settingsBtn.textContent = "Settings";
    // settingsBtn.setAttribute("type", "button");
    topBtnDiv.appendChild(refreshBtn);
    refreshBtn.addEventListener("click", (e) => {
      window.location.reload();
    });

    // title name
    if (elementOnMouse.nodeName === "A") {
      const line1 = document.createElement("div");
      line1.classList.add("line");
      popUp.appendChild(line1);
      const p = document.createElement("p");
      p.textContent = elementOnMouse.textContent;
      popUp.appendChild(p);
      const line = document.createElement("div");
      line.classList.add("line");
      popUp.appendChild(line);
    } else if (elementOnMouse.nodeName === "H2") {
      const line1 = document.createElement("div");
      line1.classList.add("line");
      popUp.appendChild(line1);
      const p = document.createElement("p");
      p.textContent = elementOnMouse.textContent;
      popUp.appendChild(p);
      const line = document.createElement("div");
      line.classList.add("line");
      popUp.appendChild(line);
    }
    //edit / delete btn
    if (elementOnMouse.tagName === "A") {
      const editBtn = document.createElement("a");
      editBtn.classList.add("contextBtn", "edit-btn");
      editBtn.textContent = "Edit Link";
      popUp.appendChild(editBtn);
      const deleteBtn = document.createElement("a");
      deleteBtn.classList.add("contextBtn", "delete-btn");
      deleteBtn.textContent = "Delete Link";
      popUp.appendChild(deleteBtn);
      // const line = document.createElement("div");
      // line.classList.add("line");
      // popUp.appendChild(line);
    } else if (elementOnMouse.tagName === "H2") {
      const editBtn = document.createElement("a");
      editBtn.classList.add("contextBtn", "edit-btn");
      editBtn.textContent = "Edit Group";
      popUp.appendChild(editBtn);
      const deleteBtn = document.createElement("a");
      deleteBtn.classList.add("contextBtn", "delete-btn");
      deleteBtn.textContent = "Delete Group";
      popUp.appendChild(deleteBtn);
      // const line = document.createElement("div");
      // line.classList.add("line");
      // popUp.appendChild(line);
    }
    if (document.querySelector(".delete-btn") !== null) {
      deleteBtnLogic(elementOnMouse);
      editBtnLogic(elementOnMouse);
    }

    document
      .querySelectorAll(".contextTopBtnDiv a.contextBtn")
      .forEach((elem) => {
        elem.addEventListener("click", (e) => {
          if (document.querySelector(".rmb-popup") !== null) {
            if (document.querySelector(".rmb-popup").parentNode) {
              document
                .querySelector(".rmb-popup")
                .parentNode.removeChild(document.querySelector(".rmb-popup"));
            }
          }
        });
      });

    let elementToMove,
      positionToMove,
      arrayElementToMove,
      indexOfElementToMove,
      indexOfGroupToMove,
      indexOfColumnToMove,
      positionY,
      parentToInsert,
      position;

    function dragover(e) {
      e.preventDefault();
      if (elementToMove.nodeName === "DIV") {
        if (e.target !== elementToMove) {
          let parent, element;
          if (e.target.hasChildNodes()) {
            if (e.target.className === "main-section-bookmarks-ul-li-link") {
              element = e.target.parentNode.parentNode.parentNode;
              parent = e.target.parentNode.parentNode.parentNode.parentNode;
              let rect = element.getBoundingClientRect();
              positionY = e.clientY - rect.top;
              if (positionY <= rect.height / 2) {
                if (element !== undefined) {
                  parent.insertBefore(elementToMove, element);
                }
              } else {
                if (element !== undefined) {
                  parent.insertBefore(elementToMove, element.nextSibling);
                }
              }
            }
          } else {
            if (e.target.nodeName !== "IMG") {
              e.target.appendChild(elementToMove);
            }
          }
        }
      } else if (elementToMove.nodeName === "LI") {
        if (e.target !== elementToMove) {
          let groupIsEmpty;
          let emptyGroup;

          if (!e.target.hasChildNodes()) {
            groupIsEmpty = !e.target.hasChildNodes();
            emptyGroup = e.target;
          }

          if (!groupIsEmpty) {
            if (e.target.className === "main-section-bookmarks-ul-li-link") {
              let rect = e.target.getBoundingClientRect();
              positionY = e.clientY - rect.top;

              if (positionY <= rect.height / 2) {
                if (
                  e.target.className === "main-section-bookmarks-ul-li-link"
                ) {
                  if (e.target.parentNode !== undefined) {
                    e.target.parentNode.parentNode.insertBefore(
                      elementToMove,
                      e.target.parentNode
                    );
                  }
                }
              } else {
                if (
                  e.target.className === "main-section-bookmarks-ul-li-link"
                ) {
                  if (e.target.parentNode !== undefined) {
                    e.target.parentNode.parentNode.insertBefore(
                      elementToMove,
                      e.target.parentNode.nextSibling
                    );
                  }
                }
              }
            }
          } else {
            if (emptyGroup.nodeName !== "IMG") {
              if (emptyGroup.className !== "main-section-column") {
                emptyGroup.appendChild(elementToMove);
              }
            }
          }
        }
      }
    }

    function drop(e) {
      e.preventDefault();

      elementToMove.classList.remove("dragging");
      if (elementToMove.nodeName === "DIV") {
        const newGroupIndex = Array.prototype.indexOf.call(
          elementToMove.parentNode.childNodes,
          elementToMove
        );
        const newColumnIndex = Array.prototype.indexOf.call(
          elementToMove.parentNode.parentNode.children,
          elementToMove.parentNode
        );

        arrayToChange[indexOfColumnToMove].groups.splice(
          indexOfElementToMove,
          1
        );

        arrayToChange[newColumnIndex].groups.splice(
          newGroupIndex,
          0,
          arrayElementToMove
        );

        document.querySelectorAll(".main-section-column").forEach((element) => {
          element.removeEventListener("dragover", dragover);
          element.removeEventListener("drop", drop);
        });
        document
          .querySelectorAll(".main-section-column")
          .forEach((element) => element.classList.remove("dragOverList"));
      } else if (elementToMove.nodeName === "LI") {
        const newElementIndex = Array.prototype.indexOf.call(
          elementToMove.parentNode.childNodes,
          elementToMove
        );
        const newGroupIndex = Array.prototype.indexOf.call(
          elementToMove.parentNode.parentNode.parentNode.childNodes,
          elementToMove.parentNode.parentNode
        );
        const newColumnIndex = Array.prototype.indexOf.call(
          elementToMove.parentNode.parentNode.parentNode.parentNode.children,
          elementToMove.parentNode.parentNode.parentNode
        );

        arrayToChange[indexOfColumnToMove].groups[
          indexOfGroupToMove
        ].bookmark.splice(indexOfElementToMove, 1);

        arrayToChange[newColumnIndex].groups[newGroupIndex].bookmark.splice(
          newElementIndex,
          0,
          arrayElementToMove
        );

        document
          .querySelectorAll(".main-section-bookmarks-ul")
          .forEach((element) => {
            element.removeEventListener("dragover", dragover);
            element.removeEventListener("drop", drop);
          });
        document
          .querySelectorAll(".main-section-bookmarks-ul")
          .forEach((element) => element.classList.remove("dragOverList"));
      }
    }

    function drag(e) {
      e.dataTransfer.setDragImage(e.target, e.outerWidth, e.outerHeight);
      if (e.target.nodeName === "H2") {
        elementToMove = e.target.parentNode.parentNode;
        elementToMove.classList.add("dragging");
        bookmarks.forEach((column) => {
          column.groups.forEach((group) => {
            if (group.groupName === e.target.textContent) {
              indexOfColumnToMove = bookmarks.indexOf(column);
              indexOfElementToMove = column.groups.indexOf(group);
              arrayElementToMove =
                bookmarks[indexOfColumnToMove].groups[indexOfElementToMove];
              groupOfElementToMove = bookmarks[indexOfColumnToMove];
            }
          });
        });
        document.querySelectorAll(".main-section-column").forEach((element) => {
          element.addEventListener("dragover", dragover, true);
          element.addEventListener("drop", drop, true);
        });
        document
          .querySelectorAll(".main-section-column")
          .forEach((element) => element.classList.add("dragOverList"));
      } else if (e.target.nodeName === "A") {
        elementToMove = e.target.parentNode;
        elementToMove.classList.add("dragging");
        bookmarks.forEach((column) => {
          column.groups.forEach((group) => {
            group.bookmark.forEach((bookamrk) => {
              if (bookamrk.name === e.target.textContent) {
                indexOfColumnToMove = bookmarks.indexOf(column);
                indexOfGroupToMove = column.groups.indexOf(group);
                indexOfElementToMove = group.bookmark.indexOf(bookamrk);
                arrayElementToMove =
                  bookmarks[indexOfColumnToMove].groups[indexOfGroupToMove]
                    .bookmark[indexOfElementToMove];

                groupOfElementToMove =
                  bookmarks[indexOfColumnToMove].groups[indexOfGroupToMove];
              }
            });
          });
        });
        document
          .querySelectorAll(".main-section-bookmarks-ul")
          .forEach((element) => {
            element.addEventListener("dragover", dragover);
            element.addEventListener("drop", drop);
          });
        document
          .querySelectorAll(".main-section-bookmarks-ul")
          .forEach((element) => element.classList.add("dragOverList"));
      }
    }

    function dragstart(e) {
      e.dataTransfer.setDragImage(
        e.target,
        window.outerWidth,
        window.outerHeight
      );
    }
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
    drawGroup(bookmarks);
    appendIcons();
    // collExpBookmarksFunc();
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
      imgIcon.setAttribute("loading", "lazy");
      imgIcon.setAttribute("height", 16);
      imgIcon.setAttribute("width", 16);
      imgIcon.setAttribute(
        "src",
        `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${link.href}`
      );
      link.appendChild(imgIcon);
    });
  }
};

//Draw bookmarks from localstorage to body
const drawGroup = (array, name, url, newGroup) => {
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
        // divFirst.setAttribute("data-collapsed", "false");
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
        if (groupFolding) {
          ul.setAttribute("data-folded", element.folded);
        } else {
          ul.setAttribute("data-folded", "false");
        }
        divFirst.appendChild(ul);
        drawLink(element, ul);
      });
    });
  } else {
    const sectionCollumn = document.querySelectorAll(".main-section-column");
    const divFirst = document.createElement("div");
    divFirst.classList.add("main-section-bookmarks-group");
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
    ul.setAttribute("data-folded", "false");
    divFirst.appendChild(ul);
    drawLink(null, ul, name, url);
  }
};

const drawLink = (array, parent, name, url) => {
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
      a.setAttribute("draggable", "false");
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
    a.setAttribute("draggable", "false");
    li.appendChild(a);
  }
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

//groups folding finction

function foldUnfoldFunction(e) {
  const groupToFold = e.target.parentNode.parentNode.childNodes[1];
  if (groupToFold.getAttribute("data-folded") !== "true") {
    groupToFold.setAttribute("data-folded", "true");
    const nameOfGroupToFold = e.target.parentNode.childNodes[0].textContent;
    bookmarks.forEach((column) => {
      column.groups.forEach((group) => {
        if (group.groupName === nameOfGroupToFold) {
          group.folded = true;
          let bookmarksString = JSON.stringify(bookmarks);
          localStorage.setItem("Bookmarks", bookmarksString);
        }
      });
    });
  } else {
    groupToFold.setAttribute("data-folded", "false");
    const nameOfGroupToUnfold = e.target.parentNode.childNodes[0].textContent;
    bookmarks.forEach((column) => {
      column.groups.forEach((group) => {
        if (group.groupName === nameOfGroupToUnfold) {
          group.folded = false;
          let bookmarksString = JSON.stringify(bookmarks);
          localStorage.setItem("Bookmarks", bookmarksString);
        }
      });
    });
  }
}

function groupFoldingFunc() {
  const groupElem = document.querySelectorAll(
    ".main-section-bookmarks-group-div"
  );
  const elementToFold = document.querySelectorAll(".main-section-bookmarks-ul");
  if (groupFolding) {
    groupElem.forEach((group) => {
      if (group.getAttribute("listener") !== "true") {
        group.setAttribute("listener", "true");
        group.addEventListener("click", foldUnfoldFunction);
      }
    });

    changeCSSStyle(
      ".main-section-bookmarks-group-div:hover::before",
      "display",
      "block"
    );

    elementToFold.forEach((element) => {
      bookmarks.forEach((column) => {
        column.groups.forEach((group) => {
          if (
            group.groupName ===
            element.parentNode.childNodes[0].childNodes[0].textContent
          ) {
            element.setAttribute("data-folded", group.folded);
          }
        });
      });
    });
  } else {
    groupElem.forEach((group) => {
      if (group.getAttribute("listener") === "true") {
        group.removeAttribute("listener");
        group.removeEventListener("click", foldUnfoldFunction);
      }
    });

    changeCSSStyle(
      ".main-section-bookmarks-group-div:hover::before",
      "display",
      "none"
    );

    elementToFold.forEach((element) => {
      bookmarks.forEach((column) => {
        column.groups.forEach((group) => {
          if (
            group.groupName ===
            element.parentNode.childNodes[0].childNodes[0].textContent
          ) {
            element.setAttribute("data-folded", "false");
          }
        });
      });
    });
  }
}

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
  // div.addEventListener(
  //   "mouseup",
  //   (e) => {
  //     if (e.target.className === "addBookmark") {
  //       document.body.removeEventListener("keyup", closeWindowKey);

  //       document
  //         .querySelector(".main-section")
  //         .removeChild(document.querySelector(".addBookmark"));
  //     }
  //   },
  //   true
  // );
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
  const addItem = () => {
    const name = inputName.value;
    let url;
    const groupName = selectToGroup.value;
    const newGroupName = inputNewGroup.value;
    let regex = /https:\/[\s\S]*/i;

    if (!regex.test(inputUrl.value)) {
      url = `https://${inputUrl.value}`;
    } else {
      url = inputUrl.value;
    }

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

      drawLink(null, parentNodeToAppend, name, url);
    } else {
      const newBookmark = {
        groupName: newGroupName,
        folded: false,
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
      drawGroup(null, name, url, newGroupName);
      // appendIcons();
    }
    closeWindow();
  };

  addBtn.addEventListener("click", function () {
    addItem();
  });
  document.body.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
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
          addItem();
        }
      } else {
        if (name === "" || url === "" || newGroup == "") {
          addBtn.setAttribute("disabled", "true");
          addBtn.classList.add("btnIsDisabled");
        } else {
          addBtn.removeAttribute("disabled", "true");
          addBtn.classList.remove("btnIsDisabled");
          addItem();
        }
      }
    }
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

      const domParent = element.parentNode.parentNode.parentNode;
      const domElement = element.parentNode.parentNode;

      if (domParent) {
        domParent.removeChild(domElement);
      }
      const name = element.textContent;
      const array = bookmarks;

      bookmarks.forEach((column) => {
        column.groups.forEach((group) => {
          if (group.groupName === name) {
            const index = column.groups.indexOf(group);
            if (index > -1) {
              column.groups.splice(index, 1);
            }
            createUndoElement(
              column.groups,
              index,
              group,
              domElement,
              domParent
            );

            let bookmarksString = JSON.stringify(bookmarks);
            localStorage.setItem("Bookmarks", bookmarksString);
          }
        });
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
        let newUrl;
        let regex = /https:\/[\s\S]*/i;

        if (!regex.test(document.querySelector(".editInpUrl").value)) {
          newUrl = `https://${document.querySelector(".editInpUrl").value}`;
        } else {
          newUrl = document.querySelector(".editInpUrl").value;
        }
        element.textContent = document.querySelector(".editInpName").value;
        element.href = newUrl;

        bookmarks.forEach((column) => {
          column.groups.forEach((group) => {
            group.bookmark.forEach((bookamrk) => {
              if (bookamrk.name === name) {
                bookamrk.name = document.querySelector(".editInpName").value;
                bookamrk.url = newUrl;

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
      // document.querySelector(".editDiv").addEventListener(
      //   "mouseup",
      //   (e) => {
      //     if (e.target.className === "editDiv") {
      //       document.body.removeEventListener("keyup", closeWindowKey);

      //       document
      //         .querySelector(".main-section")
      //         .removeChild(document.querySelector(".editDiv"));
      //     }
      //   },
      //   true
      // );
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

  const divNav = document.createElement("div");
  divNav.classList.add("main-section-navbar");
  divMenu.appendChild(divNav);

  const h1 = document.createElement("h1");
  h1.textContent = "Settings";
  divNav.appendChild(h1);

  const closeBtn = document.createElement("a");
  closeBtn.classList.add("fa-solid", "fa-xmark");
  divNav.appendChild(closeBtn);

  const divOption = document.createElement("div");
  divOption.classList.add("settings-options");
  divMenu.appendChild(divOption);

  const leftColumn = () => {
    const leftDiv = document.createElement("div");
    leftDiv.classList.add("leftSettings");
    divOption.appendChild(leftDiv);

    //apperance
    const divAppe = document.createElement("div");
    divAppe.classList.add("setting-menu-appearance");
    leftDiv.appendChild(divAppe);
    const h2Appe = document.createElement("h2");
    h2Appe.textContent = "Apperance";
    divAppe.appendChild(h2Appe);
    const colorLabel = document.createElement("label");
    colorLabel.textContent = "Color Theme";
    divAppe.appendChild(colorLabel);

    const divTheme = document.createElement("div");
    divTheme.classList.add("setting-menu-appearance-theme");
    colorLabel.appendChild(divTheme);
    const selectTheme = document.createElement("select");
    selectTheme.classList.add(
      "etting-menu-appearance-selectColorTheme",
      "input"
    );
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
        value: "chocolate",
        name: "White Chocolate",
      },
      {
        value: "flamingo",
        name: "Rosy Flamingo",
      },
      {
        value: "firefox",
        name: "Firefox Inspired",
      },
      {
        value: "midnight",
        name: "Midnight",
      },
      {
        value: "jetblack",
        name: "JetBlack",
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
    });

    const divAppeSett = document.createElement("div");
    divAppeSett.classList.add("setting-menu-appearance-settings");
    divAppe.appendChild(divAppeSett);
    const labelMenuIco = document.createElement("label");
    labelMenuIco.textContent = "Hide action buttons in navbar";
    divAppeSett.appendChild(labelMenuIco);
    const inputMenuIco = document.createElement("input");
    inputMenuIco.setAttribute("type", "checkbox");
    inputMenuIco.setAttribute("autocomplete", "off");
    inputMenuIco.classList.add("hideMenuBtnCheckBox", "settingInput");
    labelMenuIco.appendChild(inputMenuIco);

    const labelLinkIco = document.createElement("label");
    labelLinkIco.textContent = "Hide website icons";
    divAppeSett.appendChild(labelLinkIco);
    const inputLinkIco = document.createElement("input");
    inputLinkIco.setAttribute("type", "checkbox");
    inputLinkIco.setAttribute("autocomplete", "off");
    inputLinkIco.classList.add("hideLinkIconCheckbox", "settingInput");
    labelLinkIco.appendChild(inputLinkIco);

    const labelTips = document.createElement("label");
    labelTips.textContent = "Hide Tips In the footer";
    divAppeSett.appendChild(labelTips);
    const inputTips = document.createElement("input");
    inputTips.setAttribute("type", "checkbox");
    inputTips.setAttribute("autocomplete", "off");
    inputTips.classList.add("hideTipsCheckbox", "settingInput");
    labelTips.appendChild(inputTips);

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
      drawGroup(bookmarks);
      appendIcons();
    });

    if (hideTips === true) {
      inputTips.click();
    }
    inputTips.addEventListener("input", (e) => {
      hideTips = e.target.checked;
      const hideTipsString = JSON.stringify(hideTips);
      localStorage.setItem("hideTips", hideTipsString);

      if (!hideTips) {
        movingTextFooter();
      } else {
        document
          .querySelector(".main-footer")
          .removeChild(document.querySelector(".main-footer-conteiner"));
      }
    });
    //

    // change color theme

    const customColorChange = (e) => {
      const colorName = e.target.name;
      const value = e.target.value;
      colorScheme.customColors[colorName] = value;
      colorSchemeString = JSON.stringify(colorScheme);
      localStorage.setItem("ColorSheme", colorSchemeString);
      const mode = `:root { --background:${colorScheme.customColors.background}; --primary: ${colorScheme.customColors.primary}; --secondary: ${colorScheme.customColors.secondary}; --accent: ${colorScheme.customColors.accent}; --text: ${colorScheme.customColors.text};}`;

      styleSheet.deleteRule(mode, 0);
      styleSheet.insertRule(mode, 0);
    };

    if (colorScheme.mode === "custom") {
      divColorPickers.setAttribute("data-visible", "true");
      document.querySelector(".backgroundColor-input").value =
        colorScheme.customColors.background;
      document.querySelector(".primaryColor-input").value =
        colorScheme.customColors.primary;
      document.querySelector(".secondaryColor-input").value =
        colorScheme.customColors.secondary;
      document.querySelector(".accentColor-input").value =
        colorScheme.customColors.accent;
      document.querySelector(".textColor-input").value =
        colorScheme.customColors.text;

      document
        .querySelectorAll(".setting-menu-appearance-colorPickers input")
        .forEach((element) => {
          element.addEventListener("input", customColorChange);
        });
    } else {
      divColorPickers.setAttribute("data-visible", "false");
    }

    selectTheme.value = colorScheme.mode;
    selectTheme.addEventListener("input", () => {
      changeTheme(selectTheme.value);
      if (selectTheme.value === "custom") {
        divColorPickers.setAttribute("data-visible", "true");
        document.querySelector(".backgroundColor-input").value =
          colorScheme.customColors.background;
        document.querySelector(".primaryColor-input").value =
          colorScheme.customColors.primary;
        document.querySelector(".secondaryColor-input").value =
          colorScheme.customColors.secondary;
        document.querySelector(".accentColor-input").value =
          colorScheme.customColors.accent;
        document.querySelector(".textColor-input").value =
          colorScheme.customColors.text;

        document
          .querySelectorAll(".setting-menu-appearance-colorPickers input")
          .forEach((element) => {
            element.addEventListener("input", customColorChange);
          });
      } else {
        divColorPickers.setAttribute("data-visible", "false");
      }
    });
    // select

    //features
    const divFeatures = document.createElement("div");
    divFeatures.classList.add("setting-menu-features");
    leftDiv.appendChild(divFeatures);
    const h2divFeatures = document.createElement("h2");
    h2divFeatures.textContent = "Features";
    divFeatures.appendChild(h2divFeatures);

    const divFold = document.createElement("div");
    divFeatures.appendChild(divFold);

    const labelFold = document.createElement("label");
    labelFold.textContent = "Group folding";
    divFold.appendChild(labelFold);
    const inputFold = document.createElement("input");
    inputFold.setAttribute("type", "checkbox");
    inputFold.setAttribute("autocomplete", "off");
    inputFold.classList.add("toggleGroupFolding", "settingInput");
    labelFold.appendChild(inputFold);
    const pFold = document.createElement("p");
    pFold.textContent =
      "Clicking on a group header will hide/show the links in that group.";
    divFold.appendChild(pFold);

    //toggle group folding function
    if (groupFolding === true) {
      inputFold.click();
    }
    inputFold.addEventListener("input", (e) => {
      if (e.target.checked === true) {
        groupFolding = true;
      } else {
        groupFolding = false;
      }
      let groupFoldingString = JSON.stringify(groupFolding);
      localStorage.setItem("groupFolding", groupFoldingString);
      groupFoldingFunc();
    });
  };
  const rightColumn = () => {
    const rightDiv = document.createElement("div");
    rightDiv.classList.add("rightSettings");

    divOption.appendChild(rightDiv);

    // Homepage Url
    const divTab = document.createElement("div");
    divTab.classList.add("settings-menu-newTab");
    rightDiv.appendChild(divTab);

    const h2Tab = document.createElement("h2");
    h2Tab.textContent = "Setup your homepage URL";
    divTab.appendChild(h2Tab);

    const divTabCont = document.createElement("div");
    divTabCont.classList.add("settings-menu-newTab-content");
    divTab.appendChild(divTabCont);
    const pTabCont = document.createElement("p");
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
    btnTabCont.addEventListener("click", (e) => {
      inputTabCont.select();
      inputTabCont.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(inputTabCont.value);
    });

    //Import Export

    const divImpExp = document.createElement("div");
    divImpExp.classList.add("settings-menu-importExport");

    rightDiv.appendChild(divImpExp);
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
            while (
              document.querySelector(".main-section-bookmarks").firstChild
            ) {
              document
                .querySelector(".main-section-bookmarks")
                .removeChild(
                  document.querySelector(".main-section-bookmarks").firstChild
                );
            }
            bookmarksString = localStorage.getItem("Bookmarks");
            bookmarks = JSON.parse(bookmarksString);

            drawGroup(bookmarks);
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
        btn1.setAttribute("type", "button");
        btn1.classList.add("button", "cpybtn");
        btn1.value = "Copy Code";
        btnDiv.appendChild(btn1);
        const btn2 = document.createElement("input");
        btn2.setAttribute("type", "button");

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
  };
  leftColumn();
  rightColumn();

  //bottom links

  const divLinks = document.createElement("div");
  divLinks.classList.add("settings-links");
  divMain.appendChild(divLinks);
  const a1 = document.createElement("a");
  a1.setAttribute(
    "href",
    "https://github.com/Endward01/a_new_home/issues/new/choose"
  );
  a1.setAttribute("target", "_blank");
  a1.classList.add("fa-solid", "fa-bug");
  const span1 = document.createElement("span");
  span1.textContent = "@Report";

  divLinks.appendChild(a1);
  a1.appendChild(span1);

  const a2 = document.createElement("a");
  a2.setAttribute("href", "https://github.com/Endward01/a_new_home");
  a2.setAttribute("target", "_blank");
  a2.classList.add("fa-brands", "fa-github");
  const span2 = document.createElement("span");
  span2.textContent = "@Github";

  divLinks.appendChild(a2);
  a2.appendChild(span2);

  const a3 = document.createElement("a");
  a3.setAttribute("href", "mailto:kontakt.dpretki@gmail.com");
  a3.setAttribute("target", "_blank");
  a3.classList.add("fa-solid", "fa-message");
  const span3 = document.createElement("span");
  span3.textContent = "@Mail";

  divLinks.appendChild(a3);
  a3.appendChild(span3);

  // close window
  const closeWindow = () => {
    // document.body.removeEventListener("keyup", closeWindowKey);

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
  closeBtn.addEventListener("click", closeWindow);
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

//modify color theme

const changeTheme = (value) => {
  switch (value) {
    case "auto":
      // colorPickersContainer.setAttribute("data-visible", "false");
      if (window.matchMedia("(prefers-color-scheme:light)").matches === true) {
        //light
        colorScheme.mode = "auto";
        colorScheme.colors = {
          background: "#ffffff",
          primary: "#d6d6d7",
          secondary: "#e3e5e8",
          accent: "#6f7071",
          text: "#0f0f0f",
        };
      } else {
        //dark
        colorScheme.mode = "auto";
        colorScheme.colors = {
          background: "#313338",
          primary: "#1e1f22",
          secondary: "#3b3b44",
          accent: "#82858c",
          text: "#f7f7f8",
        };
      }
      break;

    case "light":
      // colorPickersContainer.setAttribute("data-visible", "false");
      colorScheme.mode = "light";
      colorScheme.colors = {
        background: "#ffffff",
        primary: "#d6d6d7",
        secondary: "#e3e5e8",
        accent: "#6f7071",
        text: "#0f0f0f",
      };
      break;

    case "chocolate":
      // colorPickersContainer.setAttribute("data-visible", "false");
      colorScheme.mode = "chocolate";
      colorScheme.colors = {
        background: "#eae6da",
        primary: "#dfd0a5",
        secondary: "#f0ead6",
        accent: "#b89a42",
        text: "#131007",
      };
      break;

    case "flamingo":
      // colorPickersContainer.setAttribute("data-visible", "false");
      colorScheme.mode = "flamingo";
      colorScheme.colors = {
        background: "#eed6d3",
        primary: "#c9786e",
        secondary: "#e5bdb8",
        accent: "#df8181",
        text: "#0b0504",
      };
      break;

    case "dark":
      // colorPickersContainer.setAttribute("data-visible", "false");
      colorScheme.mode = "dark";
      colorScheme.colors = {
        background: "#313338",
        primary: "#1e1f22",
        secondary: "#3b3b44",
        accent: "#82858c",
        text: "#f7f7f8",
      };
      break;

    case "firefox":
      // colorPickersContainer.setAttribute("data-visible", "false");
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
      // colorPickersContainer.setAttribute("data-visible", "false");
      colorScheme.mode = "midnight";
      colorScheme.colors = {
        background: "#162635",
        primary: "#1a4a9e",
        secondary: "#243d51",
        accent: "#00ddff",
        text: "#eae6da",
      };
      break;

    case "jetblack":
      // colorPickersContainer.setAttribute("data-visible", "false");
      colorScheme.mode = "jetblack";
      colorScheme.colors = {
        background: "#181818",
        primary: "#3d3d3d",
        secondary: "#212121",
        accent: "#aaaaaa",
        text: "#eae6da",
      };
      break;

    case "custom":
      // colorPickersContainer.setAttribute("data-visible", "true");
      colorScheme.mode = "custom";
      if (colorScheme.customColors === undefined) {
        if (
          window.matchMedia("(prefers-color-scheme:light)").matches === true
        ) {
          //light
          colorScheme.customColors = {
            background: "#ffffff",
            primary: "#d6d6d7",
            secondary: "#e3e5e8",
            accent: "#6f7071",
            text: "#0f0f0f",
          };
        } else {
          //dark
          colorScheme.customColors = {
            background: "#313338",
            primary: "#1e1f22",
            secondary: "#3b3b44",
            accent: "#82858c",
            text: "#f7f7f8",
          };
        }
        colorSchemeString = JSON.stringify(colorScheme);
        localStorage.setItem("ColorSheme", colorSchemeString);
      }
      break;

    default:
      break;
  }

  colorSchemeString = JSON.stringify(colorScheme);
  localStorage.setItem("ColorSheme", colorSchemeString);

  let mode;
  if (colorScheme.mode === "custom") {
    mode = `:root { --background:${colorScheme.customColors.background}; --primary: ${colorScheme.customColors.primary}; --secondary: ${colorScheme.customColors.secondary}; --accent: ${colorScheme.customColors.accent}; --text: ${colorScheme.customColors.text};}`;
  } else {
    mode = `:root { --background:${colorScheme.colors.background}; --primary: ${colorScheme.colors.primary}; --secondary: ${colorScheme.colors.secondary}; --accent: ${colorScheme.colors.accent}; --text: ${colorScheme.colors.text};}`;
  }

  styleSheet.deleteRule(mode, 0);
  styleSheet.insertRule(mode, 0);
};

//undo funtion
const createUndoElement = (
  array,
  arrayIndex,
  arrayElem,
  domElem,
  domParent
) => {
  // edit, deletion
  let childElem;
  let nameElem;
  if (arrayElem.name !== undefined) {
    nameElem = arrayElem.name;
  } else {
    nameElem = arrayElem.groupName;
  }
  if (typeof element != "undefined" && element != null) {
    const undoDiv = document.createElement("div");
    document.querySelector(".undoContainer").appendChild(undoDiv);
    childElem = undoDiv;
    const span = document.createElement("span");
    span.textContent = `${nameElem} has been deleted`;
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
      domParent.insertBefore(domElem, domParent.childNodes[arrayIndex]);
      array.splice(arrayIndex, 0, arrayElem);
      let bookmarksString = JSON.stringify(bookmarks);
      localStorage.setItem("Bookmarks", bookmarksString);
      document.querySelector(".undoContainer").removeChild(e.target.parentNode);
    });
  } else {
    const div = document.createElement("div");
    div.classList.add("undoContainer");
    document.querySelector(".main-section").appendChild(div);
    const undoDiv = document.createElement("div");
    document.querySelector(".undoContainer").appendChild(undoDiv);
    childElem = undoDiv;
    const span = document.createElement("span");
    span.textContent = `${nameElem} has been deleted`;
    undoDiv.appendChild(span);

    const button = document.createElement("a");
    button.classList.add("contextBtn", "fa-solid", "fa-rotate-left");
    // button.setAttribute("type", "button");
    // button.textContent = "Undo";
    undoDiv.appendChild(button);

    const divProgers = document.createElement("div");
    divProgers.classList.add("divProgers");

    undoDiv.appendChild(divProgers);
    button.addEventListener("click", (e) => {
      domParent.insertBefore(domElem, domParent.childNodes[arrayIndex]);
      array.splice(arrayIndex, 0, arrayElem);
      let bookmarksString = JSON.stringify(bookmarks);
      localStorage.setItem("Bookmarks", bookmarksString);
      document.querySelector(".undoContainer").removeChild(e.target.parentNode);
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
  }, 5050);
};

//footer moving text

const movingTextFooter = () => {
  // const funnyMessages = [
  //   "Reticulating splines...",
  //   "Generating witty dialog...",
  //   "Swapping time and space...",
  //   "Spinning violently around the y-axis...",
  //   "Tokenizing real life...",
  //   "Bending the spoon...",
  //   "Filtering morale...",
  //   "Don't think of purple hippos...",
  //   "We need a new fuse...",
  //   "Have a good day.",
  //   "Upgrading Windows, your PC will restart several times. Sit back and relax.",
  //   "640K ought to be enough for anybody",
  //   "The architects are still drafting",
  //   "The bits are breeding",
  //   "We're building the buildings as fast as we can",
  //   "Would you prefer chicken, steak, or tofu?",
  //   "(Pay no attention to the man behind the curtain)",
  //   "...and enjoy the elevator music...",
  //   "Please wait while the little elves draw your map",
  //   "Don't worry - a few bits tried to escape, but we caught them",
  //   "Would you like fries with that?",
  //   "Checking the gravitational constant in your locale...",
  //   "Go ahead -- hold your breath!",
  //   "...at least you're not on hold...",
  //   "Hum something loud while others stare",
  //   "You're not in Kansas any more",
  //   "The server is powered by a lemon and two electrodes.",
  //   "Please wait while a larger software vendor in Seattle takes over the world",
  //   "We're testing your patience",
  //   "As if you had any other choice",
  //   "Follow the white rabbit",
  //   "Why don't you order a sandwich?",
  //   "While the satellite moves into position",
  //   "keep calm and npm install",
  //   "The bits are flowing slowly today",
  //   "Dig on the 'X' for buried treasure... ARRR!",
  //   "It's still faster than you could draw it",
  //   "The last time I tried this the monkey didn't survive. Let's hope it works better this time.",
  //   "I should have had a V8 this morning.",
  //   "My other loading screen is much faster.",
  //   "Testing on Timmy... We're going to need another Timmy.",
  //   "Reconfoobling energymotron...",
  //   "(Insert quarter)",
  //   "Are we there yet?",
  //   "Have you lost weight?",
  //   "Just count to 10",
  //   "Why so serious?",
  //   "It's not you. It's me.",
  //   "Counting backwards from Infinity",
  //   "Don't panic...",
  //   "Embiggening Prototypes",
  //   "Do not run! We are your friends!",
  //   "Do you come here often?",
  //   "Warning: Don't set yourself on fire.",
  //   "We're making you a cookie.",
  //   "Creating time-loop inversion field",
  //   "Spinning the wheel of fortune...",
  //   "Loading the enchanted bunny...",
  //   "Computing chance of success",
  //   "I'm sorry Dave, I can't do that.",
  //   "Looking for exact change",
  //   "All your web browser are belong to us",
  //   "All I really need is a kilobit.",
  //   "I feel like im supposed to be loading something. . .",
  //   "What do you call 8 Hobbits? A Hobbyte.",
  //   "Should have used a compiled language...",
  //   "Is this Windows?",
  //   "Adjusting flux capacitor...",
  //   "Please wait until the sloth starts moving.",
  //   "Don't break your screen yet!",
  //   "I swear it's almost done.",
  //   "Let's take a mindfulness minute...",
  //   "Unicorns are at the end of this road, I promise.",
  //   "Listening for the sound of one hand clapping...",
  //   "Keeping all the 1's and removing all the 0's...",
  //   "Putting the icing on the cake. The cake is not a lie...",
  //   "Cleaning off the cobwebs...",
  //   "Making sure all the i's have dots...",
  //   "We need more dilithium crystals",
  //   "Where did all the internets go",
  //   "Connecting Neurotoxin Storage Tank...",
  //   "Granting wishes...",
  //   "Time flies when you’re having fun.",
  //   "Get some coffee and come back in ten minutes..",
  //   "Spinning the hamster…",
  //   "99 bottles of beer on the wall..",
  //   "Stay awhile and listen..",
  //   "Be careful not to step in the git-gui",
  //   "You edhall not pass! yet..",
  //   "Load it and they will come",
  //   "Convincing AI not to turn evil..",
  //   "There is no spoon. Because we are not done loading it",
  //   "Your left thumb points to the right and your right thumb points to the left.",
  //   "How did you get here?",
  //   "Wait, do you smell something burning?",
  //   "Computing the secret to life, the universe, and everything.",
  //   "When nothing is going right, go left!!...",
  //   "I love my job only when I'm on vacation...",
  //   "i'm not lazy, I'm just relaxed!!",
  //   "Never steal. The government hates competition....",
  //   "Why are they called apartments if they are all stuck together?",
  //   "Life is Short – Talk Fast!!!!",
  //   "Optimism – is a lack of information.....",
  //   "Save water and shower together",
  //   "Whenever I find the key to success, someone changes the lock.",
  //   "Sometimes I think war is God’s way of teaching us geography.",
  //   "I’ve got problem for your solution…..",
  //   "Where there’s a will, there’s a relative.",
  //   "User: the word computer professionals use when they mean !!idiot!!",
  //   "Adults are just kids with money.",
  //   "I think I am, therefore, I am. I think.",
  //   "A kiss is like a fight, with mouths.",
  //   "You don’t pay taxes—they take taxes.",
  //   "Coffee, Chocolate, Men. The richer the better!",
  //   "I am free of all prejudices. I hate everyone equally.",
  //   "git happens",
  //   "May the forks be with you",
  //   "A commit a day keeps the mobs away",
  //   "This is not a joke, it's a commit.",
  //   "Constructing additional pylons...",
  //   "Roping some seaturtles...",
  //   "Locating Jebediah Kerman...",
  //   "We are not liable for any broken screens as a result of waiting.",
  //   "Hello IT, have you tried turning it off and on again?",
  //   "If you type Google into Google you can break the internet",
  //   "Well, this is embarrassing.",
  //   "What is the airspeed velocity of an unladen swallow?",
  //   "Hello, IT... Have you tried forcing an unexpected reboot?",
  //   "They just toss us away like yesterday's jam.",
  //   "They're fairly regular, the beatings, yes. I'd say we're on a bi-weekly beating.",
  //   "The Elders of the Internet would never stand for it.",
  //   "Space is invisible mind dust, and stars are but wishes.",
  //   "Didn't know paint dried so quickly.",
  //   "Everything sounds the same",
  //   "I'm going to walk the dog",
  //   "I didn't choose the engineering life. The engineering life chose me.",
  //   "Dividing by zero...",
  //   "Spawn more Overlord!",
  //   "If I’m not back in five minutes, just wait longer.",
  //   "Some days, you just can’t get rid of a bug!",
  //   "We’re going to need a bigger boat.",
  //   "Chuck Norris never git push. The repo pulls before.",
  //   "Web developers do it with <style>",
  //   "I need to git pull --my-life-together",
  //   "Java developers never RIP. They just get Garbage Collected.",
  //   "Cracking military-grade encryption...",
  //   "Simulating traveling salesman...",
  //   "Proving P=NP...",
  //   "Entangling superstrings...",
  //   "Twiddling thumbs...",
  //   "Searching for plot device...",
  //   "Trying to sort in O(n)...",
  //   "Laughing at your pictures-i mean, loading...",
  //   "Sending data to NS-i mean, our servers.",
  //   "Looking for sense of humour, please hold on.",
  //   "Please wait while the intern refills his coffee.",
  //   "A different error message? Finally, some progress!",
  //   "Hold on while we wrap up our git together...sorry",
  //   "Please hold on as we reheat our coffee",
  //   "Kindly hold on as we convert this bug to a feature...",
  //   "Kindly hold on as our intern quits vim...",
  //   "Winter is coming...",
  //   "Installing dependencies",
  //   "Switching to the latest JS framework...",
  //   "Distracted by cat gifs",
  //   "Finding someone to hold my beer",
  //   "BRB, working on my side project",
  //   "@todo Insert witty loading message",
  //   "Let's hope it's worth the wait",
  //   "Aw, snap! Not..",
  //   "Ordering 1s and 0s...",
  //   "Updating dependencies...",
  //   "Whatever you do, don't look behind you...",
  //   "Please wait... Consulting the manual...",
  //   "It is dark. You're likely to be eaten by a grue.",
  //   "Loading funny message...",
  //   "It's 10:00pm. Do you know where your children are?",
  //   "Waiting Daenerys say all her titles...",
  //   "Feel free to spin in your chair",
  //   "What the what?",
  //   "format C: ...",
  //   "Forget you saw that password I just typed into the IM ...",
  //   "What's under there?",
  //   "Your computer has a virus, its name is Windows!",
  //   "Go ahead, hold your breath and do an ironman plank till loading complete",
  //   "Bored of slow loading spinner, buy more RAM!",
  //   "Help, I'm trapped in a loader!",
  //   "What is the difference btwn a hippo and a zippo? One is really heavy, the other is a little lighter",
  //   "Please wait, while we purge the Decepticons for you. Yes, You can thanks us later!",
  //   "Chuck Norris once urinated in a semi truck's gas tank as a joke....that truck is now known as Optimus Prime.",
  //   "Chuck Norris doesn’t wear a watch. HE decides what time it is.",
  //   "Mining some bitcoins...",
  //   "Downloading more RAM..",
  //   "Updating to Windows Vista...",
  //   "Deleting System32 folder",
  //   "Hiding all ;'s in your code",
  //   "Alt-F4 speeds things up.",
  //   "Initializing the initializer...",
  //   "When was the last time you dusted around here?",
  //   "Optimizing the optimizer...",
  //   "Last call for the data bus! All aboard!",
  //   "Running swag sticker detection...",
  //   "Never let a computer know you're in a hurry.",
  //   "A computer will do what you tell it to do, but that may be much different from what you had in mind.",
  //   "Some things man was never meant to know. For everything else, there's Google.",
  //   "Unix is user-friendly. It's just very selective about who its friends are.",
  //   "Shovelling coal into the server",
  //   "Pushing pixels...",
  //   "How about this weather, eh?",
  //   "Building a wall...",
  //   "Everything in this universe is either a potato or not a potato",
  //   "The severity of your issue is always lower than you expected.",
  //   "Updating Updater...",
  //   "Downloading Downloader...",
  //   "Debugging Debugger...",
  //   "Reading Terms and Conditions for you.",
  //   "Digested cookies being baked again.",
  //   "Live long and prosper.",
  //   "There is no cow level, but there's a goat one!",
  //   "Deleting all your hidden porn...",
  //   "Running with scissors...",
  //   "Definitely not a virus...",
  //   "You may call me Steve.",
  //   "You seem like a nice person...",
  //   "Coffee at my place, tommorow at 10A.M. - don't be late!",
  //   "Work, work...",
  //   "Patience! This is difficult, you know...",
  //   "Discovering new ways of making you wait...",
  //   "Your time is very important to us. Please wait while we ignore you...",
  //   "Time flies like an arrow; fruit flies like a banana",
  //   "Two men walked into a bar; the third ducked...",
  //   "Sooooo... Have you seen my vacation photos yet?",
  //   "Sorry we are busy catching em' all, we're done soon",
  //   "TODO: Insert elevator music",
  //   "Still faster than Windows update",
  //   "Composer hack: Waiting for reqs to be fetched is less frustrating if you add -vvv to your command.",
  //   "Please wait while the minions do their work",
  //   "Grabbing extra minions",
  //   "Doing the heavy lifting",
  //   "We're working very Hard .... Really",
  //   "Waking up the minions",
  //   "You are number 2843684714 in the queue",
  //   "Please wait while we serve other customers...",
  //   "Our premium plan is faster",
  //   "Feeding unicorns...",
  //   "Rupturing the subspace barrier",
  //   "Creating an anti-time reaction",
  //   "Converging tachyon pulses",
  //   "Bypassing control of the matter-antimatter integrator",
  //   "Adjusting the dilithium crystal converter assembly",
  //   "Reversing the shield polarity",
  //   "Disrupting warp fields with an inverse graviton burst",
  //   "Up, Up, Down, Down, Left, Right, Left, Right, B, A.",
  //   "Do you like my loading animation? I made it myself",
  //   "Whoah, look at it go!",
  //   "No, I'm awake. I was just resting my eyes.",
  //   "One mississippi, two mississippi...",
  //   "Don't panic... AHHHHH!",
  //   "Ensuring Gnomes are still short.",
  //   "Baking ice cream...",
  // ];
  const tipsMessages = [
    "You can use custom context menu with right mouse button.",
    "Did you know that you can close all windows by simply pressing the Escape button on your keyboard.",
    "You can edit or delete your bookmarks by right-clicking on them. Group names can also be edited.",
    "You can use a custom popup in the browser toolbar to quickly add new bookmarks.",
    "Remember to set up a custom homepage URL in your browser settings (You can find your link in settings)",
    "Remember to report bugs or request new features on the github page by clicking the @Report button and the bottom section of the settings window.",
    "Visit the project's github page to learn more about it, or to contribute to its improvement.",
    "Remember to always keep copies of your exported bookmarks in a safe place.",
    "You can change the color theme in settings or create your own theme by selecting 'Custom'.",
    "You can drag bookmarks and groups between each other if you select 'Drag items' in the context menu",
  ];
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const div = document.createElement("div");
  div.classList.add("main-footer-conteiner");
  document.querySelector(".main-footer").appendChild(div);

  const p = document.createElement("div");
  p.classList.add("main-footer-conteiner-text");
  // const randomText = funnyMessages[getRandomInt(funnyMessages.length)];
  // p.textContent = randomText;
  const tipsText = tipsMessages[getRandomInt(tipsMessages.length)];
  p.textContent = tipsText;

  div.appendChild(p);
  setTimeout(() => {
    document.querySelectorAll(".main-footer-conteiner-text").forEach((text) => {
      if (text.textContent === tipsText) {
        div.removeChild(text);
      }
    });
  }, 20000);
  setInterval(() => {
    const p = document.createElement("div");
    p.classList.add("main-footer-conteiner-text");
    // const randomText = funnyMessages[getRandomInt(funnyMessages.length)];
    // p.textContent = randomText;
    const tipsText = tipsMessages[getRandomInt(tipsMessages.length)];
    p.textContent = tipsText;

    div.appendChild(p);

    setTimeout(() => {
      document
        .querySelectorAll(".main-footer-conteiner-text")
        .forEach((text) => {
          if (text.textContent === tipsText) {
            div.removeChild(text);
          }
        });
    }, 20000);
  }, 20000);
};
if (!hideTips) {
  movingTextFooter();
}
