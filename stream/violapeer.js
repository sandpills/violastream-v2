window.addEventListener('load', (event) => {
    let peer = new Peer('viola');
    let vid = document.querySelector('.remoteVideo');
    let renderVideo = (stream) => {
        vid.scrObject = stream;
    };

    let myStream;


    peer.on('open', function(id) {
        console.log(id);
        document.getElementById("show-peer").innerHTML = id
    })

    peer.on('connection', (conn) => {
        // logMessage('incoming peer connection!');
        conn.on('data', (data) => {
          // logMessage(`received: ${data}`);
        });
        conn.on('open', () => {
          conn.send('hello!');
        });
      });

    peer.on('call', function(call) {
        navigator.mediaDevices.getUserMedia({
            video:true, 
            audio:true
        }).then((stream) => {
            call.answer(stream)
            // call.on('stream')

        }).catch((err) => {
            console.log(err + " unable to get media")
        })
    })

});