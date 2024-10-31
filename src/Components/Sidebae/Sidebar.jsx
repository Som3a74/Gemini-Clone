import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from './../../assets/assets';
import { Context } from '../../Context/Context';

export default function Sidebar() {

    const [extended, setextended] = useState(false)
    const { onSend, prevPrompt, setrecentPrompt ,newChat } = useContext(Context)

    const loadPrompt = async (prompt) =>{
        setrecentPrompt(prompt)
        await onSend(prompt)
    }


    return (
        <div className='sidebar'>
            <div className='top'>
                <img onClick={() => setextended((prev) => !prev)} className='menu' src={assets.menu_icon} alt="" />
                <div onClick={() => newChat()} className='new-chat'>
                    <img src={assets.plus_icon} alt="" />
                    {extended ? <p>New chat</p> : null}
                </div>
            </div>
            {extended ?
                <div className='recent'>
                    <p className='recent-title'>Recent</p>
                    {prevPrompt.map((item, index) => {
                        return (
                            <div onClick={()=> loadPrompt(item)} key={index} className='recent-entry'>
                                <img src={assets.message_icon} alt="" />
                                <p>{item.slice(0,18)}...</p>
                            </div>
                        )
                    })}
                </div>
                : null}
            <div className='bottom'>
                <div className='bottom-item recent-entry'>
                    <img src={assets.question_icon} alt="" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className='bottom-item recent-entry'>
                    <img src={assets.history_icon} alt="" />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className='bottom-item recent-entry'>
                    <img src={assets.setting_icon} alt="" />
                    {extended ? <p>Setting</p> : null}
                </div>
            </div>
        </div>
    )
}
