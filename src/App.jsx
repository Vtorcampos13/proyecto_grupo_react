import { useEffect, useState } from 'react';
import Digimon from './DigimonsComponent'

import './App.css'

function App() {
  const [digimonList, setDigimonList] = useState([])
  const [error, setError] = useState([])
  const [digimonData, setDigimonData] = useState([])
  const [currentUrl, setCurrentUrl] = useState('https://www.digi-api.com/api/v1/digimon?pageSize=20')
  const [nextUrl, setNextUrl] = useState(null)
  const [previousUrl, setPreviousUrl] = useState(null)

  useEffect(() => {
    setDigimonData([]);
    getDigimons();
  }, [currentUrl]);

  useEffect(() => {
    if (digimonList.length > 0) {
      getDigimonData();
    }
  }, [digimonList]);
  
  const getDigimonData = async () => {
    try {
      const data = await Promise.all(
        digimonList.map(async (digimon) => {
          const response = await fetch(digimon.href)
          const data = await response.json()
          return data
        })
      );
      console.log(data);
      setDigimonData(data)
    }
    catch (err) {
      setError("Algo salió mal")
    }
  }

  const getDigimons = async () => {
    try {
      const data = await fetch(currentUrl)
      const results = await data.json()
      console.log(results);

      setDigimonList(results.content)
      setNextUrl(results.pageable.nextPage)
      setPreviousUrl(results.pageable.previousPage)
    }
    catch(e) {
      setError("Algo salió peor")
      console.error(e)
    }
  }

  const goToNext = () => {
    setCurrentUrl(nextUrl);
  };

  const goToPrevious = () => {
    setCurrentUrl(previousUrl);
  };

  return (
    <>
      <header>
        <img className="logo" src="https://cdn.discordapp.com/attachments/1100831940199858298/1176645632656670740/Mesa_de_trabajo_1digipedia_logo.png?ex=656f9fa3&is=655d2aa3&hm=12ec828dcbcce6f0bd4e69274e5f0ceac5c9cfdfe632e4498ac513e462856adc&" alt="Logo de Digipedia" />
      </header>

      {/* Muestra un mensaje de error si se ha producido un error. */}
      {error && <p className="Error"> {error}</p>}

      {/* Muestra botones de navegación si hay datos de Pokémon y hay una página anterior o siguiente. */}
      {digimonData.length !== 0 && previousUrl && <button onClick={goToPrevious}>Previous</button>}
      {digimonData.length !== 0 && nextUrl && <button onClick={goToNext}>Next</button>}

      {/* Muestra un mensaje de carga si no hay datos de Pokémon. */}
      {digimonData.length === 0 && <p>Loading data...</p>}

      {/* Muestra la sección de contenedor de Pokémon, renderizando el componente 'Pokemon' para cada Pokémon en 'pokemonData'. */}
      <section className='digimon-container'>
        {digimonData.map((digimon) => (
          <Digimon key={digimon.id} data={digimon} />
        ))}
      </section>
    </>
  )
}

export default App
