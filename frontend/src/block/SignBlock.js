import styled from 'styled-components';
const StyledBody = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  text-decoration: none;
  background-color: #fafafa;
`;

const StyledLoginForm = styled.form`
  position: relative;
  width: 300px;
  padding: 10px 10px;
  background-color: #ffffff;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 15px;

  img {
    width: 60%;
    height: 20%;
    text-align: center;
    margin: 5px;
  }
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset;
    box-shadow: 0 0 0 1000px white inset;
  }
  .idForm {
    border-bottom: 2px solid #adadad;
    margin: 30px;
    padding: 10px 10px;
  }

  .pwForm {
    border-bottom: 2px solid #adadad;
    margin: 30px;
    padding: 10px 10px;
  }
  .pwConfirmForm {
    border-bottom: 2px solid #adadad;
    margin: 30px;
    padding: 10px 10px;
  }

  .id {
    width: 100%;
    border: none;
    outline: none;
    color: #636e72;
    font-size: 16px;
    height: 25px;
    background: none;
  }

  .pw {
    width: 100%;
    border: none;
    outline: none;
    color: #636e72;
    font-size: 16px;
    height: 25px;
    background: none;
  }

  .pwConfirm {
    width: 100%;
    border: none;
    outline: none;
    color: #636e72;
    font-size: 16px;
    height: 25px;
    background: none;
  }

  .btn {
    position: relative;
    left: 40%;
    transform: translateX(-50%);
    margin-bottom: 40px;
    width: 80%;
    height: 40px;
    background: linear-gradient(125deg, #81ecec, #6c5ce7, #81ecec);
    background-position: left;
    background-size: 200%;
    color: white;
    font-weight: bold;
    border: none;
    cursor: pointer;
    transition: 0.4s;
    display: inline;
  }

  .btn:hover {
    background-position: right;
  }
`;

const SignBlock = ({ children, onSubmit }) => {
  return (
    <StyledBody>
      <StyledLoginForm onSubmit={onSubmit}>{children}</StyledLoginForm>
    </StyledBody>
  );
};

export default SignBlock;
