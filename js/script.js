

let endOfThePage = 0;

let preloading = false;



const showPreloader = () => {

  let preloader = document.getElementById('preloader');
  preloader.style.display = 'block';
  preloading = true;

}

const hidePreloader = () => {

  let preloader = document.getElementById('preloader');
  preloader.style.display = 'none';
  preloading = false;

}



const getData = () => {


  if (!preloading) {

    showPreloader();

    fetch('https://akademia108.pl/api/ajax/get-users.php')
      .then(res => res.json())
      .then(data => {

        let body = document.body;
        let hr = document.createElement('hr')
        body.appendChild(hr)

        for (let user of data) {

          let pID = document.createElement('p')
          let pName = document.createElement('p')
          let pWebsite = document.createElement('p')

          pID.innerText = `User ID: ${user.id}`;
          pName.innerText = `User Name: ${user.name}`;
          pWebsite.innerHTML = `User URL: ${user.website} <br>--------`;



          body.appendChild(pID)
          body.appendChild(pName)
          body.appendChild(pWebsite)


        }
        preloading = false;
        hidePreloader();
      })
      .catch(error => {

        console.error(error);

      })


  }

}

const scrollToEndOfPage = () => {

  let d = document.documentElement;

  let scrollHeight = d.scrollHeight;

  let scrollTop = d.scrollTop;

  let clientHeight = d.clientHeight;

  let sumScrollTopScrollHeight = Math.ceil(clientHeight + scrollTop);

  if (sumScrollTopScrollHeight >= scrollHeight) {

    endOfThePage += 1;

    getData();
  }
}

window.addEventListener('scroll', scrollToEndOfPage)