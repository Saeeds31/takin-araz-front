import { processErrors } from "@/common/utils/helpers";
import { toast } from "vue3-toastify";

export function useErrors() {

    function displayError(err) {
        const messages = processErrors(err);
        messages.forEach(message => toast.error(message))
    }

    function setFormErrors(err, formRef) {
        const errors = err?.response?.data?.errors;

        if (!formRef || !errors) return;

        const formatted = Object.fromEntries(
            Object.entries(errors).map(([field, msgs]) => [field, msgs[0]])
        );

        formRef.setErrors(formatted);
    }

    return { displayError, setFormErrors };
}