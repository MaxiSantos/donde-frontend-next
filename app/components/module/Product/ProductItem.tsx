import PropTypes from 'prop-types';
import Link from 'next/link';
import { Item } from '../../elements/Grid';
import Title from '../../elements/Title';

export default function ProductItem({ item }) {
  return (
    <Item key={item.id}>
      {/* <img src={item?.photo?.image?.publicUrlTransformed} alt={item.name} /> */}
      <img src="/images/cafe.jpg" alt={item.name} />
      <Title>
        <Link href={`/product/${item.id}`}>
          <p>{item.name}</p>
        </Link>
      </Title>
      {item.category.name} {item.description}
      <div className="buttonList">
        <Link
          href={{
            pathname: '/update',
            query: {
              id: item.id,
            },
          }}
        >
          Edit
        </Link>
      </div>
    </Item>
  );
}

ProductItem.propTypes = {
  item: PropTypes.object,
};
