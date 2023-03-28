import {useState, useCallback} from 'react'

export default function useInput(initial = null){
  const [value, setValue] = useState(initial)

  const onChangeValue = useCallback((e) =>{
     setValue(e.target.value)
  },[])

  return [value, onChangeValue]
}