import AllExperiences from '../../components/allexperiences/AllExperiences';
import { getAxios } from '../../axiosCalls';
import { useEffect, useState } from 'react';

function Aventuras() {
  const [catAventure, setCatAventure] = useState([]);
  const [selectFilter,setSelectFilter] = useState('');

  const orderType = selectFilter.split('-').splice(0,1).join('');
  const orderDirection = selectFilter.split('-').splice(1,1).join('');

  useEffect(() => {

    async function getVueloFiltered() {

      try {
        const { data } = await getAxios(
          `http://localhost:8080/experiences?cat=Aventura${
            selectFilter && `&order=${orderType}&orderDir=${orderDirection}`
          }`
        );
        
        if(selectFilter) {
          setCatAventure(data);
        };
  
        setCatAventure(data);
      } catch (error) {
          console.error(error.message);
      }
    }
    
    getVueloFiltered();

  }, [selectFilter, orderType, orderDirection]);

  return (
    < >
        {catAventure && <AllExperiences data={catAventure} order={selectFilter} onChangeSelect={(e) => setSelectFilter(e.target.value)}/>}
    </>
  );
}
export default Aventuras;
