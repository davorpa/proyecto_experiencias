import StyledShop from './StyledShop';
import Button from '../button/Button';
import ItemShop from './ItemShop';
import { Form } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';

import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
function Shop() {
  let history = useHistory();
  const [checked, setChecked] = useState();
  const [error, setError] = useState();
  console.log('post', checked);
  const expInfo = useLocation();

  const { setCartExperience, cartExperience, token } = useContext(UserContext);
  console.log(cartExperience);
  console.log('shop', expInfo.data);
  const itemsStorage = localStorage.getItem('infoCart');
  const itemsMap = JSON.parse(itemsStorage);
  console.log('st', itemsMap);
  function goToHome() {
    history.push('/experiences');
  }
  function isChecked(string) {
    if (string === 'email') {
      setChecked('Para continuar tu viaje, revisa tu email.');
    } else if (string === 'post') {
      setChecked(
        'En unos días, recibiras el paquete para continuar con tu viaje.'
      );
    } else if (string === 'present') {
      setChecked('Tu regalo ha sido enviado.');
    }
  }

  let mappedItems = cartExperience !== [] ? cartExperience : itemsMap;
  console.log('mp', mappedItems);
  useEffect(() => {
    if (cartExperience === []) {
      setCartExperience(expInfo?.data);
    } else if (
      expInfo?.data !== undefined &&
      cartExperience !== expInfo?.data
    ) {
      const item = [...cartExperience, expInfo?.data];
      setCartExperience(item);
    }
  }, [expInfo.data, setCartExperience]);
  function removeItem(array, index) {
    let arrayItems = array;
    console.log('aaaaa', index, arrayItems);
    if (arrayItems.length === 1) {
      setCartExperience([]);
    } else {
      setCartExperience(arrayItems.splice(index - 1, 1));
    }
    /*  history.go(0); */
  }

  return (
    <StyledShop>
      <section className="bookingInfo">
        {mappedItems &&
          mappedItems?.map((item, index) => (
            <ItemShop
              key={index}
              name={item?.exp.nombre}
              description={item?.exp.descripcion}
              photo={item?.exp.photos[0].photo}
              precio={item?.exp.precio}
              date={item?.date}
              remove={removeItem}
              index={index}
            />
          ))}
      </section>

      <section className="searchShop">
        <h4>Por favor seleccione el metodo de envio:</h4>
        <Form className="sendType">
          <Form.Group className="checkboxForm">
            <Form.Check
              type="radio"
              name="envio"
              id="email"
              onChange={() => isChecked('email')}
            />
            <Form.Label htmlFor="email">Vía Email</Form.Label>
          </Form.Group>
          <Form.Group className="checkboxForm">
            <Form.Check
              type="radio"
              name="envio"
              id="post"
              onChange={() => isChecked('post')}
            />
            <Form.Label htmlFor="post">Vía Postal</Form.Label>
          </Form.Group>
          <Form.Group className="checkboxForm">
            <Form.Check
              type="radio"
              name="envio"
              id="present"
              onChange={() => isChecked('present')}
            />
            <Form.Label htmlFor="present">Para Regalo</Form.Label>
          </Form.Group>
          <div className="buttonsShop">
            {error && <span>{error}</span>}
            <Button
              blue
              onClickButton={(e) => {
                e.preventDefault();
                if (token && checked) {
                  alert(checked);
                  setError();
                  setCartExperience([]);
                  goToHome();
                } else if (!token) {
                  setError('Debes estar registrado para finalizar tu compra');
                } else if (token && !checked) {
                  setError('Debes seleccionar un metodo de envío');
                }
              }}
            >
              Comprar
            </Button>

            <Button onClickButton={() => goToHome()}>Seguir comprando</Button>
          </div>
        </Form>
      </section>
    </StyledShop>
  );
}

export default Shop;
