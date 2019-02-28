var randomID = function(){
    var id = '';
    for(var i=0; i<10; i++){
        id += Math.floor(Math.random()*10);
    }
    return id;
}

module.exports = randomID;