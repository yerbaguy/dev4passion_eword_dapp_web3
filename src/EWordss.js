import React, { useState } from 'react'

function EWordss() {

    const [eword, setEWord] = useState({
        engword: "",
        plword: ""
    })


    function submit(e) {

        e.preventDefault();
        console.log("engword", eword.engword);
        console.log("plword", eword.plword);
    }

    function handle(e) {

        const newData = { ... eword}
        newData[e.target.id] = e.target.value

        setEWord(newData)
        console.log("eword", eword.engword)
        console.log("eword", eword.plword)
        eword.engword = "";
        eword.plword = "";
    }


    return (
        <div>
            <form onSubmit={ (e) => submit(e)}>
                <input onChange = { (e) => handle(e)} id="engword" value = {eword.engword} placeholder='engword' type="text"/>
                <input onChange = { (e) => handle(e)} id="plword" value = {eword.plword} placeholder='plword' type="text" />
                <button>Submit</button>
            </form>
        </div>
    );
}

export default EWordss;