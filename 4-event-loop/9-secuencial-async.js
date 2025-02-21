console.log("Inici de les funcions");

//Funció que demana el JSON d'un usuari
function getUser(userId) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => {
      if (!response.ok) throw new Error("Error a l'obtenir l'usuari");
      return response.json();
    });
}

//Funció per obtenir els posts d'un usuari
function getPosts(userId) {
  return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then(response => {
      if (!response.ok) throw new Error("Error al obtenir els posts");
      return response.json();
    });
}

//Funció per obtenir els comentaris d'un post
function getComments(postId) {
  return fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    .then(response => {
      if (!response.ok) throw new Error("Error al obtenir comentaris del post");
      return response.json();
    });
}

async function fetchOrderDetails() {
  try {
    const user = await getUser(1);
    const posts = await getPosts(user.id);
    //Per obtenir l'array de comentaris, primer fem un array en que cada element és una
    //promesa que obté tots els comentaris del post corresponent.
    //Després, el Promise.all obté la matriu de promesa generada anteriorment,
    //i espera a que la resta es generin.
    const comments = await Promise.all(posts.map(post => getComments(post.id)));

    //Baixem el nivell del JSON a 1 perquè els comentaris estàn dividits per cada post
    const commentsflattened = comments.flat();

    console.log("Comentaris dels posts creats per l'usuari " + user.id + ":", commentsflattened);

    //Ordenem els mateix comentaris obtinguts anteriorment ordenats pel valor "id"
    //de manera decreixent
    const commentssorted = commentsflattened.sort(function (first, second) {
      if (first.postId < second.postId) {
        return 1;
      } else {
        return -1;
      }
    });

    console.log("Mateixos comentaris ordenats de manera inversa:", commentssorted);

    //Filtrem dels comentaris obtinguts, només els que son enviats pel correu especificat
    const commentsfiltered = commentsflattened.filter(function (comment) {
      if (comment.email ==='Preston_Hudson@blaise.tv') {
        return true
      }
    })
    console.log("Comentaris generats per l'usuari amb el correu Preston_Hudson@blaise.tv:", commentsfiltered);


    console.log("Fi");
  } catch (error) {
    console.error("Error:", error);
  }
}

console.log("Inici del programa principal");

fetchOrderDetails();



