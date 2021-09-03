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
  