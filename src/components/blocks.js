export default {
    sum: {
        title: "Сумма",
        type: "operation",
        inputs: [
            {
                text: "signal",
                flow: "control"
            },  
            {
                text: "Выражение 1",
                flow: "data",
            },
            {
                text: "Выражение 2",
                flow: "data",
            },
        ],
        outputs: [
            {
                text: "signal",
                flow: "control"
            },  
            {
                text: "Результат",
                flow: "data",
            },

        ],
    },
    console_print: {
        title: "Вывод в консоль",
        type: "operation",
        inputs: [
            {
                text: "signal",
                flow: "control"
            },  
            {
                text: "Данные",
                flow: "data",
            },
        ],
        outputs: [
            {
                text: "signal",
                flow: "control"
            },  

        ],
    },
    event_start: {
        title: "Start",
        type: "event",
        inputs: [

        ],
        outputs: [
            {
                text: "signal",
                flow: "control"
            },            
        ],
    },
    data_string: {
        title: "String",
        type: "data",
        inputs: [

        ],
        outputs: [
            {
                text: "string",
                flow: "data",
                type: "string",
            }

        ],
    },
    data_number: {
        title: "Number",
        type: "data",
        inputs: [

        ],
        outputs: [
            {
                text: "number",
                flow: "data",
                type: "string",
            }

        ],
    },

}