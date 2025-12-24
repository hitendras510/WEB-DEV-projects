const API_URL = 'http://localhost:5500/bookmarks';

document.addEventListener('DOMContentLoaded', () => {
    fetchBookmarks();
});

function fetchBookmarks() {
    fetch(API_URL)
    .then(response => response.json())
    .then(bookmarks =>{
        bookmarks.forEach(bookmark => addBookmarkToDom(bookmark)); //displays bookmarks to ui
    })
    .catch(error => console.error('Error fetching bookmarks:', error));
}

//add a bookmark to the dom 
function addBookmarkToDom(bookmark){
    const bookmarkList = document.getElementById('bookmark-list');
    const bookmarkItem = document.createElement('li');
    bookmarkItem.classList.add('bookmark-item');
    bookmarkItem.setAttribute('data-id', bookmark.id); //Adds a custom HTML attribute called data-id & Stores the backend bookmark’s unique ID inside the DOM element.


    //URL display
    const url = document.createElement('span'); //Creates <span> to show bookmark text.
    console.log(bookmark.bookmark?.url); //Logs bookmark.bookmark.url only if it exists.
    url.textContent = `${bookmark.url} (${bookmark.category})`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', ()=> deleteBookmark(bookmark.id)); //Passes bookmark.id so backend knows which one to delete.

   bookmarkItem.appendChild(url);
    bookmarkItem.appendChild(deleteButton);

    bookmarkList.appendChild(bookmarkItem);
}

//add a new bookmark
document.getElementById('add-todo-btn').addEventListener('click', ()=>{
    const urlInput = document.getElementById('bookmar-url')
    const categoryInput = document.getElementById('bookmark-category');
    
    if(!urlInput || !categoryInput || urlInput.value.trim() === '' || categoryInput.value.trim() === " "){
        console.error("Please provide both URL and category.");
        return;
    }
    const newbookmark = { url: urlInput.value, category: categoryInput.value};
    //create js object matching backend schema
    fetch(API_URL,{
        method: 'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify(newbookmark),
    })

    .then(response => response.json())
    .then(bookmark => {
        addBookmarkToDom(bookmark);
        urlInput.value = '';
        categoryInput.value = '';
    })
    .catch(error => console.error('Error adding bookmark:', error));
});

//delete bookmark
function deleteBookmark(id){
    fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    })
    .then(() => {
      const bookmarkitem = document.querySelector(`[data-id="${id}"]`); //Finds <li> with matching data-id.
      if (bookmarkitem) {
        bookmarkitem.remove();
      }
    })
    .catch(error => console.error('Error deleting bookmark:', error));
}