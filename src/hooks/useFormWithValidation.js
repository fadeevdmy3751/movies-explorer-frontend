import {useCallback, useState} from 'react';
import isEmail from 'validator/es/lib/isEmail';
import {emailError, nameError, searchError} from "../utils/constants";

const Joi = require('joi');

export default function useFormWithValidation() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        if (name === 'name'){
            if(target.validity.patternMismatch) {
                target.setCustomValidity(nameError)
            } else {
                target.setCustomValidity('');
            }
        }

        if (name === 'email') {
            if (!isEmail(value) || Joi.string().required().email({ tlds: { allow: false } }).validate(value).error) {
                target.setCustomValidity(emailError);
            } else {
                target.setCustomValidity('');
            }
        }

        if (name === 'search'){
            if(target.validity.valueMissing) {
                target.setCustomValidity(searchError)
            } else {
                target.setCustomValidity('');
            }
        }

        setValues({...values, [name]: value});
        setErrors({...errors, [name]: target.validationMessage});
        setIsValid(target.closest('form').checkValidity());
    };
    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );

    return {values, handleChange, errors, isValid, resetForm, setIsValid};
}
