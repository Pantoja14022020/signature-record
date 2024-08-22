import React, { useEffect, useRef, useState } from 'react';

const BoardSignature = () =>
{
    const videoRef = useRef(null);
    const videoAux = useRef(null)
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);


    const canvasTestRef = useRef(null)//borrar


    useEffect(()=>{
        if(canvasRef != null && videoAux != null && videoRef != null && canvasTestRef!=null)
        {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const video = videoRef.current;

            const firmacanvas = canvasTestRef.current;

            const setupVideoStream = async () => {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                    video.srcObject = stream;

                    // Ajustar el tamaño del canvas al tamaño del video
                    video.onloadedmetadata = () => {
                        video.play();
                    };

                    // Función de actualización para dibujar el video en el lienzo
                    const drawFrame = () => {
                        if (video.paused || video.ended) return;
                        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                        ctx.drawImage(firmacanvas, 0, 0, canvas.width, canvas.height);
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

            //ctx.fillStyle = "white";
            //ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

            var videoStream = canvasRef.current.captureStream(30);
            var mediaRecorder = new MediaRecorder(videoStream);
            var chunks = [];
            console.log(mediaRecorder)
            mediaRecorder.ondataavailable = function(e) {
                chunks.push(e.data);
            };
            console.log(chunks)
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

        return () => 
        {
            const stream = videoRef.current?.srcObject;
            if (stream) 
            {
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            }
        };

    },[canvasRef])












    //Funciones
    //Estas funciones corresponden en el trazo de dibujo en el canva, cada una corresponde a un evento determinado en el canva
    const startDrawing = (e) => {
        const canvas = canvasTestRef.current;
        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 3; //Aqui defino el ancho del pincel o trazo
        ctx.lineJoin = 'round'; //Animacion de cuando se unen las lineas con otras
        ctx.lineCap = 'round'; //Animacion cuando termina el trazo
        ctx.beginPath();
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        setIsDrawing(true);
    };
    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasTestRef.current;
        const ctx = canvas.getContext('2d');
        const { offsetX, offsetY } = getClientPosition(e, canvas);
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
    };
    const stopDrawing = () => {
        setIsDrawing(false);
        const canvas = canvasTestRef.current;
        const ctx = canvas.getContext('2d');
        ctx.closePath();
    };
    const clearCanvas = () => {
        const canvas = canvasTestRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    const getClientPosition = (e, canvas) => {
        
        let rect = canvas.getBoundingClientRect();
        let scaleX = canvas.width / rect.width;
        let scaleY = canvas.height / rect.height;
        let x, y;
        if (e.touches) 
        {
            // Para eventos táctiles en el telefono
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
        } else {
            // Para eventos del ratón en la computadora
            x = e.clientX;
            y = e.clientY;
        }
        x = (x - rect.left) * scaleX;
        y = (y - rect.top) * scaleY;
        return { offsetX: x, offsetY: y };

    };








    return(
        <>
            <div style={{ textAlign: 'center', position:'relative', width:'400px', height:'300px'}}>
                <canvas ref={canvasRef} width={400} height={300} style={{ display: 'block', margin: '0 auto', position:'absolute', top:'0', left:'0'}} /*onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing} onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing} onTouchCancel={stopDrawing}*//>
                <video ref={videoRef} style={{ display: 'none'}}/>
                <canvas ref={canvasTestRef} width={400} height={300} style={{ display: 'block', margin: '0 auto', position:'absolute', top:'0', left:'0'}} onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing} onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing} onTouchCancel={stopDrawing}/>
            </div>
            <button onClick={clearCanvas} style={{ marginTop: '10px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer'}}>Limpiar</button>
            <video ref={videoAux} autoPlay controls width={300} height={300} style={{marginTop:'1rem'}}></video>
        </>
    )




}

export default BoardSignature;