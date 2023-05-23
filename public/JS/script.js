
window.onload=function(){
    const mybtn = document.querySelector("#mybtn");
        mybtn.addEventListener("Click", () => {
            fetch("/",{
                method: "POST",
                body: JSON.stringify({
                    City: "Kolkata"
                })
            }).then((res) => {
                console.log(res)
            })
        })
}

   
