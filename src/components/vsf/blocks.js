export default {
    sum: {
        title: "std: Sum",
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
    console_print: {
        title: "std: Print",
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
    event_start: {
        title: "std: Start",
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
    data_string: {
        title: "std: String",
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
    data_number: {
        title: "std: Number",
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
    flask_actions_create: {
        title: "flask: Create",
        type: "operation",
        slug: "flask_create",
        inputs: [
            {
                text: "signal",
                flow: "control",
            },
        ],
        outputs: [
            {
                text: "signal",
                flow: "control",
            },
            {
                text: "app",
                flow: "data",
                type: "stream",
            },

        ],
    },
    flask_actions_add_text_rule: {
        title: "flask: Add text rule",
        type: "operation",
        slug: "flask_add_text_route",
        inputs: [
            {
                text: "signal",
                flow: "control",
            },
            {
                text: "app",
                flow: "data",
                type: "stream",
            },
            {
                text: "url",
                flow: "data",
                type: "stream",
            },
            {
                text: "name",
                flow: "data",
                type: "stream",
            },
            {
                text: "text",
                flow: "data",
                type: "stream",
            },

        ],
        outputs: [
            {
                text: "signal",
                flow: "control",
            },
            {
                text: "app",
                flow: "data",
                type: "stream",
            },


        ],
    },
    flask_actions_add_json_rule: {
        title: "flask: Add json rule",
        type: "operation",
        slug: "flask_add_json_route",
        inputs: [
            {
                text: "signal",
                flow: "control",
            },
            {
                text: "app",
                flow: "data",
                type: "stream",
            },
            {
                text: "url",
                flow: "data",
                type: "stream",
            },
            {
                text: "name",
                flow: "data",
                type: "stream",
            },
            {
                text: "json",
                flow: "data",
                type: "stream",
            },

        ],
        outputs: [
            {
                text: "signal",
                flow: "control",
            },
            {
                text: "app",
                flow: "data",
                type: "stream",
            },


        ],
    },
    flask_actions_app_run: {
        title: "flask: Run",
        type: "operation",
        slug: "flask_app_run",
        inputs: [
            {
                text: "signal",
                flow: "control",
            },
            {
                text: "app",
                flow: "data",
                type: "stream",
            },
            {
                text: "port",
                flow: "data",
                type: "stream",
            },

        ],
        outputs: [


        ],
    },
    std_data_json: {
        title: "std:data Json",
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

}