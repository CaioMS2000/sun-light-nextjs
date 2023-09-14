import {useState} from 'react';
import {mask, unMask} from 'remask';
import {Button} from 'react-bootstrap';
import {Form as BSForm} from 'react-bootstrap';
import {MdUploadFile} from 'react-icons/md';
import emailjs from '@emailjs/browser';

import "../../css/form/style.css";
import data from '../../info.json';

function SendEmail(e){
  e.preventDefault()

  const params = {};

  params['from_name'] = document.querySelector('#name').value
  params['email'] = document.querySelector('#email').value
  params['message'] = `Dados do cliente:\nEndereço: ${document.querySelector('#address').value}\nTelefone: ${document.querySelector('#phone').value}\n`
  params['message'] += document.querySelector('#checkbox').checked?'este número tambem usa Whatsapp\n':'este número não usa Whatsapp\n'
  params['message'] += `Mensagem: ${document.querySelector('#message').value}`

  console.log(params)

  emailjs.send(data.email['service-id'], data.email['template-id'], params, data.email['public-key']).then( response => {
    console.log("Email enviado", response.status, response.text)
  }, error => {
    console.log("ERRO", error)
  })
}

const Form = () => {
  const [value, setValue] = useState('')

  function inputChange(event){
    setValue(mask(unMask(event.target.value), ['99999,99']))
  }

  return (
    <BSForm onSubmit={SendEmail}>
      <BSForm.Group className="mb-3 form-group" controlId="name">
        <BSForm.Label>Nome</BSForm.Label>
        <BSForm.Control type="text" placeholder="Digite seu nome completo" />
      </BSForm.Group>

      <BSForm.Group className="mb-3 form-group" controlId="email">
        <BSForm.Label>Email</BSForm.Label>
        <BSForm.Control type="email" placeholder="Escreva seu email" />
      </BSForm.Group>

      <BSForm.Group className="mb-3 form-group" controlId="address">
        <BSForm.Label>Endereço</BSForm.Label>
        <BSForm.Control type="text" placeholder="Digite seu endereço" />
      </BSForm.Group>

      <BSForm.Group className="mb-3 form-group" controlId="phone">
        <BSForm.Label>Celular</BSForm.Label>
        <BSForm.Control type="tel" placeholder="Digite seu número" />
      </BSForm.Group>

      <BSForm.Group className="mb-3 form-group" controlId="checkbox">
        <BSForm.Check type="checkbox" label="Este número também é Whatsapp" />
      </BSForm.Group>

      <BSForm.Group className="mb-3 form-group" controlId="message">
        <BSForm.Label>Mensagem</BSForm.Label>
        <BSForm.Control as="textarea" placeholder="Digite sua mensagem..."
        style={{
          resize: "none",
          height: "6rem"
        }}
        />
      </BSForm.Group>

      {/* <BSForm.Group className="mb-3 form-group d-flex flex-column" controlId="bill">
        <BSForm.Label>Qual o valor da sua conta de luz atualmente ?</BSForm.Label>
        <div className="wrapper d-flex align-content-center">
          <div className='symbol'>R$</div><BSForm.Control onChange={inputChange} type="text" placeholder="0,00" value={value} />
        </div>
      </BSForm.Group> */}

      <Button variant="success" type="submit">
        Enviar
      </Button>
    </BSForm>
  );
}
// function Form() {
//   return (
//     <BSForm>
//       <BSForm.Group className="mb-3" controlId="formBasicEmail">
//         <BSForm.Label>Email address</BSForm.Label>
//         <BSForm.Control type="email" placeholder="Enter email" />
//         <BSForm.Text className="text-muted">
//           We'll never share your email with anyone else.
//         </BSForm.Text>
//       </BSForm.Group>

//       <BSForm.Group className="mb-3" controlId="formBasicPassword">
//         <BSForm.Label>Password</BSForm.Label>
//         <BSForm.Control type="password" placeholder="Password" />
//       </BSForm.Group>
//       <BSForm.Group className="mb-3" controlId="formBasicCheckbox">
//         <BSForm.Check type="checkbox" label="Check me out" />
//       </BSForm.Group>
//       <Button variant="primary" type="submit">
//         Submit
//       </Button>
//     </BSForm>
//   );
// }

export default Form;