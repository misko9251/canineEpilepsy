const deletePost = document.querySelectorAll('.fa-trash-can');
const message = document.getElementById('textAreaPost');
const counter = document.getElementById('counter');

if (window.location.href.indexOf("sortOldest") > -1){
    Array.from(deletePost).forEach((item)=>
    item.style.display = 'none');
}

message.addEventListener('input', function(e){
    const target = e.target;
    const maxLength = target.getAttribute('maxlength');
    const currentLength = target.value.length
    counter.innerHTML = `${currentLength}/${maxLength}`
    if(currentLength > 74){
        counter.style.color = 'orange'
    }if(currentLength >= maxLength){
        counter.style.color = 'red'
    }if(currentLength < 75){
        counter.style.color = 'black'
    }
})

Array.from(deletePost).forEach((item)=>{
    item.addEventListener('click', deleteEntry)
})


async function deleteEntry() {
    const postId = this.parentNode.dataset.id
    console.log(postId)
    try {
        const response = await fetch('petProfile/deletePost', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'postIdFromMongo': postId
            })
        })
        const data = await response.json()
        console.log(data);
        location.reload();  
    } catch (error) {
        console.log(error);
    }
}

