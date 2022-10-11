// const qrcode = new QRCode('qrcode')

async function getInvited() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  let id = params.id;

  const result = await fetch(`http://localhost:8000/invited/${id}`)
  const json = await result.json()

  document.getElementById('nombreAsistente'). value = json.name
}

getInvited()


async function sendForm() {
  const email = document.getElementById('emailAsistente').value
  const comment = document.getElementById('comentariosAsistente').value

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  let id = params.id;

  const sendData = await fetch(`http://localhost:8000/invited/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      isConfirmed: true,
      email,
      comment
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })

  const json = await sendData.json()
  return json
}

const getQR = () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  let id = params.id;
  new QRCode(document.getElementById("qrcode"), {
    text: `ornate-croquembouche-9ff131.netlify.app/confimation/${id}`,
    width: 128,
    height: 128,
    colorDark : "#000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
  });
}

getQR()