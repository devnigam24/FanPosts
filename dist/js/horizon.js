(function(window){
    var App = window.App;
    var horizon = Horizon();
    window.horizon = horizon;
    
    horizon.onReady(function() {
        document.querySelector('h1').innerHTML = 'exampleAPP works!';
    });
})(window);

function horizonStore(horizon,collectionName){
    horizon.connect();
    const chat = horizon(collectionName);
    let message = {
        text: "What a beautiful horizon!",
        datetime: new Date(),
        author: "@dalanmiller"
    }
    chat.store(message);
}

function horizonFetch(horizon,collectionName){
    horizon.connect();
    const chat = horizon(collectionName);
    chat.fetch().subscribe(
        (items) => {
            items.forEach((item) => {
                console.log(item);
            })
        },
        (err) => {
            console.log(err);
    });
}