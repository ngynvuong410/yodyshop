import React,{useState} from 'react'
import PropTypes from 'prop-types'
import heroSliderData from '../assets/fake-data/hero-slider';
function HeroSlider({ control }) {
    const sliderData = heroSliderData()
    const [activeSlider, setactiveSlider] = useState(0)
    return (
        <div className="hero__slider">
            {
                sliderData.map((item,idx) => {
                    return (
                        <div key={item.link} className={`hero__slider__item ${idx ==activeSlider?'active':''}`}>
                            <a  href={item.path}>
                                <img src={item.link} />
                            </a>
                        </div>

                    )
                })
            }
            {
                control ? (
                    <div className="hero__slider__control">
                          {
                            Array(sliderData.length).fill().map((_,idx)=>
                                <span className={idx==activeSlider?'active':''} key={idx} onClick={()=>setactiveSlider(idx)}>.</span>
                            )
                          }
                    </div>
                ) : null
            }

        </div>
    )
}
HeroSlider.prototype = {
    sliderData: PropTypes.array.isRequired,
    control: PropTypes.bool.isRequired
}

export default HeroSlider
