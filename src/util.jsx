



function Upload(){
    return <div>
        <input name="brand" placeholder="brand" id="brand"></input>
        <input name="name" placeholder="name" id="name"></input>
        <input name="image" placeholder="image" id="image"></input>
        <input name="year" placeholder="year" id="year"></input>
        <input name="price" placeholder="price" id="price"></input>
        <input name="address" placeholder="address" id="address"></input>
        <input name="meters" placeholder="meters" id="meters"></input>
        <Features/>
    </div>
}


function Features(){
    return <div>
        <input id="icon" name="icon" placeholder="icon"></input>
        <input id="description" name="description" placeholder="description"></input>
    </div>
}

export default Upload