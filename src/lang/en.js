export default {
    validation: {
        required: {
            not_specified: 'This field must be filled',
            specified: 'Field is filled',
        },
        string: {
            must_be_string: 'The value must be a string',
        },
        email: {
            must_be_email: 'Incorrect E-mail specified'
        },
        url: {
            must_be_url: 'Invalid URL specified',
        },
        alpha: {
            not_alpha: 'The specified value must contain only Latin letters',
            not_alphanum: 'The specified value must contain only Latin letters and numbers'
        },
        'in': {
            must_be_in: 'The specified value can only be: :values',
            must_not_be_in: 'The specified value should not be: :values',
        },
        regex: {
            not_match: 'The specified value does not match the pattern',
        },
        starts_with: {
            not_starts: 'The specified value must start with: ":value"'
        },
        ends_with: {
            not_ends: 'The specified value must end with: ":value"'
        },
        contains: {
            not_contains: 'The specified value does not contain: ":value"',
        },
        confirmation: {
            not_confirmed: 'The fields don\'t match',
        },
        checked: {
            not_checked: 'Need to confirm',
        },
    },
};
