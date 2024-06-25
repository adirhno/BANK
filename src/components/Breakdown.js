import axios from "axios";
import { API } from "../server/config";


export default function Breakdown({ categoriesSum, isMobile }) {
const email = localStorage.getItem("userEmail")
	const sendMail = function(){
		axios.post(`${API}/breakdown/`, {email, sub:"breakdown", text:categoriesSum.data},{ withCredentials:true })
	}

	return (
		
		<div className={isMobile? "breakdown-mobile":"breakdown"}>
			BreakDown
			<button onClick={()=>{sendMail()}}>pdf</button>
		{categoriesSum.data?categoriesSum.data.map((category,index ) =>{return <div key={index} className="breakdownCategory"><strong>{category.name}</strong>: {category.sum} ש״ח</div>}):<p>No transactions added</p>}
		  
		</div>
	);
}
