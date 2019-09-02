import React from 'react';
import VideoCover from 'react-video-cover'

class VideoBackground extends React.Component {
    state = {
        resizeNotifier: () => {},
      }
    render() {
        const videoOptions = {
          src: '../../assets/videos/fish.mp4',
          autoPlay: true,
          loop: true,
          muted: true
        };
    return (
          <div className="video-container" >
            <VideoCover
              videoOptions={videoOptions}
              remeasureOnWindowResize
              getResizeNotifier={(resizeNotifier: any) => {
                this.setState({
                  resizeNotifier,
                });
              }}
            />
          </div>
        );
      }
    }
    export default VideoBackground;
