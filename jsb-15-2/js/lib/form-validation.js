/**
 * Form validation function
 * 
 * function validateForm(formElement)
 * 
 * returns the error code from errorKeys 
 * for the first element that fails validation 
 * with same control, else undefined
 * 
 * const errorKeys = Object.keys(ValidityState.prototype);
 * 
 * errorKeys = [
 *     "valueMissing", 
 *     "typeMismatch", 
 *     "patternMismatch", 
 *     "tooLong", 
 *     "tooShort", 
 *     "rangeUnderflow", 
 *     "rangeOverflow", 
 *     "stepMismatch", 
 *     "badInput", 
 *     "customError", 
 *     "valid"
 * ]
 */

 const errorKeys = Object.keys(ValidityState.prototype);

 function validateForm(formElement) {
    const controls = formElement.querySelectorAll("input, select, textarea");

    for (const control of controls) {
        if (control.validity.valid) continue;

        for (const error of errorKeys) {
            if (!control.validity[error]) continue;

            return {
                element: control,
                errorCode: error,
            };
        }
    }

    return undefined;
 }