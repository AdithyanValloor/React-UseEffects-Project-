import React, {useEffect,useState} from 'react'
import logo from './assets/titleLogo.png'
import axios from 'axios'

function RickAndMorty() {

    const [data, setData] = useState([])
    const [category, setCategory] = useState('character')
    const [error, setError] = useState()

    useEffect(()=>{

       ( async ()=>{

            try {
                
                const response =  await axios.get(`https://rickandmortyapi.com/api/${category}`)
                setData(response.data.results)

            } catch (error) {

                setError('Failed to get data')

            }    

        })()


    },[category])


    const handleCategory = (e) => {
        setCategory(e.target.value)
    }

  return (
    <div className='container'>
      <header>
        <img src = {logo} alt="" style={{height:150}}/>
      </header>
      <div className='display-box'>
        <select className='select' onChange={handleCategory}>
            <option value="character">Characters</option>
            <option value="episode">Episodes</option>
            <option value="location">Locations</option>
        </select>
        
        {error && <p>{error}</p>}

        <ul style={{listStyle:'none'}}>
            {data.map((data,index)=>{
                return <li key={data.id}>{data.id}. {data.name}</li>
            })}
        </ul>
      </div>
    </div>
  )
}

export default RickAndMorty
