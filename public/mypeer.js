window.addEventListener('load', (event) => {
    let peer = new Peer();
    // let myStream;
    let vidList = [];

    peer.on('open', function(id) {
        console.log(id);
        // callPeer('viola'); // stream while logging on
    })

    document.getElementById("call-peer").addEventListener('click', (e) => {
        document.getElementById("title").innerHTML = "connecting to violastream..."
        callPeer('viola');
    })

    function callPeer(id) {
        navigator.mediaDevices.getUserMedia(
            {video:true, 
            audio:true
        }).then((stream) => {
            myStrem = stream
            let call = peer.call('viola', stream)
            call.on('stream', function(violaStream){
                if (!vidList.includes(call.peer)) { // only show their video
                    addVideo(violaStream)
                    vidList.push(call.peer)
                }
            })
        // }).catch((err) => {
        //     console.log(err + " unable to get media")
        })
    }

    function addVideo(stream) {
        let video = document.createElement("video");
        video.srcObject = stream;
        video.play()
        document.getElementById("content").append(video)
    }
});