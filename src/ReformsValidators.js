export default {
    required: (params) => {
        console.log('cprt');
        return [
            {
                isValid: false,
                messages: [
                    'Поле не заполнено',
                ],
            }
        ];
    },
    required2: (params) => {
        console.log('cprt');
        return [
            {
                isValid: false,
                messages: [
                    'Поле заполнено',
                ],
            }
        ];
    }
};
