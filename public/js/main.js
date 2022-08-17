const deletePost = document.querySelectorAll('.fa-trash-can');

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