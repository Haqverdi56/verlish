import React, { useEffect, useState } from 'react';
import './adminpage.css';
import { Link } from 'react-router-dom';

function Adminpage({ mainData }) {
	const [data, setData] = useState(null);
	const [image, setImage] = useState(null);
	const [frame, setFrame] = useState(null);

	useEffect(() => {
		// localStorage'dan veriyi al
		const storedData = localStorage.getItem('mainData');
		if (storedData) {
			setData(JSON.parse(storedData));
		} else {
			// Eğer localStorage'da veri yoksa, default veriyi yükle

			localStorage.setItem('mainData', JSON.stringify(mainData));
			setData(mainData);
		}
	}, []);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImage(reader.result);
				localStorage.setItem('uploadedImage', reader.result); // Fotoğrafı localStorage'a kaydet
			};
			reader.readAsDataURL(file); // Fotoğrafı base64 formatında oku
		}
	};
	const handleFrameChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setFrame(reader.result);
				localStorage.setItem('uploadedFrame', reader.result); // Fotoğrafı localStorage'a kaydet
			};
			reader.readAsDataURL(file); // Fotoğrafı base64 formatında oku
		}
	};

	const handleClick = (index, column) => {
		if (data) {
			// console.log(index, column);
			const updatedData = { ...data };
			if(updatedData[column][index].hidden == true) {
				updatedData[column][index].hidden = false
			} else {
				updatedData[column][index].hidden = true;
			}

			// Güncellenen veriyi localStorage'a kaydet
			localStorage.setItem('mainData', JSON.stringify(updatedData));
			setData(updatedData); // State'i güncelle
		}
	};

	const handleReset = () => {
		if (data) {
			// Tüm hidden değerlerini false yap
			const resetData = {
				left: data.left.map((item) => ({ ...item, hidden: false })),
				right: data.right.map((item) => ({ ...item, hidden: false })),
			};

			// Güncellenen veriyi localStorage'a kaydet
			localStorage.setItem('mainData', JSON.stringify(resetData));
			setData(resetData); // State'i güncelle
		}
	};

	return (
		<div className='main-container'>
			<div className='admin-container'>
				<div className='reset-points'>
					<button onClick={() => handleReset()}>Reset...</button>
					<Link to="/homepage" className='screen-page-button'>Monitor</Link>
				</div>
				<div className='buttons-container'>
					<div className='left-column'>
						{Array.from({ length: 12 }).map((_, index) => (
							<button
								onClick={() => handleClick(index, 'left')}
								key={index}
								className='admin-button'
							>
								Button {data?.left[index].value}%
							</button>
						))}
					</div>
					<div className='right-column'>
						{Array.from({ length: 12 }).map((_, index) => (
							<button
								onClick={() => handleClick(index, 'right')}
								key={index + 12}
								className='admin-button'
							>
								Button {data?.right[index].value}%
							</button>
						))}
					</div>
				</div>
			</div>
			<div className='buttons-main'>
				<div>
					Şəkil
					<input type='file' accept='image/*' onChange={handleImageChange} />
					{image && (
						<div>
							<h3>İştirakçının şəkili:</h3>
							<img
								src={image}
								alt='Yüklenen'
								style={{
									width: '150px',
									marginTop: '10px',
									maxHeight: '200px',
								}}
							/>
						</div>
					)}
				</div>
				<div> 
					<input type='file' accept='image/*' onChange={handleFrameChange} />
					{frame && (
						<div>
							<h3>İştirakçının çərçivəsi:</h3>
							<img
								src={frame}
								alt='Yüklenen'
								style={{
									width: '150px',
									marginTop: '10px',
									maxHeight: '200px',
								}}
							/>
						</div>
					)}
				</div>
				<div className='gender-type'>
					<button onClick={() => localStorage.setItem('gender', 'male')}>
						Kişi
					</button>
					<button onClick={() => localStorage.setItem('gender', 'female')}>
						Qadın
					</button>
				</div>
			</div>
		</div>
	);
}

export default Adminpage;
