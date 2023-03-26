//import { useState } from 'react'

const TagInput = (props) => {
  const handleKeyDown = (e) => {
    if(e.key !== 'Enter') return
    const value = e.target.value
    if(!value.trim() || value.length === 0) {
      e.preventDefault()
      return
    }
    if(e.key == 'Enter' && value.trim && value.length > 0) {
      e.preventDefault()
      props.setTags([...props.tags, value])
      e.target.value = ''
    }
  }

  const removeTag = (e) => {
    const newTags = props.tags.filter((tag, index) => index !== parseInt(e.target.parentElement.id.split('_')[1]))
    props.setTags([...newTags])
  }

  return (
    <>
      <h2>Enter tags</h2>
      <div className="flex flex-row flex-wrap items-center border-2 p-3 rounded-sm gap-2">
        {props.tags.map((tag, index) => (
        <div className="bg-[#5b5b5b] text-white text-sm font-semibold p-2 rounded-2xl" id={`tag_${index}`} key={`tag_${index}`}>
          <span>{tag}</span>
          <span className="ml-1 cursor-pointer" onClick={removeTag} >&times;</span>
        </div>)
        )}
        <input onKeyDown={handleKeyDown} type="text" className="grow" placeholder="Add Tag" />
      </div>
    </>
  )
}

export default TagInput
