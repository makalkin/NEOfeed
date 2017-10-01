import styled from 'styled-components';
import Loader from './loader';

const size = 25;

const LoaderStyled = styled(Loader)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.bgColor || 'rgba(0, 0, 0, 0.2)'};
  z-index: 1200;
  .loader { 
    position: relative;
    left: 50%;
    top: ${props => props.yPosition || 30}%;
    width: 144px;
    background: #555;
    text-align: center;
    padding: 1em;
    margin-left: -72px;
    margin-top: -0.4em;
    border-radius: 10px;
    font-size: 14px;
    color: #fff;
    
    img {
      ${props => `width: ${props.size || size}px;`}
    }
  }
`;

export default LoaderStyled;
