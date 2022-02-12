
import React,{useState,useEffect} from 'react'
import { Col, Row, Container } from 'react-bootstrap'
import { useStateValue } from '../store/StateProvider'
import {send,init} from 'emailjs-com'
export const Shipping = () => {
    init("user_zXId9L2yySoXwztBepUMD");
    const [email, setemail] = useState('')
    const [name, setname] = useState('')
    const [address, setaddress] = useState('')
    // const [discount, setdiscount] = useState()
    const [cities, setcities] = useState([])
    const [city, setcity] = useState()
    const [districts, setdistricts] = useState([])
    const [district, setdistrict] = useState()
    const [ward, setward] = useState()
    const [{carts},dispatch] =  useStateValue()
    const [toSend, setToSend] = useState({
        from_name: '',
        to_name: '',
        message: '',
        reply_to: '',
      });
    //cart total 
    const total = carts.reduce((total,current)=>total+current.price*current.qty,0)

     useEffect(() => {
        fetch('https://provinces.open-api.vn/api/?depth=3')
        .then(data=>data.json())
        .then(data=>{
      
            const resultsCites =  Object.keys(data).map((key) => [ data[key].codename,data[key].name]);
            const resultsDistricts =  Object.keys(data).map((key) => [ data[key].codename,data[key].districts]);
            setcities(resultsCites)
            setdistricts(resultsDistricts)
        })
       
         return () => {
             
         }
     }, [])
    const handelSubmit = (e)=>{
        e.preventDefault()
 
        if(name&&email&&city&&district&&ward){
            const obj = `customer info :${name} - ${email} - ${city} - ${district} - ${ward} - ${total + 25000}`
            setToSend({ ...toSend, from_name:'admin yody',to_name:name,message:obj,reply_to:''});
            send(
                'service_z2tix3q',
                'template_spqfqxu',
                toSend,
                'user_zXId9L2yySoXwztBepUMD'
              )
                .then((response) => {
                  console.log('SUCCESS!', response.status, response.text);
                })
                .catch((err) => {
                  console.log('FAILED...', err);
                });
        }
    }
    return (
        <div className='shipping'>

            <Container>
                <Row>
                    <Col md={4}>
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="inputEmail4">Email</label>
                                    <input type="email" className="form-control" id="inputEmail4" placeholder="Email" value={email}
                                        onChange={(e)=>setemail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group col-md-12">
                                    <label htmlFor="inputPassword4">Name</label>
                                    <input type="text" className="form-control" id="inputPassword4" placeholder="Password" 
                                    value={name}
                                          onChange={(e)=>setname(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputAddress">Address</label>
                                <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" 
                                value={address}
                                      onChange={(e)=>setaddress(e.target.value)}
                                />
                            </div>
                         
                            <div className="form-row">
                              
                                <div className="form-group col-md-12">
                                    <label htmlFor="inputState">City</label>
                                    <select id="inputState" className="form-control" value={city}
                                     onChange={(e)=>setcity(e.target.value)}
                                    >
                                        
                                         {
                                             cities.map(item=>{
                                                 return <option key={item[0]} value={item[0]}>{item[1]}</option>
                                             })
                                         }
                                    </select>
                                </div>
                                <div className="form-group col-md-12">
                                    <label htmlFor="inputState">District</label>
                                    <select id="inputState" className="form-control" value={district}
                                    onChange={(e)=>setdistrict(e.target.value)}
                                    >
                                        {
                                            districts.map(item=>{
                                                if(item[0]==city)
                                                 return item[1].map(item=><option key={item.codename} value={item.codename}>{item.name}</option>)
                                             })
                                        }
                                    </select>
                                </div>
                                <div className="form-group col-md-12">
                                    <label htmlFor="inputState">town</label>
                                    <select id="inputState" className="form-control"
                                     value={ward}
                                     onChange={(e)=>setward(e.target.value)}
                                    >
                                      {
                                          districts.map(item=>{
                                            const getWards= item[1].find(item=>item.codename==district)
                                            if(getWards){
                                                return getWards.wards.map(item=><option key={item.codename} value={item.codename}>{item.name}</option>)
                                            }
                                          })
                                      
                                      }
                                    </select>
                                </div>
                    
                            </div>
                          
                            
                        </form>


                    </Col>
                   
                    <Col md={4}>
                        <form>
                            <div className="form-row">
                           
                                <div className="form-group col-md-12">
                                   
                                    <input type="text" className="form-control" id="inputPassword4" placeholder="D I S C O U N T S : [Number]" />
                                </div>
                                <div className="form-group col-md-12">
                                    <label htmlFor="inputPassword4">Tạm tính</label>
                                    <b style={{display:'block',borderBottom:'2px solid #80808063',letterSpacing:3,fontFamily:'cursive',fontSize:21,color:'GrayText'}}>{(Number.parseInt(total)).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' vnd'}</b>
                            </div>
                                <div className="form-group col-md-12">
                                    <label htmlFor="inputPassword4">Phí vận chuyển</label>
                                    <b style={{display:'block',borderBottom:'2px solid #80808063',letterSpacing:3,fontFamily:'cursive',fontSize:21,color:'GrayText'}}>{(Number.parseInt(25000)).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' vnd'}</b>
                            </div>
                                <div className="form-group col-md-12">
                                    <label htmlFor="inputPassword4">Tổng cộng</label>
                                    <b style={{display:'block',borderBottom:'2px solid #80808063',letterSpacing:3,fontFamily:'cursive',fontSize:21,color:'red'}}>{(Number.parseInt(total+25000)).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' vnd'}</b>
                            </div>
                            <button type="submit" className="btn btn-primary"
                            onClick={(e)=>handelSubmit(e)}
                            >Đặt hàng</button>
                           </div>
                       
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
