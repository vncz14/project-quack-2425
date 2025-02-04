'use client'
import { Button } from "@/components/ui/button"
import { useEffect, useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Dispatch } from "react"

type edit_actions_type = {
  username: string,
  password: string,
  email: string,
  first_name: string,
  last_name: string,
  [key: string]: any
}

type prop = {
  name: string,
  obj_key: string, // the corresponding database column name,
  value: string,
  input_type: string // default= 'text'
  dispatch: Dispatch<{type: string, paylod: string}>
}
export function Editable(prop: prop) {
  const isMounted = useRef(false)
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(prop.value)

  const edit_actions: edit_actions_type = {
    username: 'EDIT_USERNAME',
    password: 'EDIT_PASSWORD',
    email: 'EDIT_EMAIL',
    first_name: 'EDIT_FIRST_NAME',
    last_name: 'EDIT_LAST_NAME',
  }

  useEffect(() => {
    if (isMounted.current && !isEditing) {
      prop.dispatch({type: edit_actions[prop.obj_key], payload: value})
    }
    return () => {
      isMounted.current = true;
    }
  }, [isEditing])

  return (
    <li className="flex items-center mb-1">
      {prop.name}: {isEditing ? <Input type={prop.input_type} className="h-6 w-30 ml-1" value={value} onChange={e => setValue(e.target.value)}/> : <> {value} </>}

      <Button className="ml-auto" variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
        <svg width="21px" height="21px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 10L14 6M18 10L21 7L17 3L14 6M18 10L17 11M14 6L8 12V16H12L14.5 13.5M20 14V20H12M10 4L4 4L4 20H7" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Button>
    </li>
  )
}