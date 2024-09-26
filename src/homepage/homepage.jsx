import { useEffect, useState } from 'react';
import crown from '../assets/img/crown.png';
// import frame from '../assets/img/framee.png';
// import participant from '../assets/images/adisirin.jpg';
import axios from 'axios';
import socket from '../socket';

const styleGirlFrame = {
	position: 'absolute',
	top: '10px',
	left: '48%',
	transform: 'translate(-50%, -10%)',
	width: '700px',
	height: '550px',
};
const styleManFrame = {
	position: 'absolute',
	top: '50px',
	left: '50%',
	transform: 'translate(-50%, -10%)',
	width: '450px',
	height: '470px',
};

function Homepage() {
	const [data, setData] = useState({ left: [], right: [] });
	const [pScore, setpScore] = useState(null);
	const [image, setImage] = useState(null);
	const [frame, setFrame] = useState(null);

	async function getDbData() {
		const response = await axios.get(
			'https://tiktok-show-back.onrender.com/api/participants'
		);
		console.log(response.data);
		setpScore(response.data[0]);
	}

	const gender = localStorage.getItem('gender');
	console.log(gender);

	useEffect(() => {
		const savedData = localStorage.getItem('mainData');
		if (savedData) {
			setData(JSON.parse(savedData));
		}
		getDbData();

		const storedImage = localStorage.getItem('uploadedImage');
		if (storedImage) {
			setImage(storedImage);
		}
		const storedFrame = localStorage.getItem('uploadedFrame');
		if (storedFrame) {
			setFrame(storedFrame);
		}
	}, []);

	useEffect(() => {
		socket.on('gift', (data) => {
			getDbData();
			// setGiftData((prevGifts) => [data, ...prevGifts]);
		});
		// test();
		return () => {
			socket.off('message');
		};
	}, []);

	const handleItemClick = (value) => {
		const newData = {
			left: data.left.map((item) =>
				item.value === value ? { ...item, hidden: true } : item
			),
			right: data.right.map((item) =>
				item.value === value ? { ...item, hidden: true } : item
			),
		};

		setData(newData);
		localStorage.setItem('mainData', JSON.stringify(newData));
	};

	return (
		<>
			<div className='global'>
				<div className='container'>
					<div className='points-percents'>
						<div className='left'>
							{data.left.map(
								(obj, i) => (
									console.log(obj),
									(
										<div
											className='cold'
											key={i}
											onClick={() => handleItemClick(obj.value)}
											style={
												obj.hidden == true
													? { visibility: 'hidden' }
													: { visibility: 'visible' }
											}
										>
											<p>
												{obj.value}%
												{obj.value == 1 ? <img src={crown} alt='' /> : null}
											</p>
										</div>
									)
								)
							)}
						</div>
						<div className='right'>
							{data.right.map((obj, i) => (
								<div
									className='hot'
									key={i}
									onClick={() => handleItemClick(obj.value)}
									style={
										obj.hidden == true
											? { visibility: 'hidden' }
											: { visibility: 'visible' }
									}
								>
									<p>{obj.value}%</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className='participant'>
				<img
					className='frame'
					src={frame}
					alt=''
					style={gender == 'female' ? styleGirlFrame : styleManFrame}
				/>
				<div className='center-profil'>
					{image ? (
						<img className='main-img' src={image} alt='Yüklü Fotoğraf' />
					) : (
						<p>Henüz bir fotoğraf yüklenmedi.</p>
					)}
				</div>
			</div>
			<div className='points'>{pScore?.score}</div>
		</>
	);
}

export default Homepage;
