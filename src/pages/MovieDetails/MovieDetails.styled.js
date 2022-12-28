import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Button = styled(Link)`
  display: inline-block;
  padding: 3px 10px;
  margin-left: 3px;
  margin-bottom: 2px;
  border-radius: 2px;
  border: 1px solid #ccc;
  color: black;
  font-size: 12px;
  text-decoration: none;
`;

export const Container = styled.div`
  display: flex;
  padding-bottom: 5px;
  margin-bottom: 15px;
  border-bottom: 1px solid #ccc;
`;

export const ImageHolder = styled.div`
  padding: 2px;
  width: 30vw;
`;

export const Image = styled.img`
  display: block;
  width: 100%;
`;

export const InfoHolder = styled.div`
  padding: 10px;
  width: 70vw;
`;

export const Title = styled.p`
  margin-bottom: 15px;
  margin-top: 15px;
  font-size: 16px;
  font-weight: bold;
`;

export const Score = styled.p`
  margin-bottom: 15px;
  font-size: 14px;
`;

export const Overview = styled.p`
  margin-bottom: 15px;
  font-size: 14px;
  font-weight: bold;
`;

export const Text = styled.p`
  margin-bottom: 15px;
  font-size: 14px;
`;

export const Genres = styled.p`
  margin-bottom: 15px;
  font-size: 14px;
  font-weight: bold;
`;

export const ListGenres = styled.ul`
  display: flex;
  list-style: none;
`;

export const ItemGenre = styled.li`
  margin-right: 5px;
  font-size: 14px;
`;

export const AddInfo = styled.p`
  margin-bottom: 15px;
  margin-left: 5px;
  font-size: 14px;
`;

export const List = styled.ul`
  border-bottom: 1px solid #ccc;
  padding-bottom: 15px;
`;

export const Item = styled.li`
  margin-left: 25px;
  font-size: 14px;
  margin-bottom: 5px;
`;
