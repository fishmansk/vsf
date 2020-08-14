export default {
    name: "Python",
    blocks: [
        {
            title: "Sum",
            type: "operation",
            slug: "std_operations_sum",

            inputs: [
                {
                    text: "signal",
                    flow: "control"
                },
                {
                    text: "expression 1",
                    flow: "data",
                },
                {
                    text: "expression 2",
                    flow: "data",
                },
            ],
            outputs: [
                {
                    text: "signal",
                    flow: "control"
                },
                {
                    text: "result",
                    flow: "data",
                },

            ],
        },
        {
            title: "Print",
            type: "operation",
            slug: "std_operations_print",
            inputs: [
                {
                    text: "signal",
                    flow: "control"
                },
                {
                    text: "data",
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
        {
            title: "Start",
            type: "event",
            slug: "std_events_start",
            inputs: [

            ],
            outputs: [
                {
                    text: "signal",
                    flow: "control"
                },
            ],
        },
        {
            title: "String",
            type: "data",
            slug: "std_datatypes_string",
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
        {
            title: "Number",
            type: "data",
            slug: "std_datatypes_number",
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
        {
            title: "JSON",
            type: "data",
            slug: "std_datatypes_json",
            inputs: [


            ],
            outputs: [
                {
                    text: "json",
                    flow: "data",
                    type: "stream",
                },


            ],
        },
    ]

}