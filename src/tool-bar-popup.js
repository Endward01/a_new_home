var bookmarksString = localStorage.getItem("Bookmarks");
var bookmarks = JSON.parse(bookmarksString);

var colorSchemeString = localStorage.getItem("ColorSheme");
var colorScheme = JSON.parse(colorSchemeString);

// let openedWindow;
// function openWindow() {
//   openedWindow = window.open("tool-bar-popup.html");
// }

// function closeOpenedWindow() {
//   openedWindow.close();
// }

const groupSelect = () => {
  while (document.querySelector(".addBookmark-form-chooseGroup").firstChild) {
    document
      .querySelector(".addBookmark-form-chooseGroup")
      .removeChild(
        document.querySelector(".addBookmark-form-chooseGroup").firstChild
      );
  }
  bookmarks[0].groups.forEach((element) => {
    const option = document.createElement("option");
    option.textContent = element.groupName;
    option.setAttribute("value", element.groupName);
    document.querySelector(".addBookmark-form-chooseGroup").appendChild(option);
  });
};
groupSelect();

const changeStyle = () => {
  const styleSheet = document.styleSheets[1];
  let first = colorScheme[0].colors[0].first;
  let second = colorScheme[0].colors[0].second;
  let third = colorScheme[0].colors[0].third;
  let accentFirst = colorScheme[0].colors[0].accentFirst;
  let textColor = colorScheme[0].colors[0].textColor;
  let textColorSemiTrans = colorScheme[0].colors[0].textColorSemiTrans;

  const mode = `:root { --first:${first}; --second: ${second}; --third: ${third}; --accent-first: ${accentFirst}; --text-color: ${textColor}; --text-color-semiTrans: ${textColorSemiTrans}; }`;
  if (styleSheet.cssRules.length > 0) {
    styleSheet.deleteRule(mode);
  }
  styleSheet.insertRule(mode);
};
changeStyle();

// window.addEventListener("storage", function (e) {
//   if (e.key === "Bookmarks") {
//     groupSelect();
//     changeStyle();
//   }
// });
// window.addEventListener("storage", function (e) {
//   if (e.key === "ColorSheme") {
//     changeStyle();
//   }
// });
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
      console.log(name);
      const url = document.querySelector(".addBookmark-form-url").value;
      console.log(url);
      const group = document.querySelector(
        ".addBookmark-form-chooseGroup"
      ).value;
      console.log(group);
      const newGroup = document.querySelector(
        ".addBookmark-form-newGroup"
      ).value;

      if (
        document.querySelector(".addBookmark-form-checkbox").checked !== true
      ) {
        const position = getPositionGroupName(group, bookmarks[0].groups);
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
      window.close("tool-bar-popup.html")
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
