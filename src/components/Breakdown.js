

export default function Breakdown({ categoriesSum, isMobile }) {

	return (
		
		<div className={isMobile? "breakdown-mobile":"breakdown"}>
			BreakDown
		{categoriesSum.data?categoriesSum.data.map((category,index ) =>{return <div key={index} className="breakdownCategory"><strong>{category.name}</strong>: {category.sum} ש״ח</div>}):<p>No transactions added</p>}
		  
		</div>
	);
}
