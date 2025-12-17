import react from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
const Cardpage =()=>{


const timeline =gsap.timeline({
repeat:-1, repeatDelay:1,yoyo:true,

})
 
useGSAP(()=>{

timeline.to('#box',{
x:250,
y:-250,
rotation:360,
borderRadius:'100%',
duration:2,
ease:'back.inOut'


})
timeline.to('#box',{
scale:2,
duration:2,
backgroundColor:'blue'

},[])
timeline.to('#box',{
  x:500,
  y:0,
  scale:1,
  rotation:360,
borderRadius:'0%',
duration:2,
ease:'back.inOut',
backgroundColor:'green'
})
},[])

    return(
   <>
   <div  className=" w-screen h-screen bg-black flex items-center  ">
<div id="box" className=" w-20 h-20 bg-red-500 rounded-sm" >


</div>

   </div>
   
   </>
    )
}
export default Cardpage