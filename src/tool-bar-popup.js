var bookmarksString = localStorage.getItem("Bookmarks");
var bookmarks = JSON.parse(bookmarksString);

var colorSchemeString = localStorage.getItem("ColorSheme");
var colorScheme = JSON.parse(colorSchemeString);

const groupSelect = () => {
  const addBookmarkSelectGroup = document.querySelector(
    ".addBookmark-form-chooseGroup"
  );
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

const changeStyle = () => {
  const styleSheet = document.styleSheets[0];
  // if (colorScheme.mode !== "custom") {
  //   const mode = `:root { --background:${colorScheme.colors.background}; --primary: ${colorScheme.colors.primary}; --secondary: ${colorScheme.colors.secondary}; --accent: ${colorScheme.colors.accent}; --text: ${colorScheme.colors.text};}`;
  //   styleSheet.deleteRule(mode);
  //   styleSheet.insertRule(mode);
  // } else {
  //   const mode = `:root { --background:${colorScheme.customeColors.background}; --primary: ${colorScheme.customeColors.primary}; --secondary: ${colorScheme.customeColors.secondary}; --accent: ${colorScheme.customeColors.accent}; --text: ${colorScheme.customeColors.text};}`;
  //   styleSheet.deleteRule(mode);
  //   styleSheet.insertRule(mode);
  // }
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
      background: "#202225",
      primary: "#292b2f",
      secondary: "#2f3136",
      accent: "#40444b",
      text: "#eae6da",
    };
  }
  mode = `:root { --background:${colorScheme.colors.background}; --primary: ${colorScheme.colors.primary}; --secondary: ${colorScheme.colors.secondary}; --accent: ${colorScheme.colors.accent}; --text: ${colorScheme.colors.text};}`;
  styleSheet.deleteRule(mode);
  styleSheet.insertRule(mode);
};
changeStyle();

const dataVisibleSwitcher = (elem, position) => {
  if (elem.attributes[position].value === "true") {
    elem.setAttribute("data-visible", "false");
  } else {
    elem.setAttribute("data-visible", "true");
  }
};

document
  .querySelector(".addBookmark-form-checkbox")
  .addEventListener("change", () => {
    document.querySelectorAll(".addCreateNewGroup").forEach((element) => {
      if (
        document.querySelector(".addBookmark-form-checkbox").checked === true
      ) {
        dataVisibleSwitcher(element, 2);
      } else {
        dataVisibleSwitcher(element, 2);
      }
    });
  });
const setValueOfActiveWebpageToInput = () => {
  chrome.tabs.query(
    {
      active: true,
      lastFocusedWindow: true,
    },
    function (array_of_Tabs) {
      const tab = array_of_Tabs[0];
      console.log(tab);
      document.querySelector(".addBookmark-form-name").value = tab.title;
      document.querySelector(".addBookmark-form-url").value = tab.url;
    }
  );
};
setValueOfActiveWebpageToInput();

function getPositionGroupName(elementToFind, arrayElements) {
  return arrayElements
    .map(function (e) {
      return e.groupName;
    })
    .indexOf(elementToFind);
}

const addBookmark = () => {
  document
    .querySelector(".addBookmark-form-btn-add")
    .addEventListener("click", function () {
      const name = document.querySelector(".addBookmark-form-name").value;
      const url = document.querySelector(".addBookmark-form-url").value;
      const group = document.querySelector(
        ".addBookmark-form-chooseGroup"
      ).value;
      const newGroup = document.querySelector(
        ".addBookmark-form-newGroup"
      ).value;
      if (
        document.querySelector(".addBookmark-form-checkbox").checked !== true
      ) {
        let groupPosition;
        let elemCol;

        for (let i = 0; i < bookmarks.length; i++) {
          index = getPositionGroupName(group, bookmarks[i].groups);
          if (index !== -1) {
            groupPosition = index;
            elemCol = bookmarks[i];
          }
        }

        const columnPosition = Array.from(bookmarks).indexOf(elemCol);

        const newBookmark = {
          name: name,
          url: url,
        };

        const arrBookmark =
          bookmarks[columnPosition].groups[groupPosition].bookmark;
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
      window.close("tool-bar-popup.html");
    });
};
addBookmark();

document.querySelector(".addBookmark-form").addEventListener("input", () => {
  const name = document.querySelector(".addBookmark-form-name").value;
  const url = document.querySelector(".addBookmark-form-url").value;
  const newGroup = document.querySelector(".addBookmark-form-newGroup").value;
  // if (name == "" || url == "" || newGroup == "") {
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
