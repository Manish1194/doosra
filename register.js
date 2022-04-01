
//used to register the user and driver

//i am assuming here all the details are coming in a single
//object name registerationPayload
function register(registerationPayload){

    let email = registerationPayload.email;
    let passwd = encryptPasswd(registerationPayload.passwd);
    let name = registerationPayload.name;
    let type = registerationPayload.type; // it is bool varibale true = driver and false = passenger



    users.insert({ // this db call is insering new entry in users collection
        "email" : email,
        "passwd" : passwd,
        "name" : name,
        "type" : type,
    });

}