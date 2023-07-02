// get bookmarks from localstorage
let retString = localStorage.getItem("Bookmarks");
let bookmarks = JSON.parse(retString);
console.log(bookmarks);

// Bookmarks JSON Tameplate
// [
//     {
//       groups: [
//         {
//           groupName: "nameOfBookmarkGroup1",
//           bookmark: [
//             {
//               name: "nameOfBookmark 1-1",
//               url: "urlOfBookmark 1-1"
//             },
//             {
//               name: "nameOfBookmark 1-2",
//               url: "urlOfBookmark 1-2"
//             },
//             {
//               name: "nameOfBookmark 1-3",
//               url: "urlOfBookmark 1-3"
//             },
//             {
//               name: "nameOfBookmark 1-4",
//               url: "urlOfBookmark 1-4"
//             },
//             {
//               name: "nameOfBookmark 1-4",
//               url: "urlOfBookmark 1-4"
//             },
//             {
//               name: "nameOfBookmark 1-5",
//               url: "urlOfBookmark 1-5"
//             }
//           ]
//         },
//         {
//           groupName: "nameOfBookmarkGroup 2",
//           bookmark: [
//             {
//               name: "nameOfBookmark 2-1",
//               url: "urlOfBookmark 2-1"
//             },
//             {
//               name: "nameOfBookmark 2-2",
//               url: "urlOfBookmark 2-2"
//             },
//             {
//               name: "nameOfBookmark 2-3",
//               url: "urlOfBookmark 2-3"
//             },
//             {
//               name: "nameOfBookmark 2-3",
//               url: "urlOfBookmark 2-3"
//             },
//             {
//               name: "nameOfBookmark 2-5",
//               url: "urlOfBookmark 2-4"
//             },
//             {
//               name: "nameOfBookmark 2-6",
//               url: "urlOfBookmark 2-6"
//             },
//             {
//               name: "nameOfBookmark 2-7",
//               url: "urlOfBookmark 2-7"
//             },
//             {
//               name: "nameOfBookmark 2-8",
//               url: "urlOfBookmark 2-8"
//             }
//           ]
//         }
//       ]
//     }
//   ]

// SELECT EXISTING ELEMENTS

const body = document.querySelector("body");
const bookmarksSection = document.querySelector(".main-section-bookmarks");

const bookmarksGroups = bookmarks[0].groups;

// addBookmark Logic
const addBookmark = document.querySelector(".addBookmark");
const addShowBookmark = document.querySelector(".addBookmark-btn");
const addBookmarkInpName = document.querySelector(
  ".addBookmark-container-name"
);
const addBookmarkInpUrl = document.querySelector(".addBookmark-container-url");
const addBookmarkBtn = document.querySelector(".addBookmark-container-btn");
const addBookmarkSelectGroup = document.querySelector(".addBookmark-container-groups");
console.log(addBookmarkSelectGroup)

let isAddBookmarkVisible = "false";
addShowBookmark.addEventListener("click", function openWindow() {
  isAddBookmarkVisible = !isAddBookmarkVisible;
  if (isAddBookmarkVisible) {
    addBookmark.setAttribute("data-visible", "false");
  } else {
    addBookmark.setAttribute("data-visible", "true");
  }
});

addBookmarkBtn.addEventListener("click", function getBalue() {
  const name = addBookmarkInpName.value;
  const url = addBookmarkInpUrl.value;
  const newBookmark = {
    Name: name,
    Url: url,
  };
  bookmarks.push(newBookmark);
  let bookmarksString = JSON.stringify(bookmarks);
  localStorage.setItem("Bookmarks", bookmarksString);
});

bookmarksGroups.forEach((element) => {
  const option = document.createElement("option");
  option.textContent = element.groupName;
  option.setAttribute("value", element.groupName);
  addBookmarkSelectGroup.appendChild(option);

});

//add bookmarks to DOM
const appendBookmarks = () => {
  bookmarksGroups.forEach((element) => {
    const ul = document.createElement("ul");
    ul.textContent = element.groupName;
    bookmarksSection.appendChild(ul);
    const groupName = element.bookmark;
    console.log(element.bookmark);

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
