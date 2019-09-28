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
        name : "Troy Bolton"
    },
    {
        uid : "HZgmlBZtKNNsncKq0bcnPdBz2DSh1",
        name: "Dandy Chiggins"
    }
]

export default users;
