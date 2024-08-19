/*import React, { useEffect, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas'


const App = () => {
  
  const canvasRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(()=>{
    if(canvasRef != null)
    {
      var colors = ["red", "blue", "yellow", "orange", "black", "white", "green"];
    
      const ctx = canvasRef.current.getContext("2d")
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      var videoStream = canvasRef.current.captureStream(30);
      var mediaRecorder = new MediaRecorder(videoStream);

      var chunks = [];
      mediaRecorder.ondataavailable = function(e) {
        chunks.push(e.data);
      };

      mediaRecorder.onstop = function(e) {
        var blob = new Blob(chunks, { 'type' : 'video/mp4' });
        chunks = [];
        var videoURL = URL.createObjectURL(blob);
        videoRef.current.src = videoURL;
      };
      mediaRecorder.ondataavailable = function(e) {
        chunks.push(e.data);
      };

      mediaRecorder.start();
      setTimeout(function (){ mediaRecorder.stop(); }, 5000);
      
    }
  },[canvasRef])




  return (
    <>
      <canvas ref={canvasRef} width="300" height="300"></canvas>
      <video ref={videoRef} autoPlay controls></video>
      <SignatureCanvas 
        penColor='green'
        canvasProps={{width: 500, height: 200, className: 'sigCanvas'}} 
      />
    </>
  );
};

export default App;*/
















//ESTE PODRIA SER UNA OPCION
/*import React, { useEffect, useRef, useState } from 'react';

const App = () => {

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    const startDrawing = (e) => {
        setIsDrawing(true);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.closePath();
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };



    useEffect(()=>{
      if(canvasRef != null && videoRef != null)
      {
        var colors = ["#ff000080"];
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        var videoStream = canvasRef.current.captureStream(30);
        var mediaRecorder = new MediaRecorder(videoStream);

        var chunks = [];
        mediaRecorder.ondataavailable = function(e) {
          chunks.push(e.data);
        };

        mediaRecorder.onstop = function(e) {
          var blob = new Blob(chunks, { 'type' : 'video/webm' });
          chunks = [];
          var videoURL = URL.createObjectURL(blob);
          videoRef.current.src = videoURL;
        };
        mediaRecorder.ondataavailable = function(e) {
          chunks.push(e.data);
        };

        mediaRecorder.start();
        setTimeout(function (){ mediaRecorder.stop(); }, 5000);
      }
    },[canvasRef])



    return (
        <div style={{ textAlign: 'center' }}>
            <canvas
                ref={canvasRef}
                width={600}
                height={400}
                style={{
                    border: '1px solid #000',
                    display: 'block',
                    margin: '0 auto',
                }}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
            />
            <button
                onClick={clearCanvas}
                style={{
                    marginTop: '10px',
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer'
                }}
            >
                Limpiar
            </button>
            <video ref={videoRef} autoPlay controls></video>
        </div>
    );
};

export default App;
*/




















/*import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const App = () => {
  const sigCanvas = useRef(null);

  const clear = () => {
    sigCanvas.current.clear();
  };

  const saveAsImage = () => {
    const canvas = sigCanvas.current.getCanvas();
    const image = canvas.toDataURL();
    // Puedes hacer algo con la imagen aquí
    console.log(image);
  };

  const startRecording = () => {
    const canvas = sigCanvas.current.getCanvas();
    const stream = canvas.captureStream(30); // 30 FPS
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
      // Aquí puedes guardar el video como un archivo o hacer algo con él
      const videoBlob = new Blob([event.data], { type: 'video/webm' });
      const url = URL.createObjectURL(videoBlob);
      console.log(url);
    };

    mediaRecorder.start();
    setTimeout(() => mediaRecorder.stop(), 5000); // Graba durante 5 segundos
  };

  return (
    <div>
      <SignatureCanvas ref={sigCanvas} penColor='black' canvasProps={{ width: 500, height: 300, className: 'sigCanvas' }} />
      <button onClick={clear}>Clear</button>
      <button onClick={saveAsImage}>Save as Image</button>
      <button onClick={startRecording}>Start Recording</button>
    </div>
  );
};

export default App;*/





/*import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const App = () => {
  const sigCanvas = useRef(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const clear = () => {
    sigCanvas.current.clear();
  };

  const saveAsImage = () => {
    const canvas = sigCanvas.current.getCanvas();
    const image = canvas.toDataURL();
    // Puedes hacer algo con la imagen aquí
    console.log(image);
  };

  const startRecording = () => {
    const canvas = sigCanvas.current.getCanvas();
    const stream = canvas.captureStream(1); // 30 FPS

    if (mediaRecorder) {
      mediaRecorder.stop(); // Detenemos cualquier grabación previa
    }

    const newMediaRecorder = new MediaRecorder(stream);
    const chunks = [];

    newMediaRecorder.ondataavailable = (event) => {
      chunks.push(event.data);
    };

    newMediaRecorder.onstop = () => {
      const videoBlob = new Blob(chunks, { type: 'video/webm' });
      const url = URL.createObjectURL(videoBlob);
      setVideoUrl(url);
    };

    newMediaRecorder.start();
    setMediaRecorder(newMediaRecorder);

    // Graba durante 5 segundos y luego detén la grabación
    setTimeout(() => newMediaRecorder.stop(), 5000);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <SignatureCanvas
          ref={sigCanvas}
          penColor='black'
          canvasProps={{ width: 500, height: 300, className: 'sigCanvas' }}
        />
        <button onClick={clear}>Clear</button>
        <button onClick={saveAsImage}>Save as Image</button>
        <button onClick={startRecording}>Start Recording</button>
      </div>
      <div style={{ marginLeft: '20px' }}>
        {videoUrl && (
          <video
            src={videoUrl}
            controls
            width="500"
            height="300"
            style={{ border: '1px solid black' }}
          />
        )}
      </div>
    </div>
  );
};

export default App;*/
































/*import React, { useRef, useEffect } from 'react';

const App = () => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const video = videoRef.current;

    const setupVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;

        // Ajustar el tamaño del canvas al tamaño del video
        video.onloadedmetadata = () => {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          video.play();
        };

        // Función de actualización para dibujar el video en el lienzo
        const drawFrame = () => {
          if (video.paused || video.ended) return;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          requestAnimationFrame(drawFrame); // Solicita el siguiente frame de animación
        };

        video.addEventListener('play', () => {
          drawFrame(); // Inicia la animación cuando el video comienza a reproducirse
        });

      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    setupVideoStream();

    // Limpieza del stream y eventos cuando el componente se desmonte
    return () => {
      const stream = videoRef.current?.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <video
        ref={videoRef}
        style={{ display: 'none' }} // Ocultar el elemento de video
      />
      <canvas
        ref={canvasRef}
        style={{ border: '1px solid black' }}
      />
    </div>
  );
};

export default App;*/



































































































/*import React, { useEffect, useRef, useState } from 'react';

const App = () => {

    const videoRef = useRef(null);
    const videoAux = useRef(null)
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    const startDrawing = (e) => {
        setIsDrawing(true);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.closePath();
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };



    useEffect(()=>{
      if(canvasRef != null && videoAux != null)
      {
        //var colors = ["#ff000080"];
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        //ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        //ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);


        







        //new
        const video = videoRef.current;
        const setupVideoStream = async () => {
          try {
              const stream = await navigator.mediaDevices.getUserMedia({ video: true });
              video.srcObject = stream;

              // Ajustar el tamaño del canvas al tamaño del video
              video.onloadedmetadata = () => {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                video.play();
              };

              // Función de actualización para dibujar el video en el lienzo
              const drawFrame = () => {
                if (video.paused || video.ended) return;
                ctx.drawImage(video, 0, 0, canvas.width-50, canvas.height);
                requestAnimationFrame(drawFrame); // Solicita el siguiente frame de animación
              };

              video.addEventListener('play', () => {
                drawFrame(); // Inicia la animación cuando el video comienza a reproducirse
              });

            } catch (error) {
              console.error('Error accessing camera:', error);
            }
        };
        setupVideoStream();











        var videoStream = canvasRef.current.captureStream(30);
        var mediaRecorder = new MediaRecorder(videoStream);

        var chunks = [];
        mediaRecorder.ondataavailable = function(e) {
          chunks.push(e.data);
        };

        mediaRecorder.onstop = function(e) {
          var blob = new Blob(chunks, { 'type' : 'video/webm' });
          chunks = [];
          var videoURL = URL.createObjectURL(blob);
          videoAux.current.src = videoURL;
        };
        mediaRecorder.ondataavailable = function(e) {
          chunks.push(e.data);
        };

        mediaRecorder.start();
        setTimeout(function (){ mediaRecorder.stop(); }, 5000);








        






      }



      //new
      return () => {
        const stream = videoRef.current?.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
        }
      };


      
    },[canvasRef])



    return (
        <div style={{ textAlign: 'center' }}>
            <canvas
                ref={canvasRef}
                width={600}
                height={400}
                style={{
                    border: '1px solid #000',
                    display: 'block',
                    margin: '0 auto',
                    position:'absolute',
                    zIndex:'6'
                }}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
            />
            <button
                onClick={clearCanvas}
                style={{
                    marginTop: '10px',
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer'
                }}
            >
                Limpiar
            </button>
            <video
              ref={videoRef}
              style={{ display: 'none' }} // Ocultar el elemento de video
            />
            <video ref={videoAux} autoPlay controls></video>

        </div>
    );
};

export default App;*/



































/*import React, { useRef, useEffect, useState } from 'react';

const App = () => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const video = videoRef.current;

    const setupVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.play();

        video.onloadedmetadata = () => {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          video.play();
        };

        // Función de actualización para dibujar el video en el lienzo
        const drawFrame = () => {
          if (video.paused || video.ended) return;

          // Redibuja el video en el fondo del lienzo
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          // Dibuja sobre el video
          drawOnCanvas();

          requestAnimationFrame(drawFrame);
        };

        video.addEventListener('play', drawFrame);

        // Configurar el grabador de medios
        const canvasStream = canvas.captureStream();
        const recorder = new MediaRecorder(canvasStream, { mimeType: 'video/webm' });
        setMediaRecorder(recorder);

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            const url = URL.createObjectURL(event.data);
            setVideoUrl(url);
          }
        };

        return () => {
          video.removeEventListener('play', drawFrame);
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
        };

      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    setupVideoStream();
  }, []);

  const drawOnCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (drawing && lastPosition) {
      const { x, y } = lastPosition;
      context.beginPath();
      context.moveTo(x.start, y.start);
      context.lineTo(x.end, y.end);
      context.strokeStyle = 'red'; // Color del trazo
      context.lineWidth = 5; // Ancho del trazo
      context.stroke();
      context.closePath();
    }
  };

  const startRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.start();
      setRecording(true);

      setTimeout(() => {
        mediaRecorder.stop();
        setRecording(false);
      }, 5000); // Graba durante 5 segundos
    }
  };

  const handleMouseDown = (event) => {
    setDrawing(true);
    setLastPosition({
      x: { start: event.nativeEvent.offsetX, end: event.nativeEvent.offsetX },
      y: { start: event.nativeEvent.offsetY, end: event.nativeEvent.offsetY }
    });
  };

  const handleMouseMove = (event) => {
    if (!drawing) return;

    const { offsetX, offsetY } = event.nativeEvent;
    setLastPosition((prev) => ({
      x: { start: prev.x.end, end: offsetX },
      y: { start: prev.y.end, end: offsetY }
    }));
    drawOnCanvas();
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  const handleMouseLeave = () => {
    if (drawing) {
      setDrawing(false);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div>
        <video
          ref={videoRef}
          style={{ display: 'none', position:'absolute', top: '0', left:'0', zIndex:'-1'}} // Ocultar el elemento de video
        />
        <canvas
          ref={canvasRef}
          style={{ border: '1px solid black'}}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        />
        <button onClick={startRecording} disabled={recording}>
          {recording ? 'Recording...' : 'Start Recording'}
        </button>
      </div>
      <div style={{ marginLeft: '20px' }}>
        {videoUrl && (
          <video
            src={videoUrl}
            controls
            style={{ border: '1px solid black', width: '500px' }}
          />
        )}
      </div>
    </div>
  );
};

export default App;*/





































/*import React, { useRef, useState, useEffect } from 'react';

const App = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    const [count, setCount] = useState(0)

    const startDrawing = (e) => {
        setIsDrawing(true);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.beginPath(); // Start a new path
        ctx.strokeStyle = '#000'; // Color of the line
        ctx.lineWidth = 3; // Thickness of the line
        ctx.lineJoin = 'round'; // Smooth joins between lines
        ctx.lineCap = 'round'; // Smooth ends of lines
        
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY); // Move to the start point
        
        console.log("startDrawing")
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY); // Draw to the current mouse position
        ctx.stroke(); // Render the stroke
        console.log("draw");
    };

    const stopDrawing = () => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.closePath(); // End the current path
        setIsDrawing(false);
        console.log("stopDrawing")
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
        console.log("clearCanvas")
    };

    useEffect(() => {
        if (canvasRef.current && videoRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const videoStream = canvas.captureStream(30); // Capture at 30 FPS
            const mediaRecorder = new MediaRecorder(videoStream, { mimeType: 'video/webm' });

            let chunks = [];
            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunks.push(e.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'video/webm' });
                chunks = [];
                const videoURL = URL.createObjectURL(blob);
                videoRef.current.src = videoURL;
            };

            mediaRecorder.start();
            setTimeout(() => mediaRecorder.stop(), 5000); // Stop recording after 5 seconds
        }
    }, [canvasRef]);

    return (
        <div style={{ textAlign: 'center' }}>
            <canvas
                ref={canvasRef}
                width={600}
                height={400}
                style={{
                    border: '1px solid #000',
                    display: 'block',
                    margin: '0 auto',
                }}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
            />
            <button
                onClick={clearCanvas}
                style={{
                    marginTop: '10px',
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer'
                }}
            >
                Limpiar
            </button>
            <video ref={videoRef} autoPlay style={{ marginTop: '20px', width: '600px' }} />
        </div>
    );
};

export default App;*/


























/*import React, { useEffect, useRef, useState } from 'react';

const App = () => {

    const videoRef = useRef(null);
    const videoAux = useRef(null)
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    const startDrawing = (e) => {
        setIsDrawing(true);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.lineWidth = 3; // Thickness of the line
        ctx.lineJoin = 'round'; // Smooth joins between lines
        ctx.lineCap = 'round'; // Smooth ends of lines
        ctx.beginPath();
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.closePath();
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };



    useEffect(()=>{
      if(canvasRef != null && videoAux != null)
      {
        //var colors = ["#ff000080"];
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);


        







        //new
        const video = videoRef.current;
        const setupVideoStream = async () => {
          try {
              const stream = await navigator.mediaDevices.getUserMedia({ video: true });
              video.srcObject = stream;

              // Ajustar el tamaño del canvas al tamaño del video
              video.onloadedmetadata = () => {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                video.play();
              };

              // Función de actualización para dibujar el video en el lienzo
              const drawFrame = () => {
                if (video.paused || video.ended) return;
                ctx.drawImage(video, 0, 0, canvas.width-50, canvas.height);
                requestAnimationFrame(drawFrame); // Solicita el siguiente frame de animación
              };

              video.addEventListener('play', () => {
                drawFrame(); // Inicia la animación cuando el video comienza a reproducirse
              });

            } catch (error) {
              console.error('Error accessing camera:', error);
            }
        };
        setupVideoStream();











        var videoStream = canvasRef.current.captureStream(30);
        var mediaRecorder = new MediaRecorder(videoStream);

        var chunks = [];
        mediaRecorder.ondataavailable = function(e) {
          chunks.push(e.data);
        };

        mediaRecorder.onstop = function(e) {
          var blob = new Blob(chunks, { 'type' : 'video/webm' });
          chunks = [];
          var videoURL = URL.createObjectURL(blob);
          videoAux.current.src = videoURL;
        };
        mediaRecorder.ondataavailable = function(e) {
          chunks.push(e.data);
        };

        mediaRecorder.start();
        setTimeout(function (){ mediaRecorder.stop(); }, 5000);








        






      }



      //new
      return () => {
        const stream = videoRef.current?.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
        }
      };


      
    },[canvasRef])



    return (
        <div style={{ textAlign: 'center' }}>
            <canvas
                ref={canvasRef}
                width={600}
                height={400}
                style={{
                    border: '1px solid #000',
                    display: 'block',
                    margin: '0 auto',
                    position:'absolute',
                    zIndex:'6',
                    backgroundColor:"#fff"
                }}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
            />
            <button
                onClick={clearCanvas}
                style={{
                    marginTop: '10px',
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer'
                }}
            >
                Limpiar
            </button>
            <video
              ref={videoRef}
              style={{ display: 'none', backgroundColor:"#fff"}} // Ocultar el elemento de video
            />
            <video ref={videoAux} autoPlay controls></video>

        </div>
    );
};

export default App;*/






















































import React, { useEffect, useRef, useState } from 'react';

const App = () => {

    const videoRef = useRef(null);
    const videoAux = useRef(null)
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    const startDrawing = (e) => {
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.lineWidth = 3; // Thickness of the line
        ctx.lineJoin = 'round'; // Smooth joins between lines
        ctx.lineCap = 'round'; // Smooth ends of lines
        ctx.beginPath();
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.closePath();
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };



    useEffect(()=>{
      if(canvasRef != null && videoAux != null && videoRef != null)
      {
        //var colors = ["#ff000080"];
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        







        //new
        const video = videoRef.current;
        const setupVideoStream = async () => {
          try {
              const stream = await navigator.mediaDevices.getUserMedia({ video: true });
              video.srcObject = stream;

              // Ajustar el tamaño del canvas al tamaño del video
              video.onloadedmetadata = () => {
                /*canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;*/
                video.play();
              };

              // Función de actualización para dibujar el video en el lienzo
              const drawFrame = () => {
                if (video.paused || video.ended) return;
                ctx.drawImage(video, 0, 0, canvas.width/2, canvas.height/2);
                requestAnimationFrame(drawFrame); // Solicita el siguiente frame de animación
              };

              video.addEventListener('play', () => {
                drawFrame(); // Inicia la animación cuando el video comienza a reproducirse
              });

            } catch (error) {
              console.error('Error accessing camera:', error);
            }
        };
        setupVideoStream();






        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);




        var videoStream = canvasRef.current.captureStream(30);
        var mediaRecorder = new MediaRecorder(videoStream);

        var chunks = [];
        mediaRecorder.ondataavailable = function(e) {
          chunks.push(e.data);
        };

        mediaRecorder.onstop = function(e) {
          var blob = new Blob(chunks, { 'type' : 'video/webm' });
          chunks = [];
          var videoURL = URL.createObjectURL(blob);
          videoAux.current.src = videoURL;
        };
        mediaRecorder.ondataavailable = function(e) {
          chunks.push(e.data);
        };

        mediaRecorder.start();
        setTimeout(function (){ mediaRecorder.stop(); }, 5000);








        






      }



      //new
      return () => {
        const stream = videoRef.current?.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
        }
      };


      
    },[canvasRef])



    return (
        <div style={{ textAlign: 'center', position:'relative'}}>
            <canvas
                ref={canvasRef}
                width={300}
                height={300}
                style={{
                    border: '1px solid #000',
                    display: 'block',
                    margin: '0 auto',
                    position:'absolute',
                    zIndex:'6',
                    backgroundColor:"red"
                }}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
            />
            {/*<button
                onClick={clearCanvas}
                style={{
                    marginTop: '10px',
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer'
                }}
            >
                Limpiar
            </button>*/}
            <video
              ref={videoRef}
              style={{ display: 'none', backgroundColor:"#fff", position:'absolute', zIndex:'0'}} // Ocultar el elemento de video
            />
            {/*<video ref={videoAux} autoPlay controls></video>*/}

        </div>
    );
};

export default App;