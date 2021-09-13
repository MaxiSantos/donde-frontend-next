import styled from 'styled-components';
import { useUser } from '../../../../hooks/useUser';
import { useCart } from '../../../../store/cartState';
import { CartStyles } from '../../elements/CartStyles';
import { CloseButton } from '../../elements/CloseButton';
import { Supreme } from '../../elements/Supreme';
import RemoveFromCart from './RemoveFromCart';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

function CartItem({ cartItem }) {
  const { product } = cartItem;
  if (!product) return null;
  return (
    <CartItemStyles>
      {/* <img
        width="100"
        src={product.photo.image.publicUrlTransformed}
        alt={product.name}
      /> */}
      <div>
        <h3>
          {product[0].name} - {cartItem.quantity}
        </h3>
        <p>
          {/* formatMoney(product.price * cartItem.quantity) */}-
          <em>{product[0].description}</em>
        </p>
      </div>
      <RemoveFromCart id={cartItem.id} />
    </CartItemStyles>
  );
}

export default function Cart() {
  const me = useUser();
  const { cartOpen, closeCart } = useCart();
  if (!me) return <p>no user</p>;
  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme>{me.name}'s Cart</Supreme>
        <CloseButton style={{ marginTop: '50px' }} onClick={closeCart}>
          &times;
        </CloseButton>
      </header>
      <ul>
        {me.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
    </CartStyles>
  );
}
