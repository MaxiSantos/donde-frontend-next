import PropTypes from 'prop-types';
import Link from 'next/link';
import Item from './styles/Item';
import Title from './styles/Title';

export default function StoreItem({ item }) {
  return (
    <Item key={item.id}>
      <img src={item?.photo?.image?.publicUrlTransformed} alt={item.name} />
      <Title>
        <Link href={`/store/${item.id}`}>
          <p>{item.name}</p>
        </Link>
      </Title>
      {item.name} - {item.location}
    </Item>
  );
}

StoreItem.propTypes = {
  item: PropTypes.object,
};
