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
        name: "item1",
        desc: "Was owned by my grandpa, 'Buffalo Bill'",
        img_src: "https://images.unsplash.com/photo-1511253819057-5408d4d70465?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        val: null,
        createdon: "September 1, 2019 at 12:10:00 AM UTC+10",
        visibleto: [
                        "user1",
                        "user2"
                   ],
        intusers:  ["user1"]
    },
    {
        id: 2,
        name: "item2",
        desc: "item2 desc",
        img_src: "https://images.unsplash.com/photo-1511253819057-5408d4d70465?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        val: null,
        createdon: "September 1, 2019 at 12:10:00 AM UTC+10",
        visibleto: [
                        "user1",
                        "user2"
                   ],
        intusers:  ["user1"]
    },
    {
        id: 3,
        name: "item3",
        desc: "item3 desc",
        img_src: "https://images.unsplash.com/photo-1511253819057-5408d4d70465?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        val: null,
        createdon: "September 1, 2019 at 12:10:00 AM UTC+10",
        visibleto: [
                        "user1",
                        "user2"
                   ],
        intusers:  ["user1"]
    },
    {
        id: 4,
        name: "item4",
        desc: "item4 desc",
        img_src: "https://images.unsplash.com/photo-1511253819057-5408d4d70465?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        val: null,
        createdon: "September 1, 2019 at 12:10:00 AM UTC+10",
        visibleto: [
                        "user1",
                        "user2"
                   ],
        intusers:  ["user1"]
    }
]

export default items;

