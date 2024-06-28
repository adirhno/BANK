import axios from "axios";
import { API } from "../server/config";
import { Snackbar } from "@material/react-snackbar";
import "@material/react-snackbar/dist/snackbar.css";
import { useState } from "react";

export default function Breakdown({ categoriesSum, isMobile, balance }) {
	const email = localStorage.getItem("userEmail");
	const [snackbarStatus, setSnackStatus] = useState("");
	const sendMail = function(){
		axios.post(`${API}/breakdown/`, {email, balance, sub:"breakdown", content: categoriesSum.data},{ withCredentials:true }).then(()=>{setSnackStatus("mailSent")}).catch(()=>{setSnackStatus("error")})
	}
	
	return (
		<div className={isMobile ? "breakdown-mobile" : "breakdown"}>
			BreakDown
			{categoriesSum.data <1 ?<></>:<span className="sendToMail">
				<button onClick={() => {sendMail()}}>send to mail</button>
			</span>}
			{categoriesSum.data?categoriesSum.data.map((category,index ) =>{return <div key={index} className="breakdownCategory"><strong>{category.name}</strong>: {category.sum} ש״ח</div>}):<p>No transactions added</p>}
			{snackbarStatus == "mailSent"?  <Snackbar message="breakdown sent to email" actionText="dismiss"/>:<></>}
		</div>
	);
}
