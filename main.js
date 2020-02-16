$(function () {
    var app = $("#app");

    function renderBooks (books) {
        books.forEach(function (book) {
            var bookElement = $("<div>");
            bookElement.text(book.title).appendTo(app);

            bookElement
                .addClass("book-title")
                .text(book.title)
                .appendTo(app);

            var bookTitle = $("<div>");

            bookTitle
                .addClass("book-title")
                .text(book.title)
                .appendTo(bookElement);

            var bookDetails = $("<div>");
            bookDetails
                .addClass("book-deatils")
                .appendTo(bookElement);
        });
    }

    $.ajax({
        method: "GET",
        url: "http://localhost:8282/books"
    }).done(renderBooks);
})

