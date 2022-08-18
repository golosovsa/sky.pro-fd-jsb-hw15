document.addEventListener("DOMContentLoaded", () => {
    // create and show spinner
    const spinner = new Spinner(document.body);
    // create weather
    const weather = new Weather(document.body, spinner);

    request({
        url: "./data/cities.json",
        onSuccess: (data) => {
            weather.setCityData(data);
        },
        onError: (message) => {
            console.log(message);
        },
    });

    
    window.navigator.geolocation.getCurrentPosition(
        (event) => {
            const lan = event.coords.latitude;
            const lng = event.coords.longitude;
            weather.setGeolocation(lan, lng)
        },
        (event) => {
            console.log(event);
        },
        {
            timeout:60000 * 5,
            maximumAge: Infinity,
        },
    );
});