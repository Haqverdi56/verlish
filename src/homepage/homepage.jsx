import { useEffect, useState } from 'react';
import crown from '../assets/img/crown.png';
import frame from '../assets/img/framee.png';
import participant from '../assets/images/eliehmedli.jpg';
import axios from 'axios';

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


function Homepage() {
    const [data, setData] = useState({ left: [], right: [] });
    const [pScore, setpScore] = useState(null)

    useEffect(() => {
        const savedData = localStorage.getItem('myData');
        if (savedData) {
            setData(JSON.parse(savedData));
        }
		getDbData()
    }, []); 

	async function getDbData() {
		const response = await axios.get('http://localhost:3000/api/participants');
		console.log(response.data[12]);
		setpScore(response.data[12])
	}

    const handleItemClick = (value) => {
        const newData = {
            left: data.left.map(item =>
                item.value === value ? { ...item, hidden: true } : item
            ),
            right: data.right.map(item =>
                item.value === value ? { ...item, hidden: true } : item
            )
        };

        setData(newData);
		localStorage.setItem('myData', JSON.stringify(newData));
    };

	return (
		<>
			<div className='global'>
				<div className='container'>
					<div className='points-percents'>
						<div className='left'>
							{data.left.map((obj, i) => (
                                <div className='cold' key={i} onClick={() => handleItemClick(obj.value)} style={obj.hidden == true ? {visibility:'hidden'} : {visibility:"visible"}}>
                                    <p>
                                        {obj.value}%
                                    </p>
                                </div>
                            ))}
						</div>
						<div className='right'>
							{data.right.map((obj, i) => (
                                <div className='hot' key={i} onClick={() => handleItemClick(obj.value)} style={obj.hidden == true ? {visibility:'hidden'} : {visibility:"visible"}}>
                                    <p>
                                        {obj.value}%
                                    </p>
                                </div>
                            ))}
						</div>
					</div>
				</div>
			</div>
			<div className='participant'>
				<img className='frame' src={frame} alt='' />
				<div className='center-profil'>
					<img className='main-img' src={participant} alt='' />
				</div>
			</div>
			<div className='points'>{pScore?.score}</div>
		</>
	);
}

export default Homepage;
