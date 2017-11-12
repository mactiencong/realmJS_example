const PersonSchema = require("./PersonSchema");
Realm.Sync.User.login('http://localhost:9080', 'mactiencong@gmail.com', '123456', (error, user) => {
    if(error) console.log(error);
    else {
        Realm.open({
            sync: {
                user: user,
                url: "realm://localhost:9080/~/persons"
            },
            schema: [PersonSchema]
        }).then(realm=>{
            console.log("Realm opened");      
            realm.objects("Person").addListener((person, changes)=>{
                console.log(changes);
                console.log(realm.objects("Person"));
            });
            realm.write(()=>{
                realm.create("Person", { id:randInt(), name: randString(), age: 29 });
                console.log("A person be created");
                console.log(realm.objects("Person"));
            });
        }).catch(err=>{ 
            console.log(err);
        });
    }
});
function randString() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function randInt(){
    return Math.floor(Math.random() * 10000) + 1;
}