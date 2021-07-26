import StyledExperience from './StyledExperience';
import photoName from '../../assets/allExp.jpg';
import { Rating } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';

function Experiece({ idExp, name, city, price }) {
  const history = useHistory();

  const routeChange = () => {
    let path = `/experience/${idExp}`;
    history.push(path);
  };
  const value = 0;
  console.log(name, city, price);
  return (
    <StyledExperience onClick={routeChange}>
      <div className="fotoExperience">
        <img src={photoName} alt="fotoExperience" />
      </div>
      <div className="expDescription">
        <h3>{name}</h3>
        <span>{city}</span>
        <Rating
          name="hover-feedback"
          value={value}
          precision={1}
          //   onChange={(event, newValue) => {
          //     setValue(newValue);
          //   }}
          //   onChangeActive={(event, newHover) => {
          //     setHover(newHover);
          //   }}
        />
        {/* {value !== null && (
          <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>
        )} */}

        <span className="priceAllExperience">{price}</span>
      </div>
    </StyledExperience>
  );
}
export default Experiece;
