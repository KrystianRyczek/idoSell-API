const { fetchDate,
        fetchNewDate,
        fetchUpdateDate, 
      } =require("./dateServices")


  const get = async () => {

    try{
      const date = await fetchDate()
      return date[0]
    }catch(error){
      console.log(error)
    }
    
  }

  const create = async (newDate) => {

    const date = {date: newDate}   
    try{
      const lastUpdateDate = await fetchNewDate(date)
      console.log('lastUpdateDate', lastUpdateDate)
       
    }catch(error){
      console.log(error)
    }

  }
  const update = async (pastDate, curentDate) => {

    const filter ={date: pastDate}
    const newDate ={date: curentDate}

    try{
      await fetchUpdateDate(filter, newDate)

    }catch(error){
      console.log(error)

    }
  }

  module.exports = {
    get,
    create,
    update,
  }