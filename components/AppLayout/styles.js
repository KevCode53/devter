import css from "styled-jsx/css"
import { breakpoints } from "../../styles/theme"

export default css`
  div {
    display: grid;
    height: 100vh;
    place-items: center;
  }

  main {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%;
  }
  @media (prefers-color-scheme: dark) {
    main {
      background: #131313;
      box-shadow: 0 10px 25px rgba(255, 255, 255, 0.1);
    }
  }

  @media (min-width: ${breakpoints.mobile}) {
    main {
      height: 90vh;
      width: ${breakpoints.mobile};
    }
  }
`
