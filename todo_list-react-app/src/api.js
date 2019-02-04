const ApiUrl = '/api/todos/';

export async function getTodos(){
     // can check this initially by going to the Network tab in the dev tools and clicking on the todos
     return fetch(ApiUrl)
     .then(response => {
         if (!response.ok) {
             // error handling 
             if (response.status >= 400 && response.status < 500) {
                 return response.json().then(data => {
                     let err = { errorMessage: data.message };
                     throw err;
                 })
             } else {
                 let err = { errorMessage: 'Please try again later' };
                 throw err;
             }
         }
         return response.json();
     })
}

export async function createTodo(value){
    fetch(ApiUrl, {
        //    fetch's default call is GET, so we had to specify POST below
           method: 'post', 
           headers: new Headers({
               'Content-Type': 'application/json'
           }),
        //    It will look to add a name, so we set the name to the value we are getting from the input
           body: JSON.stringify({name: value})
       })
       .then(response => {
        if (!response.ok) {
            // error handling 
            if (response.status >= 400 && response.status < 500) {
                return response.json().then(data => {
                    let err = { errorMessage: data.message };
                    throw err;
                })
            } else {
                let err = { errorMessage: 'Please try again later' };
                throw err;
            }
        }
        return response.json();
    })
}

export async function removeTodo(id){
    const deleteUrl = ApiUrl + id;
    return fetch(deleteUrl, {
        method: 'delete', 
    })
    .then(response => {
     if (!response.ok) {
         if (response.status >= 400 && response.status < 500) {
             return response.json().then(data => {
                 let err = { errorMessage: data.message };
                 throw err;
             })
         } else {
             let err = { errorMessage: 'Please try again later' };
             throw err;
         }
     }
     return response.json();
 })
}

export async function updateTodo(todo){
    const updateUrl = ApiUrl + todo._id;
        return fetch(updateUrl, {
               method: 'put', 
               headers: new Headers({
                'Content-Type': 'application/json'
               }),
               body: JSON.stringify({completed: !todo.completed})
           })
           .then(response => {
            if (!response.ok) {
                if (response.status >= 400 && response.status < 500) {
                    return response.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                } else {
                    let err = { errorMessage: 'Please try again later' };
                    throw err;
                }
            }
            return response.json();
        })
}