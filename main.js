$(function () {
        // setInterval(function () {
            $.ajax({
                method: "GET",
                url: 'https://swapi.co/api/people/4'
            }).done(function (result) {
                console.log(result);
            });
        // }, 3000);
})

