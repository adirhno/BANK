import axios from "axios";
import { createPdf } from "../apiManager";


export default function Breakdown({ categoriesSum, isMobile }) {
	const user = localStorage.getItem("user");
	console.log(user)
	const handlePdf = function(){
	createPdf(user);
	}

	return (
		
		<div className={isMobile? "breakdown-mobile":"breakdown"}>
			BreakDown
			<button onClick={()=>{handlePdf()}}>pdf</button>
		{categoriesSum.data?categoriesSum.data.map((category,index ) =>{return <div key={index} className="breakdownCategory"><strong>{category.name}</strong>: {category.sum} ש״ח</div>}):<p>No transactions added</p>}
		  
		</div>
	);
}
