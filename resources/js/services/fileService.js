module.exports.saveChanges = (data) => {
	axios.post('api/file/save', data).then(response => {
		var fileURL = window.URL.createObjectURL(new Blob(response.data));
		var fileLink = document.createElement('a');
		fileLink.href = fileURL;
		fileLink.setAttribute('download', 'file.json');
		document.body.appendChild(fileLink);
		fileLink.click();

		}).catch(err => console.log(err))
}