import styled from 'styled-components';

export default function SortBy({ options }) {
  const Ul = styled.ul`
    color: #888;
    position: relative;
    overflow-x: hidden;
    overflow-y: hidden;
    margin: 0 4px 8px 0;
    padding: 0px;
    max-height: 300px;
  `;

  const Li = styled.li`
    margin: 0;
    padding: 9px 10px;
    list-style: none;
    line-height: 15px;
    word-wrap: break-word;
    cursor: pointer;
  `;
  console.log({ options });
  return (
    <Ul>
      {options.map((option) => (
        <Li key={option.value}>{option.label}</Li>
      ))}
    </Ul>
  );
}
