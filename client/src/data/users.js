/**
 * USER SCHEMA DEFN
 *
 * id (KEY) - string       // user ID
 * fname     - string      // first name
 * lname     - string      // last name
 * email     - string      // email
 * utype     - string      // user type (can only be "pri" or "sec")
 * createdon - timestamp   // time of account creation
 * intitems  - [items]     // list of items that a ("sec") user has expressed
 *                         // interest in
 */

var users = [
    {
        uid : "HZgmlBZtKNNWYIq0IHnbdBz2DSh1",
        fname : "Troy",
        lname : "Bolton",
        email : "troy@gmail.com",
        utype : 1,
        createdon : "September 1, 2019 at 12:10:00 AM UTC+10"
    },
    {
        uid : "HZgmlBZtKNNsncKq0bcnPdBz2DSh1",
        fname : "Dandy",
        lname : "Chiggins",
        email : "dandy@t.com",
        utype : 2,
        createdon : "September 4, 2019 at 12:00:00 AM UTC+10"
    }
]
