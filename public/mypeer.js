window.addEventListener('load', (event) => {
    let peer = new Peer();
    let myStream;
    let vidList = [];

    peer.on('open', function(id) {
        document.getElementById("show-peer").innerHTML = id
    })

    peer.on('call', function(call) {
        navigator.mediaDevices.getUserMedia({
            video:true, 
            audio:true
        }).then((stream) => {
            myStrem = stream
            call.answer(stream)
            call.on('stream', function(violaStream){
                addVideo(violaStream)
            })
        }).catch((err) => {
            console.log(err + " unable to get media")
        })
    })

    document.getElementById("call-peer").addEventListener('click', (e) => {
        let remotePeerId = document.getElementById("peerID").value;
        document.getElementById("title").innerHTML = "connecting to violastream..."
        callPeer(remotePeerId);
    })

    function callPeer(id) {
        navigator.mediaDevices.getUserMedia({
            video:true, 
            audio:true
        }).then((stream) => {
            myStrem = stream
            let call = peer.call(id, stream)
            call.on('stream', function(violaStream){
                if (!vidList.includes(call.peer)) { // only show my video
                    addRemoteVideo(violaStream)
                    vidList.push(call.peer)
                }
            })
        }).catch((err) => {
            console.log(err + " unable to get media")
        })
    }

    function addVideo(stream) {
        let video = document.createElement("video");
        video.srcObject = stream;
        video.play()
        document.getElementById("content").append(video)
    }
});