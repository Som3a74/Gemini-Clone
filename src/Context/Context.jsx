import { createContext, useState } from "react";
import runChat from "../Config/gemini";

export const Context = createContext()

const ContextProvider = (props) => {
    // data come from user
    const [input, setinput] = useState('')
    // save user data to show it in face
    const [recentPrompt, setrecentPrompt] = useState('')
    // save data history and to show it an sidebar 
    const [prevPrompt, setprevPrompt] = useState([])
    // remove static face and show data 
    const [showResult, setshowResult] = useState(false)
    // loading hhh
    const [loading, setloading] = useState(false)
    // show response
    const [resultData, setresultData] = useState(false)



    //بتاعها index انت هنا بيتبعتلك الكلمه اللي هتتعرض بال
    //هنا وظيفته انه ياخر كل كلمه من انها تتعرض لو شلته هيظهر الكلام كله مره واحده index ال 
    const delayPara = (index , nextWord) =>{
        setTimeout(() => {
            setresultData((prev) => prev + nextWord)
        }, 75*index);
    }


    const newChat =()=>{
        setloading(false)
        setshowResult(false)
    }

    const onSend = async (prompt) =>{
        setresultData('')
        setloading(true)
        setshowResult(true)
        let response ; 
        if (prompt !== undefined) {
            response = await runChat(prompt)
            setrecentPrompt(prompt)
        } else {
            setprevPrompt((prev)=>[...prev,input])
            setrecentPrompt(input)
            response = await runChat(input)
        }
        
        let responseArray = response.split('**')
        let newResponse="";

        for (let i = 0; i < responseArray.length; i++) {
            // بتقوله اول عنصر في المصفوفه و اي عنصر يقبل القسمه علي 2 حطهم جمله عاديه ليه لان انت فوق مقسمهم علي حسب ** البتاع ده و هو بيكون قبل الكلمات المفتاحيه ف انت ديما هتكون المصفوفه عندك جمله عاديه و جمله مفتاحيه ف انت بتاخد الجمله العاديه وتقوله ضيفا زي مهي و الكلمه المفتاحيه خليها عريضه
            if (i === 0 || i%2 !== 1) {
                newResponse += responseArray[i]
            }
            // هنا زي مقولنا فوق انت هتاخد الجمل المفتاحيه وتخليها عريضه
            else{
                newResponse +='<b>'+responseArray[i]+'</b>'
            }
        }

        // </br>  بيفضل عنك بين الجمل * البتاع ده فبنقسم المصفوفه تاني ونشيله منها و بعدين برنجعها استرنج و بنفصل بين الجمل 
        let newResponse2 = newResponse.split('*').join('</br>')
        let newresponseArray = newResponse2.split(' ')
        for (let i = 0; i < newresponseArray.length; i++) {
            const nextWord = newresponseArray[i]     
            delayPara(i,nextWord+' ')       
        }
        setloading(false)
        setinput('')
    }

    const ContextValue = {
        prevPrompt,
        setprevPrompt,
        onSend,
        setrecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setinput,
        newChat,
    }
    return (
        <Context.Provider value={ContextValue}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider