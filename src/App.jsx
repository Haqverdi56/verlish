import { useState } from 'react';
import Homepage from './homepage/homepage';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Adminpage from './adminpage/adminpage';

const mainData = {
	left: [
		{ value: 1, degree: 'cold', hidden: false },
		{ value: 3, degree: 'cold', hidden: false },
		{ value: 5, degree: 'cold', hidden: false },
		{ value: 7, degree: 'cold', hidden: false },
		{ value: 9, degree: 'cold', hidden: false },
		{ value: 11, degree: 'cold', hidden: false },
		{ value: 13, degree: 'cold', hidden: false },
		{ value: 15, degree: 'cold', hidden: false },
		{ value: 17, degree: 'cold', hidden: false },
		{ value: 19, degree: 'cold', hidden: false },
		{ value: 21, degree: 'cold', hidden: false },
		{ value: 23, degree: 'cold', hidden: false },
	],
	right: [
		{ value: 25, degree: 'hot', hidden: false },
		{ value: 27, degree: 'hot', hidden: false },
		{ value: 29, degree: 'hot', hidden: false },
		{ value: 31, degree: 'hot', hidden: false },
		{ value: 33, degree: 'hot', hidden: false },
		{ value: 35, degree: 'hot', hidden: false },
		{ value: 40, degree: 'hot', hidden: false },
		{ value: 50, degree: 'hot', hidden: false },
		{ value: 60, degree: 'hot', hidden: false },
		{ value: 70, degree: 'hot', hidden: false },
		{ value: 80, degree: 'hot', hidden: false },
		{ value: 90, degree: 'hot', hidden: false },
	],
};

function App() {
	return (
		<>
			{/* <Homepage mainData={mainData} /> */}
			<Routes>
				<Route path='/' element={<Adminpage mainData={mainData} />} />
				<Route path='/homepage' element={<Homepage mainData={mainData} />} />
			</Routes>
		</>
	);
}

export default App;
