export default {
    name: "VK",
    blocks: [
        {
            title: "VK Listener",
            type: "operation",
            slug: "vk_listener_create",
            inputs: [
                {
                    text: "signal",
                    flow: "control",
                },
                {
                    text: "token",
                    flow: "data",
                    type: "string",
                },
            ],
            outputs: [
                {
                    text: "listener",
                    flow: "data",
                    type: "stream",
                },

            ],
        },
        {
            title: "New Message",
            type: "event",
            slug: "std_events_start",
            inputs: [
                {
                    text: "listener",
                    flow: "data"
                },
            ],
            outputs: [
                {
                    text: "signal",
                    flow: "control"
                },
                {
                    text: "message",
                    flow: "data"
                },
            ],
        },
        
    ]

}