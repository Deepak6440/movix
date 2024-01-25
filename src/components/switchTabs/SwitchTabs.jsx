import React, { useState } from 'react'
import "../switchTabs/SwitchTabs.scss"

const SwitchTabs = ({data, onTabChnage}) => {
    const [selectedTabs, setSelectedTabs] = useState(0);
    const [left, setLeft] = useState(0);

    const activeTabs = (tab, index) =>{
        setLeft(index * 100);
        setTimeout(() =>{
            setSelectedTabs(index)
        }, 300);
    
        onTabChnage(tab, index)
    }

  return (
    <div className='switchingTabs'>
        <div className="tabItems">
            {data.map((tab, index) => (
            <span key={index} className={`tabItem ${selectedTabs === index ? "active" : ""}`} onClick={() => activeTabs(tab, index)}>
                {tab}
            </span>
            ))}
            <span className="movingBg" style={{left : left}}></span>
        </div>
    </div>
  )
}

export default SwitchTabs