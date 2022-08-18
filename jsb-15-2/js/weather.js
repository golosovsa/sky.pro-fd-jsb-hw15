class Weather {
    constructor(parent, spinner) {
        this.parent = parent;
        this.spinner = spinner;

        this.element = templateEngine(weatherTemplate);
        this.icon = this.element.querySelector(".weather__icon");
        this.country = this.element.querySelector(".weather__text_country-short");
        this.temperature = this.element.querySelector(".weather__text_temperature");
        this.input = this.element.querySelector(".weather__input_city");
        this.iconGeoEnabled = this.element.querySelector(".weather__text_geo-enabled");
        this.iconGeoDisabled = this.element.querySelector(".weather__text_geo-disabled");

        this.isGeolocationDenied = true;
        this.isCityDataDenied = true;
        this.hidden = true;
        this.data = undefined;
        this.position = undefined;
        this.weather = undefined;

        this.popup = undefined;
        this.suggest = undefined;

        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onInput = this.onInput.bind(this);
        this.onInputFocus = this.onInputFocus.bind(this);
        this.onInputBlur = this.onInputBlur.bind(this);
    }

    updateWeather({lan=0, lng=0, }) {
        request({
            url: "https://api.openweathermap.org/data/2.5/weather",
            params: {
                lat: lan,
                lon: lng,
                appid: weatherApiKey,
            },
            onSuccess: (data) => {
                if (!data) return;

                this.weather = {
                    status: data["weather"][0]["main"],
                    description: data["weather"][0]["description"],
                    icon: `https://openweathermap.org/img/w/${data["weather"][0]["icon"]}.png`,
                    temp: (Number(data["main"]["temp"]) - 273.15).toFixed(2),
                    tempFeelsLike: (Number(data["main"]["feels_like"]) - 273.15).toFixed(2),
                    tempMin: (Number(data["main"]["temp_min"]) - 273.15).toFixed(2),
                    tempMax: (Number(data["main"]["temp_max"]) - 273.15).toFixed(2),
                    pressure: (Number(data["main"]["pressure"]) * 0.750062).toFixed(2),
                    humidity: (Number(data["main"]["humidity"])).toFixed(2),
                    windSpeed: (Number(data["wind"]["speed"])).toFixed(2),
                    country: data["sys"]["country"],
                    city: data["name"],
                }
                this._show();
            },
            onError: (message) => {
                console.log(message);
                this.weather = undefined;
                this.hide();
            }
        });
    }

    updateAll() {
        if (this.isCityDataDenied) return false;

        if (!this.isGeolocationDenied) {
            this.updateWeather(this.position);

            return true;
        }

        return false;
    }

    setCityData(data) {
        this.isCityDataDenied = false;
        this.data = data;
        this.suggest = new Suggest(this.parent, this.data, (item) => {
            console.log(item);
            this.input.value = item.name;
            this.updateWeather({lan: item.lan, lng: item.lng, });
        });
        this.updateAll();
    }

    setGeolocation(lan, lng) {
        this.isGeolocationDenied = false;
        this.position = {lan: lan, lng: lng, };
        this.updateAll();
    }

    onMouseEnter(event) {
        const x = event.clientX;
        const y = event.clientY;

        this.popup.setPosition({left: (x+10) + "px", top: (y + 10) + "px"});
        this.popup.show();
    }

    onMouseLeave(event) {
        this.popup.hide();
    }

    onMouseMove(event) {
        const x = event.clientX;
        const y = event.clientY;
        this.popup.setPosition({left: (x+10) + "px", top: (y + 10) + "px"});
    }

    onInput(event) {
        this.suggest.update(this.input.value.toLowerCase());
    }

    onInputFocus() {
        this.suggest.update(this.input.value.toLowerCase());
        this.suggest.show();
    }

    onInputBlur() {
        this.suggest.hide();
    }

    _show() {
        this.icon.setAttribute("src", this.weather.icon);
        this.icon.setAttribute("alt", this.weather.status);
        this.country.textContent = this.weather.country;
        this.temperature.textContent = this.weather.temp + "°C";
        this.input.value = this.weather.city;
        if (this.isGeolocationDenied) {
            this.iconGeoEnabled.classList.add("weather__geo_hidden");
            this.iconGeoDisabled.classList.remove("weather__geo_hidden");
        } else {
            this.iconGeoEnabled.classList.remove("weather__geo_hidden");
            this.iconGeoDisabled.classList.add("weather__geo_hidden");
        }

        this.popup = new Popup(this.parent);
        this.popup.add(this.weather.description);
        this.popup.add(`Температура: ${this.weather.tempMin}°C - ${this.weather.tempMax}°C`);
        this.popup.add(`Ощущается: ${this.weather.tempFeelsLike}°C`);
        this.popup.add(`Давление: ${this.weather.pressure}мм.рт.ст.`);
        this.popup.add(`Влажность: ${this.weather.tempFeelsLike}%`);
        this.popup.add(`Скорость ветра: ${this.weather.tempFeelsLike}м/c`);

        this.element.addEventListener("mouseenter", this.onMouseEnter);
        this.element.addEventListener("mouseleave", this.onMouseLeave);
        this.element.addEventListener("mousemove", this.onMouseMove);
        this.input.addEventListener("input", this.onInput);
        this.input.addEventListener("focus", this.onInputFocus);
        this.input.addEventListener("blur", this.onInputBlur);

        this.spinner.hide();
        this.parent.appendChild(this.element);

        const pos = this.element.getBoundingClientRect();
        this.suggest.setPosition({left: `${pos.left - 67}px`, top: `${pos.top + pos.height+16}px`});
    }

    _hide() {

        this.parent.removeChild(this.element);
        this.spinner.show();
    }

    show() {
        if (this.updateAll()) this.hidden = false;
    }

    hide() {
        this.hidden = true;
        this._hide()
    }

}