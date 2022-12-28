import styled from 'styled-components';

export const Form = styled.form`
  margin-top: 10px;
`;

export const Input = styled.input`
  margin-bottom: 15px;
  width: 250px;
  border: 1px solid #ccc;
  &:hover,
  :focus {
    outline: 0;
    border-color: transparent;
    box-shadow: 0 0 3px #00bfff;
  }
`;

export const Button = styled.button`
  border: 1px solid #ccc;
`;

export const List = styled.ul`
  margin-left: 15px;
  list-style: circle;
`;

export const Item = styled.li`
  font-size: 14px;
  margin-bottom: 5px;
`;
