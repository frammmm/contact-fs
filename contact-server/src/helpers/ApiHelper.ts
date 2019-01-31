import _ from "lodash";

export const requireParamsValidation = (params: any): string[] => {
    const errors: string[] = [];

    _.forOwn(params, (value, key) => {
        if (!value) {
            errors.push(`${_.capitalize(key)} is missing.`);
        }
    });

    return errors;
};