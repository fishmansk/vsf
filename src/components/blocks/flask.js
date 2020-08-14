export default {
    name: "Flask",
    blocks: [


        {
            title: "Create",
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
        {
            title: "Add text rule",
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
        {
            title: "Add json rule",
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
        {
            title: "Run",
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
        }
    ]

}