import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.cdnfonts.com/css/dm-sans');
* {

    margin: 0;
    padding: 0;
    box-sizing: border-box;
    line-height: 28px;
    font-family: "DM Sans";
    a{
        text-decoration: none;
        
    }
    button{
        background: none;

  border: none;
  cursor: pointer;
  
    }
    input{
        outline: none;
  border: none;
    
  }
    body{
        overflow: auto
    }
    *:focus {
  outline: none;
}
}

`;

export default GlobalStyles;
