import React from 'react';

class SubmitQuestionAudio extends React.Component {
	state = {
		audioRecorder: {},
		src: null,
		chunks: {}
	}

	componentDidMount() {
		this.createAudioRecorder();
	}

	createAudioRecorder = () => {
		navigator.mediaDevices.getUserMedia({
			audio: true,
			video: false
		})
			.then(stream => {
				const audioRecorder = new MediaRecorder(stream);
				audioRecorder.onstop = this.sendBlob;
				audioRecorder.ondataavailable = this.handleIncomingAudio;
				this.setState({ audioRecorder: audioRecorder })
			})
			.catch(err => {
				console.log(`The following gUM error occured: ${err}`);
			});
	}

	handleIncomingAudio = (event) => {
		console.log('setting event data to state - chunk');
		this.setState({ chunks: [event.data], src: URL.createObjectURL(event.data) });
	}
	
	sendBlob = () => {
		this.getSignedURL()
			.then(data => data.json())
			.then(res => {
				const audioBlob = new Blob(this.state.chunks);
				return fetch(res.signedUrl, {
					method: 'PUT',
					body: audioBlob
				})
			})
			.then(console.log)
			.catch(console.log)
	}

	getSignedURL = () => { return fetch('http://localhost:3002/s3/sign?objectName=robotmitch') }
	
	startRecording = () => {
		console.log('start the recording...');
		this.state.audioRecorder.start();
	}

	stopRecording = () => {
		console.log('stop the recording...');
		this.state.audioRecorder.stop();
	}


	render() {
		const { src } = this.state;
		return (
			<div>
				<h1>Submit new Question</h1>
					<audio controls src={src} />
					<button type="start" onClick={this.startRecording} >Start</button>
					<button type="stop" onClick={this.stopRecording} >Stop</button>
			</div>
		)
	}
}

export default SubmitQuestionAudio;