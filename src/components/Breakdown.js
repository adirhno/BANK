

export default function Breakdown({ categoriesSum }) {
	
	return (
		<div className="breakdown">
			BreakDown
		
		{categoriesSum.length>0?categoriesSum.map((category,index ) =>{return <div key={index} className="breakdownCategory"><strong>{category.name}</strong>: {category.sum} ש״ח</div>}):<p>No transactions added</p>}
		  
		</div>
	);
}
