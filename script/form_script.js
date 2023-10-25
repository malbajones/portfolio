const btn1 = document.querySelector('button')
const inputs = document.querySelector('form')
btn1.addEventListener('click', () => {
  Email.send({
    SecureToken: '7c61bb5e-e287-4c79-a70f-3d301a02e63b',
    To: 'mm4jones@gmail.com',
    From: inputs.elements['email'].value,
    Subject: 'Contact Us Query by the Customer',
    Body: inputs.elements['message'].value,
  }).then((msg) => alert('The email successfully sent'))
})
