$(function() {
    var app = $("#app");
    function apiCall(method, path, data) {
        var settings = {
            method: method,
            url: "http://localhost:8282" + path,
            contentType: "application/json"
        };
        if (data) {
            settings.data = JSON.stringify(data);
        }
        return $.ajax(settings);
    }
    function renderBookDetails(bookDetails, data) {
        bookDetails
            .empty()
            .append("ID: " + data.id + "<br />")
            .append("Autor: " + data.author + "<br />")
            .append("ISBN: " + data.isbn + "<br />")
            .append("Tytuł: " + data.title + "<br />")
            .append("Wydawca: " + data.publisher + "<br />")
            .append("Typ: " + data.type + "<br />");
    }
    function renderBooks(books) {
        app.empty();
        books.forEach(function(book) {
            var bookElement = $("<div>");
            var bookTitle = $("<div>");
            var bookDetails = $("<div>");
            bookElement.addClass("book").appendTo(app);
            bookTitle
                .addClass("book-title")
                .text(book.title)
                .appendTo(bookElement);
            bookTitle.one("click", function() {
                bookDetails.text("...");
                apiCall("GET", "/books/" + book.id).done(function(data) {
                    renderBookDetails(bookDetails, data);
                });
            });
            bookDetails.addClass("book-details").appendTo(bookElement);
        });
    }
    function fetchBooks() {
        apiCall("GET", "/books").done(renderBooks);
    }
    function handleForm() {
        $("#bookForm").on("submit", function(e) {
            e.preventDefault();
            var data = {};
            $(this)
                .find("input")
                .each(function() {
                    var name = $(this).attr("name");
                    data[name] = $(this).val();
                });
            apiCall("POST", "/books", data).done(fetchBooks);
        });
    }
    fetchBooks();
    handleForm();
});