import { DatePicker } from "@mui/x-date-pickers";
import React, { useState } from "react";
import axios from "axios";
import { API } from "../server/config";

export default function Breakdown({ categoriesSum }) {
	
	return (
		<div className="breakdown">
			BreakDown
		
		{categoriesSum.length>0?categoriesSum.map((category) =>{return <div className="breakdownCategory"><strong>{category.name}</strong>: {category.sum} ש״ח</div>}):<p>No transactions added</p>}
		  
		</div>
	);
}
