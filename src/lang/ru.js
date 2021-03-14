export default {
    validation: {
        required: {
            not_specified: 'Это поле должно быть заполнено',
            specified: 'Поле заполнено',
        },
        string: {
            must_be_string: 'Значение должно быть строкой',
        },
        email: {
            must_be_email: 'Указан некоректный E-mail'
        },
        url: {
            must_be_url: 'Указан некорректный URL',
        },
        alpha: {
            not_alpha: 'Указанное значение должно содержать только латинские буквы',
            not_alphanum: 'Указанное значение должно содержать только латинские буквы и цифры'
        },
        'in': {
            must_be_in: 'Указанное значение может быть только: :values',
            must_not_be_in: 'Указанное значение не должно быть: :values',
        },
        regex: {
            not_match: 'Указанное значение не совпадает с шаблоном',
        },
        starts_with: {
            not_starts: 'Указанное значение должно начинаться с ":value"'
        },
        ends_with: {
            not_ends: 'Указанное значение должно заканчиваться строкой ":value"'
        },
        contains: {
            not_contains: 'Указанное значение не содержит строку: ":value"',
        },
        confirmation: {
            not_confirmed: 'Поля не совпадают',
        },
    },
};
