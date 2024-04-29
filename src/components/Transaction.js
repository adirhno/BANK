import Button from "./Button";
import {deleteTransaction} from '../server/apiManager'

export default function Transaction({ transaction, fetchData, isMobile }) {
const currUser = localStorage.getItem("userEmail")
	const handleDeleteTransaction= async (id) =>{
		if(window.confirm("are you sure you want to delete?")){
		 await deleteTransaction(id).then(()=>fetchData(currUser))
		}
	}

	return (
		<div className={isMobile?"transaction mobile":"transaction"}>
			<div className="leftContent">
			<span className="transactionVendor">{transaction.vendor}</span>
			{transaction.amount < 0? <span className="red">{transaction.amount}</span>:<span className="green">{transaction.amount}</span>}
			</div>
			<div className="rightContent">
			<span className="transactionCategory">{transaction.category}</span>
			<Button className='deleteBtn' transaction={transaction} handleDeleteTransaction={handleDeleteTransaction} action={'Delete'}></Button>
			</div>
			<div className="transactionDate"> {transaction.createdAt}</div>
		</div>
	);
}
