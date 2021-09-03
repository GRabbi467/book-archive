// search buttonb click
document.getElementById("src-btn").addEventListener("click", () => {
    // collecting value from input field
    const searchText = document.getElementById("search-field").value;
  
    // clearing previous data after clicked search button
    document.getElementById("search-field").value = "";
    document.getElementById("books-grid").textContent = "";
    document.getElementById("result-num").innerText = "";
  
    //   checking search field was empty or not
    if (searchText === "") {
      //   if rearch field was empty, then this will execute.
      document.getElementById(
        "result-num"
      ).innerText = `Search Books, Using some keywords`;
    } else {
      //   if rearch field was not empty, then this will execute.
  
      // spinner showing function
      loading("block");
      // call fetching function
      loadData(searchText);
    }
  });
  // this part is for fetching data from api
const loadData = (searchText) => {
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => showBook(data.docs, data.numFound));
  };
  // this is after fetch processing part
// this fungtiog takes 2 parameter, one is books info, another is number of data found
const showBook = (booksData, numberOfresult) => {
    // checks any result found or not using if else
    // if no result found then go to if part, else(if result found) go to else part
    if (numberOfresult === 0) {
      loading("none");
      document.getElementById(
        "result-num"
      ).innerText = `No result founds for your search`;
    } else {
      // calling container to show book details in UI.
      const grid = document.getElementById("books-grid");
      // loop to access all books of the "bookData"
      booksData.forEach((book) => {
        // default image url (if there is no image for book, this default image will show for them)
        let imgUrl = `images/images.jpg`;
  
        // generate image url if possible
        if (book.cover_i) {
          imgUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        }
        // creating an div to make details card and add to the ui
      const div = document.createElement("div");
      // setting inner html to make a details card
      div.innerHTML = `
            <div class="card border-2 rounded-md">
                  <img src="${imgUrl}" class="card-img-top" alt="...">
              <div class="card-body">
                  <h5 class="text-2x font-bold">Book Title: ${book.title}</h5>
                  <p class=""> <span class="font-bold" >Authors:</span> ${
                    book.author_name ? book.author_name : "Not found!"
                  }</p>
                  <p class=""><span class="font-bold" >First Publication:</span> ${
                    book.first_publish_year
                      ? book.first_publish_year
                      : "Date not found!"
                  }</p>
              </div>
              <div class="card-footer">
                  <small class="text-muted"><span class="font-bold" >Publisher:</span>${
                    book.publisher ? book.publisher : "Not found!"
                  }</small>
              </div>
          </div>`;

      //   add the card to the main grid/ui
      grid.appendChild(div);
    });
    loading("none");
    // console.log(booksData);
    // console.log(numberOfresult);

    // this part is to show the number of searching reasult
    const books = booksData.length;
    document.getElementById(
      "result-num"
    ).innerText = `${numberOfresult} results found. showing results for ${books} books.`;
  }
};