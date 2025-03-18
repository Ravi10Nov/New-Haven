import {Component, } from "react"
import PropTypes from 'prop-types'

let loadYT

export default class YouTube extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoPlayedTarget: 0,
            done:false,
            player:null
        }
    }
    componentDidMount () {
      if (!loadYT) {
        loadYT = new Promise((resolve) => {
          const tag = document.createElement('script')
          tag.src = 'https://www.youtube.com/iframe_api'
          const firstScriptTag = document.getElementsByTagName('script')[0]
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
          window.onYouTubeIframeAPIReady = () => resolve(window.YT)
        })
      }

      loadYT.then((YT) => {
        this.player = new YT.Player(this.youtubePlayerAnchor, {
          height: this.props.height || 390,
          width: this.props.width || 640,
          videoId: this.props.YTid,
          events: {
            onStateChange: this.onPlayerStateChange
          }
        })
      })
    }



    onPlayerStateChange = (e) => {
        if(e.data == 0){
            this.props.onStateChange(true);
        }
    }

    render () {
      return (
        <section className='youtubeComponent-wrapper'>
          <div ref={(r) => { this.youtubePlayerAnchor = r }}></div>
        </section>
      )
    }
}
  
  YouTube.propTypes = {
    YTid: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    onStateChange: PropTypes.func
  }