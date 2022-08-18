document.addEventListener("DOMContentLoaded", () => {
    const userLoginOk = new UserLogin(
        document.body,
        "ok",
        "./stubs/ok.json",
        "./stubs/ok.json"
    );
    
    const userLoginError = new UserLogin(
        document.body,
        "error",
        "./stubs/error.json",
        "./stubs/error.json"
    );

    const userLoginNotFound = new UserLogin(
        document.body,
        "not-found",
        "./stubs/not-found.json",
        "./stubs/not-found.json"
    );

});