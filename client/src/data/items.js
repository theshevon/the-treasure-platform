/**
 * ITEM SCHEMA DEFN
 *
 * id (KEY)  - string      // user ID
 * name      - string      // item name
 * desc      - string      // item description
 * img_src   - string      // URI for item image
 * val       - string      // val (optional)
 * createdon - timestamp   // time of account creation
 * visibleto - [users]     // list of users who the item is visible to
 * intusers  - [users]     // list of users who've expressed interest in the item
 */

var items = [
    {
        id: 1,
        name: "Item1",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        img_src: "https://images.unsplash.com/photo-1511253819057-5408d4d70465?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        val: null,
        createdon: "September 1, 2019 at 12:10:00 AM UTC+10",
        visibleto: [
                        "user1",
                        "user2"
                   ],
        hiddenfrom: [
                        "user3"
                    ],
        intusers:  ["user1"],
        assignedto: null
    },
    {
        id: 2,
        name: "Item2",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        img_src: "https://images.unsplash.com/photo-1511253819057-5408d4d70465?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        val: null,
        createdon: "September 1, 2019 at 12:10:00 AM UTC+10",
        visibleto: [
                        "user1",
                        "user2"
                   ],
        hiddenfrom: [
                        "user3"
                    ],
        intusers:  ["user1"],
        assignedto: null
    },
    {
        id: 3,
        name: "Item3",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        img_src: "https://images.unsplash.com/photo-1511253819057-5408d4d70465?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        val: null,
        createdon: "September 1, 2019 at 12:10:00 AM UTC+10",
        visibleto: [
                        "user1",
                        "user2"
                   ],
        hiddenfrom: [
                        "user3"
                    ],
        intusers:  ["user1"],
        assignedto: null
    },
    {
        id: 4,
        name: "Item4",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        img_src: "https://images.unsplash.com/photo-1511253819057-5408d4d70465?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        val: null,
        createdon: "September 1, 2019 at 12:10:00 AM UTC+10",
        visibleto: [
                        "user1",
                        "user2"
                   ],
        hiddenfrom: [
                        "user3"
                    ],
        intusers:  ["user1"],
        assignedto: null
    }
]

export default items;

