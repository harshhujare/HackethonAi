import React from 'react'
import About from './About.jsx'
import Story from './Story.jsx'
const Mid = () => {
  return (
    <div >
    <About
hello="the gretest show of all time <br />  <b>breking bad</b>"
imge="img/breaking-bad.jpg"
subtext={<><p>"This isn’t just a show—it’s a descent into moral chaos, told through the eyes of a high school chemistry</p><p>teacher turned drug lord.  Meth, morals, and mind games—this is storytelling at its purest and darkest. If you haven’t seen it, you're still living in a pre-Heisenberg timeline."</p></>}
btnlink="https://vegamovies.mk/33036-breaking-bad-2023-season-1-dual-audio-hindi-hdrip-720p-480p-episode-1-added.html"

/>
<Story/>
<About
hello="the gretest anime of all time <br />  <b>attack on titan</b>"
imge="img/attack-on-titan.jpg"
btnlink="https://www.vegamovies-nl.biz/download-attack-on-titan-season-1-complete-dual-audio-hindi-dubbed-org/"
subtext={<><p>This show will tell you the actual meaning of freedom </p><p> just watch it</p></>}
/>
    </div>
  )
}

export default Mid