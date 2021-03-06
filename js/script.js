document.querySelector('.darkmode-btn').addEventListener('click', () => {
	document.body.classList.toggle('body-darkmode');
	document.querySelectorAll('svg').forEach(el => el.classList.toggle('svg-darkmode'));
});

axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
	.then((result) => {
		const { data } = result;

		if (data.media_type === 'image') {
			document.querySelector('.video-wrapper').style.display = 'none';
			document.querySelector('.image-wrapper').setAttribute('href', data.hdurl);
			document.querySelector('.image').setAttribute('alt', data.title);
			document.querySelector('.image').setAttribute('src', data.url);
		} else {
			document.querySelector('.image-wrapper').style.display = 'none';
			document.querySelector('.video').setAttribute('src', data.url);
		}

		if ('copyright' in data) {
			document.querySelector('.copyright').textContent = `Image Credit and Copyright: ${data.copyright}`;
		} else {
			document.querySelector('.copyright').textContent = 'Public Domain';
		}

		const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		const todayDate = new Date(data.date);
		const formatDate = d => `${monthNames[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

		document.querySelector('.title').textContent = data.title;
		document.querySelector('.loading').style.display = 'none';
		document.querySelector('.date').textContent = formatDate(todayDate);
		document.querySelector('.explanation').textContent = data.explanation;
		})

	.catch(() => {
		document.querySelector('.heading').textContent = 'An error has occurred. Refresh the page.';
		document.querySelector('.loading').style.display = 'none';
	});
