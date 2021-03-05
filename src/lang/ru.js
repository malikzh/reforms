export default {
    validation: {
        required: {
            not_specified: 'Это поле должно быть заполнено',
            specified: 'Поле заполнено',
        },
        string: {
            must_be_string: 'Значение должно быть строкой',
            is_string: 'Корректно заполнено'
        },
        email: {
            must_be_email: 'Указан некоректный E-mail'
        }
    },
};
