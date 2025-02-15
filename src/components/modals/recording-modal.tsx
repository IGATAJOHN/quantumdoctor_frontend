'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Mic, MicOff, Video, VideoOff, Play, Pause, RotateCcw } from 'lucide-react'
// import WaveSurfer from 'wavesurfer.js'

interface RecordingModalProps {
  type: 'audio' | 'video'
}

// TODO: Fix WaveSurfer implementation for waveform on recorded audio @code-sensei

const RecordingModal = ({ type }: RecordingModalProps) => {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [recordedMediaURL, setRecordedMediaURL] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const mediaChunks = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout>()
  const mediaRef = useRef(null)
  const waveformRef = useRef(null)
  //   const wavesurferRef = useRef(null)
  //.  let wavesurfer

  useEffect(() => {

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      if (recordedMediaURL) {
        URL.revokeObjectURL(recordedMediaURL)
      }
      //if (wavesurfer) {
        //wavesurfer.destroy()
      //}
    }
  }, [recordedMediaURL])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: type === 'video'
      })

      const recorder = new MediaRecorder(stream)
      setMediaRecorder(recorder)

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          mediaChunks.current.push(e.data)
        }
      }

      recorder.onstop = () => {
        const blob = new Blob(mediaChunks.current, {
          type: type === 'video' ? 'video/webm' : 'audio/webm'
        })
        const url = URL.createObjectURL(blob)
        setRecordedMediaURL(url)
        mediaChunks.current = []

        //if (type === 'audio' && waveformRef.current) {
          //wavesurfer = WaveSurfer.create({
            //container: waveformRef.current || '#waveform',
            //waveColor: '#004BA8',
            //progressColor: '#000000',
            //cursorColor: 'navy',
            //barWidth: 2,
            //barRadius: 3,
            //cursorWidth: 1,
            //height: 100,
            //barGap: 3,
          //})

          //wavesurfer.load(url)
       // }
      }

      recorder.start()
      setIsRecording(true)
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    } catch (error) {
      console.error('Error accessing media devices:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop()
      mediaRecorder.stream.getTracks().forEach(track => track.stop())
      setIsRecording(false)
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }

  const handlePlayPause = () => {
    //if (type === 'audio' && wavesurfer) {
      //wavesurfer.playPause()
      //setIsPlaying(wavesurfer.isPlaying())
    //} else 
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.pause()
      } else {
        mediaRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleReset = () => {
    //if (type === 'audio' && wavesurfer) {
      //wavesurfer.stop()
      //setIsPlaying(false)
    //} else 
    if (mediaRef.current) {
      mediaRef.current.currentTime = 0
      mediaRef.current.pause()
      setIsPlaying(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full" size="lg">
          {type === 'audio' ? <Mic className="w-4 h-4 mr-2" /> : <Video className="w-4 h-4 mr-2" />}
          Record {type === 'audio' ? 'Voice Note' : 'Video'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Record {type === 'audio' ? 'Voice Note' : 'Video'}</DialogTitle>
          <DialogDescription>
            {isRecording
              ? `Recording in progress: ${formatTime(recordingTime)}`
              : recordedMediaURL
                ? "Review your recording below"
                : `Click the button below to start recording your ${type === 'audio' ? 'voice note' : 'video'}`
            }
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          {recordedMediaURL ? (
            <>
              {type === 'audio' ? (
                <div ref={waveformRef} id='waveform' className="w-full h-24" />
              ) : (
                <video ref={mediaRef} src={recordedMediaURL} className="w-full" controls />
              )}
              <div className="flex space-x-2">
                <Button onClick={handlePlayPause}>
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button onClick={handleReset}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <Button
              variant={isRecording ? "destructive" : "primary"}
              size="lg"
              className="rounded-full w-20 h-20"
              onClick={isRecording ? stopRecording : startRecording}
            >
              {type === 'audio' ? (
                isRecording ? <MicOff className="h-12 w-12" /> : <Mic className="h-12 w-12" />
              ) : (
                isRecording ? <VideoOff className="h-12 w-12" /> : <Video className="h-12 w-12" />
              )}
            </Button>
          )}
        </div>
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              if (isRecording) {
                stopRecording()
              }
              setRecordedMediaURL(null)
              setRecordingTime(0)
              //if (wavesurfer) {
                //wavesurfer.destroy()
              //}
            }}
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={!recordedMediaURL}
            onClick={() => {
              // Here you would typically handle saving/sending the recording
              console.log('Saving recording:', recordedMediaURL)
            }}
          >
            Save Recording
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default RecordingModal
